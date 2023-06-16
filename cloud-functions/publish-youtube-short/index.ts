import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import { google } from "googleapis";

import { PrismaClient } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent(
  "publish-youtube-short",
  async (cloudEvent: CloudEvent<string>) => {
    await uploadYoutubeShort(cloudEvent);

    return { message: "success" };
  }
);

export async function publishYoutubeShort(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_DATA");
  }

  const { slug, projectId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    slug: string;
    projectId: string;
  };

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

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: content.project.user.id,
    },
    select: {
      id: true,
      currentProjectId: true,
    },
  });

  if (!user.currentProjectId) {
    throw new Error("NO_CURRENT_PROJECT");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URL
  );

  const currentProject = await prisma.project.findUniqueOrThrow({
    where: {
      id: user.currentProjectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  if (!currentProject.youtubeCredentials) {
    throw new Error("NO_YOUTUBE_CREDENTIALS");
  }

  oauth2Client.setCredentials({
    access_token: currentProject.youtubeCredentials.accessToken,
    refresh_token: currentProject.youtubeCredentials.refreshToken,
  });

  const now = new Date();
  const expiryDate = new Date(
    currentProject.youtubeCredentials.updatedAt.getTime() + 3600000
  );
  const timeUntilExpiry = expiryDate.getTime() - now.getTime();
  const timeUntilExpiryInSeconds = timeUntilExpiry / 1000;

  if (timeUntilExpiryInSeconds < 60) {
    console.log("TOKEN EXPIRED");

    const { credentials } = await oauth2Client.refreshAccessToken();

    console.log(credentials, "_credentials");

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

  try {
    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    youtube.videos.update({});
  } catch (error) {
    console.log(error, "error publishing public youtube short");
  }
}
