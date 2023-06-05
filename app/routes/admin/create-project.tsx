import { Form, useTransition } from "@remix-run/react";
import type {
  LoaderFunction,
  ActionFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { Routes } from "~/routes";
import { prisma } from "~/db.server";
import { getUser } from "~/session.server";

import styles from "~/styles/admin.module.css";

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
  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Form method="post">
          <label htmlFor="name">Project Name</label>
          <input type="text" id="name" name="name" className={styles.input} />
          <button type="submit" className={styles.button}>
            Create Project
          </button>
        </Form>
      </fieldset>
    </main>
  );
}
