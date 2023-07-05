-- AlterEnum
ALTER TYPE "UploadStatus" ADD VALUE 'INITIALIZING';

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "annotations" JSONB;
ALTER TABLE "Content" ADD COLUMN     "labels" JSONB;
