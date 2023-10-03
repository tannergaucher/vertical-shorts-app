import type { Request, Response } from "express";

import type { PrismaClient } from "../generated";

interface UploadTikTokStatusQueryParams {
  publish_id: string;
  project_id: string;
}

interface UploadTikTokStatusResponse {
  success: boolean;
  message: string;
  status?: any;
}

export async function uploadTikTokStatus(
  req: Request<{}, {}, UploadTikTokStatusQueryParams>,
  res: Response,
  prisma: PrismaClient
): Promise<Response<UploadTikTokStatusResponse>> {
  const { publish_id, project_id } = req.query;

  if (!publish_id || !project_id?.toString()) {
    return res.status(400).send("Missing publish_id or project_id");
  }

  const project = await prisma.project.findUnique({
    where: {
      id: project_id.toString(),
    },
    select: {
      tikTokCredentials: true,
    },
  });

  if (!project?.tikTokCredentials?.accessToken) {
    throw new Error("Missing TikTok access token");
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
        publish_id,
      }),
    }
  );

  if (!statusRes.ok) {
    const { status, statusText } = statusRes;

    const statusFailureResponse: UploadTikTokStatusResponse = {
      success: false,
      message: `Error fetching tiktok upload for project_id: ${project_id} publish_id: ${publish_id} statusText: ${statusText} status: ${status}`,
    };

    return res.status(400).send(statusFailureResponse);
  }

  const statusSuccessResponse: UploadTikTokStatusResponse = {
    success: true,
    message: "Successfully fetched tiktok upload status",
    status: await statusRes.json(),
  };

  return res.status(200).send(statusSuccessResponse);
}
