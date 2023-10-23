import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import type { Storage } from "@google-cloud/storage";
import { exec } from "child_process";

import type { PrismaClient } from "../generated";

interface CreateGifParams {
  projectId: string;
  slug: string;
  storage: Storage;
  prisma: PrismaClient;
}

export async function createContentGif({
  projectId,
  slug,
  storage,
  prisma,
}: CreateGifParams) {
  const gifFile = `${slug}.gif`;
  const gifStoragePath = `https://storage.googleapis.com/${projectId}/${slug}.gif`;

  exec(
    `${ffmpegPath} -i ${slug}.mp4 -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`,

    async (error) => {
      if (error) {
        console.log(`Error`, error);
        throw new Error(`ffmpeg error creating ${gifFile}`);
      }

      await storage
        .bucket(projectId)
        .upload(gifFile)
        .then(async () => {
          await prisma.content.update({
            where: {
              projectId_slug: {
                projectId,
                slug,
              },
            },
            data: {
              gif: gifStoragePath,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          throw new Error(`Error uploading ${gifFile} to ${gifStoragePath}`);
        });
    }
  );

  return {
    message: `Created Gif for ${projectId} / ${slug}`,
  };
}
