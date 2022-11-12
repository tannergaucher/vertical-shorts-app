import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost, upsertPost } from "~/models/post.server";
import { PostForm } from "~/forms/post-form";

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
      <fieldset>
        <legend>Edit Post</legend>
        <PostForm post={post} submitText="Preview Post" />
      </fieldset>
      <hr />
      {post.published ? (
        <>
          <fieldset>
            <legend>This post is published</legend>
            <Link to={`/admin/posts/set-to-draft/${post.slug}`}>
              <button style={{ width: `100%`, textAlign: `left` }}>
                Set to Draft
              </button>
            </Link>
          </fieldset>
          <hr />
        </>
      ) : null}
      <fieldset>
        <legend>Ready to let go?</legend>
        <Link to={`/admin/posts/delete/${post.slug}`}>
          <button style={{ width: `100%`, textAlign: `left` }}>
            Delete This Post
          </button>
        </Link>
      </fieldset>
    </main>
  );
}
