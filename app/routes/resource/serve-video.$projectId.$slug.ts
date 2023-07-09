import type { LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  const { projectId, slug } = params;

  invariant(projectId, "projectId is required");
  invariant(slug, "slug is required");

  const videoRes = await fetch(
    `https://storage.googleapis.com/${projectId}/${slug}.mp4`
  );

  if (!videoRes.ok) {
    return new Response("No video response", {
      status: 404,
    });
  }

  return new Response(videoRes.body, {
    status: 200,
    headers: {
      "Content-Type": "video/mp4",
    },
  });
}
