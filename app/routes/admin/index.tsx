import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import type { ChannelType } from "@prisma/client";
import compact from "lodash/compact";

import { getContents } from "~/models/content.server";

import type { Channel } from "~/models/chanel.server";
import { getChannels } from "~/models/chanel.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  user?: Awaited<ReturnType<typeof getUser>>;
  channels?: Awaited<ReturnType<typeof getChannels>>;
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
  const { user, channels } = useLoaderData<LoaderData>();

  const submit = useSubmit();

  if (!user) return null;

  return (
    <main>
      <fieldset>
        <Form method="post">
          <label
            htmlFor="currentProjectId"
            style={{
              fontSize: "x-large",
            }}
          >
            Currrent Project
          </label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
            style={{
              width: "100%",
              marginBlockStart: "8px",
              fontSize: "xx-large",
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
        <Link to={Routes.AdminCreateProject}>
          <h3>+ New Project</h3>
        </Link>
      </fieldset>
      <br />
      <details>
        <summary
          style={{
            fontSize: "xx-large",
          }}
        >
          {`${
            compact([channels]).length === 1
              ? `1 Channel`
              : `${compact([channels]).length} Channels`
          }`}
        </summary>
        <ChannelsGrid channels={channels} />
      </details>
      <Link to={Routes.AuthorizeTikTok}>
        <h2>+ TikTok</h2>
      </Link>
      <Link to={Routes.AuthorizeYoutube}>
        <h2>+ Youtube</h2>
      </Link>
      <Link to={Routes.AuthorizeInstagram}>
        <h2>+ Instagram</h2>
      </Link>
      <Link to={Routes.AuthorizeTwitter}>
        <h2>+ Twitter</h2>
      </Link>
      <Link to={Routes.AuthorizeFacebook}>
        <h2>+ Facebook</h2>
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
          gridTemplateColumns: "repeat(2, 1fr)",
          justifyItems: "start",
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
      <h3>+ {channel.channelType}</h3>
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
