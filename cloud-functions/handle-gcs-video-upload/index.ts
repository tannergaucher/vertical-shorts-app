import * as functions from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

import { PrismaClient } from "./generated";

export const pubsub = new PubSub({
  servicePath: "./service-account.json",
});

const prisma = new PrismaClient();

export type HandleGcsVideoUpload = {
  slug: string;
  projectId: string;
};

functions.cloudEvent<HandleGcsVideoUpload>(
  "handle-gcs-video-upload",
  async (cloudEvent) => {
    await handleGcsVideoUpload(cloudEvent);

    return { message: "success" };
  }
);

export async function handleGcsVideoUpload(cloudEvent: any) {
  console.log("_here");

  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as HandleGcsVideoUpload;

  const { slug, projectId } = parsedData;

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      project: {
        select: {
          youtubeCredentials: true,
          tikTokCredentials: true,
          instagramCredentials: true,
          facebookCredentials: true,
          twitterCredentials: true,
        },
      },
    },
  });

  console.log("_content", content);

  if (content?.project.youtubeCredentials) {
    console.log("_publishing to youtube");

    pubsub.topic("upload-youtube-short").publishMessage({
      json: {
        slug,
        projectId,
      },
    });
  }

  if (content?.project.tikTokCredentials) {
    console.log("_publishing to tiktok");

    pubsub.topic("upload-tiktok-video").publishMessage({
      json: {
        slug,
        projectId,
      },
    });
  }
}
