import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";

import { PrismaClient } from "./generated";
import type { UploadVideoEvent } from "../types";

const prisma = new PrismaClient();

const storage = new Storage();

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

  storage
    .bucket(user.currentProjectId)
    .file(videoFilePath)
    .createReadStream()
    .pipe(fs.createWriteStream(videoFilePath))
    .on("finish", async () => {
      const videoStats = fs.statSync(videoFilePath);

      try {
        // get uploadUrl
        const res = await fetch(
          `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${currentProject?.tikTokCredentials?.accessToken}`,
            },
            body: JSON.stringify({
              source_info: "FILE_UPLOAD",
              video_size: videoStats.size,
              chunk_size: videoStats.size,
              total_chunk_count: 1,
            }),
          }
        );

        const { data } = await res.json();

        await fetch(data.upload_url, {
          method: "PUT",
          headers: {
            "Content-Type": "video/mp4",
            "Content-Length": videoStats.size.toString(),
            "Content-Range": `bytes 0-${videoStats.size - 1}/${
              videoStats.size
            }`,
          },
          body: JSON.stringify({
            data: videoFilePath,
          }),
        });
      } catch (error) {
        console.log(error, "_error");
        throw new Error("ERROR_UPLOADING_TIKTOK");
      } finally {
        fs.unlinkSync(videoFilePath);
      }
    });
}
