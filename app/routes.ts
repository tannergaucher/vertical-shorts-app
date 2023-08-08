export const Routes = {
  Index: `/`,
  AuthorizeYoutube: `/authorize-integration/youtube`,
  AuthorizeTikTok: `/authorize-integration/tiktok`,
  AuthorizeInstagram: `/authorize-integration/instagram`,
  AuthorizeFacebook: `/authorize-integration/facebook`,
  AuthorizeTwitter: `/authorize-integration/twitter`,
  Admin: `/admin`,
  AdminCreateProject: `/admin/create-project`,
  AdminContent: (slug: string) => `/admin/content/${slug}`,
  AdminContentStatus: (slug: string) => `/admin/content/status/${slug}`,
  AdminContentTitle: `/admin/content/title`,
  AdminContentVideo: (slug: string) => `/admin/content/video/${slug}`,
  AdminContentScheduler: (slug: string) => `/admin/content/scheduler/${slug}`,
  AdminContentTagsDescription: (slug: string) =>
    `/admin/content/tags-description/${slug}`,
  Login: `/login`,
  Logout: `/logout`,
  Signup: `/signup`,
  ResourceVideoTags: (projectId: string, slug: string) =>
    `/resource/video-tags/${projectId}/${slug}`,
};
