import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, Form } from "@remix-run/react";
import { marked } from "marked";

import type { Post } from "~/models/post.server";
import { getPost, deletePost } from "~/models/post.server";

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
  const postSlug = formData.get("postSlug");

  invariant(typeof postSlug === "string", "postSlug must be a string");

  await deletePost(postSlug);

  return redirect("/admin/posts");
};

export default function PostDelete() {
  const { post, html } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>You are about to delete this post</h1>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <fieldset>
        <legend>
          Are you sure you want to delete this post? This action cannot be
          undone.
        </legend>
        <Form method="post">
          <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
            Delete This Post
          </button>
          <input type="hidden" name="postSlug" value={post.slug} />
        </Form>
      </fieldset>
    </main>
  );
}
