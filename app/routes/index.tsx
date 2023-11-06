import type { ActionFunction, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { z } from "zod";
import { zfd } from "zod-form-data";

import { prisma } from "~/db.server";
import { getContents } from "~/models/content.server";
import { getProject } from "~/models/project.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
  project: Awaited<ReturnType<typeof getProject>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const contents = await getContents({
    projectId: user.currentProjectId,
  });

  if (!contents.length) {
    return redirect(Routes.AdminContentTitle);
  }

  return json<LoaderData>({
    contents,
    project: await getProject({
      id: user.currentProjectId,
    }),
  });
};

enum ActionType {
  AddTag = "add-tag",
  RemoveTag = "remove-tag",
}

const schema = zfd.formData({
  tag: zfd.text(),
  actionType: zfd.text(z.enum([ActionType.AddTag, ActionType.RemoveTag])),
});

export const action: ActionFunction = async ({ request }) => {
  const { tag, actionType } = schema.parse(await request.formData());

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const project = await getProject({
    id: user.currentProjectId,
  });

  if (!project) {
    return redirect(Routes.AdminCreateProject);
  }

  const tags =
    actionType === ActionType.RemoveTag
      ? [...project.tags.filter((t) => t !== tag.trim())]
      : Array.from(new Set([...project.tags, tag.trim()]));

  await prisma.project.update({
    where: {
      id: project.id,
    },
    data: {
      tags,
    },
  });

  return json({
    tags,
  });
};

export default function Page() {
  return (
    <main
      style={{
        textAlign: `center`,
      }}
    >
      <h1>Vertical Shorts App</h1>
      <h2>
        <em>Upload schedule, and manage your social media video content.</em>
      </h2>
      <hr />
      <section>
        <h2>1: </h2>
        {/* create project video */}
        <hr />
        <h2>2: </h2>
        {/* Upload Content video */}
        <hr />
        <h2>3: </h2>
        {/* Schedule and post video */}
        <hr />
      </section>
      <h2>Get Started</h2>
      <footer
        style={{
          position: `sticky`,
          bottom: 0,
          padding: `var(--space-md)`,
          marginBlockStart: `var(--space-md)`,
        }}
      >
        <fieldset>
          <form action="" method="POST">
            <button type="submit">Create Account</button>
            <br />
            <button type="button">Log In</button>
          </form>
        </fieldset>
      </footer>
    </main>
  );
}
