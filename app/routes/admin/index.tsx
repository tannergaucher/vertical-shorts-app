import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import { IntegrationType } from "@prisma/client";
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
      integration: IntegrationType.YOUTUBE,
    }),
    tiktok: await getChannel({
      projectId: user.currentProjectId,
      integration: IntegrationType.TIKTOK,
    }),
    instagram: await getChannel({
      projectId: user.currentProjectId,
      integration: IntegrationType.INSTAGRAM,
    }),
    facebook: await getChannel({
      projectId: user.currentProjectId,
      integration: IntegrationType.FACEBOOK,
    }),
    twitter: await getChannel({
      projectId: user.currentProjectId,
      integration: IntegrationType.TWITTER,
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
      <h1>Admin</h1>
      <Link to={Routes.AdminCreateProject}>
        <h2>Create Project</h2>
      </Link>
      <fieldset>
        <Form method="post">
          <label htmlFor="currentProjectId">Current Project</label>
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
                id: youtube.id,
                integration: IntegrationType.YOUTUBE,
                name: youtube.name,
                views: youtube.views || 0,
                subscribers: youtube.subscribers || 0,
              }
            : {
                integration: IntegrationType.YOUTUBE,
                text: "Add Youtube Channel",
                href: Routes.AuthorizeYoutube,
              },
          tiktok
            ? {
                id: tiktok.id,
                integration: IntegrationType.TIKTOK,
                name: tiktok.name,
                views: tiktok.views || 0,
                subscribers: tiktok.subscribers || 0,
              }
            : {
                integration: IntegrationType.TIKTOK,
                text: "Add TikTok Channel",
                href: Routes.AuthorizeTikTok,
              },
          instagram
            ? {
                id: instagram.id,
                integration: IntegrationType.INSTAGRAM,
                name: instagram.name,
                views: instagram.views || 0,
                subscribers: instagram.subscribers || 0,
              }
            : {
                integration: IntegrationType.INSTAGRAM,
                text: "Add Instagram Channel",
                href: Routes.AuthorizeInstagram,
              },
          facebook
            ? {
                id: facebook.id,
                integration: IntegrationType.FACEBOOK,
                name: facebook.name,
                views: facebook.views || 0,
                subscribers: facebook.subscribers || 0,
              }
            : {
                integration: IntegrationType.FACEBOOK,
                text: "Add Facebook Channel",
                href: Routes.AuthorizeFacebook,
              },
          twitter
            ? {
                id: twitter.id,
                integration: IntegrationType.TWITTER,
                name: twitter.name,
                views: twitter.views || 0,
                subscribers: twitter.subscribers || 0,
              }
            : {
                integration: IntegrationType.TWITTER,
                text: "Add Twitter Channel",
                href: Routes.AuthorizeTwitter,
              },
        ])}
      />
    </main>
  );
}

type ChannelGridItem =
  | Pick<Channel, "name" | "integration" | "views" | "subscribers" | "id">
  | {
      integration: IntegrationType;
      text: string;
      href?: string;
    };

function ChannelsGrid({ channels }: { channels?: ChannelGridItem[] }) {
  console.log(channels, "_channels");

  return (
    <div>
      <h2>Channels:</h2>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridGap: "16px",
        }}
      >
        {channels?.map((channel) => (
          <ChannelItem key={channel.integration} channel={channel} />
        ))}
      </section>
    </div>
  );
}

function ChannelItem({ channel }: { channel: ChannelGridItem }) {
  return "href" in channel && channel.href ? (
    <Link to={channel.href}>
      <h2>ADD {channel.integration}</h2>
    </Link>
  ) : "name" in channel ? (
    <div>
      <h2>{channel.name}</h2>
      <ul>
        <li>{`${channel.views} views`}</li>
        <li>{`${channel.subscribers} subscribers`}</li>
      </ul>
    </div>
  ) : null;
}
