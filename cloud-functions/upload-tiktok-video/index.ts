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
      youtubeCredentials: true,
    },
  });

  if (!currentProject?.youtubeCredentials) {
    throw new Error("NO_YOUTUBE_CREDENTIALS");
  }

  const videoFilePath = `${content.slug}.mp4`;

  try {
    storage
      .bucket(user.currentProjectId)
      .file(videoFilePath)
      .createReadStream()
      .pipe(fs.createWriteStream(videoFilePath))
      .on("finish", async () => {
        const OPEN_ID = "";
        const ACCESS_TOKEN = "";

        const res = await fetch(
          `https://open-api.tiktok.com/share/video/upload?open_id=${OPEN_ID}&access_token=${ACCESS_TOKEN}`,
          {
            method: "POST",
            body: JSON.stringify({
              video: videoFilePath,
            }),
          }
        );

        const data = await res.json();
        console.log(data, "__data__");
      });
  } catch (error) {
    console.log(error);

    throw new Error("ERROR_INSERTING_YOUTUBE_VIDEO");
  }
}
