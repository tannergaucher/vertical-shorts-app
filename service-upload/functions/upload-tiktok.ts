import type { Request, Response } from "express";

import { UploadStatus } from "../generated";
import { prisma } from "../index";
import { APP_BASE_URL } from "../utils/constants";

interface UploadTikTokBody {
  projectId: string;
  slug: string;
}

interface UploadTikTokResponse {
  success: boolean;
  message: string;
}

export async function uploadTikTok(
  req: Request<{}, {}, UploadTikTokBody>,
  res: Response
): Promise<Response<UploadTikTokResponse>> {
  const { projectId, slug } = req.body;

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

  try {
    res.status(200).send("Starting upload to tiktok");

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
      throw new Error(
        `ERROR_INITIALIZING_TIKTOK_UPLOAD: ${initResponse.statusText}}`
      );
    }

    const { data } = await initResponse.json();

    await prisma.content.update({
      where: {
        projectId_slug: {
          projectId,
          slug,
        },
      },
      data: {
        tikTokStatus: UploadStatus.UPLOADING,
        tikTokId: data.publish_id,
      },
    });

    const response: UploadTikTokResponse = {
      success: true,
      message: "Successfully initialized tiktok upload",
    };

    return res.json(response);
  } catch (error) {
    const errorResponse: UploadTikTokResponse = {
      success: false,
      message: "Error initializing tiktok upload",
    };

    return res.status(500).send(errorResponse);
  }
}
