import { prisma } from "~/db.server";

export async function getProject({ id }: { id: string }) {
  const project = await prisma.project.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      channels: true,
    },
  });

  return project;
}
