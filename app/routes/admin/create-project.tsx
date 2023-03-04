import { Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { Routes } from "~/routes";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) return redirect(Routes.Login);

  return null;
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) return redirect(Routes.Login);

  const formData = await request.formData();
  const name = formData.get("name");

  invariant(name, "Project name is required");

  const project = await prisma.project.create({
    data: {
      title: name.toString().trim(),
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      currentProjectId: project.id,
    },
  });

  return redirect(Routes.Admin);
};

export default function Page() {
  return (
    <main>
      <h1>Admin</h1>
      <fieldset>
        <legend>Create a New Project</legend>
        <Form method="post">
          <label htmlFor="name">Project Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            style={{
              width: "calc(100% - 8px)",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              marginBlockStart: "16px",
            }}
          >
            Create Project
          </button>
        </Form>
      </fieldset>
    </main>
  );
}
