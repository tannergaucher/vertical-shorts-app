import { marked } from "marked";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigate, Form } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Project } from "~/models/project.server";
import { getProject, publishProject } from "~/models/project.server";

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

  const slug = formData.get("slug");

  invariant(typeof slug === "string", "slug must be a string");

  await publishProject({
    slug,
    published: true,
  });

  return redirect(`/admin/projects`);
};

export default function ProjectSlugPreview() {
  const { project, html } = useLoaderData<LoaderData>();

  const navigate = useNavigate();
  const handleEdit = () => navigate(`/admin/projects/${project.slug}`);

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{project.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <hr />
      <button onClick={handleEdit}>Edit</button>
      <hr />
      <Form method="post">
        <button>Publish</button>
        <input type="hidden" name="slug" value={project.slug} />
      </Form>
    </main>
  );
}
