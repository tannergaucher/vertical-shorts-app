import { type LoaderArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

export async function loader({ params }: LoaderArgs) {
  const { projectId, slug } = params;

  invariant(projectId, "projectId is required");
  invariant(slug, "slug is required");

  return redirect(`https://storage.googleapis.com/${projectId}/${slug}.mp4`);
}
