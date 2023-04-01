export async function uploadInstagramReel(cloudEvent: any) {
  // step 1. Create the upload container

  const USER_ID = "111151558605883";
  const IMAGE_URL = `https://storage.googleapis.com/clfsh0ses000ejs08izbzgm5n/jkjkjk.jpg`;
  const CAPTION = `#testCaption`;

  const ACCESS_TOKEN =
    "EABYZCQTYX4ckBAOnaMPp1u09mZCQBPc6rj7XQlBwsjComxlLo5eN3JsnQjeqtVPLOCJ6nDXFDy3H2nc3KhFAZBM5Smejf2FyH6v8WXDtcugf2CEYyuOIz5qeTMdsBvVRf32hL6TfEmR4Y4ScmAoyGhuXshF91YunZA6ZCC0CVVXia3ZCTxUIdblZC9GEl5qHFQZD";

  const res = await fetch(
    `https://graph.facebook.com/v16.0/${USER_ID}/media?image_url=${IMAGE_URL}&caption=${CAPTION}&access_token=${ACCESS_TOKEN}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  console.log(data, "__DATA__");

  // step 2. Publish the upload container
}

uploadInstagramReel("sd");
