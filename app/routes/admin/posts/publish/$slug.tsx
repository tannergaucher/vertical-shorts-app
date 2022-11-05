import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, Form } from "@remix-run/react";

import type { Post } from "~/models/post.server";
import { getPost, publishPost } from "~/models/post.server";
import { marked } from "marked";

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

  await publishPost(postSlug);

  return redirect("/admin/posts");
};

export default function PostDelete() {
  const { post, html } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Are you sure that you want to publish this post?</h1>
      <h2>{post.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <fieldset>
        <legend>
          Are you sure you want to publish this post? This post is currently a
          draft.
        </legend>
        <Form method="post">
          <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
            Publish Post
          </button>
          <input type="hidden" name="postSlug" value={post.slug} />
        </Form>
      </fieldset>
      <hr />
      <fieldset>
        <Form method="get" action="/admin/posts">
          <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
            Go Back
          </button>
        </Form>
      </fieldset>
    </main>
  );
}
