import { cssBundleHref } from "@remix-run/css-bundle";
import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import type { LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLocation } from "@remix-run/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import stylesheet from "../node_modules/@t_g/default-ui/package/index.css";
import { Routes } from "./routes";
import { getUser } from "./session.server";
import localStyles from "./styles/index.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: stylesheet,
      type: "text/css",
    },
    {
      rel: "stylesheet",
      href: localStyles,
      type: "text/css",
    },
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Vertical Shorts Platform",
  viewport: "width=device-width,initial-scale=1",
});

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

export default function App() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        {location.pathname === Routes.Signup ? (
          <script
            async
            src="https://js.stripe.com/v3/pricing-table.js"
          ></script>
        ) : null}
      </head>
      <body>
        <header>
          <menu>
            <details>
              <summary>Menu</summary>
              <nav>
                <ul>
                  <li>
                    <Link
                      to={Routes.Index}
                      data-current={
                        location.pathname === Routes.Index ? true : undefined
                      }
                    >
                      <h3>Content</h3>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={Routes.Admin}
                      data-current={
                        location.pathname === Routes.Admin
                          ? true
                          : undefined
                          ? true
                          : undefined
                      }
                    >
                      <h3>Settings</h3>
                    </Link>
                  </li>

                  <li>
                    <Link
                      to={Routes.AdminContentTitle}
                      data-current={
                        location.pathname.includes(Routes.AdminContentTitle)
                          ? true
                          : undefined
                      }
                    >
                      <h3>Publish</h3>
                    </Link>
                  </li>
                </ul>
              </nav>
            </details>
          </menu>
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
