import * as functions from "@google-cloud/functions-framework";
import { PubSub } from "@google-cloud/pubsub";

export const pubsub = new PubSub({
  servicePath: "./service-account.json",
});

functions.cloudEvent("process-content-video", async (cloudEvent) => {
  const { slug, projectId } = cloudEvent.data as any;

  await processContentVideo({
    slug,
    projectId,
  });

  return { message: "success" };
});

export async function processContentVideo(params: {
  slug: string;
  projectId: string;
}) {
  const { slug, projectId } = params;
  try {
    const json = {
      slug,
      projectId,
    };

    await Promise.all(
      [
        "upload-youtube-video",
        "upload-tiktok-video",
        "upload-instagram-video",
        "upload-facebook-video",
        "upload-twitter-video",
      ].map((topic) =>
        pubsub.topic(topic).publishMessage({
          json,
        })
      )
    );

    return { message: "success" };
  } catch (error) {
    console.log(error, "error");
    return { message: "error" };
  }
}
