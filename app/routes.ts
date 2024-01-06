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
  AdminContentUpload: `/admin/content/upload`,
  Login: `/login`,
  Logout: `/logout`,
  Signup: `/signup`,
  Join: `/join`,
  ResourceVideoTags: (projectId: string, slug: string) =>
    `/resource/video-tags/${projectId}/${slug}`,
};
