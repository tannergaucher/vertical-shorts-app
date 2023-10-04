import type { PrismaClient } from "../generated";

export interface UploadTikTokStatusQueryParams {
  publish_id: string;
  project_id: string;
}

interface UploadTiktokStatusParams {
  publishId: string;
  projectId: string;
  prisma: PrismaClient;
}

export async function uploadTikTokStatus({
  publishId,
  projectId,
  prisma,
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

  const statusRes = await fetch(
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

  if (!statusRes.ok) {
    throw new Error(`Error fetching tiktok status publish_id ${publishId}`);
  }

  return {
    message: `Status for publish_id ${publishId}`,
    statusJson: statusRes.json(),
  };
}
