import { Link } from "@remix-run/react";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

import styles from "~/styles/index.css";
import { getUser } from "./session.server";
import { Routes } from "./routes";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user?: Awaited<ReturnType<typeof getUser>>;
};

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const { user } = useLoaderData<LoaderData>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <nav>
          <Link
            to={Routes.Index}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <h2>
                <em>
                  <b>Posts</b>
                </em>
              </h2>
            </div>
          </Link>

          <Link
            to={Routes.AdminContentTitle}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <h2>
                <em>
                  <b>Publish</b>
                </em>
              </h2>
            </div>
          </Link>

          <Link
            to={Routes.Admin}
            style={{
              textDecoration: "none",
            }}
          >
            <div
              style={{
                background: "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              <h2>
                <em>
                  <b>Admin</b>
                </em>
              </h2>
            </div>
          </Link>

          {user ? (
            <Link
              to={Routes.Logout}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h2>
                  <em>
                    <b>Logout</b>
                  </em>
                </h2>
              </div>
            </Link>
          ) : (
            <Link
              to={Routes.Login}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #f6d365 0%, #fda085 100%)",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <h2>
                  <em>
                    <b>Login</b>
                  </em>
                </h2>
              </div>
            </Link>
          )}
        </nav>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
