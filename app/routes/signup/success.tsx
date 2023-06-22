import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import Stripe from "stripe";

import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  // check if the user has a subscription
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  //
};

export default function Page() {
  return (
    <main>
      <h1>Success</h1>
    </main>
  );
}
