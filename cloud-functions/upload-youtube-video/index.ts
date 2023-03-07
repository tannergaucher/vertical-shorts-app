import * as functions from "@google-cloud/functions-framework";
import * as fs from "fs";
import { Storage } from "@google-cloud/storage";
import { google } from "googleapis";
import invariant from "tiny-invariant";

import { PrismaClient } from "./generated";
import {
  createYoutubeVideoFilename,
  downloadGcsVideoToLocalMemory,
} from "../../app/utils/gcs";
import { UploadVideoEvent } from "../types";

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

export async function uploadYoutubeVideo(params: {
  slug: string;
  projectId: string;
}) {
  try {
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

    const currentProject = await prisma.project.findUnique({
      where: {
        id: user.currentProjectId,
      },
      select: {
        youtubeCredentials: true,
      },
    });

    invariant(currentProject?.youtubeCredentials, "NO_YOUTUBE_CREDENTIALS");

    const videoFilePath = createYoutubeVideoFilename({
      slug: content.slug,
    });

    await downloadGcsVideoToLocalMemory({
      storage,
      videoFilePath,
      bucket: user.currentProjectId,
    });

    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URL
    );

    oauth2Client.setCredentials({
      access_token: currentProject.youtubeCredentials.accessToken,
      refresh_token: currentProject.youtubeCredentials.refreshToken,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    await youtube.videos.insert(
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
          body: fs.createReadStream(videoFilePath),
        },
      },
      {
        onUploadProgress: (evt) => {
          const progress = (evt.bytesRead / evt.contentLength) * 100;
          console.log(`${Math.round(progress)}% complete`);
        },
      }
    );

    fs.unlinkSync(videoFilePath);
  } catch (error) {
    console.log(error, "error");
    throw new Error("ERROR_UPLOADING_YOUTUBE_VIDEO");
  }
}

uploadYoutubeVideo({
  slug: "function-test",
  projectId: "cleo5p6rd00019gxqsgtxiej9",
});
