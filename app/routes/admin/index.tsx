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
    <main>
      <h1>Settings</h1>
      <fieldset>
        <Form method="post">
          <label htmlFor="currentProjectId">
            <h2>Select Project</h2>
          </label>
          <select
            id="currentProjectId"
            name="currentProjectId"
            style={
              {
                // fontWeight: "bold",
              }
            }
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
          <button>
            <h3>New</h3>
          </button>
        </Link>
      </fieldset>
      <h2>Publish to</h2>
      <section>
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
      <h2
        style={{
          marginBlockStart: 0,
        }}
      >
        Select Plan
      </h2>
      <Link to={Routes.Signup}>
        <button type="button">
          <h3>
            {user.planType
              ? ` ${getPlanFromPlanType(user.planType)}`
              : `Select Plan`}
          </h3>
        </button>
      </Link>
    </main>
  );
}

function getPlanFromPlanType(planType: PlanType) {
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

function getChannelNameFromChannelType(channelType: ChannelType) {
  switch (channelType) {
    case "YOUTUBE":
      return "YouTube";
    case "TIKTOK":
      return "TikTok";
    case "INSTAGRAM":
      return "Instagram";
    case "TWITTER":
      return "Twitter";
    case "FACEBOOK":
      return "Facebook";
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
      to={
        SUPPORTED_CHANNELS.includes(channelType)
          ? getRouteFromChannelType(channelType)
          : "#"
      }
    >
      <button
        data-coming-soon={!SUPPORTED_CHANNELS.includes(channelType)}
        style={{
          marginBlockEnd: `var(--space-lg)`,
        }}
      >
        <h3>
          {SUPPORTED_CHANNELS.includes(channelType) ? (
            <>{`${
              projectChannel
                ? `${getChannelNameFromChannelType(channelType)} - ${
                    projectChannel.name
                  }`
                : `Add ${getChannelNameFromChannelType(channelType)} Channel`
            }`}</>
          ) : (
            <>{`${getChannelNameFromChannelType(channelType)} - Coming Soon`}</>
          )}
        </h3>
      </button>
    </Link>
  );
}
