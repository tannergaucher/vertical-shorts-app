import { google } from "@google-cloud/video-intelligence/build/protos/protos";
import type { Request, Response } from "express";

import { cloudIntelligence, prisma } from "../index";

interface GenerateTagsRequest {
  projectId: string;
  slug: string;
}

export interface GenerateTagsResponse {
  success: boolean;
  tags: string[];
}

function getTagsFromLabels(
  labels?: google.cloud.videointelligence.v1.ILabelAnnotation[] | null
) {
  if (!labels) {
    return [];
  }

  return labels.flatMap((label) =>
    label.entity?.description ? label.entity.description : []
  );
}

export async function generateTags(
  req: Request<{}, {}, GenerateTagsRequest>,
  res: Response<GenerateTagsResponse>
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
      annotations: true,
      labels: true,
    },
  });

  if (!content) {
    throw new Error("CONTENT_NOT_FOUND");
  }

  const contentLabels = JSON.parse(content.labels as string) as unknown as
    | google.cloud.videointelligence.v1.ILabelAnnotation[]
    | null;

  const tags = getTagsFromLabels(contentLabels);

  if (tags.length > 0) {
    return res.json({
      success: true,
      tags,
    });
  }

  try {
    const annotateVideoRequest = {
      inputUri: `gs://${content.projectId}/${content.slug}.mp4`,
      features: [google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
    };

    const [operation] = await cloudIntelligence.annotateVideo(
      annotateVideoRequest
    );

    console.log("Waiting for operation to complete...");

    const [operationResult] = await operation.promise();

    const annotations = operationResult.annotationResults?.[0];

    const tags = getTagsFromLabels(annotations?.segmentLabelAnnotations);

    if (tags.length > 0) {
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          tags,
        },
      });

      return res.json({
        success: true,
        tags,
      });
    }

    return res.json({
      success: false,
      tags: [],
    });
  } catch (error) {
    console.error(error);

    return res.json({
      success: false,
      tags: [],
    });
  }
}
