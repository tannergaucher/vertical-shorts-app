import type { Content as ContentModel } from "@prisma/client";

import { prisma } from "~/db.server";

export type Content = Omit<
  ContentModel,
  | "createdAt"
  | "updatedAt"
  | "youtubePublishAt"
  | "tikTokPublishAt"
  | "instagramPublishAt"
  | "facebookPublishAt"
  | "twitterPublishAt"
> & {
  createdAt: string | null;
  updatedAt: string | null;
  youtubePublishAt: string | null;
  tikTokPublishAt: string | null;
  instagramPublishAt: string | null;
  facebookPublishAt: string | null;
  twitterPublishAt: string | null;
};

export async function getContent(params: { id: string }) {
  const { id } = params;

  return prisma.content.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      project: {
        include: {
          user: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

export async function getContents(params: {
  projectId: string;
}): Promise<Content[]> {
  const { projectId } = params;

  const content = await prisma.content.findMany({
    where: {
      projectId,
    },
  });

  return content.map((content) => ({
    ...content,
    createdAt: content.createdAt?.toISOString() || null,
    updatedAt: content.updatedAt?.toISOString() || null,
    youtubePublishAt: content.youtubePublishAt?.toISOString() || null,
    tikTokPublishAt: content.tikTokPublishAt?.toISOString() || null,
    instagramPublishAt: content.instagramPublishAt?.toISOString() || null,
    facebookPublishAt: content.facebookPublishAt?.toISOString() || null,
    twitterPublishAt: content.twitterPublishAt?.toISOString() || null,
  }));
}

interface UpsertContentParams {
  id: string;
  projectId: string;
  title?: string;
  description?: string | null;
  tags?: string[];
  thumbnail?: string | null;
  bucketUrl?: string | null;
  youtubePublishAt?: Date | null;
  tikTokPublishAt?: Date | null;
  instagramPublishAt?: Date | null;
  facebookPublishAt?: Date | null;
  twitterPublishAt?: Date | null;
}

export async function upsertContent(content: UpsertContentParams) {
  return await prisma.content.upsert({
    where: {
      id: content.id,
    },
    create: {
      id: content.id,
      projectId: content.projectId,
      title: content.title || "Untitled Content",
      youtubeStatus: content.youtubePublishAt ? "SCHEDULED" : undefined,
      tikTokStatus: content.tikTokPublishAt ? "SCHEDULED" : undefined,
      bucketUrl: content.bucketUrl,
    },
    update: {
      ...content,
      youtubeStatus: content.youtubePublishAt ? "SCHEDULED" : undefined,
      tikTokStatus: content.tikTokPublishAt ? "SCHEDULED" : undefined,
    },
    include: {
      project: {
        include: {
          youtubeCredentials: true,
          tikTokCredentials: true,
        },
      },
    },
  });
}

export async function deleteContent(params: { id: string }) {
  const { id } = params;

  return prisma.content.delete({
    where: {
      id,
    },
  });
}
