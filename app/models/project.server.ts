import { prisma } from "~/db.server";

import type { Project, Channel } from "@prisma/client";

export type ProjectWithChannels = Project & {
  channels: Channel[];
};

export async function getProject({ id }: { id: string }) {
  const project = await prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      channels: true,
    },
  });

  return project;
}
