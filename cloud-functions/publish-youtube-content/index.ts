import * as functions from "@google-cloud/functions-framework";
import type { CloudEvent } from "@google-cloud/functions-framework/build/src/functions";
import { google } from "googleapis";

import { PrismaClient, UploadStatus } from "./generated";

const prisma = new PrismaClient();

functions.cloudEvent(
  "publish-youtube-content",
  async (cloudEvent: CloudEvent<string>) => {
    await publishYoutubeContent(cloudEvent);

    return { message: "success" };
  }
);

export async function publishYoutubeContent(cloudEvent: CloudEvent<string>) {
  if (!cloudEvent.data) {
    throw new Error("NO_DATA");
  }

  const { slug, projectId } = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  ) as {
    slug: string;
    projectId: string;
  };

  const content = await prisma.content.findUnique({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      youtubeId: true,
      youtubeStatus: true,
    },
  });

  console.log(content, "__CONTENT__");

  if (!content) {
    throw new Error("NO_CONTENT");
  }

  if (content.youtubeStatus === UploadStatus.PUBLIC) {
    return;
  }

  if (content.youtubeStatus === UploadStatus.NOT_STARTED) {
    console.log("HANDLE NOT STARTED");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  if (!project?.youtubeCredentials) {
    throw new Error("NO_YOUTUBE_CREDENTIALS");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.YOUTUBE_CLIENT_ID,
    process.env.YOUTUBE_CLIENT_SECRET,
    process.env.YOUTUBE_REDIRECT_URL
  );

  oauth2Client.setCredentials({
    access_token: project.youtubeCredentials.accessToken,
    refresh_token: project.youtubeCredentials.refreshToken,
  });

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const updatedVideo = await youtube.videos.update({
    part: ["status"],
    requestBody: {
      id: slug,
      status: {
        privacyStatus: "public",
      },
    },
  });

  if (updatedVideo.status !== 200) {
    throw new Error("YOUTUBE_UPDATE_FAILED");
  }

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      youtubeStatus: UploadStatus.PUBLIC,
      youtubePublishAt: null,
    },
  });

  return {
    message: `YouTube video ${content.youtubeId} is now public`,
  };
}
