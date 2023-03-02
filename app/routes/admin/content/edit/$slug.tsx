import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContent, upsertContent } from "~/models/content.server";
import { ContentForm } from "~/forms/content-form";
import { getUser } from "~/session.server";
import { Routes } from "~/routes";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  html?: string;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  invariant(params.slug, "slug is required");

  const user = await getUser(request);

  invariant(user?.currentProjectId, "current project is required");

  const content = await getContent({
    slug: params.slug,
    projectId: user.currentProjectId,
  });

  invariant(content, `Content not found: ${params.slug}`);

  const html = marked(content.markdown || "");

  return json<LoaderData>({ content, html });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("slug");
  const title = formData.get("title");
  const description = formData.get("description");
  const markdown = formData.get("markdown");

  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof title === "string", "title must be a string");
  invariant(typeof description === "string", "description must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  const user = await getUser(request);

  invariant(user?.currentProjectId, "current project is required");

  await upsertContent({
    title,
    slug,
    description,
    markdown,
    thumbnail: undefined,
    video: null,
    tags: [],
    published: true,
    projectId: user.currentProjectId,
  });

  return redirect(Routes.AdminContent(slug));
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  console.log(content, "_content");

  return (
    <main>
      <h1>{content.title}</h1>
      <img
        src={`https://storage.googleapis.com/${content.projectId}/${content.thumbnail}`}
        alt={content.title}
        style={{ width: "100%" }}
      />
      <fieldset>
        <legend>Content</legend>
        <ContentForm content={content} submitText="Update" />
      </fieldset>
    </main>
  );
}
