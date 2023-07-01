import { redirect } from "@remix-run/node";

export const loader = async () => {
  const xsrfState =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const url = `https://www.tiktok.com/v2/auth/authorize?client_key=${process.env.TIKTOK_CLIENT_KEY}&response_type=code&scope=user.info.basic,video.list,video.upload&redirect_uri=${process.env.TIKTOK_REDIRECT_URI}&state=${xsrfState}`;

  return redirect(url);
};
