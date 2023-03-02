// import { Storage } from "@google-cloud/storage";
// import fs from "fs";
// import { prisma } from "../app/db.server";

// const storage = new Storage();

// export async function uploadTikTok(contentSlug: string, projectId: string) {
//   const content = await prisma.content.findUnique({
//     where: {
//       slug: contentSlug,
//       projectId,
//     },
//     include: {
//       tikTokPost: true,
//       project: {
//         include: {
//           user: {
//             include: {
//               tikTokCredentials: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (!content) {
//     throw new Error("NO_CONTENT");
//   }

//   if (!content.project.user.tikTokCredentials?.openId) {
//     throw new Error("NO_TIKTOK_OPEN_ID");
//   }

//   if (!content.project.user.tikTokCredentials?.accessToken) {
//     throw new Error("NO_TIKTOK_ACCESS_TOKEN");
//   }

//   const contentMp4Filename = `${content.slug}-tik-tok.mp4`;

//   storage
//     .bucket(content.project.userId)
//     .file(contentMp4Filename)
//     .createReadStream()
//     .pipe(fs.createWriteStream(contentMp4Filename))
//     .on("finish", () => {});

//   const res = await fetch(
//     `https://open-api.tiktok.com/share/video/upload?open_id=${content.project.user.tikTokCredentials.openId}&access_token=${content.project.user.tikTokCredentials.accessToken}`,
//     {
//       body: JSON.stringify({
//         video: contentMp4Filename,
//       }),
//     }
//   );

//   console.log(res, "res");
// }

export default function () {}
