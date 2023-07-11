-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "tags" STRING[] DEFAULT ARRAY[]::STRING[];
