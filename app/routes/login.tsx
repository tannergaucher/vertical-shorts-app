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

import { verifyLogin } from "~/models/user.server";
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
  redirectTo: zfd.text(),
  remember: zfd.text().optional(),
});

export async function action({ request }: ActionArgs) {
  const { email, password, redirectTo, remember } = schema.parse(
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

  const user = await verifyLogin(email, password);

  if (!user) {
    return json(
      { errors: { email: "Invalid email or password", password: null } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: safeRedirect(redirectTo, Routes.Admin),
  });
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function Page() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || Routes.Admin;
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
    <Layout h1="Log In" h2="Log in to start posting content">
      <fieldset disabled={disabled}>
        {actionData?.errors ? <legend>Error!</legend> : null}
        <Form method="post">
          <label htmlFor="email">
            Email address{" "}
            {actionData?.errors?.email && (
              <span style={{ color: `var(--warning)` }}>
                {actionData.errors.email}
              </span>
            )}
          </label>
          <br />
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
                  color: `var(--warning)`,
                }}
              >
                {actionData.errors.password}
              </span>
            )}
          </label>
          <br />
          <input
            id="password"
            ref={passwordRef}
            name="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={actionData?.errors?.password ? true : undefined}
            aria-describedby="password-error"
          />
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit">Log in</button>
          <br />
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              justifyContent: `start`,
            }}
          >
            <input
              id="remember"
              name="remember"
              type="checkbox"
              style={{
                width: "fit-content",
                marginBlock: `var(--space-md)`,
                marginInline: 0,
              }}
            />
            <br />
            <label htmlFor="remember" style={{ marginLeft: `var(--space-sm)` }}>
              Remember me
            </label>
          </div>
          <Link
            to={{
              pathname: "/join",
              search: searchParams.toString(),
            }}
          >
            <h4
              style={{
                marginLeft: `0`,
              }}
            >
              Don't have an account? Sign up
            </h4>
          </Link>
        </Form>
      </fieldset>
    </Layout>
  );
}
