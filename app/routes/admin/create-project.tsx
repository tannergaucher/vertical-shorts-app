import { Form } from "@remix-run/react";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { getUser } from "~/session.server";
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import invariant from "tiny-invariant";
import { Routes } from "~/routes";

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

  return redirect(Routes.AdminContentTitle);
};

export default function Page() {
  return (
    <main>
      <h1>Create project</h1>
      <Form method="post">
        <label htmlFor="name">Project Name</label>
        <input type="text" id="name" name="name" />
        <button type="submit">Create Project</button>
      </Form>
    </main>
  );
}
