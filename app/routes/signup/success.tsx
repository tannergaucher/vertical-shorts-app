import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  return json<LoaderData>({
    user,
  });
};

export default function Page() {
  const { user } = useLoaderData<LoaderData>();
  return (
    <Layout h1="Success" h2="You've Signed Up!" user={user}>
      <h1>Success</h1>
    </Layout>
  );
}
