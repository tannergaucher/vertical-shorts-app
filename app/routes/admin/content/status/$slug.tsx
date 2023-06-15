import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import invariant from "tiny-invariant";

import { ContentStatus } from "~/components/content-status";
import { deleteContent, getContent } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContentStatus.module.css";

export const meta: MetaFunction = () => {
  return {
    title: "Create Post - Preview",
  };
};

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  user: Awaited<ReturnType<typeof getUser>>;
  project: Awaited<ReturnType<typeof getProject>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;

  invariant(slug, "slug is required");

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(user?.currentProjectId, "user must have a current project");

  return json({
    user,
    content: await getContent({
      slug,
      projectId: user.currentProjectId,
    }),
    project: await getProject({
      id: user.currentProjectId,
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const slug = formData.get("slug");
  const projectId = formData.get("projectId");

  invariant(typeof slug === "string", "slug is required");
  invariant(typeof projectId === "string", "projectId is required");

  await deleteContent({
    slug,
    projectId,
  });

  return redirect(Routes.Index);
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();

  const transition = useTransition();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <h1 className={styles.contentTitle}>{content.title}</h1>
      <img
        src={`https://storage.googleapis.com/${content.projectId}/${content.slug}.gif`}
        alt={content.title}
        className={styles.gif}
      />
      <ContentStatus content={content} project={project} open={true} />
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Form method="post">
          <input type="hidden" name="slug" value={content.slug} />
          <input type="hidden" name="projectId" value={content.projectId} />
          <button type="submit">Delete</button>
        </Form>
      </fieldset>
    </main>
  );
}
