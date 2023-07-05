import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import { v1 as videoIntelligence } from "@google-cloud/video-intelligence";
import { google } from "@google-cloud/video-intelligence/build/protos/protos";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent(
  "annotate-video",
  async (cloudEvent: CloudEvent<string>) => {
    await annotateVideo(cloudEvent);

    return { message: "success" };
  }
);

export async function annotateVideo(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_CLOUDEVENT_DATA");
  }

  const { slug, projectId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    slug: string;
    projectId: string;
  };

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

  const gcsResourceUri = `gs://${content.projectId}/${content.slug}.mp4`;

  const client = new videoIntelligence.VideoIntelligenceServiceClient();

  const request = {
    inputUri: gcsResourceUri,
    features: [google.cloud.videointelligence.v1.Feature.LABEL_DETECTION],
  };

  const [operation] = await client.annotateVideo(request);
  console.log("Waiting for operation to complete...");
  const [operationResult] = await operation.promise();

  const annotations = operationResult.annotationResults?.[0];

  const labels = annotations?.segmentLabelAnnotations;

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      annotations: JSON.stringify(annotations),
      labels: JSON.stringify(labels),
    },
  });

  return { message: "success" };
}
