import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import invariant from "tiny-invariant";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { ContentDetails } from "~/components/content-details";
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

const paramsSchema = z.object({
  slug: z.string(),
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = paramsSchema.parse(params);

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

export const actionSchema = zfd.formData({
  slug: z.string(),
  projectId: z.string(),
});

export const action: ActionFunction = async ({ request }) => {
  const { slug, projectId } = actionSchema.parse(await request.formData());

  await deleteContent({
    slug,
    projectId,
  });

  return redirect(Routes.Index);
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();

  const transition = useNavigation();

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
      <ContentDetails content={content} project={project} open={true} />
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
