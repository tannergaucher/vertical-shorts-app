import { prisma } from "~/db.server";

import type { Project } from "@prisma/client";
export type { Project };

export async function getProjects() {
  return prisma.project.findMany();
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: {
      published: true,
    },
  });
}

export async function getDraftProjects() {
  return prisma.project.findMany({
    where: {
      published: false,
    },
  });
}

export async function getProject(slug: string) {
  return prisma.project.findUnique({ where: { slug } });
}

export async function createProject(
  project: Pick<Project, "title" | "slug" | "markdown">
) {
  return prisma.project.create({ data: project });
}

export async function updateProject(
  project: Pick<Project, "slug" | "title" | "markdown">
) {
  return prisma.project.update({
    where: {
      slug: project.slug,
    },
    data: project,
  });
}

export async function publishProject(projectSlug: string) {
  return prisma.project.update({
    where: {
      slug: projectSlug,
    },
    data: {
      published: true,
    },
  });
}

export async function setToDraft(projectSlug: string) {
  return prisma.project.update({
    where: {
      slug: projectSlug,
    },
    data: {
      published: false,
    },
  });
}

export async function upsertProject(
  project: Pick<Project, "slug" | "title" | "markdown">
) {
  return prisma.project.upsert({
    where: {
      slug: project.slug,
    },
    create: {
      slug: project.slug,
      title: project.title,
      markdown: project.markdown,
    },
    update: {
      title: project.title,
      markdown: project.markdown,
    },
  });
}
