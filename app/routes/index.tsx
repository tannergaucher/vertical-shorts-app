import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import styles from "semantic-styles/index.css";

import { getPublishedPosts } from "~/models/post.server";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPublishedPosts>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPublishedPosts(),
  });
};

export default function Index() {
  const { posts } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`posts/${post.slug}`}>
              <h2>{post.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
