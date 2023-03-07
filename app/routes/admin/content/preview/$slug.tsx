import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getContent } from "~/models/content.server";
import { getUser } from "~/session.server";
import { getGcsImageSrc, getGcsVideoSrc } from "~/utils/gcs";

type LoaderData = {
  content: Awaited<ReturnType<typeof getContent>>;
  user: Awaited<ReturnType<typeof getUser>>;
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
    user,
  });
};

export default function Page() {
  const { content } = useLoaderData<LoaderData>();

  const imageSrc = getGcsImageSrc({
    bucket: content.projectId,
    filename: content.thumbnail || "",
  });

  const videoSrc = getGcsVideoSrc({
    bucket: content.projectId,
    filename: content.video || "",
  });

  return (
    <main>
      <h1>{content.title}</h1>
      <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr` }}>
        <video
          src={videoSrc}
          controls
          style={{ width: `100%` }}
          autoPlay
          muted
        />
        <img
          src={imageSrc}
          alt="foo"
          style={{ width: `100%`, position: `sticky`, top: `0` }}
        />
      </div>
    </main>
  );
}
