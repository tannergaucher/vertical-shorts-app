/*
  Warnings:

  - You are about to drop the column `slug` on the `Content` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Content_projectId_slug_key";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "slug";
ALTER TABLE "Content" ALTER COLUMN "title" DROP NOT NULL;
