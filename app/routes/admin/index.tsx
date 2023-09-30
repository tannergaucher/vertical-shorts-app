import type { Channel, PlanType } from "@prisma/client";
import { ChannelType } from "@prisma/client";
import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData, useSubmit } from "@remix-run/react";
import { zfd } from "zod-form-data";

import { prisma } from "~/db.server";
import { getChannels } from "~/models/chanel.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/admin.module.css";
import { SUPPORTED_CHANNELS } from "~/utils/constants";

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
  channels?: Awaited<ReturnType<typeof getChannels>>;
  project?: Awaited<ReturnType<typeof getProject>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  return json<LoaderData>({
    user,
    project: await getProject({
      id: user.currentProjectId,
    }),
    channels: await getChannels({
      projectId: user.currentProjectId,
    }),
  });
};

const schema = zfd.formData({
  currentProjectId: zfd.text().optional(),
  userId: zfd.text().optional(),
});

export const action: ActionFunction = async ({ request }) => {
  const { currentProjectId, userId } = schema.parse(await request.formData());

  if (!currentProjectId || !userId) {
    return redirect(Routes.Login);
  }

  const user = prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      currentProjectId,
    },
  });

  return user;
};

export default function Page() {
  const { user, project } = useLoaderData<LoaderData>();

  const submit = useSubmit();

  if (!user) return null;

  const allChannelTypes = Object.keys(ChannelType) as ChannelType[];

  return (
    <main className={styles.main}>
      <fieldset className={styles.fieldset}>
        <Form method="post">
          <label htmlFor="currentProjectId">Current Project</label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
            className={styles.select}
            onChange={(event) => {
              submit(
                {
                  currentProjectId: event.target.value,
                  userId: user.id,
                },
                {
                  method: "post",
                }
              );
            }}
          >
            {user?.projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
                selected={project.id === user.currentProjectId}
              >
                {project.title}
              </option>
            ))}
          </select>
        </Form>
        <Link to={Routes.AdminCreateProject}>
          <h3>New Project</h3>
        </Link>
      </fieldset>
      <section className={styles.channelsGrid}>
        {allChannelTypes.map((channelType) => {
          return (
            <ChannelItem
              key={channelType}
              channelType={channelType}
              projectChannel={project?.channels.find(
                (channel) => channel.channelType === channelType
              )}
            />
          );
        })}
      </section>
      <section className={styles.currentPlanSection}>
        {user.planType ? (
          <div className={styles.currentPlanName}>
            <h2> {getChannelFromChannelType(user.planType)}</h2>
            <Link to={Routes.Signup}>Update Plan</Link>
          </div>
        ) : (
          <Link to={Routes.Signup}>
            <h3>Select a Plan</h3>
          </Link>
        )}
      </section>
    </main>
  );
}

function getChannelFromChannelType(planType: PlanType) {
  switch (planType) {
    case "STARTER":
      return "Starter";
    case "GROWTH":
      return "Growth";
    case "PROFESSIONAL":
      return "Professional";
  }
}

function getRouteFromChannelType(channelType: ChannelType) {
  switch (channelType) {
    case "YOUTUBE":
      return Routes.AuthorizeYoutube;
    case "TIKTOK":
      return Routes.AuthorizeTikTok;
    case "INSTAGRAM":
      return Routes.AuthorizeInstagram;
    case "TWITTER":
      return Routes.AuthorizeTwitter;
    case "FACEBOOK":
      return Routes.AuthorizeFacebook;
  }
}

function ChannelItem({
  channelType,
  projectChannel,
}: {
  channelType: ChannelType;
  projectChannel?: Omit<Channel, "createdAt" | "updatedAt"> & {
    createdAt: string;
    updatedAt: string;
  };
}) {
  return (
    <Link
      className={styles.channel}
      to={
        SUPPORTED_CHANNELS.includes(channelType)
          ? getRouteFromChannelType(channelType)
          : "#"
      }
      data-selected={projectChannel ? "true" : "false"}
      data-supported={
        SUPPORTED_CHANNELS.includes(channelType) ? "true" : "false"
      }
    >
      {SUPPORTED_CHANNELS.includes(channelType) ? (
        <h3 className={styles.channelTitle}>{`${
          projectChannel
            ? `${channelType} | ${projectChannel.name}`
            : `ADD ${channelType} CHANNEL`
        }`}</h3>
      ) : (
        <h3 className={styles.channelTitle}>{`${channelType} COMING SOON`}</h3>
      )}
    </Link>
  );
}
