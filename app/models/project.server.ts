import { type Project } from "@prisma/client";

import { prisma } from "~/db.server";

export { Project };

export async function createProject({
  userId,
  title,
}: {
  userId: string;
  title: string;
}) {
  const project = await prisma.project.create({
    data: {
      title,
      userId,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentProjectId: project.id,
    },
  });

  return project;
}

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

export async function getProjects({ userId }: { userId: string }) {
  const projects = await prisma.project.findMany({
    where: {
      userId,
    },
  });

  return projects.map((project) => ({
    ...project,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
  }));
}
