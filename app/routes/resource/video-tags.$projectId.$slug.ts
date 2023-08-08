import { type LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import { CLOUD_VIDEO_INTELLIGENCE_BASE_URL } from "~/utils/constants";

export async function loader({ params }: LoaderArgs) {
  const { projectId, slug } = params;

  invariant(projectId, "projectId is required");
  invariant(slug, "slug is required");

  const res = await fetch(
    `${CLOUD_VIDEO_INTELLIGENCE_BASE_URL}/generate-tags`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId,
        slug,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Something went wrong fetching video labels resource route data"
    );
  }

  return await res.json();
}
