import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import { ChannelType } from "@prisma/client";

import { getChannels } from "~/models/chanel.server";
import type { ProjectWithChannels } from "~/models/project.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "./index.css";

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
  channels?: Awaited<ReturnType<typeof getChannels>>;
  project?: Awaited<ReturnType<typeof getProject>>;
};

export const links = () => {
  return [
    {
      rel: "stylesheet",
      href: styles,
      type: "text/css",
    },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const project = await getProject({
    id: user.currentProjectId,
  });

  return json<LoaderData>({
    user,
    project,
    channels: await getChannels({
      projectId: user.currentProjectId,
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const currentProjectId = formData.get("currentProjectId");

  const userId = formData.get("userId");

  if (!currentProjectId || !userId) {
    return redirect(Routes.Login);
  }

  const user = prisma.user.update({
    where: {
      id: userId.toString(),
    },
    data: {
      currentProjectId: currentProjectId.toString(),
    },
  });

  return user;
};

export default function Page() {
  const { user, project } = useLoaderData<LoaderData>();

  const submit = useSubmit();

  if (!user) return null;

  const allChannelTypes = Object.keys(ChannelType) as ChannelType[];

  console.log(project, "project");

  return (
    <main>
      <fieldset>
        <Form method="post">
          <label htmlFor="currentProjectId">Current Project</label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
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
      <section className="channels-grid">
        {allChannelTypes.map((channelType) => {
          return (
            <ChannelItem
              key={channelType}
              channelType={channelType}
              project={project}
            />
          );
        })}
      </section>
    </main>
  );
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
  project,
}: {
  channelType: ChannelType;
  project?: ProjectWithChannels | null;
}) {
  const isSelected = project?.channels.find(
    (channel) => channel.channelType === channelType
  );

  return (
    <Link
      className="channel"
      key={channelType}
      to={getRouteFromChannelType(channelType)}
      data-selected={isSelected ? "true" : "false"}
    >
      <h3 className="channel-title">{`${
        isSelected
          ? `UPDATE ${channelType} CHANNEL`
          : `ADD ${channelType} CHANNEL`
      }`}</h3>
    </Link>
  );
}
