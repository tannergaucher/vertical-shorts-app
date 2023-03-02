import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

export const action = async () => {
  // get the user from the request
  //
  const xsrfState = Math.random().toString(36).substring(2);
  const scopes = `user.info.basic`;

  const CLIENT_KEY = `aw236r29sk1l0dgu`;
  const REDIRECT_URI = `homerice.app/publisher/authorize-integration/success`;
  const TIK_TOK_BASE_URL = `https://www.tiktok.com/auth/authorize/`;
  const AUTHORIZE_TIK_TOK_URL = `${TIK_TOK_BASE_URL}?client_key=${CLIENT_KEY}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${xsrfState}&response_type=code`;

  const res = await fetch(AUTHORIZE_TIK_TOK_URL);

  return redirect(res.url);
};

export default function Page() {
  return (
    <main>
      <Form method="post">
        <button type="submit">Authorize TikTok</button>
      </Form>
    </main>
  );
}
