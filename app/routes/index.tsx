import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

import { Layout } from "~/components/layout";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (user?.id) {
    return redirect(Routes.Admin);
  }

  return {};
};

export default function Page() {
  return (
    <Layout
      h1="Vertical Shorts"
      h2="Upload once and post vertical videos to all your social media channels."
      user={null}
    >
      <hr />
      <section>
        <article>
          <video
            src={`https://storage.cloud.google.com/vertical-shorts-app/create.mp4`}
            width="100%"
            autoPlay
            loop
            muted
          ></video>
          <h2>1. Connect Channels </h2>
        </article>
        <article>
          <video
            src={`https://storage.cloud.google.com/vertical-shorts-app/connect.mp4`}
            width="100%"
            autoPlay
            loop
            muted
          ></video>
          <h2>2. Upload Content </h2>
        </article>
        <article>
          <video
            src={`https://storage.cloud.google.com/vertical-shorts-app/publish.mp4`}
            width="100%"
            autoPlay
            loop
            muted
          ></video>
          <h2>3. Post </h2>
        </article>
      </section>
      <hr />
      <h2
        style={{
          textAlign: `center`,
        }}
      >
        Get Started
      </h2>
      <footer
        style={{
          position: `sticky`,
          bottom: 0,
          padding: `var(--space-md)`,
          marginBlockStart: `var(--space-md)`,
          display: `grid`,
          gridTemplateColumns: `1fr 1fr`,
          gap: `var(--space-xs)`,
        }}
      >
        <Link
          to={Routes.Join}
          style={{
            width: `100%`,
          }}
        >
          <button
            type="submit"
            style={{
              width: `100%`,
            }}
          >
            Sign Up
          </button>
        </Link>
        <Link
          to={Routes.Login}
          style={{
            width: `100%`,
          }}
        >
          <button
            type="button"
            style={{
              width: `100%`,
            }}
          >
            Log In
          </button>
        </Link>
      </footer>
    </Layout>
  );
}
