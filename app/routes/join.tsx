import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import * as React from "react";
import { zfd } from "zod-form-data";

import { createUser, getUserByEmail } from "~/models/user.server";
import { Routes } from "~/routes";
import { createUserSession, getUserId } from "~/session.server";
import { safeRedirect, validateEmail } from "~/utils";

import { Layout } from "../components/layout";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

const schema = zfd.formData({
  email: zfd.text(),
  password: zfd.text(),
  redirectTo: zfd.text().optional(),
});

export async function action({ request }: ActionArgs) {
  const { email, password, redirectTo } = schema.parse(
    await request.formData()
  );

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "is too short" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json(
      {
        errors: {
          email: "A user already exists with this email",
          password: null,
        },
      },
      { status: 400 }
    );
  }

  const user = await createUser(email, password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo: safeRedirect(redirectTo, Routes.Index),
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Join",
  };
};

export default function Page() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? Routes.Index;
  const actionData = useActionData<typeof action>();
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const transition = useNavigation();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  const disabled =
    transition.state === "loading" || transition.state === "submitting";

  return (
    <Layout
      h1="Join"
      h2="Please sign up to below to start posting content."
      user={null}
    >
      <Form method="post">
        <fieldset disabled={disabled}>
          {actionData?.errors ? <legend data-error>Error!</legend> : null}
          <label htmlFor="email">
            Email address{" "}
            {actionData?.errors?.email && (
              <span
                style={{
                  color: `var(--error)`,
                }}
              >
                {actionData.errors.email}
              </span>
            )}
          </label>
          <input
            ref={emailRef}
            id="email"
            required
            autoFocus={true}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
            aria-describedby="email-error"
          />
          <label htmlFor="password">
            Password{" "}
            {actionData?.errors?.password && (
              <span
                style={{
                  color: `var(--error)`,
                }}
              >
                {actionData.errors.password}
              </span>
            )}
          </label>
          <input
            id="password"
            ref={passwordRef}
            name="password"
            type="password"
            autoComplete="new-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
          />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit">Create Account</button>
          <Link
            style={{
              textDecoration: "underline",
              marginBlockStart: "var(--space-sm)",
            }}
            to={{
              pathname: "/login",
              search: searchParams.toString(),
            }}
          >
            <small>Already have an account? Log in</small>
          </Link>
        </fieldset>
      </Form>
    </Layout>
  );
}
