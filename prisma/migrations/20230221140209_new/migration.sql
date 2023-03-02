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
    "clientId" STRING NOT NULL,
    "clientSecret" STRING NOT NULL,
    "accessToken" STRING NOT NULL,
    "refreshToken" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "channelId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "YoutubeCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstagramCredentials" (
    "id" STRING NOT NULL,
    "accessToken" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" STRING NOT NULL,
    "userId" STRING NOT NULL,

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
    "userId" STRING NOT NULL,

    CONSTRAINT "TikTokCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FacebookCredentials" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pageId" STRING NOT NULL,
    "userId" STRING NOT NULL,

    CONSTRAINT "FacebookCredentials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Content" (
    "slug" STRING NOT NULL,
    "title" STRING NOT NULL,
    "description" STRING,
    "thumbnail" STRING,
    "video" STRING,
    "tags" STRING[],
    "published" BOOL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "projectId" STRING NOT NULL,
    "tikTokPostPostSlug" STRING,
    "instagramPostPostSlug" STRING,
    "facebookPostPostSlug" STRING
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
CREATE TABLE "YoutubeShortPost" (
    "gcsVideoUrl" STRING NOT NULL,
    "postSlug" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "TikTokPost" (
    "gcsVideoUrl" STRING NOT NULL,
    "postSlug" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "InstagramPost" (
    "gcsVideoUrl" STRING NOT NULL,
    "postSlug" STRING NOT NULL,
    "caption" STRING NOT NULL
);

-- CreateTable
CREATE TABLE "FacebookPost" (
    "gcsVideoUrl" STRING NOT NULL,
    "postSlug" STRING NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Password_userId_key" ON "Password"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeCredentials_userId_key" ON "YoutubeCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramCredentials_userId_key" ON "InstagramCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokCredentials_userId_key" ON "TikTokCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookCredentials_userId_key" ON "FacebookCredentials"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_slug_key" ON "Content"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Content_projectId_key" ON "Content"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "YoutubeShortPost_postSlug_key" ON "YoutubeShortPost"("postSlug");

-- CreateIndex
CREATE UNIQUE INDEX "TikTokPost_postSlug_key" ON "TikTokPost"("postSlug");

-- CreateIndex
CREATE UNIQUE INDEX "InstagramPost_postSlug_key" ON "InstagramPost"("postSlug");

-- CreateIndex
CREATE UNIQUE INDEX "FacebookPost_postSlug_key" ON "FacebookPost"("postSlug");

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "YoutubeCredentials" ADD CONSTRAINT "YoutubeCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstagramCredentials" ADD CONSTRAINT "InstagramCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TikTokCredentials" ADD CONSTRAINT "TikTokCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FacebookCredentials" ADD CONSTRAINT "FacebookCredentials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_tikTokPostPostSlug_fkey" FOREIGN KEY ("tikTokPostPostSlug") REFERENCES "TikTokPost"("postSlug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_instagramPostPostSlug_fkey" FOREIGN KEY ("instagramPostPostSlug") REFERENCES "InstagramPost"("postSlug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_facebookPostPostSlug_fkey" FOREIGN KEY ("facebookPostPostSlug") REFERENCES "FacebookPost"("postSlug") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
