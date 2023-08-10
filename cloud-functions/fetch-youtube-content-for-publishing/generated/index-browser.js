
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.15.0
 * Query Engine version: 8fbc245156db7124f997f4cecdd8d1219e360944
 */
Prisma.prismaVersion = {
  client: "4.15.0",
  engine: "8fbc245156db7124f997f4cecdd8d1219e360944"
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

exports.Prisma.ChannelScalarFieldEnum = {
  name: 'name',
  views: 'views',
  subscribers: 'subscribers',
  thumbnail: 'thumbnail',
  channelType: 'channelType',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  projectId: 'projectId'
};

exports.Prisma.ContentScalarFieldEnum = {
  slug: 'slug',
  title: 'title',
  description: 'description',
  thumbnail: 'thumbnail',
  gif: 'gif',
  tags: 'tags',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  projectId: 'projectId',
  youtubeId: 'youtubeId',
  youtubeStatus: 'youtubeStatus',
  youtubePublishAt: 'youtubePublishAt',
  tikTokId: 'tikTokId',
  tikTokStatus: 'tikTokStatus',
  tikTokPublishAt: 'tikTokPublishAt',
  instagramId: 'instagramId',
  instagramStatus: 'instagramStatus',
  instagramPublishAt: 'instagramPublishAt',
  facebookId: 'facebookId',
  facebookStatus: 'facebookStatus',
  facebookPublishAt: 'facebookPublishAt',
  twitterId: 'twitterId',
  twitterStatus: 'twitterStatus',
  twitterPublishAt: 'twitterPublishAt',
  annotations: 'annotations',
  labels: 'labels',
  transcription: 'transcription',
  textDetection: 'textDetection'
};

exports.Prisma.FacebookCredentialsScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  pageId: 'pageId',
  projectId: 'projectId'
};

exports.Prisma.InstagramCredentialsScalarFieldEnum = {
  id: 'id',
  accessToken: 'accessToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  username: 'username',
  projectId: 'projectId'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.PasswordScalarFieldEnum = {
  hash: 'hash',
  userId: 'userId'
};

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  title: 'title',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId',
  tags: 'tags'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.TikTokCredentialsScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  handle: 'handle',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  refreshTokenExpiresIn: 'refreshTokenExpiresIn',
  scope: 'scope',
  openId: 'openId',
  projectId: 'projectId'
};

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.TwitterCredentialsScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  projectId: 'projectId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  currentProjectId: 'currentProjectId',
  planType: 'planType',
  stripeCustomerId: 'stripeCustomerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.YoutubeCredentialsScalarFieldEnum = {
  id: 'id',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  channelId: 'channelId',
  projectId: 'projectId'
};
exports.ChannelType = {
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  TIKTOK: 'TIKTOK',
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER'
};

exports.PlanType = {
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  PROFESSIONAL: 'PROFESSIONAL'
};

exports.UploadStatus = {
  NOT_STARTED: 'NOT_STARTED',
  INITIALIZING: 'INITIALIZING',
  UPLOADING: 'UPLOADING',
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC'
};

exports.Prisma.ModelName = {
  User: 'User',
  Password: 'Password',
  YoutubeCredentials: 'YoutubeCredentials',
  InstagramCredentials: 'InstagramCredentials',
  TikTokCredentials: 'TikTokCredentials',
  FacebookCredentials: 'FacebookCredentials',
  TwitterCredentials: 'TwitterCredentials',
  Content: 'Content',
  Project: 'Project',
  Channel: 'Channel'
};

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
