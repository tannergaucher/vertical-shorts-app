import * as functions from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

import type { UploadVideoEvent } from "../event-types";

export const pubsub = new PubSub({
  servicePath: "./service-account.json",
});

functions.cloudEvent<UploadVideoEvent>(
  "process-content-video",
  async (cloudEvent) => {
    if (!cloudEvent?.data) {
      throw new Error("MISSING_CLOUD_EVENT_DATA");
    }

    const { slug, projectId } = cloudEvent.data;

    await processContentVideo({
      slug,
      projectId,
    });

    return { message: "success" };
  }
);

export async function processContentVideo(params: UploadVideoEvent) {
  try {
    await Promise.all(
      [
        "upload-youtube-video",
        // "upload-tiktok-video",
        // "upload-instagram-video",
        // "upload-facebook-video",
        // "upload-twitter-video",
      ].map((topic) =>
        pubsub.topic(topic).publishMessage({
          data: JSON.stringify({
            slug: params.slug,
            projectId: params.projectId,
          }),
        })
      )
    );

    return { message: "success" };
  } catch (error) {
    console.log(error, "error");
    return { message: "error" };
  }
}
