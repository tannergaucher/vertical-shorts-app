import type { PrismaClient } from "../generated";

export interface UploadTikTokStatusQueryParams {
  project_id: string;
  publish_id: string;
}

interface UploadTiktokStatusParams {
  prisma: PrismaClient;
  projectId: string;
  publishId: string;
}

export async function uploadTikTokStatus({
  prisma,
  projectId,
  publishId,
}: UploadTiktokStatusParams) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      tikTokCredentials: true,
    },
  });

  if (!project?.tikTokCredentials?.accessToken) {
    throw new Error(`Missing TikTok access token for project ${projectId}`);
  }

  const res = await fetch(
    "https://open.tiktokapis.com/v2/post/publish/status/fetch/",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${project.tikTokCredentials.accessToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        publish_id: publishId,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Error fetching tiktok status publish_id ${publishId}`);
  }

  return {
    message: `Status for publish_id ${publishId}`,
    json: res.json(),
  };
}
