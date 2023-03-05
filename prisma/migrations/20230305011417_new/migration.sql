-- CreateEnum
CREATE TYPE "IntegrationType" AS ENUM ('YOUTUBE', 'INSTAGRAM', 'TIKTOK', 'FACEBOOK', 'TWITTER');

-- CreateTable
CREATE TABLE "User" (
    "id" STRING NOT NULL,
    "email" STRING NOT NULL,
    "currentProjectId" STRING,
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
    "userId" STRING NOT NULL,
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
    "clientKey" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accessToken" STRING NOT NULL,
    "openId" STRING NOT NULL,
    "username" STRING NOT NULL,
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
    "slug" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "markdown" STRING,
    "thumbnail" STRING,
    "video" STRING,
    "tags" STRING[],
    "published" BOOL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "projectId" STRING NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("projectId","slug")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "views" INT4,
    "subscribers" INT4,
    "thumbnail" STRING,
    "integration" "IntegrationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "projectId" STRING NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCredentials_projectId_key" ON "YoutubeCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCredentials_projectId_userId_key" ON "YoutubeCredentials"("projectId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramCredentials_projectId_key" ON "InstagramCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokCredentials_projectId_key" ON "TikTokCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookCredentials_projectId_key" ON "FacebookCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "TwitterCredentials_projectId_key" ON "TwitterCredentials"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_projectId_key" ON "Channel"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_projectId_integration_key" ON "Channel"("projectId", "integration");

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
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
