import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Post } from "~/models/post.server";
import { getPost, upsertPost } from "~/models/post.server";
import type { Project } from "~/models/project.server";
import { getProjects } from "~/models/project.server";

type LoaderData = { post: Post; html: string; projects: Project[] };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const post = await getPost(params.slug);
  invariant(post, `Post not found: ${params.slug}`);

  const html = marked(post.markdown);

  const projects = await getProjects();

  return json<LoaderData>({ post, html, projects });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const markdown = formData.get("markdown");
  const slug = formData.get("slug");
  const projectSlug = formData.get("projectSlug");

  console.log("slug", slug);

  invariant(typeof title === "string", "title must be a string");

  invariant(typeof slug === "string", "slug must be a string");

  invariant(typeof markdown === "string", "markdown must be a string");

  invariant(typeof projectSlug === "string", "slug must be a string");

  await upsertPost({
    title,
    markdown,
    slug: encodeURIComponent(title),
    projectSlug,
  });

  return redirect(`admin/posts/preview/${slug}`);
};

export default function PostSlug() {
  const { post, projects } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>{post.title}</h1>
      <Form method="post">
        <label>
          Title
          <br />
          <input
            name="title"
            type="text"
            defaultValue={post.title}
            className="input"
            style={{ width: `calc(100% - var(--space-md))` }}
          />
        </label>

        <label htmlFor="">
          Project
          <br />
          <select name="projectSlug" id="project" className="select">
            {projects.map((project) => {
              return (
                <option key={project.slug} value={project.slug}>
                  {project.title}
                </option>
              );
            })}
          </select>
        </label>

        <label>
          Markdown
          <br />
          <textarea
            id="markdown"
            name="markdown"
            defaultValue={post.markdown}
            className="textarea"
            style={{ width: `calc(100% - var(--space-md))`, height: `50vh` }}
          ></textarea>
        </label>

        <br />

        <button
          type="submit"
          className="btn btn-primary"
          style={{ width: `calc(100% - var(--space-md))` }}
        >
          Preview Post
        </button>
      </Form>
    </main>
  );
}
