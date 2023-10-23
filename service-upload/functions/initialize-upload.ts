import type { Storage } from "@google-cloud/storage";
import { createWriteStream } from "fs";
import { compact } from "lodash";

import { type PrismaClient, UploadStatus } from "../generated";
import { ServiceUploadRoutes } from "../routes";
import { SERVICE_UPLOAD_BASE_URL } from "../utils/constants";
import { createContentGif } from "./create-content-gif";

export interface InitializeUploadBody {
  projectId: string;
  slug: string;
}

type InitializeUploadParams = InitializeUploadBody & {
  prisma: PrismaClient;
  storage: Storage;
};

export async function initializeUpload({
  projectId,
  slug,
  prisma,
  storage,
}: InitializeUploadParams) {
  const content = await prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
    select: {
      slug: true,
      project: {
        select: {
          youtubeCredentials: true,
          tikTokCredentials: true,
        },
      },
    },
  });

  const filePath = `${content.slug}.mp4`;

  storage
    .bucket(projectId)
    .file(filePath)
    .createReadStream()
    .pipe(createWriteStream(filePath))
    .on("open", async () => {
      console.log(
        `Downloading ${filePath} from bucket ${projectId}/${content.slug}`
      );

      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug: content.slug,
          },
        },
        data: {
          youtubeStatus: content.project.youtubeCredentials
            ? UploadStatus.INITIALIZING
            : undefined,
          tikTokStatus: content.project.tikTokCredentials
            ? UploadStatus.INITIALIZING
            : undefined,
        },
      });
    })
    .on("error", async (err) => {
      await prisma.content.update({
        where: {
          projectId_slug: {
            projectId,
            slug,
          },
        },
        data: {
          youtubeStatus: UploadStatus.NOT_STARTED,
          tikTokStatus: UploadStatus.NOT_STARTED,
        },
      });

      throw new Error(`Error downloading from gcp bucket, ${err.message}`);
    })
    .on("finish", async () => {
      const contentProjectRequests = compact([
        content.project.youtubeCredentials
          ? fetch(
              `${SERVICE_UPLOAD_BASE_URL}/${ServiceUploadRoutes.UploadYoutubeShort}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  projectId,
                  slug,
                }),
              }
            )
          : undefined,
        content.project.tikTokCredentials
          ? fetch(
              `${SERVICE_UPLOAD_BASE_URL}/${ServiceUploadRoutes.UploadTiktok}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  projectId,
                  slug,
                }),
              }
            )
          : undefined,
      ]);

      await Promise.all([
        contentProjectRequests.map(
          (contentProjectRequest) => contentProjectRequest
        ),
        createContentGif({
          projectId,
          slug,
          storage,
          prisma,
        }),
      ]);
    });

  return {
    message: `Uploaded projectId: ${projectId} slug: ${slug} to social channels`,
  };
}
