import type { Project } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import { zfd } from "zod-form-data";

import { Breadcrumb } from "~/components/breadcrumb";
import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Title",
  };
};

type LoaderData = {
  project: Project;
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  const project = user.projects.find(
    (project) => project.id === user.currentProjectId
  );

  if (!project) {
    return redirect(Routes.AdminCreateProject);
  }

  return json({
    project,
  });
};

const schema = zfd.formData({
  title: zfd.text(),
});

export const action: ActionFunction = async ({ request }) => {
  const { title } = schema.parse(await request.formData());

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    slug,
    title: title.trim(),
    projectId: user.currentProjectId,
  });

  return redirect(Routes.AdminContentVideo(slug));
};

export default function Page() {
  const transition = useNavigation();

  const { project } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <h2 className={styles.pageTitle}>
        <em>{project.title}</em>
      </h2>
      <Breadcrumb slug={slug} />
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Form method="post">
          <input
            type="text"
            name="title"
            placeholder="Title"
            required
            className={styles.input}
          />
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}
