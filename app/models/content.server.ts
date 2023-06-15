import type { Content as ContentModel } from "@prisma/client";

import { prisma } from "~/db.server";

export type Content = Omit<
  ContentModel,
  "createdAt" | "updatedAt" | "publishAt"
> & {
  createdAt: string | null;
  updatedAt: string | null;
  publishAt: string | null;
};

export async function getContent(params: { slug: string; projectId: string }) {
  const { slug, projectId } = params;

  return prisma.content.findUniqueOrThrow({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
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
    publishAt: content.publishAt?.toISOString() || null,
  }));
}

interface UpsertContentParams {
  slug: string;
  projectId: string;
  title?: string;
  description?: string | null;
  published?: boolean | null;
  publishAt?: Date | null;
  tags?: string[];
  thumbnail?: string | null;
}

export async function upsertContent(content: UpsertContentParams) {
  return prisma.content.upsert({
    where: {
      projectId_slug: {
        projectId: content.projectId,
        slug: content.slug,
      },
    },
    create: {
      slug: content.slug,
      projectId: content.projectId,
      title: content.title || "Untitled Content",
      published: content.published || false,
    },
    update: {
      ...content,
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

export async function deleteContent(params: {
  slug: string;
  projectId: string;
}) {
  const { slug, projectId } = params;

  return prisma.content.delete({
    where: {
      projectId_slug: {
        projectId,
        slug,
      },
    },
  });
}
