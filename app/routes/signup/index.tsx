import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Layout } from "~/components/layout";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ["stripe-pricing-table"]: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

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

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://js.stripe.com/v3/pricing-table.js";
    scriptTag.async = true;
    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Layout
      h1="Choose Your Plan!"
      h2="Select a plan below. You can update your plan later"
      user={user}
    >
      <stripe-pricing-table
        pricing-table-id="prctbl_1NLh9UKQkHgqj5P6jwEvgVql"
        publishable-key="pk_test_51NLh4NKQkHgqj5P6rhGx8THLGek4w6jRvFI0MqZ3XxzsWE9U0zEhfi0H84V8DNzYUs0cwx9I35IZKVIsYrZcRH4M00GfghuOVd"
        client-reference-id={user?.id}
      ></stripe-pricing-table>
    </Layout>
  );
}
