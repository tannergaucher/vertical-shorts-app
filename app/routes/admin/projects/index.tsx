import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Layout } from "~/components/layout";
import { createProject, getProjects } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  projects: Awaited<ReturnType<typeof getProjects>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  return {
    projects: await getProjects({ userId: user.id }),
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  const formData = await request.formData();
  const newProject = formData.get("newProject");
  invariant(typeof newProject === "string", "Project name is required");

  const project = await createProject({
    userId: user.id,
    title: newProject,
  });

  return {
    project,
  };
};

export default function Page() {
  const { projects } = useLoaderData<LoaderData>();

  return (
    <Layout h1="Projects">
      <details>
        <summary>Create Project</summary>
        <NewProjectForm />
      </details>
      <br />
      <SelectProjectForm projects={projects} />
    </Layout>
  );
}

function SelectProjectForm({ projects }: { projects: LoaderData["projects"] }) {
  return (
    <>
      <h3>Select Project</h3>
      <select name="" id="">
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.title}
          </option>
        ))}
      </select>
    </>
  );
}

function NewProjectForm() {
  const newProjectFetcher = useFetcher();

  return (
    <newProjectFetcher.Form method="post">
      <fieldset>
        <label htmlFor="">Project Name</label>
        <br />
        <input type="text" name="newProject" />
        <button
          type="submit"
          style={{
            width: `100%`,
            marginBlock: `var(--space-md)`,
          }}
        >
          Create
        </button>
      </fieldset>
    </newProjectFetcher.Form>
  );
}
