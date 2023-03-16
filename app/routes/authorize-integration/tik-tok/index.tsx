import { redirect } from "@remix-run/node";

export const loader = async () => {
  const xsrfState =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const url = `https://www.tiktok.com/auth/authorize?client_key=${
    process.env.TIKTOK_CLIENT_KEY
  }&response_type=code&scope=user.info.basic&redirect_uri=${encodeURIComponent(
    `http://localhost:3000/authorize-integration/tiktok/success`
  )}&state=${xsrfState}`;

  return redirect(url);
};
