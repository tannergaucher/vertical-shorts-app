import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

const storage = new Storage();

export type UploadVideoEvent = {
  slug: string;
  projectId: string;
};

functions.cloudEvent("upload-tiktok-video", async (cloudEvent) => {
  await uploadTikTokVideo(cloudEvent);

  return { message: "success" };
});

export async function uploadTikTokVideo(cloudEvent: any) {
  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as UploadVideoEvent;

  const { slug, projectId } = parsedData;

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      slug: true,
      title: true,
      description: true,
      tags: true,
      published: true,
      project: {
        select: {
          id: true,
          tikTokCredentials: true,
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!content) {
    throw new Error("NO_CONTENT");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: content.project.user.id,
    },
    select: {
      id: true,
      currentProjectId: true,
    },
  });

  if (!user) {
    throw new Error("NO_USER");
  }

  if (!user.currentProjectId) {
    throw new Error("NO_CURRENT_PROJECT");
  }

  const currentProject = await prisma.project.findUnique({
    where: {
      id: user.currentProjectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  const videoFilePath = `${content.slug}.mp4`;

  try {
    storage
      .bucket(user.currentProjectId)
      .file(videoFilePath)
      .createReadStream()
      .pipe(fs.createWriteStream(videoFilePath))
      .on("finish", async () => {
        const res = await fetch(
          `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${currentProject?.tikTokCredentials?.accessToken}`,
            },
            body: JSON.stringify({
              source: videoFilePath,
              total_chunk_count: 1,
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          // using put reeust, upload video to tiktok
          await fetch(data.data.upload_url, {
            method: "PUT",
            headers: {
              "Content-Type": "video/mp4",
            },
            body: JSON.stringify({
              data: videoFilePath,
            }),
          });

          // check video status

          const statusRes = await fetch(
            `https://open.tiktokapis.com/v2/post/publish/status/fetch/`,
            {
              headers: {
                Authorization: `Bearer ${currentProject?.tikTokCredentials?.accessToken}`,
              },
              body: JSON.stringify({
                publish_id: data.data.publish_id,
              }),
            }
          );

          const statusData = await statusRes.json();

          console.log(statusData, "statusData");
        }
      });
  } catch (error) {
    console.log(error);

    throw new Error("ERROR_INSERTING_YOUTUBE_VIDEO");
  }
}
