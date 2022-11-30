import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { PostActionData } from "~/forms/post-form";
import { PostForm } from "~/forms/post-form";
import { createPost } from "~/models/post.server";
import type { Project } from "~/models/project.server";
import {
  getPublishedProjects,
  getDraftProjects,
} from "~/models/project.server";

type LoaderData = { projects: Project[] };

export const loader: ActionFunction = async ({ request }) => {
  const publishedProjects = await getPublishedProjects();
  const draftProjects = await getDraftProjects();

  return json({
    projects: [...publishedProjects, ...draftProjects],
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");
  const projectSlug = formData.get("projectSlug");

  const errors: PostActionData = {
    title: title ? null : "is required",
    slug: slug ? null : "is required",
    markdown: markdown ? null : "is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<PostActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");
  invariant(typeof projectSlug === "string", "projectSlug must be a string");

  await createPost({ title, slug, markdown, projectSlug });

  return redirect(`/admin/posts/preview/${slug}`);
};

export default function Page() {
  const errors = useActionData<PostActionData>();

  const data = useLoaderData<LoaderData>();

  return (
    <fieldset>
      <PostForm
        errors={errors}
        submitText="Create Post"
        projects={data.projects}
      />
    </fieldset>
  );
}
