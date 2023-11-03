import { type Project } from "@prisma/client";

import { prisma } from "~/db.server";

export { Project };

export async function getProject({ id }: { id: string }) {
  const project = await prisma.project.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      channels: true,
      youtubeCredentials: true,
      tikTokCredentials: true,
    },
  });

  return project;
}
