import { path as ffmpeg } from "@ffmpeg-installer/ffmpeg";
import type { Storage } from "@google-cloud/storage";
import { exec } from "child_process";
import type { Request, Response } from "express";
import { createWriteStream } from "fs";

import type { PrismaClient } from "../generated";
import { UploadStatus } from "../generated";
import { UPLOAD_SERVICE_BASE_URL } from "../utils/constants";

export interface UploadContentBody {
  slug: string;
  projectId: string;
}

export async function uploadContent(
  req: Request<{}, {}, UploadContentBody>,
  res: Response,
  prisma: PrismaClient,
  storage: Storage
) {
  const { projectId, slug } = req.body;

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
      console.log(`content download started for ${projectId}/${slug}`);
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
    .on("finish", async () => {
      console.log("download finished");

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
        await fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-youtube-short`, {
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
        await fetch(`${UPLOAD_SERVICE_BASE_URL}/upload-tiktok`, {
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
    })
    .on("error", async (err) => {
      console.log(err);

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

      res.status(500).send("Something went wrong!");
    });
}
