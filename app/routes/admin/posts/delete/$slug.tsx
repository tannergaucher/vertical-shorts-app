import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import { useLoaderData, Form } from "@remix-run/react";

import type { Post } from "~/models/post.server";
import { getPost, deletePost } from "~/models/post.server";

type LoaderData = { post: Post };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);

  invariant(post, `Post not found: ${params.slug}`);

  return json<LoaderData>({ post });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const postSlug = formData.get("postSlug");

  invariant(typeof postSlug === "string", "postSlug must be a string");

  await deletePost(postSlug);

  return json;
};

export default function PostDelete() {
  const { post } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Are you sure that you want to delete this post?</h1>
      <h2>{post.title}</h2>
      <Form method="post">
        <button type="submit" className="btn btn-primary">
          Delete
        </button>
        <input type="hidden" name="postSlug" value={post.slug} />
      </Form>
    </main>
  );
}
