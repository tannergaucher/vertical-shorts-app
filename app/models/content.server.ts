import { prisma } from "~/db.server";

import type { Content } from "@prisma/client";
export type { Content };

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

export async function getContents(params: { projectId: string }) {
  const { projectId } = params;

  return prisma.content.findMany({
    where: {
      projectId,
    },
  });
}

interface UpsertContentParams {
  projectId: string;
  slug: string;
  title?: string;
  description?: string | null;
  published?: boolean | null;
  tags?: string[];
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
