import type { PrismaClient } from "../generated";

export interface UpdateContentBody {
  contentId: string;
  bucketUrl?: string;
}

type UpdateContentParams = UpdateContentBody & {
  prisma: PrismaClient;
};

export async function updateContent({
  prisma,
  contentId,
  bucketUrl,
}: UpdateContentParams) {
  const content = await prisma.content.update({
    where: {
      id: contentId,
    },
    data: {
      bucketUrl,
    },
  });

  return {
    message: `Updated content ${content.id}`,
    content,
  };
}
