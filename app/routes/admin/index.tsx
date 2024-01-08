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

  return (
    <Layout h1="Settings">
      <section>
        <h2> Connected Channels</h2>
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
      <section>
        <h2> Add Channels</h2>
        {channelTypes.flatMap((channelType) => {
          const channel = project?.channels.find(
            (channel) => channel.channelType === channelType
          );

          return channel ? null : (
            <Link
              key={channelType}
              to={
                SUPPORTED_CHANNELS.includes(channelType)
                  ? getRouteFromChannelType(channelType)
                  : "#"
              }
              className="block bg-white rounded-lg shadow-md p-4 my-4"
            >
              <article>
                <h2 className="text-xl text-gray-700">
                  {SUPPORTED_CHANNELS.includes(channelType)
                    ? getChannelNameFromChannelType(channelType)
                    : `${getChannelNameFromChannelType(
                        channelType
                      )} (Coming Soon)`}
                </h2>
              </article>
            </Link>
          );
        })}
      </section>

      <section>
        <h2>Your Plan</h2>
        <Link
          to={Routes.Signup}
          className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 w-full mt-4"
        >
          <button type="button" className="text-lg font-bold">
            <h2>
              {user.planType
                ? ` ${getPlanFromPlanType(user.planType)}`
                : `Select Plan`}
            </h2>
          </button>
        </Link>
      </section>
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
      className="block bg-white rounded-lg shadow-md p-4 my-4"
    >
      <article
        data-coming-soon={!SUPPORTED_CHANNELS.includes(channel.channelType)}
      >
        {channel.thumbnail ? (
          <img
            src={channel.thumbnail}
            alt=""
            className="w-full object-cover h-48"
          />
        ) : null}
        <h2 className="text-xl text-gray-700">
          {getChannelNameFromChannelType(channel.channelType)}
        </h2>
        <h3 className="text-2xl font-bold text-gray-900 mt-4">
          {channel.name}
        </h3>
        <ul className="text-gray-600 mt-2 mb-4 pl-4">
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
      </article>
    </Link>
  );
}
