import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";

import { prisma } from "~/db.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Create Project",
  };
};

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
  const transition = useNavigation();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main>
      <h1>Create Project</h1>
      <fieldset disabled={disabled}>
        <Form method="post">
          <label htmlFor="name">Project Name</label>
          <br />
          <input type="text" id="name" name="name" />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}
