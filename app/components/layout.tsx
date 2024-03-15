import { Link } from "@remix-run/react";
import { type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import { Routes } from "../routes";
import type { getUser } from "../session.server";

type HeaderProps = {
  children: ReactNode;
  h1: string;
  h2?: string;
  user: Awaited<ReturnType<typeof getUser>> | null;
};

export function Layout({ children, h1, h2, user }: HeaderProps) {
  const id = uuidv4();

  return (
    <>
      <header
        style={{
          padding: `var(--space-xs)`,
        }}
      >
        <Link to={Routes.AdminContent}>
          <button>Vertical Shorts</button>
        </Link>
        {user ? (
          <div>
            <Link to={Routes.Admin}>
              <button
                style={{
                  marginRight: `var(--space-xs)`,
                }}
              >
                Settings
              </button>
            </Link>
            <Link to={Routes.AdminContentUpload(id)}>
              <button type="submit">Upload</button>
            </Link>
          </div>
        ) : null}
      </header>
      <main>
        <h1>{h1}</h1>
        {h2 && <h2>{h2}</h2>}
        {children}
      </main>
    </>
  );
}
