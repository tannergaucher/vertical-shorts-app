/*
  Warnings:

  - You are about to drop the column `userId` on the `YoutubeCredentials` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "UploadStatus" ADD VALUE 'SCHEDULED';

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_userId_fkey";

-- DropIndex
DROP INDEX "YoutubeCredentials_projectId_userId_key";

-- AlterTable
ALTER TABLE "YoutubeCredentials" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
