import { Link } from "@remix-run/react";
import { type ReactNode } from "react";

import { Routes } from "../routes";

type HeaderProps = {
  children: ReactNode;
  h1: string;
  h2?: string;
};

export function Layout({ children, h1, h2 }: HeaderProps) {
  return (
    <>
      <header
        style={{
          padding: `var(--space-xs)`,
        }}
      >
        <Link to={Routes.Index}>
          <button>Vertical Shorts</button>
        </Link>
        <div>
          <Link to={Routes.Admin}>
            <button
              style={{
                marginRight: `var(--space-xs)`,
              }}
            >
              Admin
            </button>
          </Link>
          <Link to={Routes.AdminContentTitle}>
            <button type="submit">Create</button>
          </Link>
        </div>
      </header>
      <main>
        <h1>{h1}</h1>
        <h2>
          <em>{h2}</em>
        </h2>
        {children}
      </main>
    </>
  );
}
