import type { PrismaClient } from "../generated";
import { APP_BASE_URL } from "../utils/constants";

export interface UploadTikTokBody {
  contentId: string;
}

type UploadTiktokParams = UploadTikTokBody & {
  prisma: PrismaClient;
};

export async function uploadTikTok({ contentId, prisma }: UploadTiktokParams) {
  const content = await prisma.content.findUniqueOrThrow({
    where: {
      id: contentId,
    },
    select: {
      project: {
        select: {
          id: true,
          tikTokCredentials: true,
        },
      },
    },
  });

  if (!content.project.tikTokCredentials) {
    throw new Error("Missing TikTok credentials");
  }

  console.log(`Starting upload to ${contentId} to tiktok`);

  await prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      tikTokStatus: "UPLOADING",
    },
  });

  const res = await fetch(
    `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${content.project.tikTokCredentials.accessToken}`,
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        source: "PULL_FROM_URL",
        video_url: `${APP_BASE_URL}/resource/serve-video/${content.project.id}/${contentId}`,
      }),
    }
  );

  if (!res.ok) {
    await prisma.content.update({
      where: {
        id: contentId,
      },
      data: {
        tikTokStatus: "NOT_STARTED",
      },
    });

    throw new Error(`Error initializing TikTok upload for ${contentId}`);
  }

  return {
    message: `Initialized TikTok upload for ${contentId}`,
  };
}
