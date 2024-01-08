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
      <header className="sticky top-0 left-0 right-0 z-50 bg-white shadow">
        <div className="flex justify-between items-center p-4">
          <Link to={Routes.AdminContent} className="mr-4">
            <h2 className="px-4 py-2">Vertical Shorts</h2>
          </Link>
          <div>
            <Link to={Routes.Admin} className="mr-4">
              <button className="px-4 py-2 text-blue-500 bg-transparent border border-blue-500 rounded">
                Settings
              </button>
            </Link>
            <Link to={Routes.AdminContentUpload(id)}>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Upload
              </button>
            </Link>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 my-8">{h1}</h1>
        <h2 className="text-xl font-medium text-gray-700">
          <em>{h2}</em>
        </h2>
        {children}
      </main>
    </>
  );
}
