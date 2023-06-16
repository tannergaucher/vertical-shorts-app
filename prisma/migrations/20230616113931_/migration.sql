/*
  Warnings:

  - You are about to drop the column `publishAt` on the `Content` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Content` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Content" DROP COLUMN "publishAt";
ALTER TABLE "Content" DROP COLUMN "published";
