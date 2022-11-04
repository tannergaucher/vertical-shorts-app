import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost, upsertPost } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json<LoaderData>({ post, html });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  invariant(typeof title === "string", "title must be a string");

  invariant(typeof slug === "string", "slug must be a string");

  invariant(typeof markdown === "string", "markdown must be a string");

  await upsertPost({
    title,
    slug,
    markdown,
  });

  return redirect(`admin/posts/preview/${slug}`);
};

export default function PostSlug() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>{post.title}</h1>
      <Form method="post">
        <label>
          Title
          <br />
          <input
            name="title"
            type="text"
            defaultValue={post.title}
            className="input"
            style={{ width: `calc(100% - var(--space-md))` }}
          />
        </label>

        <label>
          Slug
          <br />
          <input
            name="slug"
            type="text"
            defaultValue={post.slug}
            className="input"
            style={{ width: `calc(100% - var(--space-md))` }}
          />
        </label>

        <label>
          Markdown
          <br />
          <textarea
            id="markdown"
            name="markdown"
            defaultValue={post.markdown}
            className="textarea"
            style={{ width: `calc(100% - var(--space-md))`, height: `75vh` }}
          ></textarea>
        </label>

        <hr className="hr" />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: `100%` }}
        >
          Preview
        </button>
      </Form>

      <Link to={`/admin/posts/delete/${post.slug}`}>
        <button
          className="btn"
          style={{ width: `100%`, marginBlockStart: `var(--space-lg)` }}
        >
          Delete
        </button>
      </Link>

      <hr className="hr" />
    </main>
  );
}
