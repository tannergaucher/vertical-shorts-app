import type { Request, Response } from "express";
import { createReadStream } from "fs";
import { google } from "googleapis";

import type { PrismaClient } from "../generated";
import { UploadStatus } from "../generated";

interface UploadYoutubeShortRequest {
  projectId: string;
  slug: string;
}

interface UploadYoutubeShortResponse {
  success: boolean;
  message: string;
}

export async function uploadYouTubeShort(
  req: Request<{}, {}, UploadYoutubeShortRequest>,
  res: Response,
  prisma: PrismaClient
): Promise<Response<UploadYoutubeShortResponse>> {
  const { projectId, slug } = req.body;

  const content = await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      title: true,
      description: true,
      tags: true,
    },
    data: {
      youtubeStatus: UploadStatus.UPLOADING,
    },
  });

  const project = await prisma.project.findUnique({
    where: {
      id: req.body.projectId,
    },
    select: {
      youtubeCredentials: true,
    },
  });

  if (
    !project?.youtubeCredentials?.accessToken ||
    !project?.youtubeCredentials?.refreshToken
  ) {
    throw new Error("No youtube credentials found");
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

  const filePath = `${slug}.mp4`;

  const bodyStream = createReadStream(filePath);

  await prisma.content.update({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    data: {
      youtubeStatus: UploadStatus.UPLOADING,
    },
  });

  console.log(`Upload started for video ${projectId} / ${slug}`);

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
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.PRIVATE,
          youtubeId: response.data.id,
        },
      });

      const uploadFinishedResponse: UploadYoutubeShortResponse = {
        success: true,
        message: `Finished Uploading ${content.title} : ${projectId}/${slug} to YouTube`,
      };

      return res.status(200).json(uploadFinishedResponse);
    })

    .catch(async (error) => {
      console.log(error);
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
        },
      });

      const uploadFailureResponse: UploadYoutubeShortResponse = {
        success: false,
        message: `Failed Uploading ${content.title} : ${projectId}/${slug} to YouTube`,
      };

      return res.status(400).json(uploadFailureResponse);
    });
}
