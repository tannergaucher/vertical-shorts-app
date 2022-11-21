import { getProject } from "~/models/project.server";
import invariant from "tiny-invariant";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, Form } from "@remix-run/react";
import { marked } from "marked";

import type { Project } from "~/models/project.server";
import { publishProject } from "~/models/project.server";

type LoaderData = { project: Project; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const project = await getProject(params.slug);
  invariant(project, `Project not found: ${params.slug}`);

  const html = marked(project.markdown);

  return json({ project, html });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const slug = formData.get("slug");

  invariant(typeof slug === "string", "slug must be a string");

  await publishProject(slug);

  return redirect(`/admin/projects`);
};

export default function Page() {
  const { project, html } = useLoaderData<LoaderData>();

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/admin/projects/${project.slug}`);

  return (
    <>
      <h1>{project.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <fieldset>
        <legend>
          Are you sure you want to publish this project? This project is
          currently a draft.
        </legend>
        <Form method="post">
          <button style={{ width: `100%`, textAlign: `left` }}>Publish</button>
          <input type="hidden" name="slug" value={project.slug} />
        </Form>
      </fieldset>
      <hr />
      <fieldset>
        <legend>Go Back</legend>
        <button
          onClick={handleEdit}
          style={{ width: "100%", textAlign: `left` }}
        >
          Edit
        </button>
      </fieldset>
    </>
  );
}
