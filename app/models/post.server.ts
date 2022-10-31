import { prisma } from "~/db.server";

import type { Post } from "@prisma/client";
export type { Post };

export async function getPublishedPosts() {
  return prisma.post.findMany({
    where: {
      published: true,
    },
  });
}

export async function getPosts() {
  return prisma.post.findMany();
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function createPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.create({ data: post });
}

export async function upsertPost(
  post: Pick<Post, "slug" | "title" | "markdown" | "projectSlug">
) {
  return prisma.post.upsert({
    where: {
      slug: post.slug,
    },
    create: {
      slug: post.slug,
      title: post.title,
      markdown: post.markdown,
      projectSlug: post.projectSlug,
    },
    update: {
      title: post.title,
      markdown: post.markdown,
      projectSlug: post.projectSlug,
    },
  });
}

export async function publishPost(post: Pick<Post, "slug" | "published">) {
  return prisma.post.update({
    where: {
      slug: post.slug,
    },
    data: {
      published: post.published,
    },
  });
}

// write a function to get draft posts
export async function getDraftPosts() {
  return prisma.post.findMany({
    where: {
      published: false,
    },
  });
}
