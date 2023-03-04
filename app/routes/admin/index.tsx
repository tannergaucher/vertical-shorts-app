import type { LoaderArgs, ActionFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData, useSubmit } from "@remix-run/react";
import { prisma } from "~/db.server";

import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

enum IntegrationType {
  Youtube = "YouTube",
  TikTok = "TikTok",
  Instagram = "Instagram",
  Facebook = "Facebook",
}

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  user?: Awaited<ReturnType<typeof getUser>>;
  youtube?: IntegrationDetails;
  tiktok?: IntegrationDetails;
  instagram?: IntegrationDetails;
  facebook?: IntegrationDetails;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  // todo auth with youtube and get channel details
  return json<LoaderData>({
    user,
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
    youtube: {
      type: IntegrationType.Youtube,
      channelName: "Todo Channel",
      live: true,
    },
    tiktok: {
      type: IntegrationType.TikTok,
      channelName: "Todo Channel",
      live: false,
    },
    instagram: {
      type: IntegrationType.Instagram,
      channelName: "Todo Channel",
      live: false,
    },
    facebook: {
      type: IntegrationType.Facebook,
      channelName: "Todo Channel",
      live: false,
    },
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
  const { user, youtube, tiktok, instagram, facebook } =
    useLoaderData<LoaderData>();

  const submit = useSubmit();

  if (!user) return null;

  return (
    <main>
      <fieldset>
        <Form method="post">
          <label htmlFor="currentProjectId">Current Project</label>
          <br />
          <select
            id="currentProjectId"
            name="currentProjectId"
            style={{
              width: "100%",
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
      <IntegrationsGrid
        youtube={youtube}
        tiktok={tiktok}
        instagram={instagram}
        facebook={facebook}
      />
    </main>
  );
}

function IntegrationsGrid({
  youtube,
  tiktok,
  instagram,
  facebook,
}: {
  youtube?: IntegrationDetails;
  tiktok?: IntegrationDetails;
  instagram?: IntegrationDetails;
  facebook?: IntegrationDetails;
}) {
  return (
    <div>
      <h2>Integrations:</h2>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {youtube ? (
          <Integration
            channelName={youtube.channelName}
            type={youtube.type}
            live={youtube.live}
          />
        ) : null}
        {tiktok ? (
          <Integration
            channelName={tiktok.channelName}
            type={tiktok.type}
            live={tiktok.live}
          />
        ) : null}
        {instagram ? (
          <Integration
            channelName={instagram.channelName}
            type={instagram.type}
            live={instagram.live}
          />
        ) : null}
        {facebook ? (
          <Integration
            channelName={facebook.channelName}
            type={facebook.type}
            live={facebook.live}
          />
        ) : null}
      </section>
    </div>
  );
}

interface IntegrationDetails {
  channelName?: string;
  type: IntegrationType;
  live?: boolean;
}

function Integration({ channelName, type, live }: IntegrationDetails) {
  return (
    <div>
      <h3>{live ? type : `${type} - Coming Soon`}</h3>
      <ul>
        <li>{channelName}</li>
      </ul>
    </div>
  );
}
