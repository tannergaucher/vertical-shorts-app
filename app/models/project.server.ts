import type { Channel, Project } from "@prisma/client";

import { prisma } from "~/db.server";

export type ProjectWithChannels = Project & {
  channels: Channel[];
};

export async function getProject({
  id,
}: {
  id: string;
}): Promise<ProjectWithChannels> {
  const project = await prisma.project.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      channels: true,
    },
  });

  return {
    ...project,
    channels: project.channels.map((channel) => ({
      ...channel,
    })),
  };
}
