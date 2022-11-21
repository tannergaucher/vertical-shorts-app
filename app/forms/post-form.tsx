import { Form } from "@remix-run/react";

import type { Post } from "~/models/post.server";
import type { Project } from "~/models/project.server";

export type PostActionData =
  | {
      title: null | string;
      slug: null | string;
      markdown: null | string;
      projectSlug: null | string;
      projects?: Project[];
    }
  | undefined;

export function PostForm(props: {
  post?: Pick<Post, "title" | "slug" | "markdown" | "projectSlug">;
  errors?: PostActionData;
  submitText: string;
  projects?: Project[];
}) {
  const { post, errors, projects } = props;

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
          defaultValue={post?.title}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Slug{" "}
        {errors?.slug ? <em className="warning-text">{errors.slug}</em> : null}
        <input
          name="slug"
          type="text"
          defaultValue={post?.slug}
          style={{ width: "100%" }}
        />
      </label>
      <label>
        Project{" "}
        {errors?.projectSlug ? (
          <em className="warning-text">{errors.projectSlug}</em>
        ) : null}
        <select name="projectSlug">
          <option value="">None</option>
          {projects?.map((project) => (
            <option key={project.slug} value={project.slug}>
              {project.title}
            </option>
          ))}
        </select>
        <br />
      </label>
      <label>
        Markdown{" "}
        {errors?.markdown ? (
          <em className="warning-text">{errors.markdown}</em>
        ) : null}
        <textarea
          id="markdown"
          name="markdown"
          defaultValue={post?.markdown}
          style={{ width: "100%", height: "20rem" }}
        ></textarea>
      </label>
      <button type="submit" style={{ width: `100%`, textAlign: `left` }}>
        {props.submitText}
      </button>
    </Form>
  );
}
