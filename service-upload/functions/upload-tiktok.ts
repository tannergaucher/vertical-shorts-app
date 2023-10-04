import type { PrismaClient } from "../generated";
import { APP_BASE_URL } from "../utils/constants";

export interface UploadTikTokBody {
  projectId: string;
  slug: string;
}

interface UploadTiktokParams {
  projectId: string;
  slug: string;
  prisma: PrismaClient;
}

export async function uploadTikTok({
  projectId,
  slug,
  prisma,
}: UploadTiktokParams) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  if (!project?.tikTokCredentials) {
    throw new Error("no tiktok credentials");
  }

  console.log(`Starting upload to tiktok for ${projectId} / ${slug}`);

  const initResponse = await fetch(
    `https://open.tiktokapis.com/v2/post/publish/inbox/video/init/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
        "Content-Type": "application/json;",
      },
      body: JSON.stringify({
        source: "PULL_FROM_URL",
        video_url: `${APP_BASE_URL}/resource/serve-video/${projectId}/${slug}`, // "https://sf16-va.tiktokcdn.com/obj/eden-va2/uvpapzpbxjH-aulauvJ-WV[[/ljhwZthlaukjlkulzlp/3min.mp4",
      }),
    }
  );

  if (!initResponse.ok) {
    console.log(initResponse);

    throw new Error(
      `Error on tiktok initialization request for ${projectId} / ${slug}`
    );
  }

  return {
    message: `Success initializing tiktok upload for ${projectId} / ${slug}`,
    initResponse: initResponse.json(),
  };
}
