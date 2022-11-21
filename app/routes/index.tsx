import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getPublishedPosts } from "~/models/post.server";
import { getPublishedProjects } from "~/models/project.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPublishedPosts>>;
  projects: Awaited<ReturnType<typeof getPublishedProjects>>;
};

export const loader = async () => {
  return json<LoaderData>({
    posts: await getPublishedPosts(),
    projects: await getPublishedProjects(),
  });
};

export default function Index() {
  const { posts, projects } = useLoaderData<LoaderData>();

  return (
    <main>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`posts/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
