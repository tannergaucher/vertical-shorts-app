import type { LoaderFunction, ActionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import { Form } from "@remix-run/react";
import { json } from "@remix-run/node";

import { deletePost } from "~/models/post.server";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  await deletePost(params.slug);

  return json;
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const postId = formData.get("postId");
  invariant(typeof postId === "string", `postd is required`);

  await deletePost(postId);

  return json({ postId });
}

export default function PostDeleteForm(props: { postId: string }) {
  const { postId } = props;

  return (
    <main>
      <h1>Are you sure that you want to delete this post?</h1>
      <Form method="post">
        <input type="hidden" name="postId" value={postId} />
        <button type="submit">Delete Post</button>
      </Form>
    </main>
  );
}
