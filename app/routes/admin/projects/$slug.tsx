import { marked } from "marked";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Project } from "~/models/project.server";
import { getProject, updateProject } from "~/models/project.server";

type LoaderData = { project: Project; html: string };

type ActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const project = await getProject(params.slug);
  invariant(project, `Project not found: ${params.slug}`);

  const html = marked(project.markdown);

  return json<LoaderData>({ project, html });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: ActionData = {
    title: title ? null : "Title is required",
    slug: slug ? null : "Slug is required",
    markdown: markdown ? null : "Markdown is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  await updateProject({
    title,
    markdown,
    slug,
  });

  return redirect(`/admin/projects/preview/${slug}`);
};

const inputClassName = `input`;

export default function AdminProjectSlug() {
  const { project } = useLoaderData<LoaderData>();

  const errors = useActionData();

  return (
    <main className="main">
      <h1>{project.title}</h1>
      <Form method="post">
        <p>
          <label className="label">
            Project Title
            <br />
            {errors?.title ? (
              <em className="text-red-600">{errors.title}</em>
            ) : null}
            <input
              type="text"
              name="title"
              className={inputClassName}
              style={{ width: `calc(100% - var(--space-md))` }}
              defaultValue={project.title}
            />
          </label>
        </p>
        <p>
          <label>
            Project Slug
            <br />
            {errors?.slug ? (
              <em className="text-red-600">{errors.slug}</em>
            ) : null}
            <input
              type="text"
              name="slug"
              className={inputClassName}
              style={{ width: `calc(100% - var(--space-md))` }}
              defaultValue={project.slug}
            />
          </label>
        </p>
        <p>
          <label htmlFor="markdown">
            Markdown
            {errors?.markdown ? (
              <em className="text-red-600">{errors.markdown}</em>
            ) : null}
          </label>
          <br />
          <textarea
            id="markdown"
            rows={20}
            name="markdown"
            className="textarea"
            style={{ width: `calc(100% - var(--space-md))` }}
            defaultValue={project.markdown}
          />
        </p>
        <p className="text-right">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: `calc(100% - var(--space-sm))` }}
          >
            Preview
          </button>
        </p>
      </Form>
    </main>
  );
}
