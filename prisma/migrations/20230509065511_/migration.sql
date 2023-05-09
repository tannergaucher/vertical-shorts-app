/*
  Warnings:

  - You are about to drop the column `clientKey` on the `TikTokCredentials` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `TikTokCredentials` table. All the data in the column will be lost.
  - Added the required column `refreshToken` to the `TikTokCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshTokenExpiresIn` to the `TikTokCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `TikTokCredentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TikTokCredentials" DROP COLUMN "clientKey";
ALTER TABLE "TikTokCredentials" DROP COLUMN "username";
ALTER TABLE "TikTokCredentials" ADD COLUMN     "refreshToken" STRING NOT NULL;
ALTER TABLE "TikTokCredentials" ADD COLUMN     "refreshTokenExpiresIn" INT4 NOT NULL;
ALTER TABLE "TikTokCredentials" ADD COLUMN     "scope" STRING NOT NULL;
