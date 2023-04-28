import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit, Link } from "@remix-run/react";
import { prisma } from "~/db.server";
import type { ChannelType } from "@prisma/client";

import type { Channel } from "~/models/chanel.server";
import { getChannels } from "~/models/chanel.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
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
    <main className="padding">
      <fieldset>
        <Form method="post">
          <label
            htmlFor="currentProjectId"
            style={{
              fontSize: "x-large",
            }}
          >
            Select Currrent Project
          </label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
            style={{
              fontSize: "x-large",
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
          <h3
            style={{
              marginBlockEnd: `var(--space-md)`,
            }}
          >
            New Project
          </h3>
        </Link>
      </fieldset>
      <br />
      {channels?.length ? (
        <details open>
          <summary
            style={{
              fontSize: "xx-large",
            }}
          >
            {`${
              channels.length === 1
                ? `1 Channel`
                : `${channels.length} Channels`
            }`}
          </summary>
          <ChannelsGrid channels={channels} />
        </details>
      ) : null}
      <section className="content-grid" style={{ marginBlockStart: `0` }}>
        <Link className="card" to={Routes.AuthorizeYoutube}>
          <h2 className="card-heading">Add Youtube</h2>
        </Link>
        <Link className="card" to={Routes.AuthorizeTikTok}>
          <h2 className="card-heading">Add TikTok</h2>
        </Link>
        <Link className="card" to={Routes.AuthorizeInstagram}>
          <h2 className="card-heading">Add Instagram</h2>
        </Link>
        <Link className="card" to={Routes.AuthorizeTwitter}>
          <h2 className="card-heading">Add Twitter</h2>
        </Link>
        <Link className="card" to={Routes.AuthorizeFacebook}>
          <h2 className="card-heading">Add Facebook</h2>
        </Link>
      </section>
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
      <h3 className="card-heading">Add {channel.channelType}</h3>
    </Link>
  ) : "name" in channel ? (
    <div className="card">
      <h3 className="card-heading">{channel.channelType}</h3>
      <h4 className="card-text">{channel.name}</h4>
      <section className="padding">
        <ul>
          <li>{`${channel.views} views`}</li>
          <li>{`${channel.subscribers} subscribers`}</li>
        </ul>
      </section>
    </div>
  ) : null;
}
