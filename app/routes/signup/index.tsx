import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect } from "react";

import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import styles from "~/styles/signup.module.css";

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
  userId: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  return json<LoaderData>({
    userId: user.id,
  });
};

export default function Page() {
  const { userId } = useLoaderData<LoaderData>();

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
    <main className={styles.main}>
      <h1 className={styles.heading}> Choose Your Plan!</h1>
      <stripe-pricing-table
        pricing-table-id="prctbl_1NLh9UKQkHgqj5P6jwEvgVql"
        publishable-key="pk_test_51NLh4NKQkHgqj5P6rhGx8THLGek4w6jRvFI0MqZ3XxzsWE9U0zEhfi0H84V8DNzYUs0cwx9I35IZKVIsYrZcRH4M00GfghuOVd"
        client-reference-id={userId}
      ></stripe-pricing-table>
    </main>
  );
}
