import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getPublishedPosts, getDraftPosts } from "~/models/post.server";
import {
  getPublishedProjects,
  getDraftProjects,
} from "~/models/project.server";

type LoaderData = {
  publishedPosts: Awaited<ReturnType<typeof getPublishedPosts>>;
  draftPosts: Awaited<ReturnType<typeof getDraftPosts>>;
  publishedProjects: Awaited<ReturnType<typeof getPublishedProjects>>;
  draftProjects: Awaited<ReturnType<typeof getDraftProjects>>;
};

export const loader = async () => {
  return json<LoaderData>({
    publishedPosts: await getPublishedPosts(),
    draftPosts: await getDraftPosts(),
    publishedProjects: await getPublishedProjects(),
    draftProjects: await getDraftProjects(),
  });
};

export default function Page() {
  const { publishedPosts, draftPosts, publishedProjects, draftProjects } =
    useLoaderData<LoaderData>();
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
      <fieldset>
        <legend>Create a new post?</legend>
        <Link to="posts/new">
          <button>New Post</button>
        </Link>
      </fieldset>
      <hr />
      <h2>Published Projects</h2>
      <ul>
        {publishedProjects.map((project) => (
          <li key={project.slug}>
            <Link to={`projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Draft Projects</h2>
      <ul>
        {draftProjects.map((project) => (
          <li key={project.slug}>
            <Link to={`projects/${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
      <fieldset>
        <legend>Create a new project?</legend>
        <Link to="projects/new">
          <button>New Project</button>
        </Link>
      </fieldset>
      <hr />
    </main>
  );
}
