import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useParams,
  useTransition,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { Breadcrumb } from "~/components/breadcrumb";
import { getContent } from "~/models/content.server";
import { upsertContent } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/adminContent.module.css";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  project: Awaited<ReturnType<typeof getProject>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;

  invariant(slug, "slug is required");

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  const projectId = user.currentProjectId;

  invariant(typeof projectId === "string", "user must have a current project");

  const content = await getContent({
    slug,
    projectId,
  });

  const project = await getProject({
    id: projectId,
  });

  return json({ content, project });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const date = formData.get("date");
  const time = formData.get("time");
  const slug = formData.get("slug");
  const projectId = formData.get("projectId");

  invariant(typeof date === "string", "date is required");
  invariant(typeof time === "string", "time is required");
  invariant(typeof slug === "string", "slug is required");
  invariant(typeof projectId === "string", "projectId is required");

  await upsertContent({
    projectId,
    slug,
    publishAt: new Date(`${date} ${time}`),
  });

  return redirect(Routes.Admin);
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();
  const transition = useTransition();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  const channelTypes = project.channels.map((channel) => channel.channelType);

  return (
    <main className={styles.main}>
      <fieldset disabled={disabled}>
        <Breadcrumb slug={slug} />
        <Form method="post">
          <section>
            {channelTypes.map((channelType) => (
              <label htmlFor={channelType} key={channelType}>
                <input
                  type="checkbox"
                  name={channelType}
                  id={channelType}
                  value={channelType}
                  className={styles.checkbox}
                />
                {channelType}
              </label>
            ))}
          </section>
          <label htmlFor="date">Date</label>
          <input type="date" name="date" className={styles.input} />
          <label htmlFor="time">Time</label>
          <input type="time" name="time" className={styles.input} />
          <input type="hidden" name="slug" value={content.slug} />
          <input type="hidden" name="projectId" value={content.projectId} />
          <button type="submit">Schedule</button>
        </Form>
      </fieldset>
    </main>
  );
}
