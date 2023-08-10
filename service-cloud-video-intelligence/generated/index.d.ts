
/**
 * Client
**/

import * as runtime from './runtime/library';
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends Prisma.PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};

export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  currentProjectId: string | null
  planType: PlanType | null
  stripeCustomerId: string | null
  createdAt: Date
  updatedAt: Date
}

/**
 * Model Password
 * 
 */
export type Password = {
  hash: string
  userId: string
}

/**
 * Model YoutubeCredentials
 * 
 */
export type YoutubeCredentials = {
  id: string
  accessToken: string | null
  refreshToken: string | null
  createdAt: Date
  updatedAt: Date
  channelId: string | null
  projectId: string
}

/**
 * Model InstagramCredentials
 * 
 */
export type InstagramCredentials = {
  id: string
  accessToken: string
  createdAt: Date
  updatedAt: Date
  username: string
  projectId: string
}

/**
 * Model TikTokCredentials
 * 
 */
export type TikTokCredentials = {
  id: string
  createdAt: Date
  updatedAt: Date
  handle: string
  accessToken: string
  refreshToken: string
  refreshTokenExpiresIn: number
  scope: string
  openId: string
  projectId: string
}

/**
 * Model FacebookCredentials
 * 
 */
export type FacebookCredentials = {
  id: string
  createdAt: Date
  updatedAt: Date
  pageId: string
  projectId: string
}

/**
 * Model TwitterCredentials
 * 
 */
export type TwitterCredentials = {
  id: string
  createdAt: Date
  updatedAt: Date
  projectId: string
}

/**
 * Model Content
 * 
 */
export type Content = {
  slug: string
  title: string
  description: string | null
  thumbnail: string | null
  gif: string | null
  tags: string[]
  createdAt: Date | null
  updatedAt: Date | null
  projectId: string
  youtubeId: string | null
  youtubeStatus: UploadStatus | null
  youtubePublishAt: Date | null
  tikTokId: string | null
  tikTokStatus: UploadStatus | null
  tikTokPublishAt: Date | null
  instagramId: string | null
  instagramStatus: UploadStatus | null
  instagramPublishAt: Date | null
  facebookId: string | null
  facebookStatus: UploadStatus | null
  facebookPublishAt: Date | null
  twitterId: string | null
  twitterStatus: UploadStatus | null
  twitterPublishAt: Date | null
  annotations: Prisma.JsonValue | null
  labels: Prisma.JsonValue | null
  transcription: Prisma.JsonValue | null
  textDetection: Prisma.JsonValue | null
}

/**
 * Model Project
 * 
 */
export type Project = {
  id: string
  title: string
  createdAt: Date
  updatedAt: Date
  userId: string
  tags: string[]
}

/**
 * Model Channel
 * 
 */
export type Channel = {
  name: string
  views: number | null
  subscribers: number | null
  thumbnail: string | null
  channelType: ChannelType
  createdAt: Date
  updatedAt: Date
  projectId: string
}


/**
 * Enums
 */

export const ChannelType: {
  YOUTUBE: 'YOUTUBE',
  INSTAGRAM: 'INSTAGRAM',
  TIKTOK: 'TIKTOK',
  FACEBOOK: 'FACEBOOK',
  TWITTER: 'TWITTER'
};

export type ChannelType = (typeof ChannelType)[keyof typeof ChannelType]


export const PlanType: {
  STARTER: 'STARTER',
  GROWTH: 'GROWTH',
  PROFESSIONAL: 'PROFESSIONAL'
};

export type PlanType = (typeof PlanType)[keyof typeof PlanType]


export const UploadStatus: {
  NOT_STARTED: 'NOT_STARTED',
  INITIALIZING: 'INITIALIZING',
  UPLOADING: 'UPLOADING',
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC'
};

export type UploadStatus = (typeof UploadStatus)[keyof typeof UploadStatus]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<this, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;

  /**
   * `prisma.password`: Exposes CRUD operations for the **Password** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Passwords
    * const passwords = await prisma.password.findMany()
    * ```
    */
  get password(): Prisma.PasswordDelegate<GlobalReject>;

  /**
   * `prisma.youtubeCredentials`: Exposes CRUD operations for the **YoutubeCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YoutubeCredentials
    * const youtubeCredentials = await prisma.youtubeCredentials.findMany()
    * ```
    */
  get youtubeCredentials(): Prisma.YoutubeCredentialsDelegate<GlobalReject>;

  /**
   * `prisma.instagramCredentials`: Exposes CRUD operations for the **InstagramCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstagramCredentials
    * const instagramCredentials = await prisma.instagramCredentials.findMany()
    * ```
    */
  get instagramCredentials(): Prisma.InstagramCredentialsDelegate<GlobalReject>;

  /**
   * `prisma.tikTokCredentials`: Exposes CRUD operations for the **TikTokCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TikTokCredentials
    * const tikTokCredentials = await prisma.tikTokCredentials.findMany()
    * ```
    */
  get tikTokCredentials(): Prisma.TikTokCredentialsDelegate<GlobalReject>;

  /**
   * `prisma.facebookCredentials`: Exposes CRUD operations for the **FacebookCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FacebookCredentials
    * const facebookCredentials = await prisma.facebookCredentials.findMany()
    * ```
    */
  get facebookCredentials(): Prisma.FacebookCredentialsDelegate<GlobalReject>;

  /**
   * `prisma.twitterCredentials`: Exposes CRUD operations for the **TwitterCredentials** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TwitterCredentials
    * const twitterCredentials = await prisma.twitterCredentials.findMany()
    * ```
    */
  get twitterCredentials(): Prisma.TwitterCredentialsDelegate<GlobalReject>;

  /**
   * `prisma.content`: Exposes CRUD operations for the **Content** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contents
    * const contents = await prisma.content.findMany()
    * ```
    */
  get content(): Prisma.ContentDelegate<GlobalReject>;

  /**
   * `prisma.project`: Exposes CRUD operations for the **Project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.ProjectDelegate<GlobalReject>;

  /**
   * `prisma.channel`: Exposes CRUD operations for the **Channel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Channels
    * const channels = await prisma.channel.findMany()
    * ```
    */
  get channel(): Prisma.ChannelDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.15.0
   * Query Engine version: 8fbc245156db7124f997f4cecdd8d1219e360944
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: runtime.Types.Utils.LegacyExact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    projects: number
  }

  export type UserCountOutputTypeSelect = {
    projects?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ProjectCountOutputType
   */


  export type ProjectCountOutputType = {
    content: number
    channels: number
  }

  export type ProjectCountOutputTypeSelect = {
    content?: boolean
    channels?: boolean
  }

  export type ProjectCountOutputTypeGetPayload<S extends boolean | null | undefined | ProjectCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ProjectCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ProjectCountOutputTypeArgs)
    ? ProjectCountOutputType 
    : S extends { select: any } & (ProjectCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ProjectCountOutputType ? ProjectCountOutputType[P] : never
  } 
      : ProjectCountOutputType




  // Custom InputTypes

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     */
    select?: ProjectCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    currentProjectId: string | null
    planType: PlanType | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    currentProjectId: string | null
    planType: PlanType | null
    stripeCustomerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    currentProjectId: number
    planType: number
    stripeCustomerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    planType?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    planType?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    planType?: true
    stripeCustomerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    currentProjectId: string | null
    planType: PlanType | null
    stripeCustomerId: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    currentProjectId?: boolean
    planType?: boolean
    stripeCustomerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    password?: boolean | PasswordArgs
    projects?: boolean | User$projectsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    password?: boolean | PasswordArgs
    projects?: boolean | User$projectsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'password' ? PasswordGetPayload<S['include'][P]> | null :
        P extends 'projects' ? Array < ProjectGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'password' ? PasswordGetPayload<S['select'][P]> | null :
        P extends 'projects' ? Array < ProjectGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): Prisma.PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    password<T extends PasswordArgs= {}>(args?: Subset<T, PasswordArgs>): Prisma__PasswordClient<PasswordGetPayload<T> | Null>;

    projects<T extends User$projectsArgs= {}>(args?: Subset<T, User$projectsArgs>): Prisma.PrismaPromise<Array<ProjectGetPayload<T>>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.projects
   */
  export type User$projectsArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    where?: ProjectWhereInput
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    cursor?: ProjectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude | null
  }



  /**
   * Model Password
   */


  export type AggregatePassword = {
    _count: PasswordCountAggregateOutputType | null
    _min: PasswordMinAggregateOutputType | null
    _max: PasswordMaxAggregateOutputType | null
  }

  export type PasswordMinAggregateOutputType = {
    hash: string | null
    userId: string | null
  }

  export type PasswordMaxAggregateOutputType = {
    hash: string | null
    userId: string | null
  }

  export type PasswordCountAggregateOutputType = {
    hash: number
    userId: number
    _all: number
  }


  export type PasswordMinAggregateInputType = {
    hash?: true
    userId?: true
  }

  export type PasswordMaxAggregateInputType = {
    hash?: true
    userId?: true
  }

  export type PasswordCountAggregateInputType = {
    hash?: true
    userId?: true
    _all?: true
  }

  export type PasswordAggregateArgs = {
    /**
     * Filter which Password to aggregate.
     */
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     */
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Passwords
    **/
    _count?: true | PasswordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PasswordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PasswordMaxAggregateInputType
  }

  export type GetPasswordAggregateType<T extends PasswordAggregateArgs> = {
        [P in keyof T & keyof AggregatePassword]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePassword[P]>
      : GetScalarType<T[P], AggregatePassword[P]>
  }




  export type PasswordGroupByArgs = {
    where?: PasswordWhereInput
    orderBy?: Enumerable<PasswordOrderByWithAggregationInput>
    by: PasswordScalarFieldEnum[]
    having?: PasswordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PasswordCountAggregateInputType | true
    _min?: PasswordMinAggregateInputType
    _max?: PasswordMaxAggregateInputType
  }


  export type PasswordGroupByOutputType = {
    hash: string
    userId: string
    _count: PasswordCountAggregateOutputType | null
    _min: PasswordMinAggregateOutputType | null
    _max: PasswordMaxAggregateOutputType | null
  }

  type GetPasswordGroupByPayload<T extends PasswordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<PasswordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PasswordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PasswordGroupByOutputType[P]>
            : GetScalarType<T[P], PasswordGroupByOutputType[P]>
        }
      >
    >


  export type PasswordSelect = {
    hash?: boolean
    userId?: boolean
    user?: boolean | UserArgs
  }


  export type PasswordInclude = {
    user?: boolean | UserArgs
  }

  export type PasswordGetPayload<S extends boolean | null | undefined | PasswordArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Password :
    S extends undefined ? never :
    S extends { include: any } & (PasswordArgs | PasswordFindManyArgs)
    ? Password  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (PasswordArgs | PasswordFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :  P extends keyof Password ? Password[P] : never
  } 
      : Password


  type PasswordCountArgs = 
    Omit<PasswordFindManyArgs, 'select' | 'include'> & {
      select?: PasswordCountAggregateInputType | true
    }

  export interface PasswordDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Password that matches the filter.
     * @param {PasswordFindUniqueArgs} args - Arguments to find a Password
     * @example
     * // Get one Password
     * const password = await prisma.password.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PasswordFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PasswordFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Password'> extends True ? Prisma__PasswordClient<PasswordGetPayload<T>> : Prisma__PasswordClient<PasswordGetPayload<T> | null, null>

    /**
     * Find one Password that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PasswordFindUniqueOrThrowArgs} args - Arguments to find a Password
     * @example
     * // Get one Password
     * const password = await prisma.password.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PasswordFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PasswordFindUniqueOrThrowArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Find the first Password that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordFindFirstArgs} args - Arguments to find a Password
     * @example
     * // Get one Password
     * const password = await prisma.password.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PasswordFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PasswordFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Password'> extends True ? Prisma__PasswordClient<PasswordGetPayload<T>> : Prisma__PasswordClient<PasswordGetPayload<T> | null, null>

    /**
     * Find the first Password that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordFindFirstOrThrowArgs} args - Arguments to find a Password
     * @example
     * // Get one Password
     * const password = await prisma.password.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PasswordFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PasswordFindFirstOrThrowArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Find zero or more Passwords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Passwords
     * const passwords = await prisma.password.findMany()
     * 
     * // Get first 10 Passwords
     * const passwords = await prisma.password.findMany({ take: 10 })
     * 
     * // Only select the `hash`
     * const passwordWithHashOnly = await prisma.password.findMany({ select: { hash: true } })
     * 
    **/
    findMany<T extends PasswordFindManyArgs>(
      args?: SelectSubset<T, PasswordFindManyArgs>
    ): Prisma.PrismaPromise<Array<PasswordGetPayload<T>>>

    /**
     * Create a Password.
     * @param {PasswordCreateArgs} args - Arguments to create a Password.
     * @example
     * // Create one Password
     * const Password = await prisma.password.create({
     *   data: {
     *     // ... data to create a Password
     *   }
     * })
     * 
    **/
    create<T extends PasswordCreateArgs>(
      args: SelectSubset<T, PasswordCreateArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Create many Passwords.
     *     @param {PasswordCreateManyArgs} args - Arguments to create many Passwords.
     *     @example
     *     // Create many Passwords
     *     const password = await prisma.password.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends PasswordCreateManyArgs>(
      args?: SelectSubset<T, PasswordCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Password.
     * @param {PasswordDeleteArgs} args - Arguments to delete one Password.
     * @example
     * // Delete one Password
     * const Password = await prisma.password.delete({
     *   where: {
     *     // ... filter to delete one Password
     *   }
     * })
     * 
    **/
    delete<T extends PasswordDeleteArgs>(
      args: SelectSubset<T, PasswordDeleteArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Update one Password.
     * @param {PasswordUpdateArgs} args - Arguments to update one Password.
     * @example
     * // Update one Password
     * const password = await prisma.password.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PasswordUpdateArgs>(
      args: SelectSubset<T, PasswordUpdateArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Delete zero or more Passwords.
     * @param {PasswordDeleteManyArgs} args - Arguments to filter Passwords to delete.
     * @example
     * // Delete a few Passwords
     * const { count } = await prisma.password.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PasswordDeleteManyArgs>(
      args?: SelectSubset<T, PasswordDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Passwords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Passwords
     * const password = await prisma.password.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PasswordUpdateManyArgs>(
      args: SelectSubset<T, PasswordUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Password.
     * @param {PasswordUpsertArgs} args - Arguments to update or create a Password.
     * @example
     * // Update or create a Password
     * const password = await prisma.password.upsert({
     *   create: {
     *     // ... data to create a Password
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Password we want to update
     *   }
     * })
    **/
    upsert<T extends PasswordUpsertArgs>(
      args: SelectSubset<T, PasswordUpsertArgs>
    ): Prisma__PasswordClient<PasswordGetPayload<T>>

    /**
     * Count the number of Passwords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordCountArgs} args - Arguments to filter Passwords to count.
     * @example
     * // Count the number of Passwords
     * const count = await prisma.password.count({
     *   where: {
     *     // ... the filter for the Passwords we want to count
     *   }
     * })
    **/
    count<T extends PasswordCountArgs>(
      args?: Subset<T, PasswordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PasswordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Password.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PasswordAggregateArgs>(args: Subset<T, PasswordAggregateArgs>): Prisma.PrismaPromise<GetPasswordAggregateType<T>>

    /**
     * Group by Password.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PasswordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PasswordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PasswordGroupByArgs['orderBy'] }
        : { orderBy?: PasswordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PasswordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Password.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PasswordClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Password base type for findUnique actions
   */
  export type PasswordFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     */
    where: PasswordWhereUniqueInput
  }

  /**
   * Password findUnique
   */
  export interface PasswordFindUniqueArgs extends PasswordFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Password findUniqueOrThrow
   */
  export type PasswordFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     */
    where: PasswordWhereUniqueInput
  }


  /**
   * Password base type for findFirst actions
   */
  export type PasswordFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     */
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     */
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passwords.
     */
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passwords.
     */
    distinct?: Enumerable<PasswordScalarFieldEnum>
  }

  /**
   * Password findFirst
   */
  export interface PasswordFindFirstArgs extends PasswordFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Password findFirstOrThrow
   */
  export type PasswordFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     */
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     */
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passwords.
     */
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passwords.
     */
    distinct?: Enumerable<PasswordScalarFieldEnum>
  }


  /**
   * Password findMany
   */
  export type PasswordFindManyArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter, which Passwords to fetch.
     */
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     */
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passwords.
     */
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     */
    skip?: number
    distinct?: Enumerable<PasswordScalarFieldEnum>
  }


  /**
   * Password create
   */
  export type PasswordCreateArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * The data needed to create a Password.
     */
    data: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
  }


  /**
   * Password createMany
   */
  export type PasswordCreateManyArgs = {
    /**
     * The data used to create many Passwords.
     */
    data: Enumerable<PasswordCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Password update
   */
  export type PasswordUpdateArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * The data needed to update a Password.
     */
    data: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
    /**
     * Choose, which Password to update.
     */
    where: PasswordWhereUniqueInput
  }


  /**
   * Password updateMany
   */
  export type PasswordUpdateManyArgs = {
    /**
     * The data used to update Passwords.
     */
    data: XOR<PasswordUpdateManyMutationInput, PasswordUncheckedUpdateManyInput>
    /**
     * Filter which Passwords to update
     */
    where?: PasswordWhereInput
  }


  /**
   * Password upsert
   */
  export type PasswordUpsertArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * The filter to search for the Password to update in case it exists.
     */
    where: PasswordWhereUniqueInput
    /**
     * In case the Password found by the `where` argument doesn't exist, create a new Password with this data.
     */
    create: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
    /**
     * In case the Password was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
  }


  /**
   * Password delete
   */
  export type PasswordDeleteArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
    /**
     * Filter which Password to delete.
     */
    where: PasswordWhereUniqueInput
  }


  /**
   * Password deleteMany
   */
  export type PasswordDeleteManyArgs = {
    /**
     * Filter which Passwords to delete
     */
    where?: PasswordWhereInput
  }


  /**
   * Password without action
   */
  export type PasswordArgs = {
    /**
     * Select specific fields to fetch from the Password
     */
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: PasswordInclude | null
  }



  /**
   * Model YoutubeCredentials
   */


  export type AggregateYoutubeCredentials = {
    _count: YoutubeCredentialsCountAggregateOutputType | null
    _min: YoutubeCredentialsMinAggregateOutputType | null
    _max: YoutubeCredentialsMaxAggregateOutputType | null
  }

  export type YoutubeCredentialsMinAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    channelId: string | null
    projectId: string | null
  }

  export type YoutubeCredentialsMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    channelId: string | null
    projectId: string | null
  }

  export type YoutubeCredentialsCountAggregateOutputType = {
    id: number
    accessToken: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    channelId: number
    projectId: number
    _all: number
  }


  export type YoutubeCredentialsMinAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    channelId?: true
    projectId?: true
  }

  export type YoutubeCredentialsMaxAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    channelId?: true
    projectId?: true
  }

  export type YoutubeCredentialsCountAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    channelId?: true
    projectId?: true
    _all?: true
  }

  export type YoutubeCredentialsAggregateArgs = {
    /**
     * Filter which YoutubeCredentials to aggregate.
     */
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     */
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YoutubeCredentials
    **/
    _count?: true | YoutubeCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YoutubeCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YoutubeCredentialsMaxAggregateInputType
  }

  export type GetYoutubeCredentialsAggregateType<T extends YoutubeCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateYoutubeCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYoutubeCredentials[P]>
      : GetScalarType<T[P], AggregateYoutubeCredentials[P]>
  }




  export type YoutubeCredentialsGroupByArgs = {
    where?: YoutubeCredentialsWhereInput
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithAggregationInput>
    by: YoutubeCredentialsScalarFieldEnum[]
    having?: YoutubeCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YoutubeCredentialsCountAggregateInputType | true
    _min?: YoutubeCredentialsMinAggregateInputType
    _max?: YoutubeCredentialsMaxAggregateInputType
  }


  export type YoutubeCredentialsGroupByOutputType = {
    id: string
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date
    updatedAt: Date
    channelId: string | null
    projectId: string
    _count: YoutubeCredentialsCountAggregateOutputType | null
    _min: YoutubeCredentialsMinAggregateOutputType | null
    _max: YoutubeCredentialsMaxAggregateOutputType | null
  }

  type GetYoutubeCredentialsGroupByPayload<T extends YoutubeCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<YoutubeCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YoutubeCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YoutubeCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], YoutubeCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type YoutubeCredentialsSelect = {
    id?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    channelId?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type YoutubeCredentialsInclude = {
    project?: boolean | ProjectArgs
  }

  export type YoutubeCredentialsGetPayload<S extends boolean | null | undefined | YoutubeCredentialsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? YoutubeCredentials :
    S extends undefined ? never :
    S extends { include: any } & (YoutubeCredentialsArgs | YoutubeCredentialsFindManyArgs)
    ? YoutubeCredentials  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (YoutubeCredentialsArgs | YoutubeCredentialsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof YoutubeCredentials ? YoutubeCredentials[P] : never
  } 
      : YoutubeCredentials


  type YoutubeCredentialsCountArgs = 
    Omit<YoutubeCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: YoutubeCredentialsCountAggregateInputType | true
    }

  export interface YoutubeCredentialsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one YoutubeCredentials that matches the filter.
     * @param {YoutubeCredentialsFindUniqueArgs} args - Arguments to find a YoutubeCredentials
     * @example
     * // Get one YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends YoutubeCredentialsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, YoutubeCredentialsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'YoutubeCredentials'> extends True ? Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>> : Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | null, null>

    /**
     * Find one YoutubeCredentials that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {YoutubeCredentialsFindUniqueOrThrowArgs} args - Arguments to find a YoutubeCredentials
     * @example
     * // Get one YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends YoutubeCredentialsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, YoutubeCredentialsFindUniqueOrThrowArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Find the first YoutubeCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsFindFirstArgs} args - Arguments to find a YoutubeCredentials
     * @example
     * // Get one YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends YoutubeCredentialsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, YoutubeCredentialsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'YoutubeCredentials'> extends True ? Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>> : Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | null, null>

    /**
     * Find the first YoutubeCredentials that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsFindFirstOrThrowArgs} args - Arguments to find a YoutubeCredentials
     * @example
     * // Get one YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends YoutubeCredentialsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, YoutubeCredentialsFindFirstOrThrowArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Find zero or more YoutubeCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findMany()
     * 
     * // Get first 10 YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const youtubeCredentialsWithIdOnly = await prisma.youtubeCredentials.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends YoutubeCredentialsFindManyArgs>(
      args?: SelectSubset<T, YoutubeCredentialsFindManyArgs>
    ): Prisma.PrismaPromise<Array<YoutubeCredentialsGetPayload<T>>>

    /**
     * Create a YoutubeCredentials.
     * @param {YoutubeCredentialsCreateArgs} args - Arguments to create a YoutubeCredentials.
     * @example
     * // Create one YoutubeCredentials
     * const YoutubeCredentials = await prisma.youtubeCredentials.create({
     *   data: {
     *     // ... data to create a YoutubeCredentials
     *   }
     * })
     * 
    **/
    create<T extends YoutubeCredentialsCreateArgs>(
      args: SelectSubset<T, YoutubeCredentialsCreateArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Create many YoutubeCredentials.
     *     @param {YoutubeCredentialsCreateManyArgs} args - Arguments to create many YoutubeCredentials.
     *     @example
     *     // Create many YoutubeCredentials
     *     const youtubeCredentials = await prisma.youtubeCredentials.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends YoutubeCredentialsCreateManyArgs>(
      args?: SelectSubset<T, YoutubeCredentialsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a YoutubeCredentials.
     * @param {YoutubeCredentialsDeleteArgs} args - Arguments to delete one YoutubeCredentials.
     * @example
     * // Delete one YoutubeCredentials
     * const YoutubeCredentials = await prisma.youtubeCredentials.delete({
     *   where: {
     *     // ... filter to delete one YoutubeCredentials
     *   }
     * })
     * 
    **/
    delete<T extends YoutubeCredentialsDeleteArgs>(
      args: SelectSubset<T, YoutubeCredentialsDeleteArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Update one YoutubeCredentials.
     * @param {YoutubeCredentialsUpdateArgs} args - Arguments to update one YoutubeCredentials.
     * @example
     * // Update one YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends YoutubeCredentialsUpdateArgs>(
      args: SelectSubset<T, YoutubeCredentialsUpdateArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Delete zero or more YoutubeCredentials.
     * @param {YoutubeCredentialsDeleteManyArgs} args - Arguments to filter YoutubeCredentials to delete.
     * @example
     * // Delete a few YoutubeCredentials
     * const { count } = await prisma.youtubeCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends YoutubeCredentialsDeleteManyArgs>(
      args?: SelectSubset<T, YoutubeCredentialsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends YoutubeCredentialsUpdateManyArgs>(
      args: SelectSubset<T, YoutubeCredentialsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one YoutubeCredentials.
     * @param {YoutubeCredentialsUpsertArgs} args - Arguments to update or create a YoutubeCredentials.
     * @example
     * // Update or create a YoutubeCredentials
     * const youtubeCredentials = await prisma.youtubeCredentials.upsert({
     *   create: {
     *     // ... data to create a YoutubeCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YoutubeCredentials we want to update
     *   }
     * })
    **/
    upsert<T extends YoutubeCredentialsUpsertArgs>(
      args: SelectSubset<T, YoutubeCredentialsUpsertArgs>
    ): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>

    /**
     * Count the number of YoutubeCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsCountArgs} args - Arguments to filter YoutubeCredentials to count.
     * @example
     * // Count the number of YoutubeCredentials
     * const count = await prisma.youtubeCredentials.count({
     *   where: {
     *     // ... the filter for the YoutubeCredentials we want to count
     *   }
     * })
    **/
    count<T extends YoutubeCredentialsCountArgs>(
      args?: Subset<T, YoutubeCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YoutubeCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YoutubeCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends YoutubeCredentialsAggregateArgs>(args: Subset<T, YoutubeCredentialsAggregateArgs>): Prisma.PrismaPromise<GetYoutubeCredentialsAggregateType<T>>

    /**
     * Group by YoutubeCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends YoutubeCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YoutubeCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: YoutubeCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, YoutubeCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYoutubeCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for YoutubeCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__YoutubeCredentialsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * YoutubeCredentials base type for findUnique actions
   */
  export type YoutubeCredentialsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     */
    where: YoutubeCredentialsWhereUniqueInput
  }

  /**
   * YoutubeCredentials findUnique
   */
  export interface YoutubeCredentialsFindUniqueArgs extends YoutubeCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeCredentials findUniqueOrThrow
   */
  export type YoutubeCredentialsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     */
    where: YoutubeCredentialsWhereUniqueInput
  }


  /**
   * YoutubeCredentials base type for findFirst actions
   */
  export type YoutubeCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     */
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     */
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeCredentials.
     */
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeCredentials.
     */
    distinct?: Enumerable<YoutubeCredentialsScalarFieldEnum>
  }

  /**
   * YoutubeCredentials findFirst
   */
  export interface YoutubeCredentialsFindFirstArgs extends YoutubeCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeCredentials findFirstOrThrow
   */
  export type YoutubeCredentialsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     */
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     */
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeCredentials.
     */
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeCredentials.
     */
    distinct?: Enumerable<YoutubeCredentialsScalarFieldEnum>
  }


  /**
   * YoutubeCredentials findMany
   */
  export type YoutubeCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     */
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     */
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YoutubeCredentials.
     */
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     */
    skip?: number
    distinct?: Enumerable<YoutubeCredentialsScalarFieldEnum>
  }


  /**
   * YoutubeCredentials create
   */
  export type YoutubeCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * The data needed to create a YoutubeCredentials.
     */
    data: XOR<YoutubeCredentialsCreateInput, YoutubeCredentialsUncheckedCreateInput>
  }


  /**
   * YoutubeCredentials createMany
   */
  export type YoutubeCredentialsCreateManyArgs = {
    /**
     * The data used to create many YoutubeCredentials.
     */
    data: Enumerable<YoutubeCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * YoutubeCredentials update
   */
  export type YoutubeCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * The data needed to update a YoutubeCredentials.
     */
    data: XOR<YoutubeCredentialsUpdateInput, YoutubeCredentialsUncheckedUpdateInput>
    /**
     * Choose, which YoutubeCredentials to update.
     */
    where: YoutubeCredentialsWhereUniqueInput
  }


  /**
   * YoutubeCredentials updateMany
   */
  export type YoutubeCredentialsUpdateManyArgs = {
    /**
     * The data used to update YoutubeCredentials.
     */
    data: XOR<YoutubeCredentialsUpdateManyMutationInput, YoutubeCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeCredentials to update
     */
    where?: YoutubeCredentialsWhereInput
  }


  /**
   * YoutubeCredentials upsert
   */
  export type YoutubeCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * The filter to search for the YoutubeCredentials to update in case it exists.
     */
    where: YoutubeCredentialsWhereUniqueInput
    /**
     * In case the YoutubeCredentials found by the `where` argument doesn't exist, create a new YoutubeCredentials with this data.
     */
    create: XOR<YoutubeCredentialsCreateInput, YoutubeCredentialsUncheckedCreateInput>
    /**
     * In case the YoutubeCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<YoutubeCredentialsUpdateInput, YoutubeCredentialsUncheckedUpdateInput>
  }


  /**
   * YoutubeCredentials delete
   */
  export type YoutubeCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter which YoutubeCredentials to delete.
     */
    where: YoutubeCredentialsWhereUniqueInput
  }


  /**
   * YoutubeCredentials deleteMany
   */
  export type YoutubeCredentialsDeleteManyArgs = {
    /**
     * Filter which YoutubeCredentials to delete
     */
    where?: YoutubeCredentialsWhereInput
  }


  /**
   * YoutubeCredentials without action
   */
  export type YoutubeCredentialsArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     */
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: YoutubeCredentialsInclude | null
  }



  /**
   * Model InstagramCredentials
   */


  export type AggregateInstagramCredentials = {
    _count: InstagramCredentialsCountAggregateOutputType | null
    _min: InstagramCredentialsMinAggregateOutputType | null
    _max: InstagramCredentialsMaxAggregateOutputType | null
  }

  export type InstagramCredentialsMinAggregateOutputType = {
    id: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    username: string | null
    projectId: string | null
  }

  export type InstagramCredentialsMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    username: string | null
    projectId: string | null
  }

  export type InstagramCredentialsCountAggregateOutputType = {
    id: number
    accessToken: number
    createdAt: number
    updatedAt: number
    username: number
    projectId: number
    _all: number
  }


  export type InstagramCredentialsMinAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    projectId?: true
  }

  export type InstagramCredentialsMaxAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    projectId?: true
  }

  export type InstagramCredentialsCountAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    projectId?: true
    _all?: true
  }

  export type InstagramCredentialsAggregateArgs = {
    /**
     * Filter which InstagramCredentials to aggregate.
     */
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     */
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstagramCredentials
    **/
    _count?: true | InstagramCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstagramCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstagramCredentialsMaxAggregateInputType
  }

  export type GetInstagramCredentialsAggregateType<T extends InstagramCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateInstagramCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstagramCredentials[P]>
      : GetScalarType<T[P], AggregateInstagramCredentials[P]>
  }




  export type InstagramCredentialsGroupByArgs = {
    where?: InstagramCredentialsWhereInput
    orderBy?: Enumerable<InstagramCredentialsOrderByWithAggregationInput>
    by: InstagramCredentialsScalarFieldEnum[]
    having?: InstagramCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstagramCredentialsCountAggregateInputType | true
    _min?: InstagramCredentialsMinAggregateInputType
    _max?: InstagramCredentialsMaxAggregateInputType
  }


  export type InstagramCredentialsGroupByOutputType = {
    id: string
    accessToken: string
    createdAt: Date
    updatedAt: Date
    username: string
    projectId: string
    _count: InstagramCredentialsCountAggregateOutputType | null
    _min: InstagramCredentialsMinAggregateOutputType | null
    _max: InstagramCredentialsMaxAggregateOutputType | null
  }

  type GetInstagramCredentialsGroupByPayload<T extends InstagramCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<InstagramCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstagramCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstagramCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], InstagramCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type InstagramCredentialsSelect = {
    id?: boolean
    accessToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    username?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type InstagramCredentialsInclude = {
    project?: boolean | ProjectArgs
  }

  export type InstagramCredentialsGetPayload<S extends boolean | null | undefined | InstagramCredentialsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InstagramCredentials :
    S extends undefined ? never :
    S extends { include: any } & (InstagramCredentialsArgs | InstagramCredentialsFindManyArgs)
    ? InstagramCredentials  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (InstagramCredentialsArgs | InstagramCredentialsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof InstagramCredentials ? InstagramCredentials[P] : never
  } 
      : InstagramCredentials


  type InstagramCredentialsCountArgs = 
    Omit<InstagramCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: InstagramCredentialsCountAggregateInputType | true
    }

  export interface InstagramCredentialsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one InstagramCredentials that matches the filter.
     * @param {InstagramCredentialsFindUniqueArgs} args - Arguments to find a InstagramCredentials
     * @example
     * // Get one InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InstagramCredentialsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InstagramCredentialsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InstagramCredentials'> extends True ? Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>> : Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | null, null>

    /**
     * Find one InstagramCredentials that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InstagramCredentialsFindUniqueOrThrowArgs} args - Arguments to find a InstagramCredentials
     * @example
     * // Get one InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InstagramCredentialsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InstagramCredentialsFindUniqueOrThrowArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Find the first InstagramCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsFindFirstArgs} args - Arguments to find a InstagramCredentials
     * @example
     * // Get one InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InstagramCredentialsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InstagramCredentialsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InstagramCredentials'> extends True ? Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>> : Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | null, null>

    /**
     * Find the first InstagramCredentials that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsFindFirstOrThrowArgs} args - Arguments to find a InstagramCredentials
     * @example
     * // Get one InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InstagramCredentialsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InstagramCredentialsFindFirstOrThrowArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Find zero or more InstagramCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findMany()
     * 
     * // Get first 10 InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instagramCredentialsWithIdOnly = await prisma.instagramCredentials.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends InstagramCredentialsFindManyArgs>(
      args?: SelectSubset<T, InstagramCredentialsFindManyArgs>
    ): Prisma.PrismaPromise<Array<InstagramCredentialsGetPayload<T>>>

    /**
     * Create a InstagramCredentials.
     * @param {InstagramCredentialsCreateArgs} args - Arguments to create a InstagramCredentials.
     * @example
     * // Create one InstagramCredentials
     * const InstagramCredentials = await prisma.instagramCredentials.create({
     *   data: {
     *     // ... data to create a InstagramCredentials
     *   }
     * })
     * 
    **/
    create<T extends InstagramCredentialsCreateArgs>(
      args: SelectSubset<T, InstagramCredentialsCreateArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Create many InstagramCredentials.
     *     @param {InstagramCredentialsCreateManyArgs} args - Arguments to create many InstagramCredentials.
     *     @example
     *     // Create many InstagramCredentials
     *     const instagramCredentials = await prisma.instagramCredentials.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InstagramCredentialsCreateManyArgs>(
      args?: SelectSubset<T, InstagramCredentialsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a InstagramCredentials.
     * @param {InstagramCredentialsDeleteArgs} args - Arguments to delete one InstagramCredentials.
     * @example
     * // Delete one InstagramCredentials
     * const InstagramCredentials = await prisma.instagramCredentials.delete({
     *   where: {
     *     // ... filter to delete one InstagramCredentials
     *   }
     * })
     * 
    **/
    delete<T extends InstagramCredentialsDeleteArgs>(
      args: SelectSubset<T, InstagramCredentialsDeleteArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Update one InstagramCredentials.
     * @param {InstagramCredentialsUpdateArgs} args - Arguments to update one InstagramCredentials.
     * @example
     * // Update one InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InstagramCredentialsUpdateArgs>(
      args: SelectSubset<T, InstagramCredentialsUpdateArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Delete zero or more InstagramCredentials.
     * @param {InstagramCredentialsDeleteManyArgs} args - Arguments to filter InstagramCredentials to delete.
     * @example
     * // Delete a few InstagramCredentials
     * const { count } = await prisma.instagramCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InstagramCredentialsDeleteManyArgs>(
      args?: SelectSubset<T, InstagramCredentialsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstagramCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InstagramCredentialsUpdateManyArgs>(
      args: SelectSubset<T, InstagramCredentialsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one InstagramCredentials.
     * @param {InstagramCredentialsUpsertArgs} args - Arguments to update or create a InstagramCredentials.
     * @example
     * // Update or create a InstagramCredentials
     * const instagramCredentials = await prisma.instagramCredentials.upsert({
     *   create: {
     *     // ... data to create a InstagramCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstagramCredentials we want to update
     *   }
     * })
    **/
    upsert<T extends InstagramCredentialsUpsertArgs>(
      args: SelectSubset<T, InstagramCredentialsUpsertArgs>
    ): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>

    /**
     * Count the number of InstagramCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsCountArgs} args - Arguments to filter InstagramCredentials to count.
     * @example
     * // Count the number of InstagramCredentials
     * const count = await prisma.instagramCredentials.count({
     *   where: {
     *     // ... the filter for the InstagramCredentials we want to count
     *   }
     * })
    **/
    count<T extends InstagramCredentialsCountArgs>(
      args?: Subset<T, InstagramCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstagramCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstagramCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstagramCredentialsAggregateArgs>(args: Subset<T, InstagramCredentialsAggregateArgs>): Prisma.PrismaPromise<GetInstagramCredentialsAggregateType<T>>

    /**
     * Group by InstagramCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstagramCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstagramCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: InstagramCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstagramCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstagramCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InstagramCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InstagramCredentialsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InstagramCredentials base type for findUnique actions
   */
  export type InstagramCredentialsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     */
    where: InstagramCredentialsWhereUniqueInput
  }

  /**
   * InstagramCredentials findUnique
   */
  export interface InstagramCredentialsFindUniqueArgs extends InstagramCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramCredentials findUniqueOrThrow
   */
  export type InstagramCredentialsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     */
    where: InstagramCredentialsWhereUniqueInput
  }


  /**
   * InstagramCredentials base type for findFirst actions
   */
  export type InstagramCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     */
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     */
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstagramCredentials.
     */
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstagramCredentials.
     */
    distinct?: Enumerable<InstagramCredentialsScalarFieldEnum>
  }

  /**
   * InstagramCredentials findFirst
   */
  export interface InstagramCredentialsFindFirstArgs extends InstagramCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramCredentials findFirstOrThrow
   */
  export type InstagramCredentialsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     */
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     */
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstagramCredentials.
     */
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstagramCredentials.
     */
    distinct?: Enumerable<InstagramCredentialsScalarFieldEnum>
  }


  /**
   * InstagramCredentials findMany
   */
  export type InstagramCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     */
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     */
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstagramCredentials.
     */
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     */
    skip?: number
    distinct?: Enumerable<InstagramCredentialsScalarFieldEnum>
  }


  /**
   * InstagramCredentials create
   */
  export type InstagramCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * The data needed to create a InstagramCredentials.
     */
    data: XOR<InstagramCredentialsCreateInput, InstagramCredentialsUncheckedCreateInput>
  }


  /**
   * InstagramCredentials createMany
   */
  export type InstagramCredentialsCreateManyArgs = {
    /**
     * The data used to create many InstagramCredentials.
     */
    data: Enumerable<InstagramCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InstagramCredentials update
   */
  export type InstagramCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * The data needed to update a InstagramCredentials.
     */
    data: XOR<InstagramCredentialsUpdateInput, InstagramCredentialsUncheckedUpdateInput>
    /**
     * Choose, which InstagramCredentials to update.
     */
    where: InstagramCredentialsWhereUniqueInput
  }


  /**
   * InstagramCredentials updateMany
   */
  export type InstagramCredentialsUpdateManyArgs = {
    /**
     * The data used to update InstagramCredentials.
     */
    data: XOR<InstagramCredentialsUpdateManyMutationInput, InstagramCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which InstagramCredentials to update
     */
    where?: InstagramCredentialsWhereInput
  }


  /**
   * InstagramCredentials upsert
   */
  export type InstagramCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * The filter to search for the InstagramCredentials to update in case it exists.
     */
    where: InstagramCredentialsWhereUniqueInput
    /**
     * In case the InstagramCredentials found by the `where` argument doesn't exist, create a new InstagramCredentials with this data.
     */
    create: XOR<InstagramCredentialsCreateInput, InstagramCredentialsUncheckedCreateInput>
    /**
     * In case the InstagramCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstagramCredentialsUpdateInput, InstagramCredentialsUncheckedUpdateInput>
  }


  /**
   * InstagramCredentials delete
   */
  export type InstagramCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
    /**
     * Filter which InstagramCredentials to delete.
     */
    where: InstagramCredentialsWhereUniqueInput
  }


  /**
   * InstagramCredentials deleteMany
   */
  export type InstagramCredentialsDeleteManyArgs = {
    /**
     * Filter which InstagramCredentials to delete
     */
    where?: InstagramCredentialsWhereInput
  }


  /**
   * InstagramCredentials without action
   */
  export type InstagramCredentialsArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     */
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: InstagramCredentialsInclude | null
  }



  /**
   * Model TikTokCredentials
   */


  export type AggregateTikTokCredentials = {
    _count: TikTokCredentialsCountAggregateOutputType | null
    _avg: TikTokCredentialsAvgAggregateOutputType | null
    _sum: TikTokCredentialsSumAggregateOutputType | null
    _min: TikTokCredentialsMinAggregateOutputType | null
    _max: TikTokCredentialsMaxAggregateOutputType | null
  }

  export type TikTokCredentialsAvgAggregateOutputType = {
    refreshTokenExpiresIn: number | null
  }

  export type TikTokCredentialsSumAggregateOutputType = {
    refreshTokenExpiresIn: number | null
  }

  export type TikTokCredentialsMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    handle: string | null
    accessToken: string | null
    refreshToken: string | null
    refreshTokenExpiresIn: number | null
    scope: string | null
    openId: string | null
    projectId: string | null
  }

  export type TikTokCredentialsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    handle: string | null
    accessToken: string | null
    refreshToken: string | null
    refreshTokenExpiresIn: number | null
    scope: string | null
    openId: string | null
    projectId: string | null
  }

  export type TikTokCredentialsCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    handle: number
    accessToken: number
    refreshToken: number
    refreshTokenExpiresIn: number
    scope: number
    openId: number
    projectId: number
    _all: number
  }


  export type TikTokCredentialsAvgAggregateInputType = {
    refreshTokenExpiresIn?: true
  }

  export type TikTokCredentialsSumAggregateInputType = {
    refreshTokenExpiresIn?: true
  }

  export type TikTokCredentialsMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    handle?: true
    accessToken?: true
    refreshToken?: true
    refreshTokenExpiresIn?: true
    scope?: true
    openId?: true
    projectId?: true
  }

  export type TikTokCredentialsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    handle?: true
    accessToken?: true
    refreshToken?: true
    refreshTokenExpiresIn?: true
    scope?: true
    openId?: true
    projectId?: true
  }

  export type TikTokCredentialsCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    handle?: true
    accessToken?: true
    refreshToken?: true
    refreshTokenExpiresIn?: true
    scope?: true
    openId?: true
    projectId?: true
    _all?: true
  }

  export type TikTokCredentialsAggregateArgs = {
    /**
     * Filter which TikTokCredentials to aggregate.
     */
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     */
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TikTokCredentials
    **/
    _count?: true | TikTokCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TikTokCredentialsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TikTokCredentialsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TikTokCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TikTokCredentialsMaxAggregateInputType
  }

  export type GetTikTokCredentialsAggregateType<T extends TikTokCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateTikTokCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTikTokCredentials[P]>
      : GetScalarType<T[P], AggregateTikTokCredentials[P]>
  }




  export type TikTokCredentialsGroupByArgs = {
    where?: TikTokCredentialsWhereInput
    orderBy?: Enumerable<TikTokCredentialsOrderByWithAggregationInput>
    by: TikTokCredentialsScalarFieldEnum[]
    having?: TikTokCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TikTokCredentialsCountAggregateInputType | true
    _avg?: TikTokCredentialsAvgAggregateInputType
    _sum?: TikTokCredentialsSumAggregateInputType
    _min?: TikTokCredentialsMinAggregateInputType
    _max?: TikTokCredentialsMaxAggregateInputType
  }


  export type TikTokCredentialsGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
    projectId: string
    _count: TikTokCredentialsCountAggregateOutputType | null
    _avg: TikTokCredentialsAvgAggregateOutputType | null
    _sum: TikTokCredentialsSumAggregateOutputType | null
    _min: TikTokCredentialsMinAggregateOutputType | null
    _max: TikTokCredentialsMaxAggregateOutputType | null
  }

  type GetTikTokCredentialsGroupByPayload<T extends TikTokCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TikTokCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TikTokCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TikTokCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], TikTokCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type TikTokCredentialsSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    handle?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    refreshTokenExpiresIn?: boolean
    scope?: boolean
    openId?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type TikTokCredentialsInclude = {
    project?: boolean | ProjectArgs
  }

  export type TikTokCredentialsGetPayload<S extends boolean | null | undefined | TikTokCredentialsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TikTokCredentials :
    S extends undefined ? never :
    S extends { include: any } & (TikTokCredentialsArgs | TikTokCredentialsFindManyArgs)
    ? TikTokCredentials  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TikTokCredentialsArgs | TikTokCredentialsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof TikTokCredentials ? TikTokCredentials[P] : never
  } 
      : TikTokCredentials


  type TikTokCredentialsCountArgs = 
    Omit<TikTokCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: TikTokCredentialsCountAggregateInputType | true
    }

  export interface TikTokCredentialsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TikTokCredentials that matches the filter.
     * @param {TikTokCredentialsFindUniqueArgs} args - Arguments to find a TikTokCredentials
     * @example
     * // Get one TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TikTokCredentialsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TikTokCredentialsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TikTokCredentials'> extends True ? Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>> : Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | null, null>

    /**
     * Find one TikTokCredentials that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TikTokCredentialsFindUniqueOrThrowArgs} args - Arguments to find a TikTokCredentials
     * @example
     * // Get one TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TikTokCredentialsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TikTokCredentialsFindUniqueOrThrowArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Find the first TikTokCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsFindFirstArgs} args - Arguments to find a TikTokCredentials
     * @example
     * // Get one TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TikTokCredentialsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TikTokCredentialsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TikTokCredentials'> extends True ? Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>> : Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | null, null>

    /**
     * Find the first TikTokCredentials that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsFindFirstOrThrowArgs} args - Arguments to find a TikTokCredentials
     * @example
     * // Get one TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TikTokCredentialsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TikTokCredentialsFindFirstOrThrowArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Find zero or more TikTokCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findMany()
     * 
     * // Get first 10 TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tikTokCredentialsWithIdOnly = await prisma.tikTokCredentials.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TikTokCredentialsFindManyArgs>(
      args?: SelectSubset<T, TikTokCredentialsFindManyArgs>
    ): Prisma.PrismaPromise<Array<TikTokCredentialsGetPayload<T>>>

    /**
     * Create a TikTokCredentials.
     * @param {TikTokCredentialsCreateArgs} args - Arguments to create a TikTokCredentials.
     * @example
     * // Create one TikTokCredentials
     * const TikTokCredentials = await prisma.tikTokCredentials.create({
     *   data: {
     *     // ... data to create a TikTokCredentials
     *   }
     * })
     * 
    **/
    create<T extends TikTokCredentialsCreateArgs>(
      args: SelectSubset<T, TikTokCredentialsCreateArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Create many TikTokCredentials.
     *     @param {TikTokCredentialsCreateManyArgs} args - Arguments to create many TikTokCredentials.
     *     @example
     *     // Create many TikTokCredentials
     *     const tikTokCredentials = await prisma.tikTokCredentials.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TikTokCredentialsCreateManyArgs>(
      args?: SelectSubset<T, TikTokCredentialsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TikTokCredentials.
     * @param {TikTokCredentialsDeleteArgs} args - Arguments to delete one TikTokCredentials.
     * @example
     * // Delete one TikTokCredentials
     * const TikTokCredentials = await prisma.tikTokCredentials.delete({
     *   where: {
     *     // ... filter to delete one TikTokCredentials
     *   }
     * })
     * 
    **/
    delete<T extends TikTokCredentialsDeleteArgs>(
      args: SelectSubset<T, TikTokCredentialsDeleteArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Update one TikTokCredentials.
     * @param {TikTokCredentialsUpdateArgs} args - Arguments to update one TikTokCredentials.
     * @example
     * // Update one TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TikTokCredentialsUpdateArgs>(
      args: SelectSubset<T, TikTokCredentialsUpdateArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Delete zero or more TikTokCredentials.
     * @param {TikTokCredentialsDeleteManyArgs} args - Arguments to filter TikTokCredentials to delete.
     * @example
     * // Delete a few TikTokCredentials
     * const { count } = await prisma.tikTokCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TikTokCredentialsDeleteManyArgs>(
      args?: SelectSubset<T, TikTokCredentialsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TikTokCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TikTokCredentialsUpdateManyArgs>(
      args: SelectSubset<T, TikTokCredentialsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TikTokCredentials.
     * @param {TikTokCredentialsUpsertArgs} args - Arguments to update or create a TikTokCredentials.
     * @example
     * // Update or create a TikTokCredentials
     * const tikTokCredentials = await prisma.tikTokCredentials.upsert({
     *   create: {
     *     // ... data to create a TikTokCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TikTokCredentials we want to update
     *   }
     * })
    **/
    upsert<T extends TikTokCredentialsUpsertArgs>(
      args: SelectSubset<T, TikTokCredentialsUpsertArgs>
    ): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>

    /**
     * Count the number of TikTokCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsCountArgs} args - Arguments to filter TikTokCredentials to count.
     * @example
     * // Count the number of TikTokCredentials
     * const count = await prisma.tikTokCredentials.count({
     *   where: {
     *     // ... the filter for the TikTokCredentials we want to count
     *   }
     * })
    **/
    count<T extends TikTokCredentialsCountArgs>(
      args?: Subset<T, TikTokCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TikTokCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TikTokCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TikTokCredentialsAggregateArgs>(args: Subset<T, TikTokCredentialsAggregateArgs>): Prisma.PrismaPromise<GetTikTokCredentialsAggregateType<T>>

    /**
     * Group by TikTokCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TikTokCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TikTokCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: TikTokCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TikTokCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTikTokCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TikTokCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TikTokCredentialsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TikTokCredentials base type for findUnique actions
   */
  export type TikTokCredentialsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     */
    where: TikTokCredentialsWhereUniqueInput
  }

  /**
   * TikTokCredentials findUnique
   */
  export interface TikTokCredentialsFindUniqueArgs extends TikTokCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokCredentials findUniqueOrThrow
   */
  export type TikTokCredentialsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     */
    where: TikTokCredentialsWhereUniqueInput
  }


  /**
   * TikTokCredentials base type for findFirst actions
   */
  export type TikTokCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     */
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     */
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TikTokCredentials.
     */
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TikTokCredentials.
     */
    distinct?: Enumerable<TikTokCredentialsScalarFieldEnum>
  }

  /**
   * TikTokCredentials findFirst
   */
  export interface TikTokCredentialsFindFirstArgs extends TikTokCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokCredentials findFirstOrThrow
   */
  export type TikTokCredentialsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     */
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     */
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TikTokCredentials.
     */
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TikTokCredentials.
     */
    distinct?: Enumerable<TikTokCredentialsScalarFieldEnum>
  }


  /**
   * TikTokCredentials findMany
   */
  export type TikTokCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     */
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     */
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TikTokCredentials.
     */
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     */
    skip?: number
    distinct?: Enumerable<TikTokCredentialsScalarFieldEnum>
  }


  /**
   * TikTokCredentials create
   */
  export type TikTokCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * The data needed to create a TikTokCredentials.
     */
    data: XOR<TikTokCredentialsCreateInput, TikTokCredentialsUncheckedCreateInput>
  }


  /**
   * TikTokCredentials createMany
   */
  export type TikTokCredentialsCreateManyArgs = {
    /**
     * The data used to create many TikTokCredentials.
     */
    data: Enumerable<TikTokCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TikTokCredentials update
   */
  export type TikTokCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * The data needed to update a TikTokCredentials.
     */
    data: XOR<TikTokCredentialsUpdateInput, TikTokCredentialsUncheckedUpdateInput>
    /**
     * Choose, which TikTokCredentials to update.
     */
    where: TikTokCredentialsWhereUniqueInput
  }


  /**
   * TikTokCredentials updateMany
   */
  export type TikTokCredentialsUpdateManyArgs = {
    /**
     * The data used to update TikTokCredentials.
     */
    data: XOR<TikTokCredentialsUpdateManyMutationInput, TikTokCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which TikTokCredentials to update
     */
    where?: TikTokCredentialsWhereInput
  }


  /**
   * TikTokCredentials upsert
   */
  export type TikTokCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * The filter to search for the TikTokCredentials to update in case it exists.
     */
    where: TikTokCredentialsWhereUniqueInput
    /**
     * In case the TikTokCredentials found by the `where` argument doesn't exist, create a new TikTokCredentials with this data.
     */
    create: XOR<TikTokCredentialsCreateInput, TikTokCredentialsUncheckedCreateInput>
    /**
     * In case the TikTokCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TikTokCredentialsUpdateInput, TikTokCredentialsUncheckedUpdateInput>
  }


  /**
   * TikTokCredentials delete
   */
  export type TikTokCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
    /**
     * Filter which TikTokCredentials to delete.
     */
    where: TikTokCredentialsWhereUniqueInput
  }


  /**
   * TikTokCredentials deleteMany
   */
  export type TikTokCredentialsDeleteManyArgs = {
    /**
     * Filter which TikTokCredentials to delete
     */
    where?: TikTokCredentialsWhereInput
  }


  /**
   * TikTokCredentials without action
   */
  export type TikTokCredentialsArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     */
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TikTokCredentialsInclude | null
  }



  /**
   * Model FacebookCredentials
   */


  export type AggregateFacebookCredentials = {
    _count: FacebookCredentialsCountAggregateOutputType | null
    _min: FacebookCredentialsMinAggregateOutputType | null
    _max: FacebookCredentialsMaxAggregateOutputType | null
  }

  export type FacebookCredentialsMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pageId: string | null
    projectId: string | null
  }

  export type FacebookCredentialsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pageId: string | null
    projectId: string | null
  }

  export type FacebookCredentialsCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    pageId: number
    projectId: number
    _all: number
  }


  export type FacebookCredentialsMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    projectId?: true
  }

  export type FacebookCredentialsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    projectId?: true
  }

  export type FacebookCredentialsCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    projectId?: true
    _all?: true
  }

  export type FacebookCredentialsAggregateArgs = {
    /**
     * Filter which FacebookCredentials to aggregate.
     */
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     */
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FacebookCredentials
    **/
    _count?: true | FacebookCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacebookCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacebookCredentialsMaxAggregateInputType
  }

  export type GetFacebookCredentialsAggregateType<T extends FacebookCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateFacebookCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacebookCredentials[P]>
      : GetScalarType<T[P], AggregateFacebookCredentials[P]>
  }




  export type FacebookCredentialsGroupByArgs = {
    where?: FacebookCredentialsWhereInput
    orderBy?: Enumerable<FacebookCredentialsOrderByWithAggregationInput>
    by: FacebookCredentialsScalarFieldEnum[]
    having?: FacebookCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacebookCredentialsCountAggregateInputType | true
    _min?: FacebookCredentialsMinAggregateInputType
    _max?: FacebookCredentialsMaxAggregateInputType
  }


  export type FacebookCredentialsGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    pageId: string
    projectId: string
    _count: FacebookCredentialsCountAggregateOutputType | null
    _min: FacebookCredentialsMinAggregateOutputType | null
    _max: FacebookCredentialsMaxAggregateOutputType | null
  }

  type GetFacebookCredentialsGroupByPayload<T extends FacebookCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<FacebookCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacebookCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacebookCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], FacebookCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type FacebookCredentialsSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    pageId?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type FacebookCredentialsInclude = {
    project?: boolean | ProjectArgs
  }

  export type FacebookCredentialsGetPayload<S extends boolean | null | undefined | FacebookCredentialsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FacebookCredentials :
    S extends undefined ? never :
    S extends { include: any } & (FacebookCredentialsArgs | FacebookCredentialsFindManyArgs)
    ? FacebookCredentials  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (FacebookCredentialsArgs | FacebookCredentialsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof FacebookCredentials ? FacebookCredentials[P] : never
  } 
      : FacebookCredentials


  type FacebookCredentialsCountArgs = 
    Omit<FacebookCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: FacebookCredentialsCountAggregateInputType | true
    }

  export interface FacebookCredentialsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one FacebookCredentials that matches the filter.
     * @param {FacebookCredentialsFindUniqueArgs} args - Arguments to find a FacebookCredentials
     * @example
     * // Get one FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FacebookCredentialsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FacebookCredentialsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FacebookCredentials'> extends True ? Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>> : Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | null, null>

    /**
     * Find one FacebookCredentials that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FacebookCredentialsFindUniqueOrThrowArgs} args - Arguments to find a FacebookCredentials
     * @example
     * // Get one FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FacebookCredentialsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FacebookCredentialsFindUniqueOrThrowArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Find the first FacebookCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsFindFirstArgs} args - Arguments to find a FacebookCredentials
     * @example
     * // Get one FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FacebookCredentialsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FacebookCredentialsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FacebookCredentials'> extends True ? Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>> : Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | null, null>

    /**
     * Find the first FacebookCredentials that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsFindFirstOrThrowArgs} args - Arguments to find a FacebookCredentials
     * @example
     * // Get one FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FacebookCredentialsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FacebookCredentialsFindFirstOrThrowArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Find zero or more FacebookCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findMany()
     * 
     * // Get first 10 FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const facebookCredentialsWithIdOnly = await prisma.facebookCredentials.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FacebookCredentialsFindManyArgs>(
      args?: SelectSubset<T, FacebookCredentialsFindManyArgs>
    ): Prisma.PrismaPromise<Array<FacebookCredentialsGetPayload<T>>>

    /**
     * Create a FacebookCredentials.
     * @param {FacebookCredentialsCreateArgs} args - Arguments to create a FacebookCredentials.
     * @example
     * // Create one FacebookCredentials
     * const FacebookCredentials = await prisma.facebookCredentials.create({
     *   data: {
     *     // ... data to create a FacebookCredentials
     *   }
     * })
     * 
    **/
    create<T extends FacebookCredentialsCreateArgs>(
      args: SelectSubset<T, FacebookCredentialsCreateArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Create many FacebookCredentials.
     *     @param {FacebookCredentialsCreateManyArgs} args - Arguments to create many FacebookCredentials.
     *     @example
     *     // Create many FacebookCredentials
     *     const facebookCredentials = await prisma.facebookCredentials.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FacebookCredentialsCreateManyArgs>(
      args?: SelectSubset<T, FacebookCredentialsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a FacebookCredentials.
     * @param {FacebookCredentialsDeleteArgs} args - Arguments to delete one FacebookCredentials.
     * @example
     * // Delete one FacebookCredentials
     * const FacebookCredentials = await prisma.facebookCredentials.delete({
     *   where: {
     *     // ... filter to delete one FacebookCredentials
     *   }
     * })
     * 
    **/
    delete<T extends FacebookCredentialsDeleteArgs>(
      args: SelectSubset<T, FacebookCredentialsDeleteArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Update one FacebookCredentials.
     * @param {FacebookCredentialsUpdateArgs} args - Arguments to update one FacebookCredentials.
     * @example
     * // Update one FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FacebookCredentialsUpdateArgs>(
      args: SelectSubset<T, FacebookCredentialsUpdateArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Delete zero or more FacebookCredentials.
     * @param {FacebookCredentialsDeleteManyArgs} args - Arguments to filter FacebookCredentials to delete.
     * @example
     * // Delete a few FacebookCredentials
     * const { count } = await prisma.facebookCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FacebookCredentialsDeleteManyArgs>(
      args?: SelectSubset<T, FacebookCredentialsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FacebookCredentialsUpdateManyArgs>(
      args: SelectSubset<T, FacebookCredentialsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FacebookCredentials.
     * @param {FacebookCredentialsUpsertArgs} args - Arguments to update or create a FacebookCredentials.
     * @example
     * // Update or create a FacebookCredentials
     * const facebookCredentials = await prisma.facebookCredentials.upsert({
     *   create: {
     *     // ... data to create a FacebookCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacebookCredentials we want to update
     *   }
     * })
    **/
    upsert<T extends FacebookCredentialsUpsertArgs>(
      args: SelectSubset<T, FacebookCredentialsUpsertArgs>
    ): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>

    /**
     * Count the number of FacebookCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsCountArgs} args - Arguments to filter FacebookCredentials to count.
     * @example
     * // Count the number of FacebookCredentials
     * const count = await prisma.facebookCredentials.count({
     *   where: {
     *     // ... the filter for the FacebookCredentials we want to count
     *   }
     * })
    **/
    count<T extends FacebookCredentialsCountArgs>(
      args?: Subset<T, FacebookCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacebookCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FacebookCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FacebookCredentialsAggregateArgs>(args: Subset<T, FacebookCredentialsAggregateArgs>): Prisma.PrismaPromise<GetFacebookCredentialsAggregateType<T>>

    /**
     * Group by FacebookCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FacebookCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacebookCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: FacebookCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FacebookCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FacebookCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FacebookCredentialsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * FacebookCredentials base type for findUnique actions
   */
  export type FacebookCredentialsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     */
    where: FacebookCredentialsWhereUniqueInput
  }

  /**
   * FacebookCredentials findUnique
   */
  export interface FacebookCredentialsFindUniqueArgs extends FacebookCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookCredentials findUniqueOrThrow
   */
  export type FacebookCredentialsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     */
    where: FacebookCredentialsWhereUniqueInput
  }


  /**
   * FacebookCredentials base type for findFirst actions
   */
  export type FacebookCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     */
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     */
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookCredentials.
     */
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookCredentials.
     */
    distinct?: Enumerable<FacebookCredentialsScalarFieldEnum>
  }

  /**
   * FacebookCredentials findFirst
   */
  export interface FacebookCredentialsFindFirstArgs extends FacebookCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookCredentials findFirstOrThrow
   */
  export type FacebookCredentialsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     */
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     */
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookCredentials.
     */
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookCredentials.
     */
    distinct?: Enumerable<FacebookCredentialsScalarFieldEnum>
  }


  /**
   * FacebookCredentials findMany
   */
  export type FacebookCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     */
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     */
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacebookCredentials.
     */
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     */
    skip?: number
    distinct?: Enumerable<FacebookCredentialsScalarFieldEnum>
  }


  /**
   * FacebookCredentials create
   */
  export type FacebookCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * The data needed to create a FacebookCredentials.
     */
    data: XOR<FacebookCredentialsCreateInput, FacebookCredentialsUncheckedCreateInput>
  }


  /**
   * FacebookCredentials createMany
   */
  export type FacebookCredentialsCreateManyArgs = {
    /**
     * The data used to create many FacebookCredentials.
     */
    data: Enumerable<FacebookCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * FacebookCredentials update
   */
  export type FacebookCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * The data needed to update a FacebookCredentials.
     */
    data: XOR<FacebookCredentialsUpdateInput, FacebookCredentialsUncheckedUpdateInput>
    /**
     * Choose, which FacebookCredentials to update.
     */
    where: FacebookCredentialsWhereUniqueInput
  }


  /**
   * FacebookCredentials updateMany
   */
  export type FacebookCredentialsUpdateManyArgs = {
    /**
     * The data used to update FacebookCredentials.
     */
    data: XOR<FacebookCredentialsUpdateManyMutationInput, FacebookCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which FacebookCredentials to update
     */
    where?: FacebookCredentialsWhereInput
  }


  /**
   * FacebookCredentials upsert
   */
  export type FacebookCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * The filter to search for the FacebookCredentials to update in case it exists.
     */
    where: FacebookCredentialsWhereUniqueInput
    /**
     * In case the FacebookCredentials found by the `where` argument doesn't exist, create a new FacebookCredentials with this data.
     */
    create: XOR<FacebookCredentialsCreateInput, FacebookCredentialsUncheckedCreateInput>
    /**
     * In case the FacebookCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FacebookCredentialsUpdateInput, FacebookCredentialsUncheckedUpdateInput>
  }


  /**
   * FacebookCredentials delete
   */
  export type FacebookCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
    /**
     * Filter which FacebookCredentials to delete.
     */
    where: FacebookCredentialsWhereUniqueInput
  }


  /**
   * FacebookCredentials deleteMany
   */
  export type FacebookCredentialsDeleteManyArgs = {
    /**
     * Filter which FacebookCredentials to delete
     */
    where?: FacebookCredentialsWhereInput
  }


  /**
   * FacebookCredentials without action
   */
  export type FacebookCredentialsArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     */
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FacebookCredentialsInclude | null
  }



  /**
   * Model TwitterCredentials
   */


  export type AggregateTwitterCredentials = {
    _count: TwitterCredentialsCountAggregateOutputType | null
    _min: TwitterCredentialsMinAggregateOutputType | null
    _max: TwitterCredentialsMaxAggregateOutputType | null
  }

  export type TwitterCredentialsMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type TwitterCredentialsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type TwitterCredentialsCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    projectId: number
    _all: number
  }


  export type TwitterCredentialsMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type TwitterCredentialsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type TwitterCredentialsCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    _all?: true
  }

  export type TwitterCredentialsAggregateArgs = {
    /**
     * Filter which TwitterCredentials to aggregate.
     */
    where?: TwitterCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCredentials to fetch.
     */
    orderBy?: Enumerable<TwitterCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TwitterCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TwitterCredentials
    **/
    _count?: true | TwitterCredentialsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TwitterCredentialsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TwitterCredentialsMaxAggregateInputType
  }

  export type GetTwitterCredentialsAggregateType<T extends TwitterCredentialsAggregateArgs> = {
        [P in keyof T & keyof AggregateTwitterCredentials]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTwitterCredentials[P]>
      : GetScalarType<T[P], AggregateTwitterCredentials[P]>
  }




  export type TwitterCredentialsGroupByArgs = {
    where?: TwitterCredentialsWhereInput
    orderBy?: Enumerable<TwitterCredentialsOrderByWithAggregationInput>
    by: TwitterCredentialsScalarFieldEnum[]
    having?: TwitterCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TwitterCredentialsCountAggregateInputType | true
    _min?: TwitterCredentialsMinAggregateInputType
    _max?: TwitterCredentialsMaxAggregateInputType
  }


  export type TwitterCredentialsGroupByOutputType = {
    id: string
    createdAt: Date
    updatedAt: Date
    projectId: string
    _count: TwitterCredentialsCountAggregateOutputType | null
    _min: TwitterCredentialsMinAggregateOutputType | null
    _max: TwitterCredentialsMaxAggregateOutputType | null
  }

  type GetTwitterCredentialsGroupByPayload<T extends TwitterCredentialsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<TwitterCredentialsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TwitterCredentialsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TwitterCredentialsGroupByOutputType[P]>
            : GetScalarType<T[P], TwitterCredentialsGroupByOutputType[P]>
        }
      >
    >


  export type TwitterCredentialsSelect = {
    id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type TwitterCredentialsInclude = {
    project?: boolean | ProjectArgs
  }

  export type TwitterCredentialsGetPayload<S extends boolean | null | undefined | TwitterCredentialsArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? TwitterCredentials :
    S extends undefined ? never :
    S extends { include: any } & (TwitterCredentialsArgs | TwitterCredentialsFindManyArgs)
    ? TwitterCredentials  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (TwitterCredentialsArgs | TwitterCredentialsFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof TwitterCredentials ? TwitterCredentials[P] : never
  } 
      : TwitterCredentials


  type TwitterCredentialsCountArgs = 
    Omit<TwitterCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: TwitterCredentialsCountAggregateInputType | true
    }

  export interface TwitterCredentialsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one TwitterCredentials that matches the filter.
     * @param {TwitterCredentialsFindUniqueArgs} args - Arguments to find a TwitterCredentials
     * @example
     * // Get one TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TwitterCredentialsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TwitterCredentialsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TwitterCredentials'> extends True ? Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>> : Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T> | null, null>

    /**
     * Find one TwitterCredentials that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TwitterCredentialsFindUniqueOrThrowArgs} args - Arguments to find a TwitterCredentials
     * @example
     * // Get one TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TwitterCredentialsFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TwitterCredentialsFindUniqueOrThrowArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Find the first TwitterCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsFindFirstArgs} args - Arguments to find a TwitterCredentials
     * @example
     * // Get one TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TwitterCredentialsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TwitterCredentialsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TwitterCredentials'> extends True ? Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>> : Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T> | null, null>

    /**
     * Find the first TwitterCredentials that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsFindFirstOrThrowArgs} args - Arguments to find a TwitterCredentials
     * @example
     * // Get one TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TwitterCredentialsFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TwitterCredentialsFindFirstOrThrowArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Find zero or more TwitterCredentials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findMany()
     * 
     * // Get first 10 TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const twitterCredentialsWithIdOnly = await prisma.twitterCredentials.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TwitterCredentialsFindManyArgs>(
      args?: SelectSubset<T, TwitterCredentialsFindManyArgs>
    ): Prisma.PrismaPromise<Array<TwitterCredentialsGetPayload<T>>>

    /**
     * Create a TwitterCredentials.
     * @param {TwitterCredentialsCreateArgs} args - Arguments to create a TwitterCredentials.
     * @example
     * // Create one TwitterCredentials
     * const TwitterCredentials = await prisma.twitterCredentials.create({
     *   data: {
     *     // ... data to create a TwitterCredentials
     *   }
     * })
     * 
    **/
    create<T extends TwitterCredentialsCreateArgs>(
      args: SelectSubset<T, TwitterCredentialsCreateArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Create many TwitterCredentials.
     *     @param {TwitterCredentialsCreateManyArgs} args - Arguments to create many TwitterCredentials.
     *     @example
     *     // Create many TwitterCredentials
     *     const twitterCredentials = await prisma.twitterCredentials.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TwitterCredentialsCreateManyArgs>(
      args?: SelectSubset<T, TwitterCredentialsCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a TwitterCredentials.
     * @param {TwitterCredentialsDeleteArgs} args - Arguments to delete one TwitterCredentials.
     * @example
     * // Delete one TwitterCredentials
     * const TwitterCredentials = await prisma.twitterCredentials.delete({
     *   where: {
     *     // ... filter to delete one TwitterCredentials
     *   }
     * })
     * 
    **/
    delete<T extends TwitterCredentialsDeleteArgs>(
      args: SelectSubset<T, TwitterCredentialsDeleteArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Update one TwitterCredentials.
     * @param {TwitterCredentialsUpdateArgs} args - Arguments to update one TwitterCredentials.
     * @example
     * // Update one TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TwitterCredentialsUpdateArgs>(
      args: SelectSubset<T, TwitterCredentialsUpdateArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Delete zero or more TwitterCredentials.
     * @param {TwitterCredentialsDeleteManyArgs} args - Arguments to filter TwitterCredentials to delete.
     * @example
     * // Delete a few TwitterCredentials
     * const { count } = await prisma.twitterCredentials.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TwitterCredentialsDeleteManyArgs>(
      args?: SelectSubset<T, TwitterCredentialsDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TwitterCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TwitterCredentialsUpdateManyArgs>(
      args: SelectSubset<T, TwitterCredentialsUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one TwitterCredentials.
     * @param {TwitterCredentialsUpsertArgs} args - Arguments to update or create a TwitterCredentials.
     * @example
     * // Update or create a TwitterCredentials
     * const twitterCredentials = await prisma.twitterCredentials.upsert({
     *   create: {
     *     // ... data to create a TwitterCredentials
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TwitterCredentials we want to update
     *   }
     * })
    **/
    upsert<T extends TwitterCredentialsUpsertArgs>(
      args: SelectSubset<T, TwitterCredentialsUpsertArgs>
    ): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T>>

    /**
     * Count the number of TwitterCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsCountArgs} args - Arguments to filter TwitterCredentials to count.
     * @example
     * // Count the number of TwitterCredentials
     * const count = await prisma.twitterCredentials.count({
     *   where: {
     *     // ... the filter for the TwitterCredentials we want to count
     *   }
     * })
    **/
    count<T extends TwitterCredentialsCountArgs>(
      args?: Subset<T, TwitterCredentialsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TwitterCredentialsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TwitterCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TwitterCredentialsAggregateArgs>(args: Subset<T, TwitterCredentialsAggregateArgs>): Prisma.PrismaPromise<GetTwitterCredentialsAggregateType<T>>

    /**
     * Group by TwitterCredentials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TwitterCredentialsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TwitterCredentialsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TwitterCredentialsGroupByArgs['orderBy'] }
        : { orderBy?: TwitterCredentialsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TwitterCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTwitterCredentialsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TwitterCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TwitterCredentialsClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * TwitterCredentials base type for findUnique actions
   */
  export type TwitterCredentialsFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter, which TwitterCredentials to fetch.
     */
    where: TwitterCredentialsWhereUniqueInput
  }

  /**
   * TwitterCredentials findUnique
   */
  export interface TwitterCredentialsFindUniqueArgs extends TwitterCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TwitterCredentials findUniqueOrThrow
   */
  export type TwitterCredentialsFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter, which TwitterCredentials to fetch.
     */
    where: TwitterCredentialsWhereUniqueInput
  }


  /**
   * TwitterCredentials base type for findFirst actions
   */
  export type TwitterCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter, which TwitterCredentials to fetch.
     */
    where?: TwitterCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCredentials to fetch.
     */
    orderBy?: Enumerable<TwitterCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwitterCredentials.
     */
    cursor?: TwitterCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwitterCredentials.
     */
    distinct?: Enumerable<TwitterCredentialsScalarFieldEnum>
  }

  /**
   * TwitterCredentials findFirst
   */
  export interface TwitterCredentialsFindFirstArgs extends TwitterCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TwitterCredentials findFirstOrThrow
   */
  export type TwitterCredentialsFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter, which TwitterCredentials to fetch.
     */
    where?: TwitterCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCredentials to fetch.
     */
    orderBy?: Enumerable<TwitterCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TwitterCredentials.
     */
    cursor?: TwitterCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCredentials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TwitterCredentials.
     */
    distinct?: Enumerable<TwitterCredentialsScalarFieldEnum>
  }


  /**
   * TwitterCredentials findMany
   */
  export type TwitterCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter, which TwitterCredentials to fetch.
     */
    where?: TwitterCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TwitterCredentials to fetch.
     */
    orderBy?: Enumerable<TwitterCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TwitterCredentials.
     */
    cursor?: TwitterCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TwitterCredentials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TwitterCredentials.
     */
    skip?: number
    distinct?: Enumerable<TwitterCredentialsScalarFieldEnum>
  }


  /**
   * TwitterCredentials create
   */
  export type TwitterCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * The data needed to create a TwitterCredentials.
     */
    data: XOR<TwitterCredentialsCreateInput, TwitterCredentialsUncheckedCreateInput>
  }


  /**
   * TwitterCredentials createMany
   */
  export type TwitterCredentialsCreateManyArgs = {
    /**
     * The data used to create many TwitterCredentials.
     */
    data: Enumerable<TwitterCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TwitterCredentials update
   */
  export type TwitterCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * The data needed to update a TwitterCredentials.
     */
    data: XOR<TwitterCredentialsUpdateInput, TwitterCredentialsUncheckedUpdateInput>
    /**
     * Choose, which TwitterCredentials to update.
     */
    where: TwitterCredentialsWhereUniqueInput
  }


  /**
   * TwitterCredentials updateMany
   */
  export type TwitterCredentialsUpdateManyArgs = {
    /**
     * The data used to update TwitterCredentials.
     */
    data: XOR<TwitterCredentialsUpdateManyMutationInput, TwitterCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which TwitterCredentials to update
     */
    where?: TwitterCredentialsWhereInput
  }


  /**
   * TwitterCredentials upsert
   */
  export type TwitterCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * The filter to search for the TwitterCredentials to update in case it exists.
     */
    where: TwitterCredentialsWhereUniqueInput
    /**
     * In case the TwitterCredentials found by the `where` argument doesn't exist, create a new TwitterCredentials with this data.
     */
    create: XOR<TwitterCredentialsCreateInput, TwitterCredentialsUncheckedCreateInput>
    /**
     * In case the TwitterCredentials was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TwitterCredentialsUpdateInput, TwitterCredentialsUncheckedUpdateInput>
  }


  /**
   * TwitterCredentials delete
   */
  export type TwitterCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
    /**
     * Filter which TwitterCredentials to delete.
     */
    where: TwitterCredentialsWhereUniqueInput
  }


  /**
   * TwitterCredentials deleteMany
   */
  export type TwitterCredentialsDeleteManyArgs = {
    /**
     * Filter which TwitterCredentials to delete
     */
    where?: TwitterCredentialsWhereInput
  }


  /**
   * TwitterCredentials without action
   */
  export type TwitterCredentialsArgs = {
    /**
     * Select specific fields to fetch from the TwitterCredentials
     */
    select?: TwitterCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TwitterCredentialsInclude | null
  }



  /**
   * Model Content
   */


  export type AggregateContent = {
    _count: ContentCountAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  export type ContentMinAggregateOutputType = {
    slug: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    gif: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    youtubeId: string | null
    youtubeStatus: UploadStatus | null
    youtubePublishAt: Date | null
    tikTokId: string | null
    tikTokStatus: UploadStatus | null
    tikTokPublishAt: Date | null
    instagramId: string | null
    instagramStatus: UploadStatus | null
    instagramPublishAt: Date | null
    facebookId: string | null
    facebookStatus: UploadStatus | null
    facebookPublishAt: Date | null
    twitterId: string | null
    twitterStatus: UploadStatus | null
    twitterPublishAt: Date | null
  }

  export type ContentMaxAggregateOutputType = {
    slug: string | null
    title: string | null
    description: string | null
    thumbnail: string | null
    gif: string | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
    youtubeId: string | null
    youtubeStatus: UploadStatus | null
    youtubePublishAt: Date | null
    tikTokId: string | null
    tikTokStatus: UploadStatus | null
    tikTokPublishAt: Date | null
    instagramId: string | null
    instagramStatus: UploadStatus | null
    instagramPublishAt: Date | null
    facebookId: string | null
    facebookStatus: UploadStatus | null
    facebookPublishAt: Date | null
    twitterId: string | null
    twitterStatus: UploadStatus | null
    twitterPublishAt: Date | null
  }

  export type ContentCountAggregateOutputType = {
    slug: number
    title: number
    description: number
    thumbnail: number
    gif: number
    tags: number
    createdAt: number
    updatedAt: number
    projectId: number
    youtubeId: number
    youtubeStatus: number
    youtubePublishAt: number
    tikTokId: number
    tikTokStatus: number
    tikTokPublishAt: number
    instagramId: number
    instagramStatus: number
    instagramPublishAt: number
    facebookId: number
    facebookStatus: number
    facebookPublishAt: number
    twitterId: number
    twitterStatus: number
    twitterPublishAt: number
    annotations: number
    labels: number
    transcription: number
    textDetection: number
    _all: number
  }


  export type ContentMinAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    thumbnail?: true
    gif?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    youtubeId?: true
    youtubeStatus?: true
    youtubePublishAt?: true
    tikTokId?: true
    tikTokStatus?: true
    tikTokPublishAt?: true
    instagramId?: true
    instagramStatus?: true
    instagramPublishAt?: true
    facebookId?: true
    facebookStatus?: true
    facebookPublishAt?: true
    twitterId?: true
    twitterStatus?: true
    twitterPublishAt?: true
  }

  export type ContentMaxAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    thumbnail?: true
    gif?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    youtubeId?: true
    youtubeStatus?: true
    youtubePublishAt?: true
    tikTokId?: true
    tikTokStatus?: true
    tikTokPublishAt?: true
    instagramId?: true
    instagramStatus?: true
    instagramPublishAt?: true
    facebookId?: true
    facebookStatus?: true
    facebookPublishAt?: true
    twitterId?: true
    twitterStatus?: true
    twitterPublishAt?: true
  }

  export type ContentCountAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    thumbnail?: true
    gif?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    youtubeId?: true
    youtubeStatus?: true
    youtubePublishAt?: true
    tikTokId?: true
    tikTokStatus?: true
    tikTokPublishAt?: true
    instagramId?: true
    instagramStatus?: true
    instagramPublishAt?: true
    facebookId?: true
    facebookStatus?: true
    facebookPublishAt?: true
    twitterId?: true
    twitterStatus?: true
    twitterPublishAt?: true
    annotations?: true
    labels?: true
    transcription?: true
    textDetection?: true
    _all?: true
  }

  export type ContentAggregateArgs = {
    /**
     * Filter which Content to aggregate.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contents
    **/
    _count?: true | ContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContentMaxAggregateInputType
  }

  export type GetContentAggregateType<T extends ContentAggregateArgs> = {
        [P in keyof T & keyof AggregateContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContent[P]>
      : GetScalarType<T[P], AggregateContent[P]>
  }




  export type ContentGroupByArgs = {
    where?: ContentWhereInput
    orderBy?: Enumerable<ContentOrderByWithAggregationInput>
    by: ContentScalarFieldEnum[]
    having?: ContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContentCountAggregateInputType | true
    _min?: ContentMinAggregateInputType
    _max?: ContentMaxAggregateInputType
  }


  export type ContentGroupByOutputType = {
    slug: string
    title: string
    description: string | null
    thumbnail: string | null
    gif: string | null
    tags: string[]
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string
    youtubeId: string | null
    youtubeStatus: UploadStatus | null
    youtubePublishAt: Date | null
    tikTokId: string | null
    tikTokStatus: UploadStatus | null
    tikTokPublishAt: Date | null
    instagramId: string | null
    instagramStatus: UploadStatus | null
    instagramPublishAt: Date | null
    facebookId: string | null
    facebookStatus: UploadStatus | null
    facebookPublishAt: Date | null
    twitterId: string | null
    twitterStatus: UploadStatus | null
    twitterPublishAt: Date | null
    annotations: JsonValue | null
    labels: JsonValue | null
    transcription: JsonValue | null
    textDetection: JsonValue | null
    _count: ContentCountAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContentGroupByOutputType[P]>
            : GetScalarType<T[P], ContentGroupByOutputType[P]>
        }
      >
    >


  export type ContentSelect = {
    slug?: boolean
    title?: boolean
    description?: boolean
    thumbnail?: boolean
    gif?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    youtubeId?: boolean
    youtubeStatus?: boolean
    youtubePublishAt?: boolean
    tikTokId?: boolean
    tikTokStatus?: boolean
    tikTokPublishAt?: boolean
    instagramId?: boolean
    instagramStatus?: boolean
    instagramPublishAt?: boolean
    facebookId?: boolean
    facebookStatus?: boolean
    facebookPublishAt?: boolean
    twitterId?: boolean
    twitterStatus?: boolean
    twitterPublishAt?: boolean
    annotations?: boolean
    labels?: boolean
    transcription?: boolean
    textDetection?: boolean
    project?: boolean | ProjectArgs
  }


  export type ContentInclude = {
    project?: boolean | ProjectArgs
  }

  export type ContentGetPayload<S extends boolean | null | undefined | ContentArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Content :
    S extends undefined ? never :
    S extends { include: any } & (ContentArgs | ContentFindManyArgs)
    ? Content  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ContentArgs | ContentFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof Content ? Content[P] : never
  } 
      : Content


  type ContentCountArgs = 
    Omit<ContentFindManyArgs, 'select' | 'include'> & {
      select?: ContentCountAggregateInputType | true
    }

  export interface ContentDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Content that matches the filter.
     * @param {ContentFindUniqueArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ContentFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ContentFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Content'> extends True ? Prisma__ContentClient<ContentGetPayload<T>> : Prisma__ContentClient<ContentGetPayload<T> | null, null>

    /**
     * Find one Content that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ContentFindUniqueOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ContentFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ContentFindUniqueOrThrowArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Find the first Content that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ContentFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ContentFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Content'> extends True ? Prisma__ContentClient<ContentGetPayload<T>> : Prisma__ContentClient<ContentGetPayload<T> | null, null>

    /**
     * Find the first Content that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindFirstOrThrowArgs} args - Arguments to find a Content
     * @example
     * // Get one Content
     * const content = await prisma.content.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ContentFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ContentFindFirstOrThrowArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Find zero or more Contents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contents
     * const contents = await prisma.content.findMany()
     * 
     * // Get first 10 Contents
     * const contents = await prisma.content.findMany({ take: 10 })
     * 
     * // Only select the `slug`
     * const contentWithSlugOnly = await prisma.content.findMany({ select: { slug: true } })
     * 
    **/
    findMany<T extends ContentFindManyArgs>(
      args?: SelectSubset<T, ContentFindManyArgs>
    ): Prisma.PrismaPromise<Array<ContentGetPayload<T>>>

    /**
     * Create a Content.
     * @param {ContentCreateArgs} args - Arguments to create a Content.
     * @example
     * // Create one Content
     * const Content = await prisma.content.create({
     *   data: {
     *     // ... data to create a Content
     *   }
     * })
     * 
    **/
    create<T extends ContentCreateArgs>(
      args: SelectSubset<T, ContentCreateArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Create many Contents.
     *     @param {ContentCreateManyArgs} args - Arguments to create many Contents.
     *     @example
     *     // Create many Contents
     *     const content = await prisma.content.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ContentCreateManyArgs>(
      args?: SelectSubset<T, ContentCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Content.
     * @param {ContentDeleteArgs} args - Arguments to delete one Content.
     * @example
     * // Delete one Content
     * const Content = await prisma.content.delete({
     *   where: {
     *     // ... filter to delete one Content
     *   }
     * })
     * 
    **/
    delete<T extends ContentDeleteArgs>(
      args: SelectSubset<T, ContentDeleteArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Update one Content.
     * @param {ContentUpdateArgs} args - Arguments to update one Content.
     * @example
     * // Update one Content
     * const content = await prisma.content.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ContentUpdateArgs>(
      args: SelectSubset<T, ContentUpdateArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Delete zero or more Contents.
     * @param {ContentDeleteManyArgs} args - Arguments to filter Contents to delete.
     * @example
     * // Delete a few Contents
     * const { count } = await prisma.content.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ContentDeleteManyArgs>(
      args?: SelectSubset<T, ContentDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contents
     * const content = await prisma.content.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ContentUpdateManyArgs>(
      args: SelectSubset<T, ContentUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Content.
     * @param {ContentUpsertArgs} args - Arguments to update or create a Content.
     * @example
     * // Update or create a Content
     * const content = await prisma.content.upsert({
     *   create: {
     *     // ... data to create a Content
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Content we want to update
     *   }
     * })
    **/
    upsert<T extends ContentUpsertArgs>(
      args: SelectSubset<T, ContentUpsertArgs>
    ): Prisma__ContentClient<ContentGetPayload<T>>

    /**
     * Count the number of Contents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentCountArgs} args - Arguments to filter Contents to count.
     * @example
     * // Count the number of Contents
     * const count = await prisma.content.count({
     *   where: {
     *     // ... the filter for the Contents we want to count
     *   }
     * })
    **/
    count<T extends ContentCountArgs>(
      args?: Subset<T, ContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): Prisma.PrismaPromise<GetContentAggregateType<T>>

    /**
     * Group by Content.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContentGroupByArgs['orderBy'] }
        : { orderBy?: ContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContentClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Content base type for findUnique actions
   */
  export type ContentFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }

  /**
   * Content findUnique
   */
  export interface ContentFindUniqueArgs extends ContentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Content findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     */
    where: ContentWhereUniqueInput
  }


  /**
   * Content base type for findFirst actions
   */
  export type ContentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: Enumerable<ContentScalarFieldEnum>
  }

  /**
   * Content findFirst
   */
  export interface ContentFindFirstArgs extends ContentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Content findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     */
    distinct?: Enumerable<ContentScalarFieldEnum>
  }


  /**
   * Content findMany
   */
  export type ContentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter, which Contents to fetch.
     */
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     */
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     */
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     */
    skip?: number
    distinct?: Enumerable<ContentScalarFieldEnum>
  }


  /**
   * Content create
   */
  export type ContentCreateArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * The data needed to create a Content.
     */
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }


  /**
   * Content createMany
   */
  export type ContentCreateManyArgs = {
    /**
     * The data used to create many Contents.
     */
    data: Enumerable<ContentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Content update
   */
  export type ContentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * The data needed to update a Content.
     */
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     */
    where: ContentWhereUniqueInput
  }


  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs = {
    /**
     * The data used to update Contents.
     */
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     */
    where?: ContentWhereInput
  }


  /**
   * Content upsert
   */
  export type ContentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * The filter to search for the Content to update in case it exists.
     */
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     */
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }


  /**
   * Content delete
   */
  export type ContentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    /**
     * Filter which Content to delete.
     */
    where: ContentWhereUniqueInput
  }


  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs = {
    /**
     * Filter which Contents to delete
     */
    where?: ContentWhereInput
  }


  /**
   * Content without action
   */
  export type ContentArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
  }



  /**
   * Model Project
   */


  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectMinAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectMaxAggregateOutputType = {
    id: string | null
    title: string | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type ProjectCountAggregateOutputType = {
    id: number
    title: number
    createdAt: number
    updatedAt: number
    userId: number
    tags: number
    _all: number
  }


  export type ProjectMinAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectMaxAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type ProjectCountAggregateInputType = {
    id?: true
    title?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    tags?: true
    _all?: true
  }

  export type ProjectAggregateArgs = {
    /**
     * Filter which Project to aggregate.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type ProjectGroupByArgs = {
    where?: ProjectWhereInput
    orderBy?: Enumerable<ProjectOrderByWithAggregationInput>
    by: ProjectScalarFieldEnum[]
    having?: ProjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }


  export type ProjectGroupByOutputType = {
    id: string
    title: string
    createdAt: Date
    updatedAt: Date
    userId: string
    tags: string[]
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type ProjectSelect = {
    id?: boolean
    title?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    tags?: boolean
    user?: boolean | UserArgs
    content?: boolean | Project$contentArgs
    channels?: boolean | Project$channelsArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    instagramCredentials?: boolean | InstagramCredentialsArgs
    tikTokCredentials?: boolean | TikTokCredentialsArgs
    facebookCredentials?: boolean | FacebookCredentialsArgs
    twitterCredentials?: boolean | TwitterCredentialsArgs
    _count?: boolean | ProjectCountOutputTypeArgs
  }


  export type ProjectInclude = {
    user?: boolean | UserArgs
    content?: boolean | Project$contentArgs
    channels?: boolean | Project$channelsArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    instagramCredentials?: boolean | InstagramCredentialsArgs
    tikTokCredentials?: boolean | TikTokCredentialsArgs
    facebookCredentials?: boolean | FacebookCredentialsArgs
    twitterCredentials?: boolean | TwitterCredentialsArgs
    _count?: boolean | ProjectCountOutputTypeArgs
  }

  export type ProjectGetPayload<S extends boolean | null | undefined | ProjectArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Project :
    S extends undefined ? never :
    S extends { include: any } & (ProjectArgs | ProjectFindManyArgs)
    ? Project  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<S['include'][P]> :
        P extends 'content' ? Array < ContentGetPayload<S['include'][P]>>  :
        P extends 'channels' ? Array < ChannelGetPayload<S['include'][P]>>  :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<S['include'][P]> | null :
        P extends 'instagramCredentials' ? InstagramCredentialsGetPayload<S['include'][P]> | null :
        P extends 'tikTokCredentials' ? TikTokCredentialsGetPayload<S['include'][P]> | null :
        P extends 'facebookCredentials' ? FacebookCredentialsGetPayload<S['include'][P]> | null :
        P extends 'twitterCredentials' ? TwitterCredentialsGetPayload<S['include'][P]> | null :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ProjectArgs | ProjectFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<S['select'][P]> :
        P extends 'content' ? Array < ContentGetPayload<S['select'][P]>>  :
        P extends 'channels' ? Array < ChannelGetPayload<S['select'][P]>>  :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<S['select'][P]> | null :
        P extends 'instagramCredentials' ? InstagramCredentialsGetPayload<S['select'][P]> | null :
        P extends 'tikTokCredentials' ? TikTokCredentialsGetPayload<S['select'][P]> | null :
        P extends 'facebookCredentials' ? FacebookCredentialsGetPayload<S['select'][P]> | null :
        P extends 'twitterCredentials' ? TwitterCredentialsGetPayload<S['select'][P]> | null :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Project ? Project[P] : never
  } 
      : Project


  type ProjectCountArgs = 
    Omit<ProjectFindManyArgs, 'select' | 'include'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface ProjectDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Project that matches the filter.
     * @param {ProjectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ProjectFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ProjectFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Project'> extends True ? Prisma__ProjectClient<ProjectGetPayload<T>> : Prisma__ProjectClient<ProjectGetPayload<T> | null, null>

    /**
     * Find one Project that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ProjectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ProjectFindUniqueOrThrowArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ProjectFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ProjectFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Project'> extends True ? Prisma__ProjectClient<ProjectGetPayload<T>> : Prisma__ProjectClient<ProjectGetPayload<T> | null, null>

    /**
     * Find the first Project that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ProjectFindFirstOrThrowArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const projectWithIdOnly = await prisma.project.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ProjectFindManyArgs>(
      args?: SelectSubset<T, ProjectFindManyArgs>
    ): Prisma.PrismaPromise<Array<ProjectGetPayload<T>>>

    /**
     * Create a Project.
     * @param {ProjectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
    **/
    create<T extends ProjectCreateArgs>(
      args: SelectSubset<T, ProjectCreateArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Create many Projects.
     *     @param {ProjectCreateManyArgs} args - Arguments to create many Projects.
     *     @example
     *     // Create many Projects
     *     const project = await prisma.project.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ProjectCreateManyArgs>(
      args?: SelectSubset<T, ProjectCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Project.
     * @param {ProjectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
    **/
    delete<T extends ProjectDeleteArgs>(
      args: SelectSubset<T, ProjectDeleteArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Update one Project.
     * @param {ProjectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ProjectUpdateArgs>(
      args: SelectSubset<T, ProjectUpdateArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Delete zero or more Projects.
     * @param {ProjectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ProjectDeleteManyArgs>(
      args?: SelectSubset<T, ProjectDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ProjectUpdateManyArgs>(
      args: SelectSubset<T, ProjectUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Project.
     * @param {ProjectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
    **/
    upsert<T extends ProjectUpsertArgs>(
      args: SelectSubset<T, ProjectUpsertArgs>
    ): Prisma__ProjectClient<ProjectGetPayload<T>>

    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends ProjectCountArgs>(
      args?: Subset<T, ProjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProjectGroupByArgs['orderBy'] }
        : { orderBy?: ProjectGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProjectClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    user<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    content<T extends Project$contentArgs= {}>(args?: Subset<T, Project$contentArgs>): Prisma.PrismaPromise<Array<ContentGetPayload<T>>| Null>;

    channels<T extends Project$channelsArgs= {}>(args?: Subset<T, Project$channelsArgs>): Prisma.PrismaPromise<Array<ChannelGetPayload<T>>| Null>;

    youtubeCredentials<T extends YoutubeCredentialsArgs= {}>(args?: Subset<T, YoutubeCredentialsArgs>): Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | Null>;

    instagramCredentials<T extends InstagramCredentialsArgs= {}>(args?: Subset<T, InstagramCredentialsArgs>): Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | Null>;

    tikTokCredentials<T extends TikTokCredentialsArgs= {}>(args?: Subset<T, TikTokCredentialsArgs>): Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | Null>;

    facebookCredentials<T extends FacebookCredentialsArgs= {}>(args?: Subset<T, FacebookCredentialsArgs>): Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | Null>;

    twitterCredentials<T extends TwitterCredentialsArgs= {}>(args?: Subset<T, TwitterCredentialsArgs>): Prisma__TwitterCredentialsClient<TwitterCredentialsGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Project base type for findUnique actions
   */
  export type ProjectFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }

  /**
   * Project findUnique
   */
  export interface ProjectFindUniqueArgs extends ProjectFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     */
    where: ProjectWhereUniqueInput
  }


  /**
   * Project base type for findFirst actions
   */
  export type ProjectFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }

  /**
   * Project findFirst
   */
  export interface ProjectFindFirstArgs extends ProjectFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     */
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }


  /**
   * Project findMany
   */
  export type ProjectFindManyArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter, which Projects to fetch.
     */
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     */
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     */
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     */
    skip?: number
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }


  /**
   * Project create
   */
  export type ProjectCreateArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * The data needed to create a Project.
     */
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }


  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs = {
    /**
     * The data used to create many Projects.
     */
    data: Enumerable<ProjectCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Project update
   */
  export type ProjectUpdateArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * The data needed to update a Project.
     */
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     */
    where: ProjectWhereUniqueInput
  }


  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs = {
    /**
     * The data used to update Projects.
     */
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     */
    where?: ProjectWhereInput
  }


  /**
   * Project upsert
   */
  export type ProjectUpsertArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * The filter to search for the Project to update in case it exists.
     */
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     */
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }


  /**
   * Project delete
   */
  export type ProjectDeleteArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
    /**
     * Filter which Project to delete.
     */
    where: ProjectWhereUniqueInput
  }


  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs = {
    /**
     * Filter which Projects to delete
     */
    where?: ProjectWhereInput
  }


  /**
   * Project.content
   */
  export type Project$contentArgs = {
    /**
     * Select specific fields to fetch from the Content
     */
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ContentInclude | null
    where?: ContentWhereInput
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    cursor?: ContentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ContentScalarFieldEnum>
  }


  /**
   * Project.channels
   */
  export type Project$channelsArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    where?: ChannelWhereInput
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    cursor?: ChannelWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }


  /**
   * Project without action
   */
  export type ProjectArgs = {
    /**
     * Select specific fields to fetch from the Project
     */
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ProjectInclude | null
  }



  /**
   * Model Channel
   */


  export type AggregateChannel = {
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  export type ChannelAvgAggregateOutputType = {
    views: number | null
    subscribers: number | null
  }

  export type ChannelSumAggregateOutputType = {
    views: number | null
    subscribers: number | null
  }

  export type ChannelMinAggregateOutputType = {
    name: string | null
    views: number | null
    subscribers: number | null
    thumbnail: string | null
    channelType: ChannelType | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type ChannelMaxAggregateOutputType = {
    name: string | null
    views: number | null
    subscribers: number | null
    thumbnail: string | null
    channelType: ChannelType | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type ChannelCountAggregateOutputType = {
    name: number
    views: number
    subscribers: number
    thumbnail: number
    channelType: number
    createdAt: number
    updatedAt: number
    projectId: number
    _all: number
  }


  export type ChannelAvgAggregateInputType = {
    views?: true
    subscribers?: true
  }

  export type ChannelSumAggregateInputType = {
    views?: true
    subscribers?: true
  }

  export type ChannelMinAggregateInputType = {
    name?: true
    views?: true
    subscribers?: true
    thumbnail?: true
    channelType?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type ChannelMaxAggregateInputType = {
    name?: true
    views?: true
    subscribers?: true
    thumbnail?: true
    channelType?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type ChannelCountAggregateInputType = {
    name?: true
    views?: true
    subscribers?: true
    thumbnail?: true
    channelType?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    _all?: true
  }

  export type ChannelAggregateArgs = {
    /**
     * Filter which Channel to aggregate.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Channels
    **/
    _count?: true | ChannelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ChannelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ChannelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChannelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChannelMaxAggregateInputType
  }

  export type GetChannelAggregateType<T extends ChannelAggregateArgs> = {
        [P in keyof T & keyof AggregateChannel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChannel[P]>
      : GetScalarType<T[P], AggregateChannel[P]>
  }




  export type ChannelGroupByArgs = {
    where?: ChannelWhereInput
    orderBy?: Enumerable<ChannelOrderByWithAggregationInput>
    by: ChannelScalarFieldEnum[]
    having?: ChannelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChannelCountAggregateInputType | true
    _avg?: ChannelAvgAggregateInputType
    _sum?: ChannelSumAggregateInputType
    _min?: ChannelMinAggregateInputType
    _max?: ChannelMaxAggregateInputType
  }


  export type ChannelGroupByOutputType = {
    name: string
    views: number | null
    subscribers: number | null
    thumbnail: string | null
    channelType: ChannelType
    createdAt: Date
    updatedAt: Date
    projectId: string
    _count: ChannelCountAggregateOutputType | null
    _avg: ChannelAvgAggregateOutputType | null
    _sum: ChannelSumAggregateOutputType | null
    _min: ChannelMinAggregateOutputType | null
    _max: ChannelMaxAggregateOutputType | null
  }

  type GetChannelGroupByPayload<T extends ChannelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ChannelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChannelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChannelGroupByOutputType[P]>
            : GetScalarType<T[P], ChannelGroupByOutputType[P]>
        }
      >
    >


  export type ChannelSelect = {
    name?: boolean
    views?: boolean
    subscribers?: boolean
    thumbnail?: boolean
    channelType?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
  }


  export type ChannelInclude = {
    project?: boolean | ProjectArgs
  }

  export type ChannelGetPayload<S extends boolean | null | undefined | ChannelArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Channel :
    S extends undefined ? never :
    S extends { include: any } & (ChannelArgs | ChannelFindManyArgs)
    ? Channel  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ChannelArgs | ChannelFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<S['select'][P]> :  P extends keyof Channel ? Channel[P] : never
  } 
      : Channel


  type ChannelCountArgs = 
    Omit<ChannelFindManyArgs, 'select' | 'include'> & {
      select?: ChannelCountAggregateInputType | true
    }

  export interface ChannelDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {

    /**
     * Find zero or one Channel that matches the filter.
     * @param {ChannelFindUniqueArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ChannelFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ChannelFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Channel'> extends True ? Prisma__ChannelClient<ChannelGetPayload<T>> : Prisma__ChannelClient<ChannelGetPayload<T> | null, null>

    /**
     * Find one Channel that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ChannelFindUniqueOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ChannelFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ChannelFindUniqueOrThrowArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Find the first Channel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ChannelFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ChannelFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Channel'> extends True ? Prisma__ChannelClient<ChannelGetPayload<T>> : Prisma__ChannelClient<ChannelGetPayload<T> | null, null>

    /**
     * Find the first Channel that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindFirstOrThrowArgs} args - Arguments to find a Channel
     * @example
     * // Get one Channel
     * const channel = await prisma.channel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ChannelFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ChannelFindFirstOrThrowArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Find zero or more Channels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Channels
     * const channels = await prisma.channel.findMany()
     * 
     * // Get first 10 Channels
     * const channels = await prisma.channel.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const channelWithNameOnly = await prisma.channel.findMany({ select: { name: true } })
     * 
    **/
    findMany<T extends ChannelFindManyArgs>(
      args?: SelectSubset<T, ChannelFindManyArgs>
    ): Prisma.PrismaPromise<Array<ChannelGetPayload<T>>>

    /**
     * Create a Channel.
     * @param {ChannelCreateArgs} args - Arguments to create a Channel.
     * @example
     * // Create one Channel
     * const Channel = await prisma.channel.create({
     *   data: {
     *     // ... data to create a Channel
     *   }
     * })
     * 
    **/
    create<T extends ChannelCreateArgs>(
      args: SelectSubset<T, ChannelCreateArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Create many Channels.
     *     @param {ChannelCreateManyArgs} args - Arguments to create many Channels.
     *     @example
     *     // Create many Channels
     *     const channel = await prisma.channel.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ChannelCreateManyArgs>(
      args?: SelectSubset<T, ChannelCreateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Channel.
     * @param {ChannelDeleteArgs} args - Arguments to delete one Channel.
     * @example
     * // Delete one Channel
     * const Channel = await prisma.channel.delete({
     *   where: {
     *     // ... filter to delete one Channel
     *   }
     * })
     * 
    **/
    delete<T extends ChannelDeleteArgs>(
      args: SelectSubset<T, ChannelDeleteArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Update one Channel.
     * @param {ChannelUpdateArgs} args - Arguments to update one Channel.
     * @example
     * // Update one Channel
     * const channel = await prisma.channel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ChannelUpdateArgs>(
      args: SelectSubset<T, ChannelUpdateArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Delete zero or more Channels.
     * @param {ChannelDeleteManyArgs} args - Arguments to filter Channels to delete.
     * @example
     * // Delete a few Channels
     * const { count } = await prisma.channel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ChannelDeleteManyArgs>(
      args?: SelectSubset<T, ChannelDeleteManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Channels
     * const channel = await prisma.channel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ChannelUpdateManyArgs>(
      args: SelectSubset<T, ChannelUpdateManyArgs>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Channel.
     * @param {ChannelUpsertArgs} args - Arguments to update or create a Channel.
     * @example
     * // Update or create a Channel
     * const channel = await prisma.channel.upsert({
     *   create: {
     *     // ... data to create a Channel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Channel we want to update
     *   }
     * })
    **/
    upsert<T extends ChannelUpsertArgs>(
      args: SelectSubset<T, ChannelUpsertArgs>
    ): Prisma__ChannelClient<ChannelGetPayload<T>>

    /**
     * Count the number of Channels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelCountArgs} args - Arguments to filter Channels to count.
     * @example
     * // Count the number of Channels
     * const count = await prisma.channel.count({
     *   where: {
     *     // ... the filter for the Channels we want to count
     *   }
     * })
    **/
    count<T extends ChannelCountArgs>(
      args?: Subset<T, ChannelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChannelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChannelAggregateArgs>(args: Subset<T, ChannelAggregateArgs>): Prisma.PrismaPromise<GetChannelAggregateType<T>>

    /**
     * Group by Channel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChannelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChannelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChannelGroupByArgs['orderBy'] }
        : { orderBy?: ChannelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChannelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChannelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Channel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ChannelClient<T, Null = never> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    project<T extends ProjectArgs= {}>(args?: Subset<T, ProjectArgs>): Prisma__ProjectClient<ProjectGetPayload<T> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * Channel base type for findUnique actions
   */
  export type ChannelFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }

  /**
   * Channel findUnique
   */
  export interface ChannelFindUniqueArgs extends ChannelFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel findUniqueOrThrow
   */
  export type ChannelFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel base type for findFirst actions
   */
  export type ChannelFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }

  /**
   * Channel findFirst
   */
  export interface ChannelFindFirstArgs extends ChannelFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Channel findFirstOrThrow
   */
  export type ChannelFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channel to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Channels.
     */
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }


  /**
   * Channel findMany
   */
  export type ChannelFindManyArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter, which Channels to fetch.
     */
    where?: ChannelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Channels to fetch.
     */
    orderBy?: Enumerable<ChannelOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Channels.
     */
    cursor?: ChannelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Channels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Channels.
     */
    skip?: number
    distinct?: Enumerable<ChannelScalarFieldEnum>
  }


  /**
   * Channel create
   */
  export type ChannelCreateArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The data needed to create a Channel.
     */
    data: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
  }


  /**
   * Channel createMany
   */
  export type ChannelCreateManyArgs = {
    /**
     * The data used to create many Channels.
     */
    data: Enumerable<ChannelCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Channel update
   */
  export type ChannelUpdateArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The data needed to update a Channel.
     */
    data: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
    /**
     * Choose, which Channel to update.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel updateMany
   */
  export type ChannelUpdateManyArgs = {
    /**
     * The data used to update Channels.
     */
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyInput>
    /**
     * Filter which Channels to update
     */
    where?: ChannelWhereInput
  }


  /**
   * Channel upsert
   */
  export type ChannelUpsertArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * The filter to search for the Channel to update in case it exists.
     */
    where: ChannelWhereUniqueInput
    /**
     * In case the Channel found by the `where` argument doesn't exist, create a new Channel with this data.
     */
    create: XOR<ChannelCreateInput, ChannelUncheckedCreateInput>
    /**
     * In case the Channel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ChannelUpdateInput, ChannelUncheckedUpdateInput>
  }


  /**
   * Channel delete
   */
  export type ChannelDeleteArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
    /**
     * Filter which Channel to delete.
     */
    where: ChannelWhereUniqueInput
  }


  /**
   * Channel deleteMany
   */
  export type ChannelDeleteManyArgs = {
    /**
     * Filter which Channels to delete
     */
    where?: ChannelWhereInput
  }


  /**
   * Channel without action
   */
  export type ChannelArgs = {
    /**
     * Select specific fields to fetch from the Channel
     */
    select?: ChannelSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ChannelInclude | null
  }



  /**
   * Enums
   */

  export const ChannelScalarFieldEnum: {
    name: 'name',
    views: 'views',
    subscribers: 'subscribers',
    thumbnail: 'thumbnail',
    channelType: 'channelType',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    projectId: 'projectId'
  };

  export type ChannelScalarFieldEnum = (typeof ChannelScalarFieldEnum)[keyof typeof ChannelScalarFieldEnum]


  export const ContentScalarFieldEnum: {
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

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const FacebookCredentialsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pageId: 'pageId',
    projectId: 'projectId'
  };

  export type FacebookCredentialsScalarFieldEnum = (typeof FacebookCredentialsScalarFieldEnum)[keyof typeof FacebookCredentialsScalarFieldEnum]


  export const InstagramCredentialsScalarFieldEnum: {
    id: 'id',
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    username: 'username',
    projectId: 'projectId'
  };

  export type InstagramCredentialsScalarFieldEnum = (typeof InstagramCredentialsScalarFieldEnum)[keyof typeof InstagramCredentialsScalarFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const PasswordScalarFieldEnum: {
    hash: 'hash',
    userId: 'userId'
  };

  export type PasswordScalarFieldEnum = (typeof PasswordScalarFieldEnum)[keyof typeof PasswordScalarFieldEnum]


  export const ProjectScalarFieldEnum: {
    id: 'id',
    title: 'title',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId',
    tags: 'tags'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TikTokCredentialsScalarFieldEnum: {
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

  export type TikTokCredentialsScalarFieldEnum = (typeof TikTokCredentialsScalarFieldEnum)[keyof typeof TikTokCredentialsScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const TwitterCredentialsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    projectId: 'projectId'
  };

  export type TwitterCredentialsScalarFieldEnum = (typeof TwitterCredentialsScalarFieldEnum)[keyof typeof TwitterCredentialsScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    currentProjectId: 'currentProjectId',
    planType: 'planType',
    stripeCustomerId: 'stripeCustomerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const YoutubeCredentialsScalarFieldEnum: {
    id: 'id',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    channelId: 'channelId',
    projectId: 'projectId'
  };

  export type YoutubeCredentialsScalarFieldEnum = (typeof YoutubeCredentialsScalarFieldEnum)[keyof typeof YoutubeCredentialsScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    currentProjectId?: StringNullableFilter | string | null
    planType?: EnumPlanTypeNullableFilter | PlanType | null
    stripeCustomerId?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    password?: XOR<PasswordRelationFilter, PasswordWhereInput> | null
    projects?: ProjectListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    planType?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    password?: PasswordOrderByWithRelationInput
    projects?: ProjectOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    planType?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    currentProjectId?: StringNullableWithAggregatesFilter | string | null
    planType?: EnumPlanTypeNullableWithAggregatesFilter | PlanType | null
    stripeCustomerId?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type PasswordWhereInput = {
    AND?: Enumerable<PasswordWhereInput>
    OR?: Enumerable<PasswordWhereInput>
    NOT?: Enumerable<PasswordWhereInput>
    hash?: StringFilter | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PasswordOrderByWithRelationInput = {
    hash?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PasswordWhereUniqueInput = {
    userId?: string
  }

  export type PasswordOrderByWithAggregationInput = {
    hash?: SortOrder
    userId?: SortOrder
    _count?: PasswordCountOrderByAggregateInput
    _max?: PasswordMaxOrderByAggregateInput
    _min?: PasswordMinOrderByAggregateInput
  }

  export type PasswordScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PasswordScalarWhereWithAggregatesInput>
    OR?: Enumerable<PasswordScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PasswordScalarWhereWithAggregatesInput>
    hash?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
  }

  export type YoutubeCredentialsWhereInput = {
    AND?: Enumerable<YoutubeCredentialsWhereInput>
    OR?: Enumerable<YoutubeCredentialsWhereInput>
    NOT?: Enumerable<YoutubeCredentialsWhereInput>
    id?: StringFilter | string
    accessToken?: StringNullableFilter | string | null
    refreshToken?: StringNullableFilter | string | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    channelId?: StringNullableFilter | string | null
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type YoutubeCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type YoutubeCredentialsWhereUniqueInput = {
    id?: string
    projectId?: string
  }

  export type YoutubeCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    projectId?: SortOrder
    _count?: YoutubeCredentialsCountOrderByAggregateInput
    _max?: YoutubeCredentialsMaxOrderByAggregateInput
    _min?: YoutubeCredentialsMinOrderByAggregateInput
  }

  export type YoutubeCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<YoutubeCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<YoutubeCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<YoutubeCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    accessToken?: StringNullableWithAggregatesFilter | string | null
    refreshToken?: StringNullableWithAggregatesFilter | string | null
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    channelId?: StringNullableWithAggregatesFilter | string | null
    projectId?: StringWithAggregatesFilter | string
  }

  export type InstagramCredentialsWhereInput = {
    AND?: Enumerable<InstagramCredentialsWhereInput>
    OR?: Enumerable<InstagramCredentialsWhereInput>
    NOT?: Enumerable<InstagramCredentialsWhereInput>
    id?: StringFilter | string
    accessToken?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    username?: StringFilter | string
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type InstagramCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type InstagramCredentialsWhereUniqueInput = {
    id?: string
    projectId?: string
  }

  export type InstagramCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    projectId?: SortOrder
    _count?: InstagramCredentialsCountOrderByAggregateInput
    _max?: InstagramCredentialsMaxOrderByAggregateInput
    _min?: InstagramCredentialsMinOrderByAggregateInput
  }

  export type InstagramCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InstagramCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<InstagramCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InstagramCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    accessToken?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    username?: StringWithAggregatesFilter | string
    projectId?: StringWithAggregatesFilter | string
  }

  export type TikTokCredentialsWhereInput = {
    AND?: Enumerable<TikTokCredentialsWhereInput>
    OR?: Enumerable<TikTokCredentialsWhereInput>
    NOT?: Enumerable<TikTokCredentialsWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    handle?: StringFilter | string
    accessToken?: StringFilter | string
    refreshToken?: StringFilter | string
    refreshTokenExpiresIn?: IntFilter | number
    scope?: StringFilter | string
    openId?: StringFilter | string
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type TikTokCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    handle?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresIn?: SortOrder
    scope?: SortOrder
    openId?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type TikTokCredentialsWhereUniqueInput = {
    id?: string
    projectId?: string
  }

  export type TikTokCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    handle?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresIn?: SortOrder
    scope?: SortOrder
    openId?: SortOrder
    projectId?: SortOrder
    _count?: TikTokCredentialsCountOrderByAggregateInput
    _avg?: TikTokCredentialsAvgOrderByAggregateInput
    _max?: TikTokCredentialsMaxOrderByAggregateInput
    _min?: TikTokCredentialsMinOrderByAggregateInput
    _sum?: TikTokCredentialsSumOrderByAggregateInput
  }

  export type TikTokCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    handle?: StringWithAggregatesFilter | string
    accessToken?: StringWithAggregatesFilter | string
    refreshToken?: StringWithAggregatesFilter | string
    refreshTokenExpiresIn?: IntWithAggregatesFilter | number
    scope?: StringWithAggregatesFilter | string
    openId?: StringWithAggregatesFilter | string
    projectId?: StringWithAggregatesFilter | string
  }

  export type FacebookCredentialsWhereInput = {
    AND?: Enumerable<FacebookCredentialsWhereInput>
    OR?: Enumerable<FacebookCredentialsWhereInput>
    NOT?: Enumerable<FacebookCredentialsWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    pageId?: StringFilter | string
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type FacebookCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type FacebookCredentialsWhereUniqueInput = {
    id?: string
    projectId?: string
  }

  export type FacebookCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    projectId?: SortOrder
    _count?: FacebookCredentialsCountOrderByAggregateInput
    _max?: FacebookCredentialsMaxOrderByAggregateInput
    _min?: FacebookCredentialsMinOrderByAggregateInput
  }

  export type FacebookCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FacebookCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<FacebookCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FacebookCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    pageId?: StringWithAggregatesFilter | string
    projectId?: StringWithAggregatesFilter | string
  }

  export type TwitterCredentialsWhereInput = {
    AND?: Enumerable<TwitterCredentialsWhereInput>
    OR?: Enumerable<TwitterCredentialsWhereInput>
    NOT?: Enumerable<TwitterCredentialsWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type TwitterCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type TwitterCredentialsWhereUniqueInput = {
    id?: string
    projectId?: string
  }

  export type TwitterCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    _count?: TwitterCredentialsCountOrderByAggregateInput
    _max?: TwitterCredentialsMaxOrderByAggregateInput
    _min?: TwitterCredentialsMinOrderByAggregateInput
  }

  export type TwitterCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TwitterCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TwitterCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TwitterCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    projectId?: StringWithAggregatesFilter | string
  }

  export type ContentWhereInput = {
    AND?: Enumerable<ContentWhereInput>
    OR?: Enumerable<ContentWhereInput>
    NOT?: Enumerable<ContentWhereInput>
    slug?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    thumbnail?: StringNullableFilter | string | null
    gif?: StringNullableFilter | string | null
    tags?: StringNullableListFilter
    createdAt?: DateTimeNullableFilter | Date | string | null
    updatedAt?: DateTimeNullableFilter | Date | string | null
    projectId?: StringFilter | string
    youtubeId?: StringNullableFilter | string | null
    youtubeStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    youtubePublishAt?: DateTimeNullableFilter | Date | string | null
    tikTokId?: StringNullableFilter | string | null
    tikTokStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    tikTokPublishAt?: DateTimeNullableFilter | Date | string | null
    instagramId?: StringNullableFilter | string | null
    instagramStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    instagramPublishAt?: DateTimeNullableFilter | Date | string | null
    facebookId?: StringNullableFilter | string | null
    facebookStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    facebookPublishAt?: DateTimeNullableFilter | Date | string | null
    twitterId?: StringNullableFilter | string | null
    twitterStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    twitterPublishAt?: DateTimeNullableFilter | Date | string | null
    annotations?: JsonNullableFilter
    labels?: JsonNullableFilter
    transcription?: JsonNullableFilter
    textDetection?: JsonNullableFilter
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type ContentOrderByWithRelationInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    gif?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    youtubeId?: SortOrder
    youtubeStatus?: SortOrder
    youtubePublishAt?: SortOrder
    tikTokId?: SortOrder
    tikTokStatus?: SortOrder
    tikTokPublishAt?: SortOrder
    instagramId?: SortOrder
    instagramStatus?: SortOrder
    instagramPublishAt?: SortOrder
    facebookId?: SortOrder
    facebookStatus?: SortOrder
    facebookPublishAt?: SortOrder
    twitterId?: SortOrder
    twitterStatus?: SortOrder
    twitterPublishAt?: SortOrder
    annotations?: SortOrder
    labels?: SortOrder
    transcription?: SortOrder
    textDetection?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ContentWhereUniqueInput = {
    projectId_slug?: ContentProjectIdSlugCompoundUniqueInput
  }

  export type ContentOrderByWithAggregationInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    gif?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    youtubeId?: SortOrder
    youtubeStatus?: SortOrder
    youtubePublishAt?: SortOrder
    tikTokId?: SortOrder
    tikTokStatus?: SortOrder
    tikTokPublishAt?: SortOrder
    instagramId?: SortOrder
    instagramStatus?: SortOrder
    instagramPublishAt?: SortOrder
    facebookId?: SortOrder
    facebookStatus?: SortOrder
    facebookPublishAt?: SortOrder
    twitterId?: SortOrder
    twitterStatus?: SortOrder
    twitterPublishAt?: SortOrder
    annotations?: SortOrder
    labels?: SortOrder
    transcription?: SortOrder
    textDetection?: SortOrder
    _count?: ContentCountOrderByAggregateInput
    _max?: ContentMaxOrderByAggregateInput
    _min?: ContentMinOrderByAggregateInput
  }

  export type ContentScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ContentScalarWhereWithAggregatesInput>
    OR?: Enumerable<ContentScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ContentScalarWhereWithAggregatesInput>
    slug?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringNullableWithAggregatesFilter | string | null
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    gif?: StringNullableWithAggregatesFilter | string | null
    tags?: StringNullableListFilter
    createdAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    projectId?: StringWithAggregatesFilter | string
    youtubeId?: StringNullableWithAggregatesFilter | string | null
    youtubeStatus?: EnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    youtubePublishAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    tikTokId?: StringNullableWithAggregatesFilter | string | null
    tikTokStatus?: EnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    tikTokPublishAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    instagramId?: StringNullableWithAggregatesFilter | string | null
    instagramStatus?: EnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    instagramPublishAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    facebookId?: StringNullableWithAggregatesFilter | string | null
    facebookStatus?: EnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    facebookPublishAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    twitterId?: StringNullableWithAggregatesFilter | string | null
    twitterStatus?: EnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    twitterPublishAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    annotations?: JsonNullableWithAggregatesFilter
    labels?: JsonNullableWithAggregatesFilter
    transcription?: JsonNullableWithAggregatesFilter
    textDetection?: JsonNullableWithAggregatesFilter
  }

  export type ProjectWhereInput = {
    AND?: Enumerable<ProjectWhereInput>
    OR?: Enumerable<ProjectWhereInput>
    NOT?: Enumerable<ProjectWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    tags?: StringNullableListFilter
    user?: XOR<UserRelationFilter, UserWhereInput>
    content?: ContentListRelationFilter
    channels?: ChannelListRelationFilter
    youtubeCredentials?: XOR<YoutubeCredentialsRelationFilter, YoutubeCredentialsWhereInput> | null
    instagramCredentials?: XOR<InstagramCredentialsRelationFilter, InstagramCredentialsWhereInput> | null
    tikTokCredentials?: XOR<TikTokCredentialsRelationFilter, TikTokCredentialsWhereInput> | null
    facebookCredentials?: XOR<FacebookCredentialsRelationFilter, FacebookCredentialsWhereInput> | null
    twitterCredentials?: XOR<TwitterCredentialsRelationFilter, TwitterCredentialsWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    tags?: SortOrder
    user?: UserOrderByWithRelationInput
    content?: ContentOrderByRelationAggregateInput
    channels?: ChannelOrderByRelationAggregateInput
    youtubeCredentials?: YoutubeCredentialsOrderByWithRelationInput
    instagramCredentials?: InstagramCredentialsOrderByWithRelationInput
    tikTokCredentials?: TikTokCredentialsOrderByWithRelationInput
    facebookCredentials?: FacebookCredentialsOrderByWithRelationInput
    twitterCredentials?: TwitterCredentialsOrderByWithRelationInput
  }

  export type ProjectWhereUniqueInput = {
    id?: string
  }

  export type ProjectOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    tags?: SortOrder
    _count?: ProjectCountOrderByAggregateInput
    _max?: ProjectMaxOrderByAggregateInput
    _min?: ProjectMinOrderByAggregateInput
  }

  export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    OR?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ProjectScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    userId?: StringWithAggregatesFilter | string
    tags?: StringNullableListFilter
  }

  export type ChannelWhereInput = {
    AND?: Enumerable<ChannelWhereInput>
    OR?: Enumerable<ChannelWhereInput>
    NOT?: Enumerable<ChannelWhereInput>
    name?: StringFilter | string
    views?: IntNullableFilter | number | null
    subscribers?: IntNullableFilter | number | null
    thumbnail?: StringNullableFilter | string | null
    channelType?: EnumChannelTypeFilter | ChannelType
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
  }

  export type ChannelOrderByWithRelationInput = {
    name?: SortOrder
    views?: SortOrder
    subscribers?: SortOrder
    thumbnail?: SortOrder
    channelType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type ChannelWhereUniqueInput = {
    projectId_channelType?: ChannelProjectIdChannelTypeCompoundUniqueInput
  }

  export type ChannelOrderByWithAggregationInput = {
    name?: SortOrder
    views?: SortOrder
    subscribers?: SortOrder
    thumbnail?: SortOrder
    channelType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    _count?: ChannelCountOrderByAggregateInput
    _avg?: ChannelAvgOrderByAggregateInput
    _max?: ChannelMaxOrderByAggregateInput
    _min?: ChannelMinOrderByAggregateInput
    _sum?: ChannelSumOrderByAggregateInput
  }

  export type ChannelScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    OR?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ChannelScalarWhereWithAggregatesInput>
    name?: StringWithAggregatesFilter | string
    views?: IntNullableWithAggregatesFilter | number | null
    subscribers?: IntNullableWithAggregatesFilter | number | null
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    channelType?: EnumChannelTypeWithAggregatesFilter | ChannelType
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    projectId?: StringWithAggregatesFilter | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PasswordCreateInput = {
    hash: string
    user: UserCreateNestedOneWithoutPasswordInput
  }

  export type PasswordUncheckedCreateInput = {
    hash: string
    userId: string
  }

  export type PasswordUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPasswordNestedInput
  }

  export type PasswordUncheckedUpdateInput = {
    hash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordCreateManyInput = {
    hash: string
    userId: string
  }

  export type PasswordUpdateManyMutationInput = {
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordUncheckedUpdateManyInput = {
    hash?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeCredentialsCreateInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    project: ProjectCreateNestedOneWithoutYoutubeCredentialsInput
  }

  export type YoutubeCredentialsUncheckedCreateInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    projectId: string
  }

  export type YoutubeCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutYoutubeCredentialsNestedInput
  }

  export type YoutubeCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeCredentialsCreateManyInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    projectId: string
  }

  export type YoutubeCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type YoutubeCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsCreateInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    project: ProjectCreateNestedOneWithoutInstagramCredentialsInput
  }

  export type InstagramCredentialsUncheckedCreateInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    projectId: string
  }

  export type InstagramCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutInstagramCredentialsNestedInput
  }

  export type InstagramCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsCreateManyInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    projectId: string
  }

  export type InstagramCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
    project: ProjectCreateNestedOneWithoutTikTokCredentialsInput
  }

  export type TikTokCredentialsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
    projectId: string
  }

  export type TikTokCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutTikTokCredentialsNestedInput
  }

  export type TikTokCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
    projectId: string
  }

  export type TikTokCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    project: ProjectCreateNestedOneWithoutFacebookCredentialsInput
  }

  export type FacebookCredentialsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    projectId: string
  }

  export type FacebookCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
    project?: ProjectUpdateOneRequiredWithoutFacebookCredentialsNestedInput
  }

  export type FacebookCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    projectId: string
  }

  export type FacebookCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TwitterCredentialsCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutTwitterCredentialsInput
  }

  export type TwitterCredentialsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
  }

  export type TwitterCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutTwitterCredentialsNestedInput
  }

  export type TwitterCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type TwitterCredentialsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
  }

  export type TwitterCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwitterCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
    project: ProjectCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
    project?: ProjectUpdateOneRequiredWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentCreateManyInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUncheckedUpdateManyInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
  }

  export type ChannelCreateInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    project: ProjectCreateNestedOneWithoutChannelsInput
  }

  export type ChannelUncheckedCreateInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
  }

  export type ChannelUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    project?: ProjectUpdateOneRequiredWithoutChannelsNestedInput
  }

  export type ChannelUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ChannelCreateManyInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
    projectId: string
  }

  export type ChannelUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type EnumPlanTypeNullableFilter = {
    equals?: PlanType | null
    in?: Enumerable<PlanType> | null
    notIn?: Enumerable<PlanType> | null
    not?: NestedEnumPlanTypeNullableFilter | PlanType | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type PasswordRelationFilter = {
    is?: PasswordWhereInput | null
    isNot?: PasswordWhereInput | null
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    planType?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    planType?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    planType?: SortOrder
    stripeCustomerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type EnumPlanTypeNullableWithAggregatesFilter = {
    equals?: PlanType | null
    in?: Enumerable<PlanType> | null
    notIn?: Enumerable<PlanType> | null
    not?: NestedEnumPlanTypeNullableWithAggregatesFilter | PlanType | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumPlanTypeNullableFilter
    _max?: NestedEnumPlanTypeNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type PasswordCountOrderByAggregateInput = {
    hash?: SortOrder
    userId?: SortOrder
  }

  export type PasswordMaxOrderByAggregateInput = {
    hash?: SortOrder
    userId?: SortOrder
  }

  export type PasswordMinOrderByAggregateInput = {
    hash?: SortOrder
    userId?: SortOrder
  }

  export type ProjectRelationFilter = {
    is?: ProjectWhereInput
    isNot?: ProjectWhereInput
  }

  export type YoutubeCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    projectId?: SortOrder
  }

  export type YoutubeCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    projectId?: SortOrder
  }

  export type YoutubeCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    projectId?: SortOrder
  }

  export type InstagramCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    projectId?: SortOrder
  }

  export type InstagramCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    projectId?: SortOrder
  }

  export type InstagramCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    projectId?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type TikTokCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    handle?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresIn?: SortOrder
    scope?: SortOrder
    openId?: SortOrder
    projectId?: SortOrder
  }

  export type TikTokCredentialsAvgOrderByAggregateInput = {
    refreshTokenExpiresIn?: SortOrder
  }

  export type TikTokCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    handle?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresIn?: SortOrder
    scope?: SortOrder
    openId?: SortOrder
    projectId?: SortOrder
  }

  export type TikTokCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    handle?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    refreshTokenExpiresIn?: SortOrder
    scope?: SortOrder
    openId?: SortOrder
    projectId?: SortOrder
  }

  export type TikTokCredentialsSumOrderByAggregateInput = {
    refreshTokenExpiresIn?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type FacebookCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    projectId?: SortOrder
  }

  export type FacebookCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    projectId?: SortOrder
  }

  export type FacebookCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    projectId?: SortOrder
  }

  export type TwitterCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type TwitterCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type TwitterCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type EnumUploadStatusNullableFilter = {
    equals?: UploadStatus | null
    in?: Enumerable<UploadStatus> | null
    notIn?: Enumerable<UploadStatus> | null
    not?: NestedEnumUploadStatusNullableFilter | UploadStatus | null
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type ContentProjectIdSlugCompoundUniqueInput = {
    projectId: string
    slug: string
  }

  export type ContentCountOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    gif?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    youtubeId?: SortOrder
    youtubeStatus?: SortOrder
    youtubePublishAt?: SortOrder
    tikTokId?: SortOrder
    tikTokStatus?: SortOrder
    tikTokPublishAt?: SortOrder
    instagramId?: SortOrder
    instagramStatus?: SortOrder
    instagramPublishAt?: SortOrder
    facebookId?: SortOrder
    facebookStatus?: SortOrder
    facebookPublishAt?: SortOrder
    twitterId?: SortOrder
    twitterStatus?: SortOrder
    twitterPublishAt?: SortOrder
    annotations?: SortOrder
    labels?: SortOrder
    transcription?: SortOrder
    textDetection?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    gif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    youtubeId?: SortOrder
    youtubeStatus?: SortOrder
    youtubePublishAt?: SortOrder
    tikTokId?: SortOrder
    tikTokStatus?: SortOrder
    tikTokPublishAt?: SortOrder
    instagramId?: SortOrder
    instagramStatus?: SortOrder
    instagramPublishAt?: SortOrder
    facebookId?: SortOrder
    facebookStatus?: SortOrder
    facebookPublishAt?: SortOrder
    twitterId?: SortOrder
    twitterStatus?: SortOrder
    twitterPublishAt?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    thumbnail?: SortOrder
    gif?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    youtubeId?: SortOrder
    youtubeStatus?: SortOrder
    youtubePublishAt?: SortOrder
    tikTokId?: SortOrder
    tikTokStatus?: SortOrder
    tikTokPublishAt?: SortOrder
    instagramId?: SortOrder
    instagramStatus?: SortOrder
    instagramPublishAt?: SortOrder
    facebookId?: SortOrder
    facebookStatus?: SortOrder
    facebookPublishAt?: SortOrder
    twitterId?: SortOrder
    twitterStatus?: SortOrder
    twitterPublishAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type EnumUploadStatusNullableWithAggregatesFilter = {
    equals?: UploadStatus | null
    in?: Enumerable<UploadStatus> | null
    notIn?: Enumerable<UploadStatus> | null
    not?: NestedEnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumUploadStatusNullableFilter
    _max?: NestedEnumUploadStatusNullableFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type ContentListRelationFilter = {
    every?: ContentWhereInput
    some?: ContentWhereInput
    none?: ContentWhereInput
  }

  export type ChannelListRelationFilter = {
    every?: ChannelWhereInput
    some?: ChannelWhereInput
    none?: ChannelWhereInput
  }

  export type YoutubeCredentialsRelationFilter = {
    is?: YoutubeCredentialsWhereInput | null
    isNot?: YoutubeCredentialsWhereInput | null
  }

  export type InstagramCredentialsRelationFilter = {
    is?: InstagramCredentialsWhereInput | null
    isNot?: InstagramCredentialsWhereInput | null
  }

  export type TikTokCredentialsRelationFilter = {
    is?: TikTokCredentialsWhereInput | null
    isNot?: TikTokCredentialsWhereInput | null
  }

  export type FacebookCredentialsRelationFilter = {
    is?: FacebookCredentialsWhereInput | null
    isNot?: FacebookCredentialsWhereInput | null
  }

  export type TwitterCredentialsRelationFilter = {
    is?: TwitterCredentialsWhereInput | null
    isNot?: TwitterCredentialsWhereInput | null
  }

  export type ContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ChannelOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    tags?: SortOrder
  }

  export type ProjectMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type ProjectMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type EnumChannelTypeFilter = {
    equals?: ChannelType
    in?: Enumerable<ChannelType>
    notIn?: Enumerable<ChannelType>
    not?: NestedEnumChannelTypeFilter | ChannelType
  }

  export type ChannelProjectIdChannelTypeCompoundUniqueInput = {
    projectId: string
    channelType: ChannelType
  }

  export type ChannelCountOrderByAggregateInput = {
    name?: SortOrder
    views?: SortOrder
    subscribers?: SortOrder
    thumbnail?: SortOrder
    channelType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type ChannelAvgOrderByAggregateInput = {
    views?: SortOrder
    subscribers?: SortOrder
  }

  export type ChannelMaxOrderByAggregateInput = {
    name?: SortOrder
    views?: SortOrder
    subscribers?: SortOrder
    thumbnail?: SortOrder
    channelType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type ChannelMinOrderByAggregateInput = {
    name?: SortOrder
    views?: SortOrder
    subscribers?: SortOrder
    thumbnail?: SortOrder
    channelType?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type ChannelSumOrderByAggregateInput = {
    views?: SortOrder
    subscribers?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type EnumChannelTypeWithAggregatesFilter = {
    equals?: ChannelType
    in?: Enumerable<ChannelType>
    notIn?: Enumerable<ChannelType>
    not?: NestedEnumChannelTypeWithAggregatesFilter | ChannelType
    _count?: NestedIntFilter
    _min?: NestedEnumChannelTypeFilter
    _max?: NestedEnumChannelTypeFilter
  }

  export type PasswordCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
    connect?: PasswordWhereUniqueInput
  }

  export type ProjectCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProjectCreateWithoutUserInput>, Enumerable<ProjectUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProjectCreateOrConnectWithoutUserInput>
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: Enumerable<ProjectWhereUniqueInput>
  }

  export type PasswordUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
    connect?: PasswordWhereUniqueInput
  }

  export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ProjectCreateWithoutUserInput>, Enumerable<ProjectUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProjectCreateOrConnectWithoutUserInput>
    createMany?: ProjectCreateManyUserInputEnvelope
    connect?: Enumerable<ProjectWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableEnumPlanTypeFieldUpdateOperationsInput = {
    set?: PlanType | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PasswordUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
    upsert?: PasswordUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: PasswordWhereUniqueInput
    update?: XOR<PasswordUpdateWithoutUserInput, PasswordUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProjectCreateWithoutUserInput>, Enumerable<ProjectUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProjectCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProjectUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: Enumerable<ProjectWhereUniqueInput>
    disconnect?: Enumerable<ProjectWhereUniqueInput>
    delete?: Enumerable<ProjectWhereUniqueInput>
    connect?: Enumerable<ProjectWhereUniqueInput>
    update?: Enumerable<ProjectUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProjectUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProjectScalarWhereInput>
  }

  export type PasswordUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
    connectOrCreate?: PasswordCreateOrConnectWithoutUserInput
    upsert?: PasswordUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: PasswordWhereUniqueInput
    update?: XOR<PasswordUpdateWithoutUserInput, PasswordUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ProjectCreateWithoutUserInput>, Enumerable<ProjectUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ProjectCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ProjectUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ProjectCreateManyUserInputEnvelope
    set?: Enumerable<ProjectWhereUniqueInput>
    disconnect?: Enumerable<ProjectWhereUniqueInput>
    delete?: Enumerable<ProjectWhereUniqueInput>
    connect?: Enumerable<ProjectWhereUniqueInput>
    update?: Enumerable<ProjectUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ProjectUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ProjectScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutPasswordInput = {
    create?: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPasswordNestedInput = {
    create?: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
    connectOrCreate?: UserCreateOrConnectWithoutPasswordInput
    upsert?: UserUpsertWithoutPasswordInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutPasswordInput, UserUncheckedUpdateWithoutPasswordInput>
  }

  export type ProjectCreateNestedOneWithoutYoutubeCredentialsInput = {
    create?: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutYoutubeCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutYoutubeCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutYoutubeCredentialsInput
    upsert?: ProjectUpsertWithoutYoutubeCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutYoutubeCredentialsInput, ProjectUncheckedUpdateWithoutYoutubeCredentialsInput>
  }

  export type ProjectCreateNestedOneWithoutInstagramCredentialsInput = {
    create?: XOR<ProjectCreateWithoutInstagramCredentialsInput, ProjectUncheckedCreateWithoutInstagramCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInstagramCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutInstagramCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutInstagramCredentialsInput, ProjectUncheckedCreateWithoutInstagramCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutInstagramCredentialsInput
    upsert?: ProjectUpsertWithoutInstagramCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutInstagramCredentialsInput, ProjectUncheckedUpdateWithoutInstagramCredentialsInput>
  }

  export type ProjectCreateNestedOneWithoutTikTokCredentialsInput = {
    create?: XOR<ProjectCreateWithoutTikTokCredentialsInput, ProjectUncheckedCreateWithoutTikTokCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTikTokCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProjectUpdateOneRequiredWithoutTikTokCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutTikTokCredentialsInput, ProjectUncheckedCreateWithoutTikTokCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTikTokCredentialsInput
    upsert?: ProjectUpsertWithoutTikTokCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutTikTokCredentialsInput, ProjectUncheckedUpdateWithoutTikTokCredentialsInput>
  }

  export type ProjectCreateNestedOneWithoutFacebookCredentialsInput = {
    create?: XOR<ProjectCreateWithoutFacebookCredentialsInput, ProjectUncheckedCreateWithoutFacebookCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFacebookCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutFacebookCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutFacebookCredentialsInput, ProjectUncheckedCreateWithoutFacebookCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutFacebookCredentialsInput
    upsert?: ProjectUpsertWithoutFacebookCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutFacebookCredentialsInput, ProjectUncheckedUpdateWithoutFacebookCredentialsInput>
  }

  export type ProjectCreateNestedOneWithoutTwitterCredentialsInput = {
    create?: XOR<ProjectCreateWithoutTwitterCredentialsInput, ProjectUncheckedCreateWithoutTwitterCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTwitterCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type ProjectUpdateOneRequiredWithoutTwitterCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutTwitterCredentialsInput, ProjectUncheckedCreateWithoutTwitterCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutTwitterCredentialsInput
    upsert?: ProjectUpsertWithoutTwitterCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutTwitterCredentialsInput, ProjectUncheckedUpdateWithoutTwitterCredentialsInput>
  }

  export type ContentCreatetagsInput = {
    set: Enumerable<string>
  }

  export type ProjectCreateNestedOneWithoutContentInput = {
    create?: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContentInput
    connect?: ProjectWhereUniqueInput
  }

  export type ContentUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumUploadStatusFieldUpdateOperationsInput = {
    set?: UploadStatus | null
  }

  export type ProjectUpdateOneRequiredWithoutContentNestedInput = {
    create?: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContentInput
    upsert?: ProjectUpsertWithoutContentInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutContentInput, ProjectUncheckedUpdateWithoutContentInput>
  }

  export type ProjectCreatetagsInput = {
    set: Enumerable<string>
  }

  export type UserCreateNestedOneWithoutProjectsInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    connect?: UserWhereUniqueInput
  }

  export type ContentCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ContentCreateWithoutProjectInput>, Enumerable<ContentUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ContentCreateOrConnectWithoutProjectInput>
    createMany?: ContentCreateManyProjectInputEnvelope
    connect?: Enumerable<ContentWhereUniqueInput>
  }

  export type ChannelCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ChannelCreateWithoutProjectInput>, Enumerable<ChannelUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ChannelCreateOrConnectWithoutProjectInput>
    createMany?: ChannelCreateManyProjectInputEnvelope
    connect?: Enumerable<ChannelWhereUniqueInput>
  }

  export type YoutubeCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    connect?: YoutubeCredentialsWhereUniqueInput
  }

  export type InstagramCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutProjectInput
    connect?: InstagramCredentialsWhereUniqueInput
  }

  export type TikTokCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutProjectInput
    connect?: TikTokCredentialsWhereUniqueInput
  }

  export type FacebookCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutProjectInput
    connect?: FacebookCredentialsWhereUniqueInput
  }

  export type TwitterCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TwitterCredentialsCreateOrConnectWithoutProjectInput
    connect?: TwitterCredentialsWhereUniqueInput
  }

  export type ContentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ContentCreateWithoutProjectInput>, Enumerable<ContentUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ContentCreateOrConnectWithoutProjectInput>
    createMany?: ContentCreateManyProjectInputEnvelope
    connect?: Enumerable<ContentWhereUniqueInput>
  }

  export type ChannelUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ChannelCreateWithoutProjectInput>, Enumerable<ChannelUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ChannelCreateOrConnectWithoutProjectInput>
    createMany?: ChannelCreateManyProjectInputEnvelope
    connect?: Enumerable<ChannelWhereUniqueInput>
  }

  export type YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    connect?: YoutubeCredentialsWhereUniqueInput
  }

  export type InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutProjectInput
    connect?: InstagramCredentialsWhereUniqueInput
  }

  export type TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutProjectInput
    connect?: TikTokCredentialsWhereUniqueInput
  }

  export type FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutProjectInput
    connect?: FacebookCredentialsWhereUniqueInput
  }

  export type TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TwitterCredentialsCreateOrConnectWithoutProjectInput
    connect?: TwitterCredentialsWhereUniqueInput
  }

  export type ProjectUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type UserUpdateOneRequiredWithoutProjectsNestedInput = {
    create?: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectsInput
    upsert?: UserUpsertWithoutProjectsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
  }

  export type ContentUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ContentCreateWithoutProjectInput>, Enumerable<ContentUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ContentCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ContentUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ContentCreateManyProjectInputEnvelope
    set?: Enumerable<ContentWhereUniqueInput>
    disconnect?: Enumerable<ContentWhereUniqueInput>
    delete?: Enumerable<ContentWhereUniqueInput>
    connect?: Enumerable<ContentWhereUniqueInput>
    update?: Enumerable<ContentUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ContentUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ContentScalarWhereInput>
  }

  export type ChannelUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ChannelCreateWithoutProjectInput>, Enumerable<ChannelUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ChannelCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ChannelUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ChannelCreateManyProjectInputEnvelope
    set?: Enumerable<ChannelWhereUniqueInput>
    disconnect?: Enumerable<ChannelWhereUniqueInput>
    delete?: Enumerable<ChannelWhereUniqueInput>
    connect?: Enumerable<ChannelWhereUniqueInput>
    update?: Enumerable<ChannelUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ChannelUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ChannelScalarWhereInput>
  }

  export type YoutubeCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    upsert?: YoutubeCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutProjectInput, YoutubeCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type InstagramCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutProjectInput
    upsert?: InstagramCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramCredentialsWhereUniqueInput
    update?: XOR<InstagramCredentialsUpdateWithoutProjectInput, InstagramCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type TikTokCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutProjectInput
    upsert?: TikTokCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokCredentialsWhereUniqueInput
    update?: XOR<TikTokCredentialsUpdateWithoutProjectInput, TikTokCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type FacebookCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutProjectInput
    upsert?: FacebookCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookCredentialsWhereUniqueInput
    update?: XOR<FacebookCredentialsUpdateWithoutProjectInput, FacebookCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type TwitterCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TwitterCredentialsCreateOrConnectWithoutProjectInput
    upsert?: TwitterCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: TwitterCredentialsWhereUniqueInput
    update?: XOR<TwitterCredentialsUpdateWithoutProjectInput, TwitterCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type ContentUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ContentCreateWithoutProjectInput>, Enumerable<ContentUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ContentCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ContentUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ContentCreateManyProjectInputEnvelope
    set?: Enumerable<ContentWhereUniqueInput>
    disconnect?: Enumerable<ContentWhereUniqueInput>
    delete?: Enumerable<ContentWhereUniqueInput>
    connect?: Enumerable<ContentWhereUniqueInput>
    update?: Enumerable<ContentUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ContentUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ContentScalarWhereInput>
  }

  export type ChannelUncheckedUpdateManyWithoutProjectNestedInput = {
    create?: XOR<Enumerable<ChannelCreateWithoutProjectInput>, Enumerable<ChannelUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ChannelCreateOrConnectWithoutProjectInput>
    upsert?: Enumerable<ChannelUpsertWithWhereUniqueWithoutProjectInput>
    createMany?: ChannelCreateManyProjectInputEnvelope
    set?: Enumerable<ChannelWhereUniqueInput>
    disconnect?: Enumerable<ChannelWhereUniqueInput>
    delete?: Enumerable<ChannelWhereUniqueInput>
    connect?: Enumerable<ChannelWhereUniqueInput>
    update?: Enumerable<ChannelUpdateWithWhereUniqueWithoutProjectInput>
    updateMany?: Enumerable<ChannelUpdateManyWithWhereWithoutProjectInput>
    deleteMany?: Enumerable<ChannelScalarWhereInput>
  }

  export type YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    upsert?: YoutubeCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutProjectInput, YoutubeCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutProjectInput
    upsert?: InstagramCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramCredentialsWhereUniqueInput
    update?: XOR<InstagramCredentialsUpdateWithoutProjectInput, InstagramCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutProjectInput
    upsert?: TikTokCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokCredentialsWhereUniqueInput
    update?: XOR<TikTokCredentialsUpdateWithoutProjectInput, TikTokCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutProjectInput
    upsert?: FacebookCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookCredentialsWhereUniqueInput
    update?: XOR<FacebookCredentialsUpdateWithoutProjectInput, FacebookCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: TwitterCredentialsCreateOrConnectWithoutProjectInput
    upsert?: TwitterCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: TwitterCredentialsWhereUniqueInput
    update?: XOR<TwitterCredentialsUpdateWithoutProjectInput, TwitterCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type ProjectCreateNestedOneWithoutChannelsInput = {
    create?: XOR<ProjectCreateWithoutChannelsInput, ProjectUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutChannelsInput
    connect?: ProjectWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumChannelTypeFieldUpdateOperationsInput = {
    set?: ChannelType
  }

  export type ProjectUpdateOneRequiredWithoutChannelsNestedInput = {
    create?: XOR<ProjectCreateWithoutChannelsInput, ProjectUncheckedCreateWithoutChannelsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutChannelsInput
    upsert?: ProjectUpsertWithoutChannelsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutChannelsInput, ProjectUncheckedUpdateWithoutChannelsInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedEnumPlanTypeNullableFilter = {
    equals?: PlanType | null
    in?: Enumerable<PlanType> | null
    notIn?: Enumerable<PlanType> | null
    not?: NestedEnumPlanTypeNullableFilter | PlanType | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumPlanTypeNullableWithAggregatesFilter = {
    equals?: PlanType | null
    in?: Enumerable<PlanType> | null
    notIn?: Enumerable<PlanType> | null
    not?: NestedEnumPlanTypeNullableWithAggregatesFilter | PlanType | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumPlanTypeNullableFilter
    _max?: NestedEnumPlanTypeNullableFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedEnumUploadStatusNullableFilter = {
    equals?: UploadStatus | null
    in?: Enumerable<UploadStatus> | null
    notIn?: Enumerable<UploadStatus> | null
    not?: NestedEnumUploadStatusNullableFilter | UploadStatus | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedEnumUploadStatusNullableWithAggregatesFilter = {
    equals?: UploadStatus | null
    in?: Enumerable<UploadStatus> | null
    notIn?: Enumerable<UploadStatus> | null
    not?: NestedEnumUploadStatusNullableWithAggregatesFilter | UploadStatus | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumUploadStatusNullableFilter
    _max?: NestedEnumUploadStatusNullableFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedEnumChannelTypeFilter = {
    equals?: ChannelType
    in?: Enumerable<ChannelType>
    notIn?: Enumerable<ChannelType>
    not?: NestedEnumChannelTypeFilter | ChannelType
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedEnumChannelTypeWithAggregatesFilter = {
    equals?: ChannelType
    in?: Enumerable<ChannelType>
    notIn?: Enumerable<ChannelType>
    not?: NestedEnumChannelTypeWithAggregatesFilter | ChannelType
    _count?: NestedIntFilter
    _min?: NestedEnumChannelTypeFilter
    _max?: NestedEnumChannelTypeFilter
  }

  export type PasswordCreateWithoutUserInput = {
    hash: string
  }

  export type PasswordUncheckedCreateWithoutUserInput = {
    hash: string
  }

  export type PasswordCreateOrConnectWithoutUserInput = {
    where: PasswordWhereUniqueInput
    create: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateWithoutUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: Enumerable<ProjectCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type PasswordUpsertWithoutUserInput = {
    update: XOR<PasswordUpdateWithoutUserInput, PasswordUncheckedUpdateWithoutUserInput>
    create: XOR<PasswordCreateWithoutUserInput, PasswordUncheckedCreateWithoutUserInput>
  }

  export type PasswordUpdateWithoutUserInput = {
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type PasswordUncheckedUpdateWithoutUserInput = {
    hash?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    update: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: ProjectWhereUniqueInput
    data: XOR<ProjectUpdateWithoutUserInput, ProjectUncheckedUpdateWithoutUserInput>
  }

  export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: ProjectScalarWhereInput
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyWithoutProjectsInput>
  }

  export type ProjectScalarWhereInput = {
    AND?: Enumerable<ProjectScalarWhereInput>
    OR?: Enumerable<ProjectScalarWhereInput>
    NOT?: Enumerable<ProjectScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    userId?: StringFilter | string
    tags?: StringNullableListFilter
  }

  export type UserCreateWithoutPasswordInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPasswordInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPasswordInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
  }

  export type UserUpsertWithoutPasswordInput = {
    update: XOR<UserUpdateWithoutPasswordInput, UserUncheckedUpdateWithoutPasswordInput>
    create: XOR<UserCreateWithoutPasswordInput, UserUncheckedCreateWithoutPasswordInput>
  }

  export type UserUpdateWithoutPasswordInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPasswordInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ProjectCreateWithoutYoutubeCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutYoutubeCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutYoutubeCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
  }

  export type ProjectUpsertWithoutYoutubeCredentialsInput = {
    update: XOR<ProjectUpdateWithoutYoutubeCredentialsInput, ProjectUncheckedUpdateWithoutYoutubeCredentialsInput>
    create: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
  }

  export type ProjectUpdateWithoutYoutubeCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutYoutubeCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutInstagramCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutInstagramCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutInstagramCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutInstagramCredentialsInput, ProjectUncheckedCreateWithoutInstagramCredentialsInput>
  }

  export type ProjectUpsertWithoutInstagramCredentialsInput = {
    update: XOR<ProjectUpdateWithoutInstagramCredentialsInput, ProjectUncheckedUpdateWithoutInstagramCredentialsInput>
    create: XOR<ProjectCreateWithoutInstagramCredentialsInput, ProjectUncheckedCreateWithoutInstagramCredentialsInput>
  }

  export type ProjectUpdateWithoutInstagramCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutInstagramCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutTikTokCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTikTokCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTikTokCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTikTokCredentialsInput, ProjectUncheckedCreateWithoutTikTokCredentialsInput>
  }

  export type ProjectUpsertWithoutTikTokCredentialsInput = {
    update: XOR<ProjectUpdateWithoutTikTokCredentialsInput, ProjectUncheckedUpdateWithoutTikTokCredentialsInput>
    create: XOR<ProjectCreateWithoutTikTokCredentialsInput, ProjectUncheckedCreateWithoutTikTokCredentialsInput>
  }

  export type ProjectUpdateWithoutTikTokCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTikTokCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutFacebookCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutFacebookCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutFacebookCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutFacebookCredentialsInput, ProjectUncheckedCreateWithoutFacebookCredentialsInput>
  }

  export type ProjectUpsertWithoutFacebookCredentialsInput = {
    update: XOR<ProjectUpdateWithoutFacebookCredentialsInput, ProjectUncheckedUpdateWithoutFacebookCredentialsInput>
    create: XOR<ProjectCreateWithoutFacebookCredentialsInput, ProjectUncheckedCreateWithoutFacebookCredentialsInput>
  }

  export type ProjectUpdateWithoutFacebookCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutFacebookCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutTwitterCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutTwitterCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutTwitterCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutTwitterCredentialsInput, ProjectUncheckedCreateWithoutTwitterCredentialsInput>
  }

  export type ProjectUpsertWithoutTwitterCredentialsInput = {
    update: XOR<ProjectUpdateWithoutTwitterCredentialsInput, ProjectUncheckedUpdateWithoutTwitterCredentialsInput>
    create: XOR<ProjectCreateWithoutTwitterCredentialsInput, ProjectUncheckedCreateWithoutTwitterCredentialsInput>
  }

  export type ProjectUpdateWithoutTwitterCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutTwitterCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateWithoutContentInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    channels?: ChannelCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutContentInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    channels?: ChannelUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutContentInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
  }

  export type ProjectUpsertWithoutContentInput = {
    update: XOR<ProjectUpdateWithoutContentInput, ProjectUncheckedUpdateWithoutContentInput>
    create: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
  }

  export type ProjectUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    planType?: PlanType | null
    stripeCustomerId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ContentCreateWithoutProjectInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUncheckedCreateWithoutProjectInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentCreateOrConnectWithoutProjectInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutProjectInput, ContentUncheckedCreateWithoutProjectInput>
  }

  export type ContentCreateManyProjectInputEnvelope = {
    data: Enumerable<ContentCreateManyProjectInput>
    skipDuplicates?: boolean
  }

  export type ChannelCreateWithoutProjectInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelUncheckedCreateWithoutProjectInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ChannelCreateOrConnectWithoutProjectInput = {
    where: ChannelWhereUniqueInput
    create: XOR<ChannelCreateWithoutProjectInput, ChannelUncheckedCreateWithoutProjectInput>
  }

  export type ChannelCreateManyProjectInputEnvelope = {
    data: Enumerable<ChannelCreateManyProjectInput>
    skipDuplicates?: boolean
  }

  export type YoutubeCredentialsCreateWithoutProjectInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
  }

  export type YoutubeCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
  }

  export type YoutubeCredentialsCreateOrConnectWithoutProjectInput = {
    where: YoutubeCredentialsWhereUniqueInput
    create: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type InstagramCredentialsCreateWithoutProjectInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
  }

  export type InstagramCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
  }

  export type InstagramCredentialsCreateOrConnectWithoutProjectInput = {
    where: InstagramCredentialsWhereUniqueInput
    create: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type TikTokCredentialsCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
  }

  export type TikTokCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    handle: string
    accessToken: string
    refreshToken: string
    refreshTokenExpiresIn: number
    scope: string
    openId: string
  }

  export type TikTokCredentialsCreateOrConnectWithoutProjectInput = {
    where: TikTokCredentialsWhereUniqueInput
    create: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type FacebookCredentialsCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
  }

  export type FacebookCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
  }

  export type FacebookCredentialsCreateOrConnectWithoutProjectInput = {
    where: FacebookCredentialsWhereUniqueInput
    create: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type TwitterCredentialsCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TwitterCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TwitterCredentialsCreateOrConnectWithoutProjectInput = {
    where: TwitterCredentialsWhereUniqueInput
    create: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    planType?: NullableEnumPlanTypeFieldUpdateOperationsInput | PlanType | null
    stripeCustomerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ContentUpsertWithWhereUniqueWithoutProjectInput = {
    where: ContentWhereUniqueInput
    update: XOR<ContentUpdateWithoutProjectInput, ContentUncheckedUpdateWithoutProjectInput>
    create: XOR<ContentCreateWithoutProjectInput, ContentUncheckedCreateWithoutProjectInput>
  }

  export type ContentUpdateWithWhereUniqueWithoutProjectInput = {
    where: ContentWhereUniqueInput
    data: XOR<ContentUpdateWithoutProjectInput, ContentUncheckedUpdateWithoutProjectInput>
  }

  export type ContentUpdateManyWithWhereWithoutProjectInput = {
    where: ContentScalarWhereInput
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyWithoutContentInput>
  }

  export type ContentScalarWhereInput = {
    AND?: Enumerable<ContentScalarWhereInput>
    OR?: Enumerable<ContentScalarWhereInput>
    NOT?: Enumerable<ContentScalarWhereInput>
    slug?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    thumbnail?: StringNullableFilter | string | null
    gif?: StringNullableFilter | string | null
    tags?: StringNullableListFilter
    createdAt?: DateTimeNullableFilter | Date | string | null
    updatedAt?: DateTimeNullableFilter | Date | string | null
    projectId?: StringFilter | string
    youtubeId?: StringNullableFilter | string | null
    youtubeStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    youtubePublishAt?: DateTimeNullableFilter | Date | string | null
    tikTokId?: StringNullableFilter | string | null
    tikTokStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    tikTokPublishAt?: DateTimeNullableFilter | Date | string | null
    instagramId?: StringNullableFilter | string | null
    instagramStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    instagramPublishAt?: DateTimeNullableFilter | Date | string | null
    facebookId?: StringNullableFilter | string | null
    facebookStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    facebookPublishAt?: DateTimeNullableFilter | Date | string | null
    twitterId?: StringNullableFilter | string | null
    twitterStatus?: EnumUploadStatusNullableFilter | UploadStatus | null
    twitterPublishAt?: DateTimeNullableFilter | Date | string | null
    annotations?: JsonNullableFilter
    labels?: JsonNullableFilter
    transcription?: JsonNullableFilter
    textDetection?: JsonNullableFilter
  }

  export type ChannelUpsertWithWhereUniqueWithoutProjectInput = {
    where: ChannelWhereUniqueInput
    update: XOR<ChannelUpdateWithoutProjectInput, ChannelUncheckedUpdateWithoutProjectInput>
    create: XOR<ChannelCreateWithoutProjectInput, ChannelUncheckedCreateWithoutProjectInput>
  }

  export type ChannelUpdateWithWhereUniqueWithoutProjectInput = {
    where: ChannelWhereUniqueInput
    data: XOR<ChannelUpdateWithoutProjectInput, ChannelUncheckedUpdateWithoutProjectInput>
  }

  export type ChannelUpdateManyWithWhereWithoutProjectInput = {
    where: ChannelScalarWhereInput
    data: XOR<ChannelUpdateManyMutationInput, ChannelUncheckedUpdateManyWithoutChannelsInput>
  }

  export type ChannelScalarWhereInput = {
    AND?: Enumerable<ChannelScalarWhereInput>
    OR?: Enumerable<ChannelScalarWhereInput>
    NOT?: Enumerable<ChannelScalarWhereInput>
    name?: StringFilter | string
    views?: IntNullableFilter | number | null
    subscribers?: IntNullableFilter | number | null
    thumbnail?: StringNullableFilter | string | null
    channelType?: EnumChannelTypeFilter | ChannelType
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    projectId?: StringFilter | string
  }

  export type YoutubeCredentialsUpsertWithoutProjectInput = {
    update: XOR<YoutubeCredentialsUpdateWithoutProjectInput, YoutubeCredentialsUncheckedUpdateWithoutProjectInput>
    create: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type YoutubeCredentialsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type YoutubeCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InstagramCredentialsUpsertWithoutProjectInput = {
    update: XOR<InstagramCredentialsUpdateWithoutProjectInput, InstagramCredentialsUncheckedUpdateWithoutProjectInput>
    create: XOR<InstagramCredentialsCreateWithoutProjectInput, InstagramCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type InstagramCredentialsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUpsertWithoutProjectInput = {
    update: XOR<TikTokCredentialsUpdateWithoutProjectInput, TikTokCredentialsUncheckedUpdateWithoutProjectInput>
    create: XOR<TikTokCredentialsCreateWithoutProjectInput, TikTokCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type TikTokCredentialsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    handle?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: StringFieldUpdateOperationsInput | string
    refreshTokenExpiresIn?: IntFieldUpdateOperationsInput | number
    scope?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsUpsertWithoutProjectInput = {
    update: XOR<FacebookCredentialsUpdateWithoutProjectInput, FacebookCredentialsUncheckedUpdateWithoutProjectInput>
    create: XOR<FacebookCredentialsCreateWithoutProjectInput, FacebookCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type FacebookCredentialsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type TwitterCredentialsUpsertWithoutProjectInput = {
    update: XOR<TwitterCredentialsUpdateWithoutProjectInput, TwitterCredentialsUncheckedUpdateWithoutProjectInput>
    create: XOR<TwitterCredentialsCreateWithoutProjectInput, TwitterCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type TwitterCredentialsUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TwitterCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutChannelsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutChannelsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    tags?: ProjectCreatetagsInput | Enumerable<string>
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutProjectInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutProjectInput
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutProjectInput
    twitterCredentials?: TwitterCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutChannelsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutChannelsInput, ProjectUncheckedCreateWithoutChannelsInput>
  }

  export type ProjectUpsertWithoutChannelsInput = {
    update: XOR<ProjectUpdateWithoutChannelsInput, ProjectUncheckedUpdateWithoutChannelsInput>
    create: XOR<ProjectCreateWithoutChannelsInput, ProjectUncheckedCreateWithoutChannelsInput>
  }

  export type ProjectUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutChannelsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    tags?: ProjectCreatetagsInput | Enumerable<string>
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUpdateManyWithoutProjectNestedInput
    channels?: ChannelUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    channels?: ChannelUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutProjectNestedInput
    twitterCredentials?: TwitterCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tags?: ProjectUpdatetagsInput | Enumerable<string>
  }

  export type ContentCreateManyProjectInput = {
    slug: string
    title: string
    description?: string | null
    thumbnail?: string | null
    gif?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    youtubeId?: string | null
    youtubeStatus?: UploadStatus | null
    youtubePublishAt?: Date | string | null
    tikTokId?: string | null
    tikTokStatus?: UploadStatus | null
    tikTokPublishAt?: Date | string | null
    instagramId?: string | null
    instagramStatus?: UploadStatus | null
    instagramPublishAt?: Date | string | null
    facebookId?: string | null
    facebookStatus?: UploadStatus | null
    facebookPublishAt?: Date | string | null
    twitterId?: string | null
    twitterStatus?: UploadStatus | null
    twitterPublishAt?: Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ChannelCreateManyProjectInput = {
    name: string
    views?: number | null
    subscribers?: number | null
    thumbnail?: string | null
    channelType: ChannelType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContentUpdateWithoutProjectInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUncheckedUpdateWithoutProjectInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ContentUncheckedUpdateManyWithoutContentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    gif?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    youtubeId?: NullableStringFieldUpdateOperationsInput | string | null
    youtubeStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    youtubePublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokId?: NullableStringFieldUpdateOperationsInput | string | null
    tikTokStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    tikTokPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    instagramId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    instagramPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    facebookId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    facebookPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    twitterId?: NullableStringFieldUpdateOperationsInput | string | null
    twitterStatus?: NullableEnumUploadStatusFieldUpdateOperationsInput | UploadStatus | null
    twitterPublishAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    annotations?: NullableJsonNullValueInput | InputJsonValue
    labels?: NullableJsonNullValueInput | InputJsonValue
    transcription?: NullableJsonNullValueInput | InputJsonValue
    textDetection?: NullableJsonNullValueInput | InputJsonValue
  }

  export type ChannelUpdateWithoutProjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateWithoutProjectInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ChannelUncheckedUpdateManyWithoutChannelsInput = {
    name?: StringFieldUpdateOperationsInput | string
    views?: NullableIntFieldUpdateOperationsInput | number | null
    subscribers?: NullableIntFieldUpdateOperationsInput | number | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    channelType?: EnumChannelTypeFieldUpdateOperationsInput | ChannelType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}