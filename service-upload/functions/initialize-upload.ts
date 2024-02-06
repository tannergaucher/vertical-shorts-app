import type { Storage } from "@google-cloud/storage";
import { createWriteStream } from "fs";

import { type PrismaClient, UploadStatus } from "../generated";
import { ServiceUploadRoutes } from "../routes";
import { SERVICE_UPLOAD_BASE_URL } from "../utils/constants";
import type { UploadTikTokBody } from "./upload-tiktok";
import type { UploadYoutubeShortBody } from "./upload-youtube-short";

export interface InitializeUploadBody {
  projectId: string;
  contentId: string;
}

type InitializeUploadParams = InitializeUploadBody & {
  prisma: PrismaClient;
  storage: Storage;
};

export async function initializeUpload({
  projectId,
  contentId,
  prisma,
  storage,
}: InitializeUploadParams) {
  const content = await prisma.content.findUniqueOrThrow({
    where: {
      id: contentId,
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

  const bucketPath = `${projectId}/${contentId}`;
  const videoPath = `${contentId}.mp4`;

  storage
    .bucket(projectId)
    .file(videoPath)
    .createReadStream()
    .pipe(createWriteStream(videoPath))
    .on("open", async () => {
      console.log(`Downloading ${videoPath} from ${bucketPath}`);

      await prisma.content.update({
        where: {
          id: contentId,
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
    .on("finish", async () => {
      if (content.project.youtubeCredentials) {
        fetch(
          `${SERVICE_UPLOAD_BASE_URL}${ServiceUploadRoutes.UploadYoutubeShort}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              projectId,
              contentId,
            } as UploadYoutubeShortBody),
          }
        );
      }

      if (content.project.tikTokCredentials) {
        fetch(`${SERVICE_UPLOAD_BASE_URL}${ServiceUploadRoutes.UploadTiktok}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            contentId,
          } as UploadTikTokBody),
        });
      }
    })
    .on("error", async (err) => {
      await prisma.content.update({
        where: {
          id: contentId,
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
          tikTokStatus: UploadStatus.NOT_STARTED,
        },
      });

      throw new Error(`Error downloading from ${bucketPath}, ${err.message}`);
    });

  return {
    message: `Uploaded ${projectId} / ${contentId} to social channels`,
  };
}
