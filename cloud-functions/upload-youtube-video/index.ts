import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";
import invariant from "tiny-invariant";

import { PrismaClient } from "./generated";
import type { UploadVideoEvent } from "../event-types";

const prisma = new PrismaClient();

const storage = new Storage();

functions.cloudEvent<UploadVideoEvent>(
  "upload-youtube-video",
  async (cloudEvent) => {
    if (!cloudEvent?.data) {
      throw new Error("MISSING_CLOUDEVENT_DATA");
    }

    await uploadYoutubeVideo({
      projectId: cloudEvent.data.projectId,
      slug: cloudEvent.data.slug,
    });

    return { message: "success" };
  }
);

export async function uploadYoutubeVideo(params: UploadVideoEvent) {
  const { slug, projectId } = params;

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
          youtubeCredentials: true,
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

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URL
  );

  const currentProject = await prisma.project.findUnique({
    where: {
      id: user.currentProjectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  invariant(currentProject?.youtubeCredentials, "NO_YOUTUBE_CREDENTIALS");

  oauth2Client.setCredentials({
    access_token: currentProject.youtubeCredentials.accessToken,
    refresh_token: currentProject.youtubeCredentials.refreshToken,
  });

  const videoFilePath = `${content.slug}.mp4`;

  storage
    .bucket(user.currentProjectId)
    .file(videoFilePath)
    .createReadStream()
    .pipe(fs.createWriteStream(videoFilePath))
    .on("finish", () => {
      const bodyStream = fs.createReadStream(videoFilePath);

      const youtube = google.youtube({
        version: "v3",
        auth: oauth2Client,
      });

      youtube.videos
        .insert(
          {
            part: ["snippet", "status"],
            requestBody: {
              snippet: {
                title: content.title,
                description: content.description,
                tags: content.tags,
              },
              status: {
                privacyStatus: "private",
              },
            },
            media: {
              mimeType: "video/mp4",
              body: bodyStream,
            },
          },
          {
            onUploadProgress: (evt) => {
              const progress = (evt.bytesRead / evt.contentLength) * 100;
              console.log(`${Math.round(progress)}% complete`);
            },
          }
        )
        .then(() => {
          fs.unlinkSync(videoFilePath);
        });
    });
}

// local
uploadYoutubeVideo({
  slug: "my-tites",
  projectId: "clexq3lrp00029gfixvc8jcdz",
});
