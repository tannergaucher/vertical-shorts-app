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
import styles from "~/styles/login.module.css";
import { safeRedirect, validateEmail } from "~/utils";

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
    <main className={styles.main}>
      <h1>Login</h1>
      <fieldset disabled={disabled} className={styles.fieldset}>
        {actionData?.errors ? (
          <legend className={styles.legend}>Error!</legend>
        ) : null}
        <Form method="post">
          <div>
            <label htmlFor="email">
              Email address{" "}
              {actionData?.errors?.email && (
                <span style={{ color: `var(--warning)` }}>
                  {actionData.errors.email}
                </span>
              )}
            </label>
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
            </div>
          </div>
          <div>
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
          <label htmlFor="remember">
            <small>Remember me</small>
          </label>
          <br />
          <small>
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
          </small>
        </Form>
      </fieldset>
    </main>
  );
}
