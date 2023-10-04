import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import type { Storage } from "@google-cloud/storage";
import { createWriteStream } from "fs";
import { compact } from "lodash";

import type { PrismaClient } from "../generated";
import { UploadStatus } from "../generated";
import { UPLOAD_SERVICE_BASE_URL } from "../utils/constants";
import { createContentGif } from "./create-content-gif";

export interface UploadContentBody {
  projectId: string;
  slug: string;
}

type UploadContentParams = UploadContentBody & {
  prisma: PrismaClient;
  storage: Storage;
};

export async function uploadContent({
  projectId,
  slug,
  prisma,
  storage,
}: UploadContentParams) {
  const content = await prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      project: {
        select: {
          youtubeCredentials: true,
          tikTokCredentials: true,
        },
      },
    },
  });

  const filePath = `${slug}.mp4`;

  storage
    .bucket(projectId)
    .file(filePath)
    .createReadStream()
    .pipe(createWriteStream(filePath))
    .on("open", async () => {
      console.log(`Downloading started from gcp bucket ${projectId}/${slug}`);

      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: content.project.youtubeCredentials
            ? UploadStatus.INITIALIZING
            : undefined,
          tikTokStatus: content.project.tikTokCredentials
            ? UploadStatus.INITIALIZING
            : undefined,
        },
      });
    })
    .on("error", async (err) => {
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
          tikTokStatus: UploadStatus.NOT_STARTED,
        },
      });

      throw new Error(`Error downloading from gcp bucket, ${err.message}`);
    })
    .on("finish", async () => {
      console.log("Downloaded video from gcp bucket");

      const socialChannels = compact([
        content.project.youtubeCredentials
          ? fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                projectId,
                slug,
              }),
            })
          : undefined,
        content.project.tikTokCredentials
          ? fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                projectId,
                slug,
              }),
            })
          : undefined,
      ]);

      await Promise.all([
        socialChannels.map((socialChannel) => socialChannel),
        createContentGif({
          projectId,
          slug,
          storage,
          prisma,
          ffmpegPath,
        }),
      ]);
    });

  return {
    message: `Uploaded content to social channels!  projectId:${projectId} slug:${slug}`,
  };
}
