import { ChannelType } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
import type { InitializeUploadBody } from "service-upload/functions/initialize-upload";
import { ServiceUploadRoutes } from "service-upload/routes";
import { SERVICE_UPLOAD_BASE_URL } from "service-upload/utils/constants";
import invariant from "tiny-invariant";
import { z } from "zod";
import { zfd } from "zod-form-data";

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

const paramsSchema = z.object({
  slug: z.string(),
});

export const loader: LoaderFunction = async ({ params, request }) => {
  const { slug } = paramsSchema.parse(params);

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(user.currentProjectId, "user must have a current project");

  return json({
    content: await getContent({
      slug,
      projectId: user.currentProjectId,
    }),
    project: await getProject({
      id: user.currentProjectId,
    }),
  });
};

export const schema = zfd.formData({
  date: zfd.text(),
  time: zfd.text(),
  slug: zfd.text(),
  projectId: zfd.text(),
});

export const action: ActionFunction = async ({ request }) => {
  const { date, time, slug, projectId } = schema.parse(
    await request.formData()
  );

  const user = await getUser(request);

  if (!user) {
    return redirect(Routes.Login);
  }

  invariant(user.currentProjectId, "user must have a current project");

  const currentProject = await getProject({
    id: user.currentProjectId,
  });

  const formattedDate = `${date}T${time}`;

  const channelTypes = [
    currentProject.youtubeCredentials ? "YOUTUBE" : [],
    currentProject.tikTokCredentials ? "TIKTOK" : [],
  ].flat();

  await upsertContent({
    projectId,
    slug,
    youtubePublishAt: channelTypes.includes(ChannelType.YOUTUBE)
      ? new Date(formattedDate)
      : undefined,
    tikTokPublishAt: channelTypes.includes(ChannelType.TIKTOK)
      ? new Date(formattedDate)
      : undefined,
  });

  const initializeUploadBody: InitializeUploadBody = {
    projectId,
    slug,
  };

  await fetch(
    `${SERVICE_UPLOAD_BASE_URL}${ServiceUploadRoutes.InitializeUpload}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initializeUploadBody),
    }
  );

  return redirect(Routes.Index);
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();
  const transition = useNavigation();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>{content.title}</h1>
      <em>
        <h2 className={styles.pageTitle}>{project.title}</h2>
      </em>
      <Breadcrumb slug={slug} />
      <fieldset disabled={disabled}>
        <Form method="post">
          <label htmlFor="date">Date</label>
          <input type="date" name="date" className={styles.input} required />
          <label htmlFor="time">Time</label>
          <input type="time" name="time" className={styles.input} required />
          <input type="hidden" name="slug" value={content.slug} />
          <input type="hidden" name="projectId" value={content.projectId} />
          <button type="submit">Schedule</button>
        </Form>
      </fieldset>
    </main>
  );
}
