import { Form, useTransition } from "@remix-run/react";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { upsertContent } from "~/models/content.server";
import { Routes } from "~/routes";
import { getUser } from "~/session.server";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title");

  invariant(typeof title === "string", "title is required");

  const user = await getUser(request);

  if (!user?.currentProjectId) {
    return redirect(Routes.AdminCreateProject);
  }

  const slug = title.toString().trim().toLowerCase().replace(/ /g, "-");

  await upsertContent({
    slug,
    title: title.toString().trim(),
    projectId: user.currentProjectId,
  });

  return redirect(Routes.AdminContentThumbnail(slug));
};

export default function Page() {
  const transition = useTransition();

  return (
    <main>
      <h1>Publish Post:</h1>
      <fieldset
        disabled={
          transition.state === "loading" || transition.state === "submitting"
        }
      >
        <Form method="post">
          <label>
            Post Title
            <br />
            <input
              type="text"
              name="title"
              required
              style={{
                width: `calc(100% - 8px)`,
                marginBlockStart: `8px`,
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              width: `100%`,
              marginBlockStart: `16px`,
            }}
          >
            Next
          </button>
        </Form>
      </fieldset>
    </main>
  );
}
