import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent(
  "check-tiktok-upload-status",
  async (cloudEvent: CloudEvent<string>) => {
    await checkTikTokUploadStatus(cloudEvent);

    return { message: "success" };
  }
);

export async function checkTikTokUploadStatus(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_DATA");
  }

  const { projectId, publishId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    projectId: string;
    publishId: string;
  };

  const currentProject = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  const res = await fetch(
    `https://open.tiktokapis.com/v2/post/publish/status/fetch/`,
    {
      headers: {
        Authorization: `${currentProject?.tikTokCredentials?.accessToken}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        publish_id: publishId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error("TIKTOK_UPLOAD_STATUS_CHECK_FAILED");
  }

  const status = await res.json();

  console.log(status, "_status");
}
