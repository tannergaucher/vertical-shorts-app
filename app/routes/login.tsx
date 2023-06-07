import type { ActionArgs, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import * as React from "react";

import { verifyLogin } from "~/models/user.server";
import { Routes } from "~/routes";
import { createUserSession, getUserId } from "~/session.server";
import styles from "~/styles/login.module.css";
import { safeRedirect, validateEmail } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), Routes.Admin);
  const remember = formData.get("remember");

  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
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
    redirectTo,
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

  const transition = useTransition();

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
    <main className={styles.main}>
      <h1>Login</h1>
      <fieldset disabled={disabled} className={styles.fieldset}>
        <Form>
          <div>
            <label htmlFor="email">Email address</label>
            <div>
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
                className={styles.input}
              />
              {actionData?.errors?.email && (
                <div style={{ color: `palevioletred` }} id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                ref={passwordRef}
                name="password"
                type="password"
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                className={styles.input}
              />
              {actionData?.errors?.password && (
                <div
                  style={{
                    color: `palevioletred`,
                  }}
                  id="password-error"
                >
                  {actionData.errors.password}
                </div>
              )}
            </div>
          </div>
          <input type="hidden" name="redirectTo" value={redirectTo} />
          <button type="submit" className={styles.button}>
            Log in
          </button>
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className={styles.checkbox}
          />
          <label htmlFor="remember">Remember me</label>
          <div>
            Don't have an account?{" "}
            <Link
              className={styles.signUp}
              to={{
                pathname: "/join",
                search: searchParams.toString(),
              }}
            >
              Sign up
            </Link>
          </div>
        </Form>
      </fieldset>
    </main>
  );
}
