import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  await logout(request);

  return redirect("/");
}
