import { prisma } from "~/db.server";

import type { Post } from "@prisma/client";
export type { Post };

export async function getDraftPosts() {
  return prisma.post.findMany({
    where: {
      published: false,
    },
  });
}

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

export async function deletePost(slug: string) {
  return prisma.post.delete({ where: { slug } });
}

export async function upsertPost(
  post: Pick<Post, "slug" | "title" | "markdown">
) {
  return prisma.post.upsert({
    where: {
      slug: post.slug,
    },
    create: {
      slug: post.slug,
      title: post.title,
      markdown: post.markdown,
    },
    update: {
      title: post.title,
      markdown: post.markdown,
    },
  });
}

export async function publishPost(postSlug: string) {
  return prisma.post.update({
    where: {
      slug: postSlug,
    },
    data: {
      published: true,
    },
  });
}

export async function setToDraft(postSlug: string) {
  return prisma.post.update({
    where: {
      slug: postSlug,
    },
    data: {
      published: false,
    },
  });
}
