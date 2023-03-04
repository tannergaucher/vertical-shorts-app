import { Form, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import { pubsub } from "~/entry.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  if (!title) {
    return new Response("Title is required", { status: 400 });
  }

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    title: title.toString().trim(),
    projectId: user.currentProjectId,
    slug,
  });

  const dataBuffer = Buffer.from(
    JSON.stringify({ slug, projectId: user.currentProjectId })
  );

  await pubsub.topic("update-content-title").publishMessage({
    data: dataBuffer,
  });

  return redirect(Routes.AdminContentThumbnail(slug));
};

export default function Page() {
  const transition = useTransition();

  return (
    <main>
      <fieldset disabled={transition.state === "loading"}>
        <Form method="post">
          <label>
            Title
            <br />
            <input type="text" name="title" required />
          </label>
          <button type="submit">Next</button>
        </Form>
      </fieldset>
    </main>
  );
}
