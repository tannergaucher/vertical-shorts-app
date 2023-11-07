import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";

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
    <main>
      <h1>Vertical Shorts App</h1>
      <h2>
        <em>Upload, schedule, and manage your social media video content.</em>
      </h2>
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
          <h2>1. Create </h2>
        </article>
        <article>
          <video
            src={`https://storage.cloud.google.com/vertical-shorts-app/connect.mp4`}
            width="100%"
            autoPlay
            loop
            muted
          ></video>
          <h2>2. Connect </h2>
        </article>
        <article>
          <video
            src={`https://storage.cloud.google.com/vertical-shorts-app/publish.mp4`}
            width="100%"
            autoPlay
            loop
            muted
          ></video>
          <h2>3. Publish </h2>
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
        }}
      >
        <Link to={Routes.Join}>
          <button
            type="submit"
            style={{
              marginBlockEnd: `var(--space-md)`,
            }}
          >
            Sign Up
          </button>
        </Link>

        <Link to={Routes.Login}>
          <button type="button">Log In</button>
        </Link>
      </footer>
    </main>
  );
}
