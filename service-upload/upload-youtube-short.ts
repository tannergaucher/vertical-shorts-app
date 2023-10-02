import type { Request, Response } from "express";
import { createReadStream } from "fs";
import { google } from "googleapis";

import { UploadStatus } from "./generated";
import { prisma } from "./index";

interface UploadYoutubeContentBody {
  projectId: string;
  slug: string;
}

export async function uploadYouTubeShort(
  req: Request<{}, {}, UploadYoutubeContentBody>,
  res: Response
): Promise<Response> {
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

  res.status(200).send("Starting upload to youtube");

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
      console.log(`Upload ${content.title} to YouTube response`, response);

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

      return res
        .status(200)
        .send(`Uploaded ${content.title} to youtube | ${projectId}/${slug}`);
    })
    .catch(async (error) => {
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

      console.log("Youtube Upload Error", error);

      return res.status(400).send("Error uploading video to youtube:");
    });
}
