import { createReadStream } from "fs";
import { google } from "googleapis";

import type { PrismaClient } from "../generated";
import { UploadStatus } from "../generated";

export interface UploadYoutubeShortBody {
  contentId: string;
}

type UploadYoutubeShortParams = UploadYoutubeShortBody & {
  prisma: PrismaClient;
};

export async function uploadYouTubeShort({
  contentId,
  prisma,
}: UploadYoutubeShortParams) {
  const content = await prisma.content.update({
    where: {
      id: contentId,
    },
    select: {
      title: true,
      description: true,
      tags: true,
      project: {
        select: {
          id: true,
        },
      },
    },
    data: {
      youtubeStatus: UploadStatus.UPLOADING,
    },
  });

  const project = await prisma.project.findUnique({
    where: {
      id: content.project.id,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  if (
    !project?.youtubeCredentials?.accessToken ||
    !project?.youtubeCredentials?.refreshToken
  ) {
    throw new Error(
      `Missing YouTube credentials for project ${content.project.id}`
    );
  }

  const oauth2Client = setOauth2ClientCredentials({
    accessToken: project.youtubeCredentials.accessToken,
    refreshToken: project.youtubeCredentials.refreshToken,
  });

  if (oauth2Client === null) {
    await prisma.content.update({
      where: {
        id: contentId,
      },
      data: {
        youtubeStatus: UploadStatus.NOT_STARTED,
      },
    });
    throw new Error("Error setting OAuth client credentials");
  }

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });

  const filePath = `${contentId}.mp4`;

  const bodyStream = createReadStream(filePath);

  await prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      youtubeStatus: UploadStatus.UPLOADING,
    },
  });

  console.log(
    `Uploading ${contentId} to YouTube channel ${project.youtubeCredentials?.channelId}`
  );

  return youtube.videos
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
    .then(async (response) => {
      console.log(response, "upload YouTube response");

      await prisma.content.update({
        where: {
          id: contentId,
        },
        data: {
          youtubeStatus: UploadStatus.PRIVATE,
          youtubeId: response.data.id,
        },
      });

      return {
        message: `Uploaded ${contentId} to YouTube channel ${project.youtubeCredentials?.channelId}`,
      };
    })
    .catch(async (error) => {
      await prisma.content.update({
        where: {
          id: contentId,
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
        },
      });

      console.log(error);

      throw new Error(
        `Error uploading ${contentId} to YouTube channel ${project.youtubeCredentials?.channelId}`
      );
    });
}

function setOauth2ClientCredentials({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URL
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return oauth2Client;
  } catch (error) {
    console.log(error, "Error setting OAuth2 client credentials");

    return null;
  }
}
