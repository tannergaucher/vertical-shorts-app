import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Layout } from "~/components/layout";
import { prisma } from "~/db.server";
import { storage } from "~/entry.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const meta: MetaFunction = () => {
  return {
    title: "Create Project",
  };
};

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) return redirect(Routes.Login);

  return json<LoaderData>({ user });
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

  const [bucket] = await storage.bucket(project.id).exists();

  if (!bucket) {
    await storage.createBucket(project.id).then(async () => {
      await storage.bucket(project.id).makePublic();
      await storage.bucket(project.id).setCorsConfiguration([
        {
          origin: ["*"],
          method: ["PUT", "GET"],
          responseHeader: ["Content-Type"],
        },
      ]);
    });
  }

  return redirect(Routes.Admin);
};

export default function Page() {
  const transition = useNavigation();

  const { user } = useLoaderData<LoaderData>();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <Layout
      h1="Create Project"
      h2="Enter a project name for your video series"
      user={user}
    >
      <fieldset disabled={disabled}>
        <Form method="post">
          <label htmlFor="name">Project Name</label>
          <br />
          <input type="text" id="name" name="name" />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </Layout>
  );
}
