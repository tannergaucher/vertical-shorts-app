import * as functions from "@google-cloud/functions-framework";

functions.cloudEvent("upload-youtube-short", async (cloudEvent) => {
  await uploadTiktokVideo(cloudEvent);

  return { message: "success" };
});

export async function uploadTiktokVideo(cloudEvent: any) {
  const parsedData = JSON.parse(
    Buffer.from(cloudEvent.data, "base64").toString("utf8")
  );

  console.log(parsedData);
}
