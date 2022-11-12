import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { PostActionData } from "~/forms/post-form";
import { PostForm } from "~/forms/post-form";
import { createPost } from "~/models/post.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

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

  await createPost({ title, slug, markdown });

  return redirect(`/admin/posts/preview/${slug}`);
};

export default function NewPost() {
  const errors = useActionData<PostActionData>();

  return (
    <fieldset>
      <PostForm errors={errors} submitText="Create Post" />
    </fieldset>
  );
}
