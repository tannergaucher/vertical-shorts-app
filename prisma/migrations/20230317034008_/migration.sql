/*
  Warnings:

  - You are about to drop the column `markdown` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnail` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "markdown";
ALTER TABLE "Content" DROP COLUMN "thumbnail";
ALTER TABLE "Content" DROP COLUMN "video";
