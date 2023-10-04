import type { Storage } from "@google-cloud/storage";
import { exec } from "child_process";

import type { PrismaClient } from "../generated";

interface CreateGifParams {
  projectId: string;
  slug: string;
  ffmpegPath: string;
  storage: Storage;
  prisma: PrismaClient;
}

export async function createContentGif({
  projectId,
  slug,
  ffmpegPath,
  storage,
  prisma,
}: CreateGifParams) {
  exec(
    `${ffmpegPath} -i ${slug}.mp4 -vf "fps=31,scale=640:-1:flags=lanczos" -b:v 5000k -y -t 3 ${slug}.gif`,

    async (error) => {
      if (error) {
        console.log(`Error creating gif ${projectId} $${slug}`, error);
        throw new Error("Error creating gif");
      }

      const cloudStoragePath = `https://storage.googleapis.com/${projectId}/${slug}.gif`;

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
              gif: cloudStoragePath,
            },
          });
        })
        .catch((error) => {
          console.log(error);
          throw new Error(`Error saving cloudStorage path ${cloudStoragePath}`);
        });
    }
  );

  return {
    success: true,
    message: `Created Gif for ${projectId} / ${slug}`,
  };
}
