import { path as ffmpeg } from "@ffmpeg-installer/ffmpeg";
import type { Storage } from "@google-cloud/storage";
import { exec } from "child_process";
import { createWriteStream } from "fs";

import type { PrismaClient } from "../generated";
import { UploadStatus } from "../generated";
import { UPLOAD_SERVICE_BASE_URL } from "../utils/constants";

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

      throw new Error(err.message);
    })
    .on("finish", async () => {
      console.log("Downloaded video from gcp bucket");

      exec(
        `${ffmpeg} -i ${filePath} -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`,

        async (error) => {
          if (error) {
            console.log("error creating gif", error);
            return;
          }

          await storage
            .bucket(projectId)
            .upload(`${slug}.gif`)
            .then(async () => {
              await prisma.content.update({
                where: {
                  projectId_slug: {
                    projectId,
                    slug,
                  },
                },
                data: {
                  gif: `https://storage.googleapis.com/${projectId}/${slug}.gif`,
                },
              });
            });
        }
      );

      if (content.project.youtubeCredentials) {
        fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            slug,
          }),
        });
      }

      if (content.project.tikTokCredentials) {
        fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            projectId,
            slug,
          }),
        });
      }
    });
}
