import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPublishedPosts, getDraftPosts } from "~/models/post.server";

type LoaderData = {
  publishedPosts: Awaited<ReturnType<typeof getPublishedPosts>>;
  draftPosts: Awaited<ReturnType<typeof getDraftPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    publishedPosts: await getPublishedPosts(),
    draftPosts: await getDraftPosts(),
  });
};

export default function Posts() {
  const { publishedPosts, draftPosts } = useLoaderData<LoaderData>();
  return (
    <main>
      <h2>Published Posts</h2>
      <ul>
        {publishedPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Draft Posts</h2>
      <ul>
        {draftPosts.map((post) => (
          <li key={post.slug}>
            <Link to={`posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <br />
      <Link to="posts/new">
        <h2 style={{ marginTop: `var(--space-xl)` }}>New Post</h2>
      </Link>
    </main>
  );
}
