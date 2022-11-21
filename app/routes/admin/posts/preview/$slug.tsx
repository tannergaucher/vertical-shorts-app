import { marked } from "marked";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost, publishPost } from "~/models/post.server";

type LoaderData = { post: Post; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Project not found: ${params.slug}`);

  const html = marked(post.markdown);

  return json<LoaderData>({ post, html });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("slug");

  invariant(typeof slug === "string", "slug must be a string");

  await publishPost(slug);

  return redirect(`/admin/posts`);
};

export default function Page() {
  const { post, html } = useLoaderData<LoaderData>();

  const navigate = useNavigate();
  const handleEdit = () => navigate(`/admin/posts/${post.slug}`);

  return (
    <main>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <fieldset>
        <legend>
          Are you sure you want to publish this post? This post is currently a
          draft.
        </legend>
        <Form method="post">
          <button style={{ width: `100%`, textAlign: `left` }}>Publish</button>
          <input type="hidden" name="slug" value={post.slug} />
        </Form>
      </fieldset>
      <hr />
      <fieldset>
        <legend>Go Back</legend>
        <button
          onClick={handleEdit}
          style={{ width: "100%", textAlign: `left` }}
        >
          Edit
        </button>
      </fieldset>
    </main>
  );
}
