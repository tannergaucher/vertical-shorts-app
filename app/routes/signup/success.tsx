import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }
};

export default function Page() {
  return (
    <main>
      <h1>Success</h1>
    </main>
  );
}
