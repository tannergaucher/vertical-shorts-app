import { Form, useLoaderData, useParams } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import invariant from "tiny-invariant";

import { Routes } from "~/routes";
import { getContent } from "~/models/content.server";
import { getUser } from "~/session.server";
import { upsertContent } from "~/models/content.server";
import { UPLOAD_SERVICE_BASE_URL } from "~/utils/constants";
import { Breadcrumb } from "~/components/breadcrumb";

import styles from "~/styles/adminContent.module.css";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
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

  return json({ content });
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

  const res = await fetch(`${UPLOAD_SERVICE_BASE_URL}/upload`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug,
      projectId,
    }),
  });

  console.log(res, "res");

  if (!res.ok) {
    throw new Error("Failed to upload to upload service");
  }

  return redirect(Routes.Admin);
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const { slug } = useParams();

  return (
    <main className={styles.main}>
      <fieldset>
        <Breadcrumb slug={slug} />
        <Form method="post">
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
