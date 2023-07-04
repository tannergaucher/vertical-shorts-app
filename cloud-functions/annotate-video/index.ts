import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import { PubSub } from "@google-cloud/pubsub";

// import { PrismaClient } from "./generated";

// const prisma = new PrismaClient();

const pubsub = new PubSub({
  projectId: "homerice",
  keyFilename: "./service-account.json",
});

functions.cloudEvent(
  "annotate-video",
  async (cloudEvent: CloudEvent<string>) => {
    await annotateVideo(cloudEvent);

    return { message: "success" };
  }
);

export async function annotateVideo(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_DATA");
  }

  const { slug, projectId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    slug: string;
    projectId: string;
  };
}
