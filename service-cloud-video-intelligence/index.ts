import { v1 as videoIntelligence } from "@google-cloud/video-intelligence";
import { google } from "@google-cloud/video-intelligence/build/protos/protos";
import cors from "cors";
import dotenv from "dotenv";
import type { Request, Response } from "express";
import express, { json } from "express";

import { PrismaClient } from "./generated/index.js";
import { APP_BASE_URL } from "./utils/constants";

dotenv.config();

const app = express();

app.use(json());

app.use(
  cors({
    origin: APP_BASE_URL,
  })
);

const prisma = new PrismaClient();

const videoIntelligenceClient =
  new videoIntelligence.VideoIntelligenceServiceClient();

interface GenerateTagsRequest {
  projectId: string;
  slug: string;
}

export interface GenerateTagsResponse {
  success: boolean;
  tags: string[];
}

function parseLabelsToTags(
  labels?: google.cloud.videointelligence.v1.ILabelAnnotation[] | null
) {
  if (!labels) {
    return [];
  }

  return labels.flatMap((label) =>
    label.entity?.description ? label.entity.description : []
  );
}

app.post(
  "/generate-tags",
  async (
    req: Request<{}, {}, GenerateTagsRequest>,
    res: Response<GenerateTagsResponse>
  ) => {
    const { projectId, slug } = req.body;

    const content = await prisma.content.findUnique({
      where: {
        projectId_slug: {
          projectId,
          slug,
        },
      },
      select: {
        projectId: true,
        slug: true,
        annotations: true,
        labels: true,
      },
    });

    if (!content) {
      throw new Error("CONTENT_NOT_FOUND");
    }

    const parsedContentLabels = JSON.parse(
      content.labels as string
    ) as unknown as google.cloud.videointelligence.v1.ILabelAnnotation[] | null;

    const parsedTags = parseLabelsToTags(parsedContentLabels);

    if (parsedTags.length > 0) {
      return res.json({
        success: true,
        tags: parsedTags,
      });
    }

    try {
      const gcsResourceUri = `gs://${content.projectId}/${content.slug}.mp4`;

      const request = {
        inputUri: gcsResourceUri,
        features: [google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
      };

      const [operation] = await videoIntelligenceClient.annotateVideo(request);

      console.log("Waiting for operation to complete...");

      const [operationResult] = await operation.promise();

      const annotations = operationResult.annotationResults?.[0];

      const parsedFetchedTags = parseLabelsToTags(
        annotations?.segmentLabelAnnotations
      );

      if (parsedFetchedTags.length > 0) {
        await prisma.content.update({
          where: {
            projectId_slug: {
              projectId,
              slug,
            },
          },
          data: {
            tags: parsedFetchedTags,
          },
        });

        return res.json({
          success: true,
          tags: parsedFetchedTags,
        });
      }

      return res.json({
        success: false,
        tags: [],
      });
    } catch (error) {
      console.log(error);
      throw new Error("ERROR_GENERATING_TAGS");
    }
  }
);

app.post("/recognize-text", async (req, res) => {
  const { projectId, slug } = req.body;

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      projectId: true,
      slug: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const request = {
    inputUri: gcsUri,
    features: [google.cloud.videointelligence.v1.Feature.TEXT_DETECTION],
  };

  const [operation] = await videoIntelligenceClient.annotateVideo(request);
  console.log("Waiting for operation to complete...");

  interface Result {
    annotationResults: {
      textAnnotations: TextAnnotation[];
    }[];
  }

  interface TextAnnotation {
    text: string;
    segments: {
      segment: {
        startTimeOffset: {
          seconds: number;
          nanos: number;
        };
        endTimeOffset: {
          seconds: number;
          nanos: number;
        };
      };
      confidence: number;
      frames: {
        timeOffset: {
          seconds: number;
          nanos: number;
        };
        rotatedBoundingBox: {
          vertices: {
            x: number;
            y: number;
          }[];
        };
      }[];
    }[];
  }

  const results = (await operation.promise()) as Result[];

  const textAnnotations: TextAnnotation[] | undefined =
    results[0]?.annotationResults[0]?.textAnnotations;

  if (textAnnotations !== undefined) {
    await prisma.content.update({
      where: {
        projectId_slug: {
          projectId,
          slug,
        },
      },
      data: {
        annotations: JSON.stringify(textAnnotations),
      },
    });
  }

  res.json({ success: true });
});

app.post("/transcribe", async (req, res) => {
  const { projectId, slug } = req.body;

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      projectId: true,
      slug: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const gcsUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const videoContext = {
    speechTranscriptionConfig: {
      languageCode: "en-US",
      enableAutomaticPunctuation: true,
    },
  };

  const request = {
    inputUri: gcsUri,
    videoContext: videoContext,
    features: [google.cloud.videointelligence.v1.Feature.SPEECH_TRANSCRIPTION],
  };

  const [operation] = await videoIntelligenceClient.annotateVideo(request);
  console.log("Waiting for operation to complete...");
  const [operationResult] = await operation.promise();

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      transcription: JSON.stringify(operationResult),
    },
  });

  res.json({ success: true });
});

const port = parseInt(process.env.PORT ?? "8080");

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
