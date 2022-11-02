import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deletePost } from "~/models/post.server";

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  await deletePost(params.slug);

  return redirect(`/admin/posts`);
};

export default function PostDelete() {
  return null;
}
