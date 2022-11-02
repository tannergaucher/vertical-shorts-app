import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { createPost } from "~/models/post.server";

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  await createPost({ title, slug, markdown });

  return redirect(`/admin/posts/preview/${slug}`);
};

export default function NewPost() {
  const errors = useActionData();

  return (
    <Form method="post">
      <p>
        <label>
          Post Title{" "}
          {errors?.title ? (
            <em className="warning-text">{errors.title}</em>
          ) : null}
          <br />
          <input
            type="text"
            name="title"
            className="input"
            style={{ width: `calc(100% - var(--space-md))` }}
          />
        </label>
      </p>
      <p>
        <label>
          Post Slug{" "}
          {errors?.slug ? (
            <em className="warning-text">{errors.slug}</em>
          ) : null}
          <br />
          <input
            type="text"
            name="slug"
            className="input"
            style={{ width: `calc(100% - var(--space-md))` }}
          />
        </label>
      </p>
      <p>
        <label htmlFor="markdown">
          Post Markdown
          {errors?.markdown ? (
            <em className="warning-text">{errors.markdown}</em>
          ) : null}
        </label>
        <br />
        <textarea
          id="markdown"
          rows={20}
          name="markdown"
          className="textarea"
          style={{ width: `calc(100% - var(--space-md))` }}
        />
      </p>
      <p className="text-right">
        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: `100%` }}
        >
          Create Post
        </button>
      </p>
    </Form>
  );
}
