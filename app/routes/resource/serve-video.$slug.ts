import type { LoaderArgs } from "@remix-run/node";

import { UPLOAD_SERVICE_BASE_URL } from "~/utils/constants";

export async function loader({ params }: LoaderArgs) {
  const { slug } = params;

  const videoRes = await fetch(
    `${UPLOAD_SERVICE_BASE_URL}/serve-video?slug=${slug}`
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
