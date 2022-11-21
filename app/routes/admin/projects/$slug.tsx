import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { marked } from "marked";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Project } from "~/models/project.server";
import { getProject, upsertProject } from "~/models/project.server";
import { ProjectForm } from "~/forms/project-form";

type LoaderData = { project: Project; html: string };

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

  invariant(typeof title === "string", "title must be a string");

  invariant(typeof slug === "string", "slug must be a string");

  invariant(typeof markdown === "string", "markdown must be a string");

  await upsertProject({
    title,
    slug,
    markdown,
  });

  return redirect(`admin/projects/preview/${slug}`);
};

export default function Page() {
  const { project } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>{project.title}</h1>
      <fieldset>
        <legend>Edit Project</legend>
        <ProjectForm project={project} submitText="Preview Project" />
      </fieldset>
      <hr />
      {project.published ? (
        <>
          <fieldset>
            <legend>This project is published</legend>
            <Link to={`/admin/projects/set-to-draft/${project.slug}`}>
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
        <Link to={`/admin/projects/delete/${project.slug}`}>
          <button style={{ width: `100%`, textAlign: `left` }}>
            Delete This Project
          </button>
        </Link>
      </fieldset>
    </main>
  );
}
