import { marked } from "marked";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Project } from "~/models/project.server";
import { getProject } from "~/models/project.server";

type LoaderData = { project: Project; html: string };

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, `params.slug is required`);

  const project = await getProject(params.slug);
  invariant(project, `Project not found: ${params.slug}`);

  const html = marked(project.markdown);

  return json<LoaderData>({ project, html });
};

export default function ProjectSlug() {
  const { project, html } = useLoaderData<LoaderData>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">{project.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
