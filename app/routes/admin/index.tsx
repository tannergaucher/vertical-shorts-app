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
    <main>
      <fieldset>
        <Form method="post">
          <label htmlFor="currentProjectId">Select Currrent Project</label>
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
      <br />
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
      <section>
        <Link to={Routes.AuthorizeYoutube}>
          <h2>Add Youtube</h2>
        </Link>
        <Link to={Routes.AuthorizeTikTok}>
          <h2>Add TikTok</h2>
        </Link>
        <Link to={Routes.AuthorizeInstagram}>
          <h2>Add Instagram</h2>
        </Link>
        <Link to={Routes.AuthorizeTwitter}>
          <h2>Add Twitter</h2>
        </Link>
        <Link to={Routes.AuthorizeFacebook}>
          <h2>Add Facebook</h2>
        </Link>
      </section>
    </main>
  );
}

type ChannelItemType =
  | Pick<Channel, "name" | "channelType" | "views" | "subscribers">
  | {
      channelType: ChannelType;
      href?: string;
    };

function ChannelItem({ channel }: { channel: ChannelItemType }) {
  return "href" in channel && channel.href ? (
    <Link to={channel.href}>
      <h3>Add {channel.channelType}</h3>
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
