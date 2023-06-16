import * as functions from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

import { PrismaClient, UploadStatus } from "./generated";

const prisma = new PrismaClient();

const pubsub = new PubSub({
  projectId: "homerice",
  keyFilename: "./service-account.json",
});

functions.cloudEvent("fetch-youtube-content-for-publishing", async () => {
  await fetchYoutubeContentForPublishing();

  return { message: "success" };
});

export async function fetchYoutubeContentForPublishing() {
  const contents = await prisma.content.findMany({
    where: {
      youtubePublishAt: {
        lte: new Date(),
      },
      youtubeStatus: {
        not: UploadStatus.PUBLIC,
      },
    },
    select: {
      slug: true,
      projectId: true,
    },
  });

  await Promise.all(
    contents.map((content) => {
      return pubsub.topic("publish-youtube-content").publishMessage({
        data: Buffer.from(
          JSON.stringify({
            slug: content.slug,
            projectId: content.projectId,
          })
        ),
      });
    })
  );

  return {
    message: `Published ${contents.length} messages to topic publish-youtube-content`,
  };
}
