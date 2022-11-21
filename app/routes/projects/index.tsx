import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

import type { Project } from "~/models/project.server";
import { getPublishedProjects } from "~/models/project.server";

type LoaderData = { projects: Project[] };

export const loader: LoaderFunction = async ({ params }) => {
  const projects = await getPublishedProjects();

  return json<LoaderData>({ projects });
};

export default function Projects() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <main>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.slug}>
            <Link to={`${project.slug}`}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
