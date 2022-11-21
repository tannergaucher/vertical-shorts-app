import { Form } from "@remix-run/react";

import type { Project } from "~/models/project.server";

export type ProjectActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
    }
  | undefined;

export function ProjectForm(props: {
  project?: Pick<Project, "title" | "slug" | "markdown">;
  errors?: ProjectActionData;
  submitText: string;
}) {
  const { project, errors } = props;

  return (
    <Form method="post">
      <label>
        Title{" "}
        {errors?.title ? (
          <em className="warning-text">{errors.title}</em>
        ) : null}
        <input
          name="title"
          type="text"
          defaultValue={project?.title}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Slug{" "}
        {errors?.slug ? <em className="warning-text">{errors.slug}</em> : null}
        <input
          name="slug"
          type="text"
          defaultValue={project?.slug}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Markdown{" "}
        {errors?.markdown ? (
          <em className="warning-text">{errors.markdown}</em>
        ) : null}
        <textarea
          id="markdown"
          name="markdown"
          defaultValue={project?.markdown}
          style={{ width: "100%", height: "20rem" }}
        ></textarea>
      </label>
      <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
        {props.submitText}
      </button>
    </Form>
  );
}
