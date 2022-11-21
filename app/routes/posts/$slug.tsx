import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost } from "~/models/post.server";
import type { Project } from "~/models/project.server";
import { getProject } from "~/models/project.server";

type LoaderData = { post: Post; html: string; project: Project | null };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  let project: Project | null = null;

  console.log(post);

  if (post.projectSlug) {
    project = await getProject(post.projectSlug);
  }

  const html = marked(post.markdown);

  return json<LoaderData>({ post, html, project });
};

export default function PostSlug() {
  const { post, html, project } = useLoaderData<LoaderData>();

  console.log({ project });

  return (
    <main>
      <h1>{post.title}</h1>
      {project ? (
        <p>
          <Link to={`/projects/${project.slug}`}>{project.title}</Link>
        </p>
      ) : null}
      {post.projectSlug ? <Link to={post.projectSlug}>Project</Link> : null}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
