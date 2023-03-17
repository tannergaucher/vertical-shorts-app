import * as functions from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

export const pubsub = new PubSub({
  servicePath: "./service-account.json",
});

export type CreateVerticalVideoContent = {
  slug: string;
  projectId: string;
};

functions.cloudEvent<CreateVerticalVideoContent>(
  "create-vertical-video-content",
  async (cloudEvent) => {
    if (!cloudEvent?.data) {
      throw new Error("MISSING_CLOUD_EVENT_DATA");
    }

    const { slug, projectId } = cloudEvent.data;

    await createVerticalVideoContent({
      slug,
      projectId,
    });

    return { message: "success" };
  }
);

export async function createVerticalVideoContent(
  params: CreateVerticalVideoContent
) {
  try {
    await Promise.all(
      [
        "upload-youtube-short",
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
