import { ChannelType, UploadStatus } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useParams,
} from "@remix-run/react";
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
  channelTypes: zfd.repeatableOfType(
    zfd
      .text()
      .refine((value) =>
        Object.values(ChannelType).includes(value as ChannelType)
      )
  ),
});

export const action: ActionFunction = async ({ request }) => {
  const { date, time, slug, projectId, channelTypes } = schema.parse(
    await request.formData()
  );

  await upsertContent({
    projectId,
    slug,
    youtubePublishAt: channelTypes.includes(ChannelType.YOUTUBE)
      ? new Date(`${date}T${time}`)
      : undefined,
    tikTokPublishAt: channelTypes.includes(ChannelType.TIKTOK)
      ? new Date(`${date}T${time}`)
      : undefined,
    instagramPublishAt: channelTypes.includes(ChannelType.INSTAGRAM)
      ? new Date(`${date}T${time}`)
      : undefined,
    facebookPublishAt: channelTypes.includes(ChannelType.FACEBOOK)
      ? new Date(`${date}T${time}`)
      : undefined,
    twitterPublishAt: channelTypes.includes(ChannelType.TWITTER)
      ? new Date(`${date}T${time}`)
      : undefined,
  });

  return redirect(Routes.Index);
};

export default function Page() {
  const { content, project } = useLoaderData<LoaderData>();
  const transition = useNavigation();

  const { slug } = useParams();

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  const channelTypes = project.channels.map((channel) => channel.channelType);

  return (
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>{content.title}</h1>
      <em>
        <h2 className={styles.pageTitle}>{project.title}</h2>
      </em>
      <Breadcrumb slug={slug} />
      <fieldset disabled={disabled}>
        <Form method="post">
          <section className={styles.checkboxSection}>
            {channelTypes.map((channelType) => (
              <label htmlFor={channelType} key={channelType}>
                <input
                  type="checkbox"
                  name="channelType"
                  id={channelType}
                  value={channelType}
                  className={styles.checkbox}
                  disabled={
                    channelType === "YOUTUBE" &&
                    content.youtubeStatus === UploadStatus.PUBLIC
                      ? true
                      : channelType === "TIKTOK" &&
                        content.tikTokStatus === UploadStatus.PUBLIC
                      ? true
                      : channelType === "INSTAGRAM" &&
                        content.instagramStatus === UploadStatus.PUBLIC
                      ? true
                      : channelType === "FACEBOOK" &&
                        content.facebookStatus === UploadStatus.PUBLIC
                      ? true
                      : channelType === "TWITTER" &&
                        content.twitterStatus === UploadStatus.PUBLIC
                      ? true
                      : false
                  }
                  defaultChecked={
                    channelType === "YOUTUBE" && !content.youtubePublishAt
                      ? true
                      : channelType === "TIKTOK" && !content.tikTokPublishAt
                      ? true
                      : channelType === "INSTAGRAM" &&
                        !content.instagramPublishAt
                      ? true
                      : channelType === "FACEBOOK" && !content.facebookPublishAt
                      ? true
                      : channelType === "TWITTER" && !content.twitterPublishAt
                      ? true
                      : false
                  }
                />
                {channelType}
              </label>
            ))}
          </section>
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
