// import { prisma } from "../app/db.server";

// export async function uploadIgVideo(contentSlug: string, projectId: string) {
//   const content = await prisma.content.findUnique({
//     where: {
//       slug: contentSlug,
//       projectId,
//     },
//     include: {
//       instagramPost: true,
//       project: {
//         include: {
//           user: {
//             include: {
//               instagramCredentials: true,
//             },
//           },
//         },
//       },
//     },
//   });

//   if (!content) {
//     throw new Error("CONTENT_NOT_FOUND");
//   }

//   if (!content.instagramPost) {
//     throw new Error("NO_IG_POST");
//   }

//   if (!content.project.user.instagramCredentials) {
//     throw new Error("NO_IG_USER_CREDENTIALS");
//   }

//   const INSTAGRAM_VIDEO_UPLOAD_URL = `graph.facebook.com/${content.project.user.instagramCredentials.userId}/media?media_type=VIDEO&video_url=${content.instagramPost.gcsVideoUrl}&is_carousel_item=false&caption=${content.instagramPost.caption}&access_token=${content.project.user.instagramCredentials.accessToken}`;

//   const res = await fetch(INSTAGRAM_VIDEO_UPLOAD_URL, {
//     method: "post",
//   });

//   console.log(res, "res");
// }

export default function () {}
