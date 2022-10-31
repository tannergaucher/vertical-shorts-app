import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import {
  getDraftProjects,
  getPublishedProjects,
} from "~/models/project.server";

type LoaderData = {
  draftProjects: Awaited<ReturnType<typeof getDraftProjects>>;
  publishedProjects: Awaited<ReturnType<typeof getPublishedProjects>>;
};

export const loader = async () => {
  return json<LoaderData>({
    draftProjects: await getDraftProjects(),
    publishedProjects: await getPublishedProjects(),
  });
};

export default function AdminProjects() {
  const { draftProjects, publishedProjects } = useLoaderData<LoaderData>();

  return (
    <section>
      <h2>Published Projects</h2>
      <ul>
        {publishedProjects.map((project) => (
          <li key={project.slug}>
            <Link to={project.slug}>{project.title}</Link>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Draft Projects</h2>
      <ul>
        {draftProjects.map((project) => (
          <li key={project.slug}>
            <Link to={project.slug}>{project.title}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
