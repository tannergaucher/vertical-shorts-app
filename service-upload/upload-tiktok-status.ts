import type { Request, Response } from "express";

import { prisma } from "./index";

interface UploadTikTokStatusQueryParams {
  publish_id: string;
  project_id: string;
}

export async function uploadTikTokStatus(
  req: Request<{}, {}, UploadTikTokStatusQueryParams>,
  res: Response
): Promise<Response> {
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

    return res.status(status).send(statusText);
  }

  return res.status(200).send(await statusRes.json());
}
