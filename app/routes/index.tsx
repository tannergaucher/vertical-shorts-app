import type { LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
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
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
  });
};

export default function Page() {
  const { contents } = useLoaderData<LoaderData>();

  return (
    <main className="padding">
      {contents.length ? (
        <ul>
          {contents.map((content) => (
            <li key={content.slug}>
              <Link to={Routes.AdminContentPreview(content.slug)}>{`${
                content.published
                  ? `${content.title}`
                  : `Draft - ${content.title}`
              }`}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <h2>No content yet for this project</h2>
      )}
    </main>
  );
}
