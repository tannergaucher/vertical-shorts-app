import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getContent } from "~/models/content.server";
import { getUser } from "~/session.server";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
};

export const loader: LoaderFunction = async ({ params, request }) => {
  const slug = params.slug;

  invariant(slug, "slug is required");

  const user = await getUser(request);

  invariant(user?.currentProjectId, "user must have a current project");

  return json({
    content: await getContent({
      slug,
      projectId: user.currentProjectId,
    }),
  });
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  return (
    <main>
      <h1>{content.title}</h1>
    </main>
  );
}
