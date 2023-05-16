import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { PubSub } from "@google-cloud/pubsub";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

const storage = new Storage();

export const pubsub = new PubSub({
  servicePath: "./service-account.json",
});

functions.cloudEvent(
  "upload-tiktok-video",
  async (cloudEvent: CloudEvent<string>) => {
    await uploadTikTokVideo(cloudEvent);

    return { message: "success" };
  }
);

export async function uploadTikTokVideo(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_DATA");
  }

  const { slug, projectId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    slug: string;
    projectId: string;
  };

  console.log(slug, "_slug");
  console.log(projectId, "_projectId");

  const content = await prisma.content.findUniqueOrThrow({
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

  console.log(content, "_content");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: content.project.user.id,
    },
    select: {
      id: true,
      currentProjectId: true,
    },
  });

  console.log(user, "_user");

  if (!user.currentProjectId) {
    throw new Error("NO_CURRENT_PROJECT");
  }

  const currentProject = await prisma.project.findUniqueOrThrow({
    where: {
      id: user.currentProjectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  console.log(currentProject, "_currentProject");

  if (!currentProject.tikTokCredentials) {
    throw new Error("NO_CURRENT_PROJECT_TIKTOK_CREDENTIALS");
  }

  const videoFilePath = `${content.slug}.mp4`;

  console.log(videoFilePath, "_videoFilePath");

  storage
    .bucket(user.currentProjectId)
    .file(videoFilePath)
    .createReadStream()
    .pipe(fs.createWriteStream(videoFilePath))
    .on("error", (err) => {
      console.log(err, "_err");
      throw new Error("ERROR_DOWNLOADING_VIDEO_FROM_STORAGE");
    })
    .on("finish", async () => {
      console.log("finished downloading video");

      const videoStats = fs.statSync(videoFilePath);

      const res = await fetch(
        `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
        {
          method: "POST",
          headers: {
            Authorization: `${currentProject.tikTokCredentials?.accessToken}`,
          },
          body: JSON.stringify({
            source: "FILE_UPLOAD",
            video_size: videoStats.size,
            chunk_size: videoStats.size,
            total_chunk_count: 1,
          }),
        }
      );

      if (!res.ok) {
        console.log(res, "_res");
        throw new Error("ERROR_REQUESTING_TIKTOK_UPLOAD_URL");
      }

      const { data } = await res.json();

      const videoBinary = fs.readFileSync(videoFilePath);

      console.log(data, "_data");

      // eventually support chunked uploads
      const uploadResJson = await fetch(data.upload_url, {
        method: "PUT",
        headers: {
          "Content-Length": videoStats.size.toString(),
          "Content-Range": `bytes 0-${videoStats.size - 1}/${videoStats.size}`,
          "Content-Type": "video/mp4",
        },
        body: videoBinary,
      });

      console.log(uploadResJson, "_uploadResJson");

      if (!uploadResJson.ok) {
        console.log(uploadResJson, "_uploadResJson");
        throw new Error("ERROR_UPLOADING_VIDEO_TO_TIKTOK");
      }

      pubsub.topic("check-tiktok-upload-status").publishMessage({
        json: {
          publishId: data.publish_id,
          projectId: user.currentProjectId,
        },
      });
    });
}
