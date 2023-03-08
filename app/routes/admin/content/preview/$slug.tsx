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

  const imageSrc = content.thumbnail
    ? getGcsImageSrc({
        bucket: content.projectId,
        file: content.thumbnail,
      })
    : null;

  const videoSrc = content.video
    ? getGcsVideoSrc({
        bucket: content.projectId,
        file: content.video,
      })
    : null;

  return (
    <main>
      <h1>{content.title}</h1>
      <div style={{ display: `grid`, gridTemplateColumns: `1fr 1fr` }}>
        {videoSrc ? (
          <video
            src={videoSrc}
            controls
            style={{ width: `100%` }}
            autoPlay
            muted
          />
        ) : null}
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={content.title}
            style={{ width: `100%`, position: `sticky`, top: `0` }}
          />
        ) : null}
      </div>
    </main>
  );
}
