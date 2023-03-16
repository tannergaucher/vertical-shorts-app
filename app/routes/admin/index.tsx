import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import { ChannelType } from "@prisma/client";
import compact from "lodash/compact";

import { getContents } from "~/models/content.server";

import type { Channel } from "~/models/chanel.server";
import { getChannel } from "~/models/chanel.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  user?: Awaited<ReturnType<typeof getUser>>;
  youtube?: Awaited<ReturnType<typeof getChannel>>;
  tiktok?: Awaited<ReturnType<typeof getChannel>>;
  instagram?: Awaited<ReturnType<typeof getChannel>>;
  facebook?: Awaited<ReturnType<typeof getChannel>>;
  twitter?: Awaited<ReturnType<typeof getChannel>>;
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
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
    youtube: await getChannel({
      projectId: user.currentProjectId,
      channelType: ChannelType.YOUTUBE,
    }),
    tiktok: await getChannel({
      projectId: user.currentProjectId,
      channelType: ChannelType.TIKTOK,
    }),
    instagram: await getChannel({
      projectId: user.currentProjectId,
      channelType: ChannelType.INSTAGRAM,
    }),
    facebook: await getChannel({
      projectId: user.currentProjectId,
      channelType: ChannelType.FACEBOOK,
    }),
    twitter: await getChannel({
      projectId: user.currentProjectId,
      channelType: ChannelType.TWITTER,
    }),
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const currentProjectId = formData.get("currentProjectId");

  const userId = formData.get("userId");

  if (!currentProjectId || !userId) {
    return redirect(Routes.Admin);
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
  const { user, youtube, tiktok, instagram, facebook, twitter } =
    useLoaderData<LoaderData>();

  const submit = useSubmit();

  if (!user) return null;

  return (
    <main>
      <fieldset>
        <h2>Current Project</h2>
        <Form method="post">
          <label htmlFor="currentProjectId">Selected:</label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
            style={{
              width: "100%",
              marginBlockStart: "8px",
            }}
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
      </fieldset>
      <ChannelsGrid
        channels={compact([
          youtube
            ? {
                channelType: ChannelType.YOUTUBE,
                name: youtube.name,
                views: youtube.views || 0,
                subscribers: youtube.subscribers || 0,
              }
            : {
                channelType: ChannelType.YOUTUBE,
                href: Routes.AuthorizeYoutube,
              },
          tiktok
            ? {
                channelType: ChannelType.TIKTOK,
                name: tiktok.name,
                views: tiktok.views || 0,
                subscribers: tiktok.subscribers || 0,
              }
            : {
                channelType: ChannelType.TIKTOK,
                href: Routes.AuthorizeTikTok,
              },
          instagram
            ? {
                channelType: ChannelType.INSTAGRAM,
                name: instagram.name,
                views: instagram.views || 0,
                subscribers: instagram.subscribers || 0,
              }
            : {
                channelType: ChannelType.INSTAGRAM,
                href: Routes.AuthorizeInstagram,
              },
          facebook
            ? {
                channelType: ChannelType.FACEBOOK,
                name: facebook.name,
                views: facebook.views || 0,
                subscribers: facebook.subscribers || 0,
              }
            : {
                channelType: ChannelType.FACEBOOK,
                href: Routes.AuthorizeFacebook,
              },
          twitter
            ? {
                channelType: ChannelType.TWITTER,
                name: twitter.name,
                views: twitter.views || 0,
                subscribers: twitter.subscribers || 0,
              }
            : {
                channelType: ChannelType.TWITTER,
                href: Routes.AuthorizeTwitter,
              },
        ])}
      />
      <Link to={Routes.AdminCreateProject}>
        <h2>New Project</h2>
      </Link>
      <Link to={Routes.Logout}>
        <h2>Logout</h2>
      </Link>
    </main>
  );
}

type ChannelGridItem =
  | Pick<Channel, "name" | "channelType" | "views" | "subscribers">
  | {
      channelType: ChannelType;
      href?: string;
    };

function ChannelsGrid({ channels }: { channels?: ChannelGridItem[] }) {
  return (
    <div>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "16px",
        }}
      >
        {channels?.map((channel) => (
          <ChannelItem key={channel.channelType} channel={channel} />
        ))}
      </section>
    </div>
  );
}

function ChannelItem({ channel }: { channel: ChannelGridItem }) {
  return "href" in channel && channel.href ? (
    <Link to={channel.href}>
      <h3>ADD {channel.channelType}</h3>
    </Link>
  ) : "name" in channel ? (
    <div>
      <h3>{channel.channelType}</h3>
      <h4>{channel.name}</h4>
      <ul>
        <li>{`${channel.views} views`}</li>
        <li>{`${channel.subscribers} subscribers`}</li>
      </ul>
    </div>
  ) : null;
}
