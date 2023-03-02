/*
  Warnings:

  - You are about to drop the column `facebookPostPostSlug` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `instagramPostPostSlug` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `tikTokPostPostSlug` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[contentProjectId,contentSlug]` on the table `FacebookPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentProjectId,contentSlug]` on the table `InstagramPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentProjectId,contentSlug]` on the table `TikTokPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentProjectId` to the `FacebookPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentSlug` to the `FacebookPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentProjectId` to the `InstagramPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentSlug` to the `InstagramPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentProjectId` to the `TikTokPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contentSlug` to the `TikTokPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_facebookPostPostSlug_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_instagramPostPostSlug_fkey";

-- DropForeignKey
ALTER TABLE "Content" DROP CONSTRAINT "Content_tikTokPostPostSlug_fkey";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "facebookPostPostSlug";
ALTER TABLE "Content" DROP COLUMN "instagramPostPostSlug";
ALTER TABLE "Content" DROP COLUMN "tikTokPostPostSlug";

-- AlterTable
ALTER TABLE "FacebookPost" ADD COLUMN     "contentProjectId" STRING NOT NULL;
ALTER TABLE "FacebookPost" ADD COLUMN     "contentSlug" STRING NOT NULL;

-- AlterTable
ALTER TABLE "InstagramPost" ADD COLUMN     "contentProjectId" STRING NOT NULL;
ALTER TABLE "InstagramPost" ADD COLUMN     "contentSlug" STRING NOT NULL;

-- AlterTable
ALTER TABLE "TikTokPost" ADD COLUMN     "contentProjectId" STRING NOT NULL;
ALTER TABLE "TikTokPost" ADD COLUMN     "contentSlug" STRING NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FacebookPost_contentProjectId_contentSlug_key" ON "FacebookPost"("contentProjectId", "contentSlug");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_contentProjectId_contentSlug_key" ON "InstagramPost"("contentProjectId", "contentSlug");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokPost_contentProjectId_contentSlug_key" ON "TikTokPost"("contentProjectId", "contentSlug");

-- AddForeignKey
ALTER TABLE "TikTokPost" ADD CONSTRAINT "TikTokPost_contentProjectId_contentSlug_fkey" FOREIGN KEY ("contentProjectId", "contentSlug") REFERENCES "Content"("projectId", "slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramPost" ADD CONSTRAINT "InstagramPost_contentProjectId_contentSlug_fkey" FOREIGN KEY ("contentProjectId", "contentSlug") REFERENCES "Content"("projectId", "slug") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookPost" ADD CONSTRAINT "FacebookPost_contentProjectId_contentSlug_fkey" FOREIGN KEY ("contentProjectId", "contentSlug") REFERENCES "Content"("projectId", "slug") ON DELETE RESTRICT ON UPDATE CASCADE;
