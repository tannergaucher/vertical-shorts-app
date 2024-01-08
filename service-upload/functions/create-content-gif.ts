import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import type { Storage } from "@google-cloud/storage";
import { exec } from "child_process";

import type { PrismaClient } from "../generated";

export interface CreateContentGifBody {
  contentId: string;
  projectId: string;
}

type CreateGifParams = CreateContentGifBody & {
  storage: Storage;
  prisma: PrismaClient;
};

export async function createContentGif({
  projectId,
  contentId,
  storage,
  prisma,
}: CreateGifParams) {
  const gifFile = `${contentId}.gif`;
  const gifStoragePath = `https://storage.googleapis.com/${projectId}/${gifFile}`;

  exec(
    `${ffmpegPath} -i ${contentId}.mp4 -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${gifFile}`,

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
              id: contentId,
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
    message: `Uploaded ${gifFile} url to ${gifStoragePath}`,
  };
}
