-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('NOT_STARTED', 'UPLOADING', 'PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "facebookStatus" "UploadStatus" DEFAULT 'NOT_STARTED';
ALTER TABLE "Content" ADD COLUMN     "instagramStatus" "UploadStatus" DEFAULT 'NOT_STARTED';
ALTER TABLE "Content" ADD COLUMN     "tikTokStatus" "UploadStatus" DEFAULT 'NOT_STARTED';
ALTER TABLE "Content" ADD COLUMN     "twitterStatus" "UploadStatus" DEFAULT 'NOT_STARTED';
ALTER TABLE "Content" ADD COLUMN     "youtubeStatus" "UploadStatus" DEFAULT 'NOT_STARTED';
