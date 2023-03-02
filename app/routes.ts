export const Routes = {
  Admin: `/admin`,
  AdminCreateProject: `/admin/create-project`,
  AdminContent: (slug: string) => `/admin/content/${slug}`,
  AdminContentPreview: (slug: string) => `/admin/content/preview/${slug}`,
  AdminContentTitle: `/admin/content/title`,
  AdminContentThumbnail: (slug: string) => `/admin/content/thumbnail/${slug}`,
  AdminContenVideo: (slug: string) => `/admin/content/video/${slug}`,
  Login: `/login`,
};
