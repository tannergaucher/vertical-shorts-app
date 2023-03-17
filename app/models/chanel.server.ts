import { prisma } from "~/db.server";

import type { Channel, ChannelType } from "@prisma/client";
export type { Channel };

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
