/*
  Warnings:

  - Added the required column `handle` to the `TikTokCredentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "facebookId" STRING;
ALTER TABLE "Content" ADD COLUMN     "instagramId" STRING;
ALTER TABLE "Content" ADD COLUMN     "tikTokId" STRING;
ALTER TABLE "Content" ADD COLUMN     "twitterId" STRING;
ALTER TABLE "Content" ADD COLUMN     "youtubeId" STRING;

-- AlterTable
ALTER TABLE "TikTokCredentials" ADD COLUMN     "handle" STRING NOT NULL;
