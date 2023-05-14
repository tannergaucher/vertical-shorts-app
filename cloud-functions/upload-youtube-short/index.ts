import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";

import { PrismaClient } from "./generated";

export interface UploadYoutubeShortEvent {
  slug: string;
  projectId: string;
}

const prisma = new PrismaClient();

const storage = new Storage();

functions.cloudEvent(
  "upload-youtube-short",
  async (cloudEvent: CloudEvent<UploadYoutubeShortEvent>) => {
    await uploadYoutubeShort(cloudEvent);

    return { message: "success" };
  }
);

export async function uploadYoutubeShort(cloudEvent: any) {
  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as UploadYoutubeShortEvent;

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

  if (!currentProject?.youtubeCredentials) {
    throw new Error("NO_YOUTUBE_CREDENTIALS");
  }

  oauth2Client.setCredentials({
    access_token: currentProject.youtubeCredentials.accessToken,
    refresh_token: currentProject.youtubeCredentials.refreshToken,
  });

  // check if the access token is expired
  // the expiry date is currentProject.youtubeCredentials.updatedAt + 1 hour
  const now = new Date();
  const expiryDate = new Date(
    currentProject.youtubeCredentials.updatedAt.getTime() + 3600000
  );
  const timeUntilExpiry = expiryDate.getTime() - now.getTime();
  const timeUntilExpiryInSeconds = timeUntilExpiry / 1000;

  if (timeUntilExpiryInSeconds < 60) {
    const { credentials } = await oauth2Client.refreshAccessToken();

    await prisma.project.update({
      where: {
        id: user.currentProjectId,
      },
      data: {
        youtubeCredentials: {
          update: {
            accessToken: credentials.access_token,
            refreshToken: credentials.refresh_token,
          },
        },
      },
    });

    oauth2Client.setCredentials({
      access_token: credentials.access_token,
      refresh_token: credentials.refresh_token,
    });
  }

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
        .insert({
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
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          fs.unlinkSync(videoFilePath);
        });
    });
}
