import type { Request, Response } from "express";

import { cloudIntelligence, CloudIntelligenceTypes, prisma } from "../index";

interface RecognizeTextRequest {
  projectId: string;
  slug: string;
}

export interface RecognizeTextResponse {
  success: boolean;
}

export async function recognizeText(
  req: Request<{}, {}, RecognizeTextRequest>,
  res: Response<RecognizeTextResponse>
) {
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
    features: [CloudIntelligenceTypes.Feature.TEXT_DETECTION],
  };

  const [operation] = await cloudIntelligence.annotateVideo(request);

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
}
