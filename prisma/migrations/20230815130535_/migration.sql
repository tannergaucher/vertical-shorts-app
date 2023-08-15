/*
  Warnings:

  - You are about to drop the column `username` on the `InstagramCredentials` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `YoutubeCredentials` table. All the data in the column will be lost.
  - Added the required column `dataAccessExpirationTime` to the `InstagramCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresIn` to the `InstagramCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signedRequest` to the `InstagramCredentials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `InstagramCredentials` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropIndex
DROP INDEX "YoutubeCredentials_projectId_userId_key";

-- AlterTable
ALTER TABLE "InstagramCredentials" DROP COLUMN "username";
ALTER TABLE "InstagramCredentials" ADD COLUMN     "dataAccessExpirationTime" INT4 NOT NULL;
ALTER TABLE "InstagramCredentials" ADD COLUMN     "expiresIn" INT4 NOT NULL;
ALTER TABLE "InstagramCredentials" ADD COLUMN     "signedRequest" STRING NOT NULL;
ALTER TABLE "InstagramCredentials" ADD COLUMN     "userId" STRING NOT NULL;

-- AlterTable
ALTER TABLE "YoutubeCredentials" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
