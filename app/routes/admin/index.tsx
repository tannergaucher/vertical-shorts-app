import type { LoaderArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { getContents } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";

type LoaderData = {
  contents?: Awaited<ReturnType<typeof getContents>>;
};

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);

  if (!user?.id) {
    return redirect(Routes.Login);
  }

  if (!user.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  return json<LoaderData>({
    contents: await getContents({
      projectId: user.currentProjectId,
    }),
  });
};

export default function Page() {
  const { contents } = useLoaderData<LoaderData>();

  return (
    <main>
      <fieldset>
        <Form>
          <label htmlFor="currentProject">Current Project</label>
          <br />
          <select
            id="currentProject"
            name="currentProject"
            style={{
              width: "100%",
            }}
          >
            {/* projects from db */}
            <option value="1">Project 1</option>
            <option value="2">Project 2</option>
            <option value="3">Project 3</option>
          </select>
        </Form>
      </fieldset>
    </main>
  );
}
