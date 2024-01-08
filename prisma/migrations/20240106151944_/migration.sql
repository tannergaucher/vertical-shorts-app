-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('YOUTUBE', 'INSTAGRAM', 'TIKTOK', 'FACEBOOK', 'TWITTER');

-- CreateEnum
CREATE TYPE "UploadStatus" AS ENUM ('NOT_STARTED', 'INITIALIZING', 'UPLOADING', 'SCHEDULED', 'PRIVATE', 'PUBLIC');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('STARTER', 'GROWTH', 'PROFESSIONAL');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "currentProjectId" STRING,
    "planType" "PlanType",
    "stripeCustomerId" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Password" (
    "hash" STRING NOT NULL,
    "userId" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "YoutubeCredentials" (
    "id" STRING NOT NULL,
    "accessToken" STRING,
    "refreshToken" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channelId" STRING,
    "projectId" STRING NOT NULL,

    CONSTRAINT "YoutubeCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramCredentials" (
    "id" STRING NOT NULL,
    "accessToken" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" STRING NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "InstagramCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TikTokCredentials" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "handle" STRING NOT NULL,
    "accessToken" STRING NOT NULL,
    "refreshToken" STRING NOT NULL,
    "refreshTokenExpiresIn" INT4 NOT NULL,
    "scope" STRING NOT NULL,
    "openId" STRING NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "TikTokCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacebookCredentials" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pageId" STRING NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "FacebookCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwitterCredentials" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "TwitterCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" STRING NOT NULL,
    "slug" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "thumbnail" STRING,
    "gif" STRING,
    "tags" STRING[],
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "projectId" STRING NOT NULL,
    "youtubeId" STRING,
    "youtubeStatus" "UploadStatus" DEFAULT 'NOT_STARTED',
    "youtubePublishAt" TIMESTAMP(3),
    "tikTokId" STRING,
    "tikTokStatus" "UploadStatus" DEFAULT 'NOT_STARTED',
    "tikTokPublishAt" TIMESTAMP(3),
    "instagramId" STRING,
    "instagramStatus" "UploadStatus" DEFAULT 'NOT_STARTED',
    "instagramPublishAt" TIMESTAMP(3),
    "facebookId" STRING,
    "facebookStatus" "UploadStatus" DEFAULT 'NOT_STARTED',
    "facebookPublishAt" TIMESTAMP(3),
    "twitterId" STRING,
    "twitterStatus" "UploadStatus" DEFAULT 'NOT_STARTED',
    "twitterPublishAt" TIMESTAMP(3),
    "annotations" JSONB,
    "labels" JSONB,
    "transcription" JSONB,
    "textDetection" JSONB,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,
    "tags" STRING[] DEFAULT ARRAY[]::STRING[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "name" STRING NOT NULL,
    "views" INT4,
    "subscribers" INT4,
    "thumbnail" STRING,
    "channelType" "ChannelType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCredentials_projectId_key" ON "YoutubeCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramCredentials_projectId_key" ON "InstagramCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokCredentials_projectId_key" ON "TikTokCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookCredentials_projectId_key" ON "FacebookCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterCredentials_projectId_key" ON "TwitterCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_projectId_slug_key" ON "Content"("projectId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_projectId_channelType_key" ON "Channel"("projectId", "channelType");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeCredentials" ADD CONSTRAINT "YoutubeCredentials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramCredentials" ADD CONSTRAINT "InstagramCredentials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TikTokCredentials" ADD CONSTRAINT "TikTokCredentials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookCredentials" ADD CONSTRAINT "FacebookCredentials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwitterCredentials" ADD CONSTRAINT "TwitterCredentials_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
