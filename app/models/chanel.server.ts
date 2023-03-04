import { prisma } from "~/db.server";

import type { Channel, IntegrationType } from "@prisma/client";
export type { Channel };

export async function getChannel(params: {
  projectId: string;
  integration: IntegrationType;
}) {
  const { projectId, integration } = params;

  return prisma.channel.findUnique({
    where: {
      projectId_integration: {
        projectId,
        integration,
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
