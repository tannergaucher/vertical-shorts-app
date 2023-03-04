import { Form } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { upsertContent } from "~/models/content.server";
import { getUser } from "~/session.server";
import { redirect } from "@remix-run/node";
import { Routes } from "~/routes";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  if (!title) {
    return new Response("Title is required", { status: 400 });
  }

  const user = await getUser(request);

  console.log(user, "user");

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    title: title.toString().trim(),
    projectId: user.currentProjectId,
    slug,
  });

  return redirect(Routes.AdminContentThumbnail(slug));
};

export default function Page() {
  return (
    <main>
      <Form method="post">
        <label htmlFor="">
          Title
          <br />
          <input type="text" name="title" required />
        </label>
        <button type="submit">Next</button>
      </Form>
    </main>
  );
}
