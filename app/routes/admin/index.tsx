import type { PlanType } from "@prisma/client";
import { ChannelType } from "@prisma/client";
import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { zfd } from "zod-form-data";

import { Layout } from "~/components/layout";
import { prisma } from "~/db.server";
import { type Channel, getChannels } from "~/models/chanel.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import { SUPPORTED_CHANNELS } from "~/utils/constants";
import { formatDate } from "~/utils/format-date";

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

  if (!user) return null;

  if (!project) return null;

  const channelTypes = Object.keys(ChannelType) as ChannelType[];

  const channelsToAdd = channelTypes.filter(
    (channelType) =>
      !project?.channels.find((channel) => channel.channelType === channelType)
  );

  return (
    <Layout h1="Settings" user={user}>
      <hr />
      {channelsToAdd.length !== channelTypes.length ? (
        <>
          <h2> Publish To</h2>
          <section>
            {channelTypes.flatMap((channelType) => {
              const channel = project?.channels.find(
                (channel) => channel.channelType === channelType
              );
              return channel ? (
                <ChannelItem key={channelType} channel={channel} />
              ) : (
                []
              );
            })}
          </section>
          <hr />
        </>
      ) : (
        <h2>Connect a channel below to start posting!</h2>
      )}
      {channelsToAdd.length ? (
        <>
          <section>
            {channelsToAdd.map((channelType) => (
              <Link
                key={channelType}
                to={
                  SUPPORTED_CHANNELS.includes(channelType)
                    ? getRouteFromChannelType(channelType)
                    : "#"
                }
              >
                <article
                  data-coming-soon={!SUPPORTED_CHANNELS.includes(channelType)}
                >
                  <h2>
                    {SUPPORTED_CHANNELS.includes(channelType)
                      ? getChannelNameFromChannelType(channelType)
                      : ` ${getChannelNameFromChannelType(
                          channelType
                        )} - Coming Soon`}
                  </h2>
                </article>
              </Link>
            ))}
          </section>
        </>
      ) : null}
      <hr />
      <h2
        style={{
          marginBlockStart: 0,
        }}
      >
        {user.planType ? "Update Plan:" : "Select Plan:"}
      </h2>
      <Link to={Routes.Signup}>
        <button
          type="button"
          style={{
            width: "100%",
          }}
        >
          <h2>
            {user.planType
              ? ` ${getPlanFromPlanType(user.planType)}`
              : `Select Plan`}
          </h2>
        </button>
      </Link>
    </Layout>
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

function ChannelItem({ channel }: { channel: Channel }) {
  return (
    <Link
      to={
        SUPPORTED_CHANNELS.includes(channel.channelType)
          ? getRouteFromChannelType(channel.channelType)
          : "#"
      }
    >
      <article
        data-coming-soon={!SUPPORTED_CHANNELS.includes(channel.channelType)}
        style={{
          marginBlockEnd: `var(--space-lg)`,
        }}
      >
        {channel.thumbnail ? (
          <img
            src={channel.thumbnail}
            alt=""
            style={{
              width: "100%",
            }}
          />
        ) : null}
        <h2>{`${getChannelNameFromChannelType(channel.channelType)} | ${
          channel.name
        }`}</h2>

        <ul
          style={{
            color: `var(--text-color)`,
            marginBlockEnd: `var(--space-sm)`,
            marginBlockStart: `var(--space-sm)`,
            paddingInlineStart: `var(--space-md)`,
          }}
        >
          {channel.subscribers ? (
            <li>
              <small>
                <b>Subscribers: </b>
                {channel.subscribers}
              </small>
            </li>
          ) : null}
          {channel.views ? (
            <li>
              <small>
                <b>Views: </b>
                {channel.views}
              </small>
            </li>
          ) : null}
          <li>
            <small>
              <b>Updated: </b>
              {formatDate(channel.updatedAt)}
            </small>
          </li>
        </ul>
        <a href={getRouteFromChannelType(channel.channelType)}>
          <button>Other Channel</button>
        </a>
      </article>
    </Link>
  );
}
