import type { Channel as ChannelModel, ChannelType } from "@prisma/client";

import { prisma } from "~/db.server";

export type Channel = Omit<ChannelModel, "createdAt" | "updatedAt"> & {
  createdAt: string;
  updatedAt: string;
};

export async function getChannel(params: {
  projectId: string;
  channelType: ChannelType;
}) {
  const { projectId, channelType } = params;

  return prisma.channel.findUnique({
    where: {
      projectId_channelType: {
        projectId,
        channelType,
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

export async function getChannels(params: { projectId: string }) {
  const { projectId } = params;

  const channels = await prisma.channel.findMany({
    where: {
      projectId,
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

  return channels;
}
