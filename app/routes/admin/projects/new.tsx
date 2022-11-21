import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { ProjectActionData } from "~/forms/project-form";
import { ProjectForm } from "~/forms/project-form";
import { createProject } from "~/models/project.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const slug = formData.get("slug");
  const markdown = formData.get("markdown");

  const errors: ProjectActionData = {
    title: title ? null : "is required",
    slug: slug ? null : "is required",
    markdown: markdown ? null : "is required",
  };
  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);
  if (hasErrors) {
    return json<ProjectActionData>(errors);
  }

  invariant(typeof title === "string", "title must be a string");
  invariant(typeof slug === "string", "slug must be a string");
  invariant(typeof markdown === "string", "markdown must be a string");

  await createProject({ title, slug, markdown });

  return redirect(`/admin/projects/preview/${slug}`);
};

export default function NewProject() {
  const errors = useActionData<ProjectActionData>();

  return (
    <fieldset>
      <ProjectForm errors={errors} submitText="Create Project" />
    </fieldset>
  );
}
