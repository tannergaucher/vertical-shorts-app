import { Link } from "@remix-run/react";
import { type ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

import { Routes } from "../routes";

type HeaderProps = {
  children: ReactNode;
  h1: string;
  h2?: string;
};

export function Layout({ children, h1, h2 }: HeaderProps) {
  const id = uuidv4();

  return (
    <>
      <header>
        <details>
          <summary>VERTICAL SHORTS</summary>
          <ul>
            <li>
              <Link to={Routes.AdminContent}>
                <h3>Content</h3>
              </Link>
            </li>
            <li>
              <Link to={Routes.Admin}>
                <h3>Settings</h3>
              </Link>
            </li>
          </ul>
          <hr />

          <label htmlFor="">Select Project</label>
          <select
            name=""
            id=""
            style={{
              marginBlockEnd: `0`,
              width: `100%`,
            }}
          >
            <option value="1">Shorts</option>
            <option value="2">Verticals</option>
            <option value="3">Series</option>
          </select>

          <hr />

          <Link to={Routes.AdminContentUpload(id)}>
            <button type="submit">Upload</button>
          </Link>
        </details>
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
