import * as functions from "@google-cloud/functions-framework";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent("check-tiktok-upload-status", async (cloudEvent) => {
  await checkTikTokUploadStatus(cloudEvent);

  return { message: "success" };
});

export async function checkTikTokUploadStatus(cloudEvent: any) {
  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  );

  const { currentProjectId, publishId } = parsedData;

  const currentProject = await prisma.project.findUnique({
    where: {
      id: currentProjectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  const statusRes = await fetch(
    `https://open.tiktokapis.com/v2/post/publish/status/fetch/`,
    {
      headers: {
        Authorization: `Bearer ${currentProject?.tikTokCredentials?.accessToken}`,
      },
      body: JSON.stringify({
        publish_id: publishId,
      }),
    }
  );

  const status = await statusRes.json();

  console.log(status, "_status");
}
