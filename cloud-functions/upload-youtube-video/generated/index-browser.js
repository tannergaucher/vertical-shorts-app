
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.5.0
 * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
 */
Prisma.prismaVersion = {
  client: "4.5.0",
  engine: "0362da9eebca54d94c8ef5edd3b2e90af99ba452"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.ContentScalarFieldEnum = makeEnum({
  slug: 'slug',
  title: 'title',
  description: 'description',
  markdown: 'markdown',
  thumbnail: 'thumbnail',
  video: 'video',
  tags: 'tags',
  published: 'published',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  projectId: 'projectId'
});

exports.Prisma.FacebookCredentialsScalarFieldEnum = makeEnum({
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  pageId: 'pageId',
  userId: 'userId'
});

exports.Prisma.FacebookPostScalarFieldEnum = makeEnum({
  gcsVideoUrl: 'gcsVideoUrl',
  postSlug: 'postSlug',
  contentProjectId: 'contentProjectId',
  contentSlug: 'contentSlug'
});

exports.Prisma.InstagramCredentialsScalarFieldEnum = makeEnum({
  id: 'id',
  accessToken: 'accessToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  username: 'username',
  userId: 'userId'
});

exports.Prisma.InstagramPostScalarFieldEnum = makeEnum({
  gcsVideoUrl: 'gcsVideoUrl',
  postSlug: 'postSlug',
  caption: 'caption',
  contentProjectId: 'contentProjectId',
  contentSlug: 'contentSlug'
});

exports.Prisma.PasswordScalarFieldEnum = makeEnum({
  hash: 'hash',
  userId: 'userId'
});

exports.Prisma.ProjectScalarFieldEnum = makeEnum({
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.TikTokCredentialsScalarFieldEnum = makeEnum({
  id: 'id',
  clientKey: 'clientKey',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  accessToken: 'accessToken',
  openId: 'openId',
  username: 'username',
  userId: 'userId'
});

exports.Prisma.TikTokPostScalarFieldEnum = makeEnum({
  gcsVideoUrl: 'gcsVideoUrl',
  postSlug: 'postSlug',
  contentProjectId: 'contentProjectId',
  contentSlug: 'contentSlug'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  email: 'email',
  currentProjectId: 'currentProjectId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
});

exports.Prisma.YoutubeCredentialsScalarFieldEnum = makeEnum({
  id: 'id',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  channelId: 'channelId',
  userId: 'userId',
  projectId: 'projectId'
});

exports.Prisma.YoutubeShortPostScalarFieldEnum = makeEnum({
  gcsVideoUrl: 'gcsVideoUrl',
  postSlug: 'postSlug'
});


exports.Prisma.ModelName = makeEnum({
  User: 'User',
  Password: 'Password',
  YoutubeCredentials: 'YoutubeCredentials',
  InstagramCredentials: 'InstagramCredentials',
  TikTokCredentials: 'TikTokCredentials',
  FacebookCredentials: 'FacebookCredentials',
  Content: 'Content',
  Project: 'Project',
  YoutubeShortPost: 'YoutubeShortPost',
  TikTokPost: 'TikTokPost',
  InstagramPost: 'InstagramPost',
  FacebookPost: 'FacebookPost'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)