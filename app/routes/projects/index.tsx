import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getProjects } from "~/models/project.server";

type LoaderData = {
  projects: Awaited<ReturnType<typeof getProjects>>;
};

export const loader = async () => {
  return json<LoaderData>({
    projects: await getProjects(),
  });
};

export default function Projects() {
  const { projects } = useLoaderData<LoaderData>();

  const publishedProjects = projects.filter(
    (project) => project.published === true
  );

  const draftProjects = projects.filter(
    (project) => project.published === false
  );

  return (
    <main>
      <h1>Projects</h1>

      <h2>Published</h2>
      <ul>
        {publishedProjects.map((project) => (
          <li key={project.slug}>
            <Link to={project.slug} className="text-blue-600 underline">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>

      <hr />

      <h2>Draft</h2>
      <ul>
        {draftProjects.map((project) => (
          <li key={project.slug}>
            <Link to={project.slug} className="text-blue-600 underline">
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
