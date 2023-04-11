export async function uploadInstagramReel() {
  const USER_ID = "111151558605883";
  const IMAGE_URL = `https://storage.googleapis.com/clfsh0ses000ejs08izbzgm5n/jkjkjk.jpg`;
  const CAPTION = `#testCaption`;

  const ACCESS_TOKEN = "";

  const res = await fetch(
    `https://graph.facebook.com/v16.0/${USER_ID}/media?image_url=${IMAGE_URL}&caption=${CAPTION}&access_token=${ACCESS_TOKEN}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();
}

uploadInstagramReel();
