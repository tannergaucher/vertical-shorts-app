import type { Channel, Project } from "@prisma/client";

import { prisma } from "~/db.server";

type UpdatedChannel = Omit<Channel, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

type UpdatedProject = Omit<Project, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export type ProjectWithChannels = UpdatedProject & {
  channels: UpdatedChannel[];
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
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    channels: project.channels.map((channel) => ({
      ...channel,
      createdAt: channel.createdAt.toISOString(),
      updatedAt: channel.updatedAt.toISOString(),
    })),
  };
}
