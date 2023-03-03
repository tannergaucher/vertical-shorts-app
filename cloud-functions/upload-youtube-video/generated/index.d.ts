
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  currentProjectId: string | null
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
  userId: string
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
  userId: string
}

/**
 * Model TikTokCredentials
 * 
 */
export type TikTokCredentials = {
  id: string
  clientKey: string
  createdAt: Date
  updatedAt: Date
  accessToken: string
  openId: string
  username: string
  userId: string
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
  userId: string
}

/**
 * Model Content
 * 
 */
export type Content = {
  slug: string
  title: string
  description: string | null
  markdown: string | null
  thumbnail: string | null
  video: string | null
  tags: string[]
  published: boolean | null
  createdAt: Date | null
  updatedAt: Date | null
  projectId: string
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
}

/**
 * Model YoutubeShortPost
 * 
 */
export type YoutubeShortPost = {
  gcsVideoUrl: string
  postSlug: string
}

/**
 * Model TikTokPost
 * 
 */
export type TikTokPost = {
  gcsVideoUrl: string
  postSlug: string
  contentProjectId: string
  contentSlug: string
}

/**
 * Model InstagramPost
 * 
 */
export type InstagramPost = {
  gcsVideoUrl: string
  postSlug: string
  caption: string
  contentProjectId: string
  contentSlug: string
}

/**
 * Model FacebookPost
 * 
 */
export type FacebookPost = {
  gcsVideoUrl: string
  postSlug: string
  contentProjectId: string
  contentSlug: string
}


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
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

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
   * `prisma.youtubeShortPost`: Exposes CRUD operations for the **YoutubeShortPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more YoutubeShortPosts
    * const youtubeShortPosts = await prisma.youtubeShortPost.findMany()
    * ```
    */
  get youtubeShortPost(): Prisma.YoutubeShortPostDelegate<GlobalReject>;

  /**
   * `prisma.tikTokPost`: Exposes CRUD operations for the **TikTokPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TikTokPosts
    * const tikTokPosts = await prisma.tikTokPost.findMany()
    * ```
    */
  get tikTokPost(): Prisma.TikTokPostDelegate<GlobalReject>;

  /**
   * `prisma.instagramPost`: Exposes CRUD operations for the **InstagramPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstagramPosts
    * const instagramPosts = await prisma.instagramPost.findMany()
    * ```
    */
  get instagramPost(): Prisma.InstagramPostDelegate<GlobalReject>;

  /**
   * `prisma.facebookPost`: Exposes CRUD operations for the **FacebookPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FacebookPosts
    * const facebookPosts = await prisma.facebookPost.findMany()
    * ```
    */
  get facebookPost(): Prisma.FacebookPostDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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
  export import Metrics = runtime.Metrics
  export import Metric = runtime.Metric
  export import MetricHistogram = runtime.MetricHistogram
  export import MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
   * Extensions
   */
  export type Extension = runtime.Extension 

  /**
   * Prisma Client JS version: 4.5.0
   * Query Engine version: 0362da9eebca54d94c8ef5edd3b2e90af99ba452
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

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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


  export import FieldRef = runtime.FieldRef

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

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

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
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

  export type UserCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UserCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UserCountOutputType
    : S extends undefined
    ? never
    : S extends UserCountOutputTypeArgs
    ?'include' extends U
    ? UserCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
    : UserCountOutputType
  : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Count Type ProjectCountOutputType
   */


  export type ProjectCountOutputType = {
    content: number
  }

  export type ProjectCountOutputTypeSelect = {
    content?: boolean
  }

  export type ProjectCountOutputTypeGetPayload<
    S extends boolean | null | undefined | ProjectCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? ProjectCountOutputType
    : S extends undefined
    ? never
    : S extends ProjectCountOutputTypeArgs
    ?'include' extends U
    ? ProjectCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ProjectCountOutputType ? ProjectCountOutputType[P] : never
  } 
    : ProjectCountOutputType
  : ProjectCountOutputType




  // Custom InputTypes

  /**
   * ProjectCountOutputType without action
   */
  export type ProjectCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ProjectCountOutputType
     * 
    **/
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
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    currentProjectId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    currentProjectId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    currentProjectId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
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
    by: Array<UserScalarFieldEnum>
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
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
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
    password?: boolean | PasswordArgs
    projects?: boolean | ProjectFindManyArgs
    currentProjectId?: boolean
    facebookCredentials?: boolean | FacebookCredentialsArgs
    instagramCredentials?: boolean | InstagramCredentialsArgs
    tikTokCredentials?: boolean | TikTokCredentialsArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    createdAt?: boolean
    updatedAt?: boolean
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserInclude = {
    password?: boolean | PasswordArgs
    projects?: boolean | ProjectFindManyArgs
    facebookCredentials?: boolean | FacebookCredentialsArgs
    instagramCredentials?: boolean | InstagramCredentialsArgs
    tikTokCredentials?: boolean | TikTokCredentialsArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    _count?: boolean | UserCountOutputTypeArgs
  }

  export type UserGetPayload<
    S extends boolean | null | undefined | UserArgs,
    U = keyof S
      > = S extends true
        ? User
    : S extends undefined
    ? never
    : S extends UserArgs | UserFindManyArgs
    ?'include' extends U
    ? User  & {
    [P in TrueKeys<S['include']>]:
        P extends 'password' ? PasswordGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'projects' ? Array < ProjectGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'facebookCredentials' ? FacebookCredentialsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'instagramCredentials' ? InstagramCredentialsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'tikTokCredentials' ? TikTokCredentialsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'password' ? PasswordGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'projects' ? Array < ProjectGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'facebookCredentials' ? FacebookCredentialsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'instagramCredentials' ? InstagramCredentialsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'tikTokCredentials' ? TikTokCredentialsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends '_count' ? UserCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof User ? User[P] : never
  } 
    : User
  : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>> : CheckSelect<T, Prisma__UserClient<User | null, null>, Prisma__UserClient<UserGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<User>>, PrismaPromise<Array<UserGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

    /**
     * Find one User that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__UserClient<User>, Prisma__UserClient<UserGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    password<T extends PasswordArgs = {}>(args?: Subset<T, PasswordArgs>): CheckSelect<T, Prisma__PasswordClient<Password | Null>, Prisma__PasswordClient<PasswordGetPayload<T> | Null>>;

    projects<T extends ProjectFindManyArgs = {}>(args?: Subset<T, ProjectFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Project>| Null>, PrismaPromise<Array<ProjectGetPayload<T>>| Null>>;

    facebookCredentials<T extends FacebookCredentialsArgs = {}>(args?: Subset<T, FacebookCredentialsArgs>): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials | Null>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | Null>>;

    instagramCredentials<T extends InstagramCredentialsArgs = {}>(args?: Subset<T, InstagramCredentialsArgs>): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials | Null>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | Null>>;

    tikTokCredentials<T extends TikTokCredentialsArgs = {}>(args?: Subset<T, TikTokCredentialsArgs>): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials | Null>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | Null>>;

    youtubeCredentials<T extends YoutubeCredentialsArgs = {}>(args?: Subset<T, YoutubeCredentialsArgs>): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials | Null>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | Null>>;

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
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User: findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User: findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User: findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = UserFindUniqueArgsBase
      

  /**
   * User: findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = UserFindFirstArgsBase
      

  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
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
     * 
    **/
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     * 
    **/
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     * 
    **/
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
    by: Array<PasswordScalarFieldEnum>
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

  type GetPasswordGroupByPayload<T extends PasswordGroupByArgs> = PrismaPromise<
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

  export type PasswordGetPayload<
    S extends boolean | null | undefined | PasswordArgs,
    U = keyof S
      > = S extends true
        ? Password
    : S extends undefined
    ? never
    : S extends PasswordArgs | PasswordFindManyArgs
    ?'include' extends U
    ? Password  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Password ? Password[P] : never
  } 
    : Password
  : Password


  type PasswordCountArgs = Merge<
    Omit<PasswordFindManyArgs, 'select' | 'include'> & {
      select?: PasswordCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Password'> extends True ? CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>> : CheckSelect<T, Prisma__PasswordClient<Password | null, null>, Prisma__PasswordClient<PasswordGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Password'> extends True ? CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>> : CheckSelect<T, Prisma__PasswordClient<Password | null, null>, Prisma__PasswordClient<PasswordGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<Password>>, PrismaPromise<Array<PasswordGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

    /**
     * Find one Password that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__PasswordClient<Password>, Prisma__PasswordClient<PasswordGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends PasswordAggregateArgs>(args: Subset<T, PasswordAggregateArgs>): PrismaPromise<GetPasswordAggregateType<T>>

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
    >(args: SubsetIntersection<T, PasswordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPasswordGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Password.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PasswordClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

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
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     * 
    **/
    where: PasswordWhereUniqueInput
  }

  /**
   * Password: findUnique
   */
  export interface PasswordFindUniqueArgs extends PasswordFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Password base type for findFirst actions
   */
  export type PasswordFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * Filter, which Password to fetch.
     * 
    **/
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     * 
    **/
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Passwords.
     * 
    **/
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Passwords.
     * 
    **/
    distinct?: Enumerable<PasswordScalarFieldEnum>
  }

  /**
   * Password: findFirst
   */
  export interface PasswordFindFirstArgs extends PasswordFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Password findMany
   */
  export type PasswordFindManyArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * Filter, which Passwords to fetch.
     * 
    **/
    where?: PasswordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Passwords to fetch.
     * 
    **/
    orderBy?: Enumerable<PasswordOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Passwords.
     * 
    **/
    cursor?: PasswordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Passwords from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Passwords.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PasswordScalarFieldEnum>
  }


  /**
   * Password create
   */
  export type PasswordCreateArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * The data needed to create a Password.
     * 
    **/
    data: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
  }


  /**
   * Password createMany
   */
  export type PasswordCreateManyArgs = {
    /**
     * The data used to create many Passwords.
     * 
    **/
    data: Enumerable<PasswordCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Password update
   */
  export type PasswordUpdateArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * The data needed to update a Password.
     * 
    **/
    data: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
    /**
     * Choose, which Password to update.
     * 
    **/
    where: PasswordWhereUniqueInput
  }


  /**
   * Password updateMany
   */
  export type PasswordUpdateManyArgs = {
    /**
     * The data used to update Passwords.
     * 
    **/
    data: XOR<PasswordUpdateManyMutationInput, PasswordUncheckedUpdateManyInput>
    /**
     * Filter which Passwords to update
     * 
    **/
    where?: PasswordWhereInput
  }


  /**
   * Password upsert
   */
  export type PasswordUpsertArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * The filter to search for the Password to update in case it exists.
     * 
    **/
    where: PasswordWhereUniqueInput
    /**
     * In case the Password found by the `where` argument doesn't exist, create a new Password with this data.
     * 
    **/
    create: XOR<PasswordCreateInput, PasswordUncheckedCreateInput>
    /**
     * In case the Password was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PasswordUpdateInput, PasswordUncheckedUpdateInput>
  }


  /**
   * Password delete
   */
  export type PasswordDeleteArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: PasswordInclude | null
    /**
     * Filter which Password to delete.
     * 
    **/
    where: PasswordWhereUniqueInput
  }


  /**
   * Password deleteMany
   */
  export type PasswordDeleteManyArgs = {
    /**
     * Filter which Passwords to delete
     * 
    **/
    where?: PasswordWhereInput
  }


  /**
   * Password: findUniqueOrThrow
   */
  export type PasswordFindUniqueOrThrowArgs = PasswordFindUniqueArgsBase
      

  /**
   * Password: findFirstOrThrow
   */
  export type PasswordFindFirstOrThrowArgs = PasswordFindFirstArgsBase
      

  /**
   * Password without action
   */
  export type PasswordArgs = {
    /**
     * Select specific fields to fetch from the Password
     * 
    **/
    select?: PasswordSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
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
    userId: string | null
    projectId: string | null
  }

  export type YoutubeCredentialsMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    refreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    channelId: string | null
    userId: string | null
    projectId: string | null
  }

  export type YoutubeCredentialsCountAggregateOutputType = {
    id: number
    accessToken: number
    refreshToken: number
    createdAt: number
    updatedAt: number
    channelId: number
    userId: number
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
    userId?: true
    projectId?: true
  }

  export type YoutubeCredentialsMaxAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    channelId?: true
    userId?: true
    projectId?: true
  }

  export type YoutubeCredentialsCountAggregateInputType = {
    id?: true
    accessToken?: true
    refreshToken?: true
    createdAt?: true
    updatedAt?: true
    channelId?: true
    userId?: true
    projectId?: true
    _all?: true
  }

  export type YoutubeCredentialsAggregateArgs = {
    /**
     * Filter which YoutubeCredentials to aggregate.
     * 
    **/
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     * 
    **/
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
    by: Array<YoutubeCredentialsScalarFieldEnum>
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
    userId: string
    projectId: string
    _count: YoutubeCredentialsCountAggregateOutputType | null
    _min: YoutubeCredentialsMinAggregateOutputType | null
    _max: YoutubeCredentialsMaxAggregateOutputType | null
  }

  type GetYoutubeCredentialsGroupByPayload<T extends YoutubeCredentialsGroupByArgs> = PrismaPromise<
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
    userId?: boolean
    user?: boolean | UserArgs
    projectId?: boolean
    project?: boolean | ProjectArgs
  }

  export type YoutubeCredentialsInclude = {
    user?: boolean | UserArgs
    project?: boolean | ProjectArgs
  }

  export type YoutubeCredentialsGetPayload<
    S extends boolean | null | undefined | YoutubeCredentialsArgs,
    U = keyof S
      > = S extends true
        ? YoutubeCredentials
    : S extends undefined
    ? never
    : S extends YoutubeCredentialsArgs | YoutubeCredentialsFindManyArgs
    ?'include' extends U
    ? YoutubeCredentials  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'project' ? ProjectGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'project' ? ProjectGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof YoutubeCredentials ? YoutubeCredentials[P] : never
  } 
    : YoutubeCredentials
  : YoutubeCredentials


  type YoutubeCredentialsCountArgs = Merge<
    Omit<YoutubeCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: YoutubeCredentialsCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'YoutubeCredentials'> extends True ? CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials | null, null>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'YoutubeCredentials'> extends True ? CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials | null, null>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<YoutubeCredentials>>, PrismaPromise<Array<YoutubeCredentialsGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

    /**
     * Find one YoutubeCredentials that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends YoutubeCredentialsAggregateArgs>(args: Subset<T, YoutubeCredentialsAggregateArgs>): PrismaPromise<GetYoutubeCredentialsAggregateType<T>>

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
    >(args: SubsetIntersection<T, YoutubeCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYoutubeCredentialsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for YoutubeCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__YoutubeCredentialsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    project<T extends ProjectArgs = {}>(args?: Subset<T, ProjectArgs>): CheckSelect<T, Prisma__ProjectClient<Project | Null>, Prisma__ProjectClient<ProjectGetPayload<T> | Null>>;

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
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     * 
    **/
    where: YoutubeCredentialsWhereUniqueInput
  }

  /**
   * YoutubeCredentials: findUnique
   */
  export interface YoutubeCredentialsFindUniqueArgs extends YoutubeCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeCredentials base type for findFirst actions
   */
  export type YoutubeCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     * 
    **/
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeCredentials.
     * 
    **/
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeCredentials.
     * 
    **/
    distinct?: Enumerable<YoutubeCredentialsScalarFieldEnum>
  }

  /**
   * YoutubeCredentials: findFirst
   */
  export interface YoutubeCredentialsFindFirstArgs extends YoutubeCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeCredentials findMany
   */
  export type YoutubeCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter, which YoutubeCredentials to fetch.
     * 
    **/
    where?: YoutubeCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YoutubeCredentials.
     * 
    **/
    cursor?: YoutubeCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeCredentials.
     * 
    **/
    skip?: number
    distinct?: Enumerable<YoutubeCredentialsScalarFieldEnum>
  }


  /**
   * YoutubeCredentials create
   */
  export type YoutubeCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * The data needed to create a YoutubeCredentials.
     * 
    **/
    data: XOR<YoutubeCredentialsCreateInput, YoutubeCredentialsUncheckedCreateInput>
  }


  /**
   * YoutubeCredentials createMany
   */
  export type YoutubeCredentialsCreateManyArgs = {
    /**
     * The data used to create many YoutubeCredentials.
     * 
    **/
    data: Enumerable<YoutubeCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * YoutubeCredentials update
   */
  export type YoutubeCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * The data needed to update a YoutubeCredentials.
     * 
    **/
    data: XOR<YoutubeCredentialsUpdateInput, YoutubeCredentialsUncheckedUpdateInput>
    /**
     * Choose, which YoutubeCredentials to update.
     * 
    **/
    where: YoutubeCredentialsWhereUniqueInput
  }


  /**
   * YoutubeCredentials updateMany
   */
  export type YoutubeCredentialsUpdateManyArgs = {
    /**
     * The data used to update YoutubeCredentials.
     * 
    **/
    data: XOR<YoutubeCredentialsUpdateManyMutationInput, YoutubeCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeCredentials to update
     * 
    **/
    where?: YoutubeCredentialsWhereInput
  }


  /**
   * YoutubeCredentials upsert
   */
  export type YoutubeCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * The filter to search for the YoutubeCredentials to update in case it exists.
     * 
    **/
    where: YoutubeCredentialsWhereUniqueInput
    /**
     * In case the YoutubeCredentials found by the `where` argument doesn't exist, create a new YoutubeCredentials with this data.
     * 
    **/
    create: XOR<YoutubeCredentialsCreateInput, YoutubeCredentialsUncheckedCreateInput>
    /**
     * In case the YoutubeCredentials was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<YoutubeCredentialsUpdateInput, YoutubeCredentialsUncheckedUpdateInput>
  }


  /**
   * YoutubeCredentials delete
   */
  export type YoutubeCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: YoutubeCredentialsInclude | null
    /**
     * Filter which YoutubeCredentials to delete.
     * 
    **/
    where: YoutubeCredentialsWhereUniqueInput
  }


  /**
   * YoutubeCredentials deleteMany
   */
  export type YoutubeCredentialsDeleteManyArgs = {
    /**
     * Filter which YoutubeCredentials to delete
     * 
    **/
    where?: YoutubeCredentialsWhereInput
  }


  /**
   * YoutubeCredentials: findUniqueOrThrow
   */
  export type YoutubeCredentialsFindUniqueOrThrowArgs = YoutubeCredentialsFindUniqueArgsBase
      

  /**
   * YoutubeCredentials: findFirstOrThrow
   */
  export type YoutubeCredentialsFindFirstOrThrowArgs = YoutubeCredentialsFindFirstArgsBase
      

  /**
   * YoutubeCredentials without action
   */
  export type YoutubeCredentialsArgs = {
    /**
     * Select specific fields to fetch from the YoutubeCredentials
     * 
    **/
    select?: YoutubeCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
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
    userId: string | null
  }

  export type InstagramCredentialsMaxAggregateOutputType = {
    id: string | null
    accessToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
    username: string | null
    userId: string | null
  }

  export type InstagramCredentialsCountAggregateOutputType = {
    id: number
    accessToken: number
    createdAt: number
    updatedAt: number
    username: number
    userId: number
    _all: number
  }


  export type InstagramCredentialsMinAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    userId?: true
  }

  export type InstagramCredentialsMaxAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    userId?: true
  }

  export type InstagramCredentialsCountAggregateInputType = {
    id?: true
    accessToken?: true
    createdAt?: true
    updatedAt?: true
    username?: true
    userId?: true
    _all?: true
  }

  export type InstagramCredentialsAggregateArgs = {
    /**
     * Filter which InstagramCredentials to aggregate.
     * 
    **/
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     * 
    **/
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
    by: Array<InstagramCredentialsScalarFieldEnum>
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
    userId: string
    _count: InstagramCredentialsCountAggregateOutputType | null
    _min: InstagramCredentialsMinAggregateOutputType | null
    _max: InstagramCredentialsMaxAggregateOutputType | null
  }

  type GetInstagramCredentialsGroupByPayload<T extends InstagramCredentialsGroupByArgs> = PrismaPromise<
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
    userId?: boolean
    user?: boolean | UserArgs
  }

  export type InstagramCredentialsInclude = {
    user?: boolean | UserArgs
  }

  export type InstagramCredentialsGetPayload<
    S extends boolean | null | undefined | InstagramCredentialsArgs,
    U = keyof S
      > = S extends true
        ? InstagramCredentials
    : S extends undefined
    ? never
    : S extends InstagramCredentialsArgs | InstagramCredentialsFindManyArgs
    ?'include' extends U
    ? InstagramCredentials  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof InstagramCredentials ? InstagramCredentials[P] : never
  } 
    : InstagramCredentials
  : InstagramCredentials


  type InstagramCredentialsCountArgs = Merge<
    Omit<InstagramCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: InstagramCredentialsCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InstagramCredentials'> extends True ? CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials | null, null>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InstagramCredentials'> extends True ? CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials | null, null>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<InstagramCredentials>>, PrismaPromise<Array<InstagramCredentialsGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

    /**
     * Find one InstagramCredentials that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__InstagramCredentialsClient<InstagramCredentials>, Prisma__InstagramCredentialsClient<InstagramCredentialsGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends InstagramCredentialsAggregateArgs>(args: Subset<T, InstagramCredentialsAggregateArgs>): PrismaPromise<GetInstagramCredentialsAggregateType<T>>

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
    >(args: SubsetIntersection<T, InstagramCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstagramCredentialsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InstagramCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InstagramCredentialsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

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
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     * 
    **/
    where: InstagramCredentialsWhereUniqueInput
  }

  /**
   * InstagramCredentials: findUnique
   */
  export interface InstagramCredentialsFindUniqueArgs extends InstagramCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramCredentials base type for findFirst actions
   */
  export type InstagramCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     * 
    **/
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstagramCredentials.
     * 
    **/
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstagramCredentials.
     * 
    **/
    distinct?: Enumerable<InstagramCredentialsScalarFieldEnum>
  }

  /**
   * InstagramCredentials: findFirst
   */
  export interface InstagramCredentialsFindFirstArgs extends InstagramCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramCredentials findMany
   */
  export type InstagramCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * Filter, which InstagramCredentials to fetch.
     * 
    **/
    where?: InstagramCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstagramCredentials.
     * 
    **/
    cursor?: InstagramCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramCredentials.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InstagramCredentialsScalarFieldEnum>
  }


  /**
   * InstagramCredentials create
   */
  export type InstagramCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * The data needed to create a InstagramCredentials.
     * 
    **/
    data: XOR<InstagramCredentialsCreateInput, InstagramCredentialsUncheckedCreateInput>
  }


  /**
   * InstagramCredentials createMany
   */
  export type InstagramCredentialsCreateManyArgs = {
    /**
     * The data used to create many InstagramCredentials.
     * 
    **/
    data: Enumerable<InstagramCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InstagramCredentials update
   */
  export type InstagramCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * The data needed to update a InstagramCredentials.
     * 
    **/
    data: XOR<InstagramCredentialsUpdateInput, InstagramCredentialsUncheckedUpdateInput>
    /**
     * Choose, which InstagramCredentials to update.
     * 
    **/
    where: InstagramCredentialsWhereUniqueInput
  }


  /**
   * InstagramCredentials updateMany
   */
  export type InstagramCredentialsUpdateManyArgs = {
    /**
     * The data used to update InstagramCredentials.
     * 
    **/
    data: XOR<InstagramCredentialsUpdateManyMutationInput, InstagramCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which InstagramCredentials to update
     * 
    **/
    where?: InstagramCredentialsWhereInput
  }


  /**
   * InstagramCredentials upsert
   */
  export type InstagramCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * The filter to search for the InstagramCredentials to update in case it exists.
     * 
    **/
    where: InstagramCredentialsWhereUniqueInput
    /**
     * In case the InstagramCredentials found by the `where` argument doesn't exist, create a new InstagramCredentials with this data.
     * 
    **/
    create: XOR<InstagramCredentialsCreateInput, InstagramCredentialsUncheckedCreateInput>
    /**
     * In case the InstagramCredentials was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InstagramCredentialsUpdateInput, InstagramCredentialsUncheckedUpdateInput>
  }


  /**
   * InstagramCredentials delete
   */
  export type InstagramCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
    /**
     * Filter which InstagramCredentials to delete.
     * 
    **/
    where: InstagramCredentialsWhereUniqueInput
  }


  /**
   * InstagramCredentials deleteMany
   */
  export type InstagramCredentialsDeleteManyArgs = {
    /**
     * Filter which InstagramCredentials to delete
     * 
    **/
    where?: InstagramCredentialsWhereInput
  }


  /**
   * InstagramCredentials: findUniqueOrThrow
   */
  export type InstagramCredentialsFindUniqueOrThrowArgs = InstagramCredentialsFindUniqueArgsBase
      

  /**
   * InstagramCredentials: findFirstOrThrow
   */
  export type InstagramCredentialsFindFirstOrThrowArgs = InstagramCredentialsFindFirstArgsBase
      

  /**
   * InstagramCredentials without action
   */
  export type InstagramCredentialsArgs = {
    /**
     * Select specific fields to fetch from the InstagramCredentials
     * 
    **/
    select?: InstagramCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramCredentialsInclude | null
  }



  /**
   * Model TikTokCredentials
   */


  export type AggregateTikTokCredentials = {
    _count: TikTokCredentialsCountAggregateOutputType | null
    _min: TikTokCredentialsMinAggregateOutputType | null
    _max: TikTokCredentialsMaxAggregateOutputType | null
  }

  export type TikTokCredentialsMinAggregateOutputType = {
    id: string | null
    clientKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accessToken: string | null
    openId: string | null
    username: string | null
    userId: string | null
  }

  export type TikTokCredentialsMaxAggregateOutputType = {
    id: string | null
    clientKey: string | null
    createdAt: Date | null
    updatedAt: Date | null
    accessToken: string | null
    openId: string | null
    username: string | null
    userId: string | null
  }

  export type TikTokCredentialsCountAggregateOutputType = {
    id: number
    clientKey: number
    createdAt: number
    updatedAt: number
    accessToken: number
    openId: number
    username: number
    userId: number
    _all: number
  }


  export type TikTokCredentialsMinAggregateInputType = {
    id?: true
    clientKey?: true
    createdAt?: true
    updatedAt?: true
    accessToken?: true
    openId?: true
    username?: true
    userId?: true
  }

  export type TikTokCredentialsMaxAggregateInputType = {
    id?: true
    clientKey?: true
    createdAt?: true
    updatedAt?: true
    accessToken?: true
    openId?: true
    username?: true
    userId?: true
  }

  export type TikTokCredentialsCountAggregateInputType = {
    id?: true
    clientKey?: true
    createdAt?: true
    updatedAt?: true
    accessToken?: true
    openId?: true
    username?: true
    userId?: true
    _all?: true
  }

  export type TikTokCredentialsAggregateArgs = {
    /**
     * Filter which TikTokCredentials to aggregate.
     * 
    **/
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     * 
    **/
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
    by: Array<TikTokCredentialsScalarFieldEnum>
    having?: TikTokCredentialsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TikTokCredentialsCountAggregateInputType | true
    _min?: TikTokCredentialsMinAggregateInputType
    _max?: TikTokCredentialsMaxAggregateInputType
  }


  export type TikTokCredentialsGroupByOutputType = {
    id: string
    clientKey: string
    createdAt: Date
    updatedAt: Date
    accessToken: string
    openId: string
    username: string
    userId: string
    _count: TikTokCredentialsCountAggregateOutputType | null
    _min: TikTokCredentialsMinAggregateOutputType | null
    _max: TikTokCredentialsMaxAggregateOutputType | null
  }

  type GetTikTokCredentialsGroupByPayload<T extends TikTokCredentialsGroupByArgs> = PrismaPromise<
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
    clientKey?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    accessToken?: boolean
    openId?: boolean
    username?: boolean
    userId?: boolean
    user?: boolean | UserArgs
  }

  export type TikTokCredentialsInclude = {
    user?: boolean | UserArgs
  }

  export type TikTokCredentialsGetPayload<
    S extends boolean | null | undefined | TikTokCredentialsArgs,
    U = keyof S
      > = S extends true
        ? TikTokCredentials
    : S extends undefined
    ? never
    : S extends TikTokCredentialsArgs | TikTokCredentialsFindManyArgs
    ?'include' extends U
    ? TikTokCredentials  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof TikTokCredentials ? TikTokCredentials[P] : never
  } 
    : TikTokCredentials
  : TikTokCredentials


  type TikTokCredentialsCountArgs = Merge<
    Omit<TikTokCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: TikTokCredentialsCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TikTokCredentials'> extends True ? CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials | null, null>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TikTokCredentials'> extends True ? CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials | null, null>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<TikTokCredentials>>, PrismaPromise<Array<TikTokCredentialsGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

    /**
     * Find one TikTokCredentials that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__TikTokCredentialsClient<TikTokCredentials>, Prisma__TikTokCredentialsClient<TikTokCredentialsGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends TikTokCredentialsAggregateArgs>(args: Subset<T, TikTokCredentialsAggregateArgs>): PrismaPromise<GetTikTokCredentialsAggregateType<T>>

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
    >(args: SubsetIntersection<T, TikTokCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTikTokCredentialsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TikTokCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TikTokCredentialsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

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
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     * 
    **/
    where: TikTokCredentialsWhereUniqueInput
  }

  /**
   * TikTokCredentials: findUnique
   */
  export interface TikTokCredentialsFindUniqueArgs extends TikTokCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokCredentials base type for findFirst actions
   */
  export type TikTokCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     * 
    **/
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TikTokCredentials.
     * 
    **/
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TikTokCredentials.
     * 
    **/
    distinct?: Enumerable<TikTokCredentialsScalarFieldEnum>
  }

  /**
   * TikTokCredentials: findFirst
   */
  export interface TikTokCredentialsFindFirstArgs extends TikTokCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokCredentials findMany
   */
  export type TikTokCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * Filter, which TikTokCredentials to fetch.
     * 
    **/
    where?: TikTokCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TikTokCredentials.
     * 
    **/
    cursor?: TikTokCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokCredentials.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TikTokCredentialsScalarFieldEnum>
  }


  /**
   * TikTokCredentials create
   */
  export type TikTokCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * The data needed to create a TikTokCredentials.
     * 
    **/
    data: XOR<TikTokCredentialsCreateInput, TikTokCredentialsUncheckedCreateInput>
  }


  /**
   * TikTokCredentials createMany
   */
  export type TikTokCredentialsCreateManyArgs = {
    /**
     * The data used to create many TikTokCredentials.
     * 
    **/
    data: Enumerable<TikTokCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TikTokCredentials update
   */
  export type TikTokCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * The data needed to update a TikTokCredentials.
     * 
    **/
    data: XOR<TikTokCredentialsUpdateInput, TikTokCredentialsUncheckedUpdateInput>
    /**
     * Choose, which TikTokCredentials to update.
     * 
    **/
    where: TikTokCredentialsWhereUniqueInput
  }


  /**
   * TikTokCredentials updateMany
   */
  export type TikTokCredentialsUpdateManyArgs = {
    /**
     * The data used to update TikTokCredentials.
     * 
    **/
    data: XOR<TikTokCredentialsUpdateManyMutationInput, TikTokCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which TikTokCredentials to update
     * 
    **/
    where?: TikTokCredentialsWhereInput
  }


  /**
   * TikTokCredentials upsert
   */
  export type TikTokCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * The filter to search for the TikTokCredentials to update in case it exists.
     * 
    **/
    where: TikTokCredentialsWhereUniqueInput
    /**
     * In case the TikTokCredentials found by the `where` argument doesn't exist, create a new TikTokCredentials with this data.
     * 
    **/
    create: XOR<TikTokCredentialsCreateInput, TikTokCredentialsUncheckedCreateInput>
    /**
     * In case the TikTokCredentials was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TikTokCredentialsUpdateInput, TikTokCredentialsUncheckedUpdateInput>
  }


  /**
   * TikTokCredentials delete
   */
  export type TikTokCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokCredentialsInclude | null
    /**
     * Filter which TikTokCredentials to delete.
     * 
    **/
    where: TikTokCredentialsWhereUniqueInput
  }


  /**
   * TikTokCredentials deleteMany
   */
  export type TikTokCredentialsDeleteManyArgs = {
    /**
     * Filter which TikTokCredentials to delete
     * 
    **/
    where?: TikTokCredentialsWhereInput
  }


  /**
   * TikTokCredentials: findUniqueOrThrow
   */
  export type TikTokCredentialsFindUniqueOrThrowArgs = TikTokCredentialsFindUniqueArgsBase
      

  /**
   * TikTokCredentials: findFirstOrThrow
   */
  export type TikTokCredentialsFindFirstOrThrowArgs = TikTokCredentialsFindFirstArgsBase
      

  /**
   * TikTokCredentials without action
   */
  export type TikTokCredentialsArgs = {
    /**
     * Select specific fields to fetch from the TikTokCredentials
     * 
    **/
    select?: TikTokCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
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
    userId: string | null
  }

  export type FacebookCredentialsMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    updatedAt: Date | null
    pageId: string | null
    userId: string | null
  }

  export type FacebookCredentialsCountAggregateOutputType = {
    id: number
    createdAt: number
    updatedAt: number
    pageId: number
    userId: number
    _all: number
  }


  export type FacebookCredentialsMinAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    userId?: true
  }

  export type FacebookCredentialsMaxAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    userId?: true
  }

  export type FacebookCredentialsCountAggregateInputType = {
    id?: true
    createdAt?: true
    updatedAt?: true
    pageId?: true
    userId?: true
    _all?: true
  }

  export type FacebookCredentialsAggregateArgs = {
    /**
     * Filter which FacebookCredentials to aggregate.
     * 
    **/
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     * 
    **/
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
    by: Array<FacebookCredentialsScalarFieldEnum>
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
    userId: string
    _count: FacebookCredentialsCountAggregateOutputType | null
    _min: FacebookCredentialsMinAggregateOutputType | null
    _max: FacebookCredentialsMaxAggregateOutputType | null
  }

  type GetFacebookCredentialsGroupByPayload<T extends FacebookCredentialsGroupByArgs> = PrismaPromise<
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
    userId?: boolean
    user?: boolean | UserArgs
  }

  export type FacebookCredentialsInclude = {
    user?: boolean | UserArgs
  }

  export type FacebookCredentialsGetPayload<
    S extends boolean | null | undefined | FacebookCredentialsArgs,
    U = keyof S
      > = S extends true
        ? FacebookCredentials
    : S extends undefined
    ? never
    : S extends FacebookCredentialsArgs | FacebookCredentialsFindManyArgs
    ?'include' extends U
    ? FacebookCredentials  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof FacebookCredentials ? FacebookCredentials[P] : never
  } 
    : FacebookCredentials
  : FacebookCredentials


  type FacebookCredentialsCountArgs = Merge<
    Omit<FacebookCredentialsFindManyArgs, 'select' | 'include'> & {
      select?: FacebookCredentialsCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FacebookCredentials'> extends True ? CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials | null, null>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FacebookCredentials'> extends True ? CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>> : CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials | null, null>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<FacebookCredentials>>, PrismaPromise<Array<FacebookCredentialsGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

    /**
     * Find one FacebookCredentials that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__FacebookCredentialsClient<FacebookCredentials>, Prisma__FacebookCredentialsClient<FacebookCredentialsGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends FacebookCredentialsAggregateArgs>(args: Subset<T, FacebookCredentialsAggregateArgs>): PrismaPromise<GetFacebookCredentialsAggregateType<T>>

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
    >(args: SubsetIntersection<T, FacebookCredentialsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookCredentialsGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FacebookCredentials.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FacebookCredentialsClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

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
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     * 
    **/
    where: FacebookCredentialsWhereUniqueInput
  }

  /**
   * FacebookCredentials: findUnique
   */
  export interface FacebookCredentialsFindUniqueArgs extends FacebookCredentialsFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookCredentials base type for findFirst actions
   */
  export type FacebookCredentialsFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     * 
    **/
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookCredentials.
     * 
    **/
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookCredentials.
     * 
    **/
    distinct?: Enumerable<FacebookCredentialsScalarFieldEnum>
  }

  /**
   * FacebookCredentials: findFirst
   */
  export interface FacebookCredentialsFindFirstArgs extends FacebookCredentialsFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookCredentials findMany
   */
  export type FacebookCredentialsFindManyArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * Filter, which FacebookCredentials to fetch.
     * 
    **/
    where?: FacebookCredentialsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookCredentials to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookCredentialsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacebookCredentials.
     * 
    **/
    cursor?: FacebookCredentialsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookCredentials from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookCredentials.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FacebookCredentialsScalarFieldEnum>
  }


  /**
   * FacebookCredentials create
   */
  export type FacebookCredentialsCreateArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * The data needed to create a FacebookCredentials.
     * 
    **/
    data: XOR<FacebookCredentialsCreateInput, FacebookCredentialsUncheckedCreateInput>
  }


  /**
   * FacebookCredentials createMany
   */
  export type FacebookCredentialsCreateManyArgs = {
    /**
     * The data used to create many FacebookCredentials.
     * 
    **/
    data: Enumerable<FacebookCredentialsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * FacebookCredentials update
   */
  export type FacebookCredentialsUpdateArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * The data needed to update a FacebookCredentials.
     * 
    **/
    data: XOR<FacebookCredentialsUpdateInput, FacebookCredentialsUncheckedUpdateInput>
    /**
     * Choose, which FacebookCredentials to update.
     * 
    **/
    where: FacebookCredentialsWhereUniqueInput
  }


  /**
   * FacebookCredentials updateMany
   */
  export type FacebookCredentialsUpdateManyArgs = {
    /**
     * The data used to update FacebookCredentials.
     * 
    **/
    data: XOR<FacebookCredentialsUpdateManyMutationInput, FacebookCredentialsUncheckedUpdateManyInput>
    /**
     * Filter which FacebookCredentials to update
     * 
    **/
    where?: FacebookCredentialsWhereInput
  }


  /**
   * FacebookCredentials upsert
   */
  export type FacebookCredentialsUpsertArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * The filter to search for the FacebookCredentials to update in case it exists.
     * 
    **/
    where: FacebookCredentialsWhereUniqueInput
    /**
     * In case the FacebookCredentials found by the `where` argument doesn't exist, create a new FacebookCredentials with this data.
     * 
    **/
    create: XOR<FacebookCredentialsCreateInput, FacebookCredentialsUncheckedCreateInput>
    /**
     * In case the FacebookCredentials was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FacebookCredentialsUpdateInput, FacebookCredentialsUncheckedUpdateInput>
  }


  /**
   * FacebookCredentials delete
   */
  export type FacebookCredentialsDeleteArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
    /**
     * Filter which FacebookCredentials to delete.
     * 
    **/
    where: FacebookCredentialsWhereUniqueInput
  }


  /**
   * FacebookCredentials deleteMany
   */
  export type FacebookCredentialsDeleteManyArgs = {
    /**
     * Filter which FacebookCredentials to delete
     * 
    **/
    where?: FacebookCredentialsWhereInput
  }


  /**
   * FacebookCredentials: findUniqueOrThrow
   */
  export type FacebookCredentialsFindUniqueOrThrowArgs = FacebookCredentialsFindUniqueArgsBase
      

  /**
   * FacebookCredentials: findFirstOrThrow
   */
  export type FacebookCredentialsFindFirstOrThrowArgs = FacebookCredentialsFindFirstArgsBase
      

  /**
   * FacebookCredentials without action
   */
  export type FacebookCredentialsArgs = {
    /**
     * Select specific fields to fetch from the FacebookCredentials
     * 
    **/
    select?: FacebookCredentialsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookCredentialsInclude | null
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
    markdown: string | null
    thumbnail: string | null
    video: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type ContentMaxAggregateOutputType = {
    slug: string | null
    title: string | null
    description: string | null
    markdown: string | null
    thumbnail: string | null
    video: string | null
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string | null
  }

  export type ContentCountAggregateOutputType = {
    slug: number
    title: number
    description: number
    markdown: number
    thumbnail: number
    video: number
    tags: number
    published: number
    createdAt: number
    updatedAt: number
    projectId: number
    _all: number
  }


  export type ContentMinAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    markdown?: true
    thumbnail?: true
    video?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type ContentMaxAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    markdown?: true
    thumbnail?: true
    video?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
  }

  export type ContentCountAggregateInputType = {
    slug?: true
    title?: true
    description?: true
    markdown?: true
    thumbnail?: true
    video?: true
    tags?: true
    published?: true
    createdAt?: true
    updatedAt?: true
    projectId?: true
    _all?: true
  }

  export type ContentAggregateArgs = {
    /**
     * Filter which Content to aggregate.
     * 
    **/
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     * 
    **/
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     * 
    **/
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
    by: Array<ContentScalarFieldEnum>
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
    markdown: string | null
    thumbnail: string | null
    video: string | null
    tags: string[]
    published: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    projectId: string
    _count: ContentCountAggregateOutputType | null
    _min: ContentMinAggregateOutputType | null
    _max: ContentMaxAggregateOutputType | null
  }

  type GetContentGroupByPayload<T extends ContentGroupByArgs> = PrismaPromise<
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
    markdown?: boolean
    thumbnail?: boolean
    video?: boolean
    tags?: boolean
    published?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    projectId?: boolean
    project?: boolean | ProjectArgs
    tikTokPost?: boolean | TikTokPostArgs
    instagramPost?: boolean | InstagramPostArgs
    facebookPost?: boolean | FacebookPostArgs
  }

  export type ContentInclude = {
    project?: boolean | ProjectArgs
    tikTokPost?: boolean | TikTokPostArgs
    instagramPost?: boolean | InstagramPostArgs
    facebookPost?: boolean | FacebookPostArgs
  }

  export type ContentGetPayload<
    S extends boolean | null | undefined | ContentArgs,
    U = keyof S
      > = S extends true
        ? Content
    : S extends undefined
    ? never
    : S extends ContentArgs | ContentFindManyArgs
    ?'include' extends U
    ? Content  & {
    [P in TrueKeys<S['include']>]:
        P extends 'project' ? ProjectGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'tikTokPost' ? TikTokPostGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'instagramPost' ? InstagramPostGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends 'facebookPost' ? FacebookPostGetPayload<Exclude<S['include'], undefined | null>[P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'project' ? ProjectGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'tikTokPost' ? TikTokPostGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'instagramPost' ? InstagramPostGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends 'facebookPost' ? FacebookPostGetPayload<Exclude<S['select'], undefined | null>[P]> | null :  P extends keyof Content ? Content[P] : never
  } 
    : Content
  : Content


  type ContentCountArgs = Merge<
    Omit<ContentFindManyArgs, 'select' | 'include'> & {
      select?: ContentCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Content'> extends True ? CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>> : CheckSelect<T, Prisma__ContentClient<Content | null, null>, Prisma__ContentClient<ContentGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Content'> extends True ? CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>> : CheckSelect<T, Prisma__ContentClient<Content | null, null>, Prisma__ContentClient<ContentGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<Content>>, PrismaPromise<Array<ContentGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

    /**
     * Find one Content that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__ContentClient<Content>, Prisma__ContentClient<ContentGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends ContentAggregateArgs>(args: Subset<T, ContentAggregateArgs>): PrismaPromise<GetContentAggregateType<T>>

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
    >(args: SubsetIntersection<T, ContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContentGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Content.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ContentClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    project<T extends ProjectArgs = {}>(args?: Subset<T, ProjectArgs>): CheckSelect<T, Prisma__ProjectClient<Project | Null>, Prisma__ProjectClient<ProjectGetPayload<T> | Null>>;

    tikTokPost<T extends TikTokPostArgs = {}>(args?: Subset<T, TikTokPostArgs>): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost | Null>, Prisma__TikTokPostClient<TikTokPostGetPayload<T> | Null>>;

    instagramPost<T extends InstagramPostArgs = {}>(args?: Subset<T, InstagramPostArgs>): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost | Null>, Prisma__InstagramPostClient<InstagramPostGetPayload<T> | Null>>;

    facebookPost<T extends FacebookPostArgs = {}>(args?: Subset<T, FacebookPostArgs>): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost | Null>, Prisma__FacebookPostClient<FacebookPostGetPayload<T> | Null>>;

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
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     * 
    **/
    where: ContentWhereUniqueInput
  }

  /**
   * Content: findUnique
   */
  export interface ContentFindUniqueArgs extends ContentFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Content base type for findFirst actions
   */
  export type ContentFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * Filter, which Content to fetch.
     * 
    **/
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     * 
    **/
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contents.
     * 
    **/
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contents.
     * 
    **/
    distinct?: Enumerable<ContentScalarFieldEnum>
  }

  /**
   * Content: findFirst
   */
  export interface ContentFindFirstArgs extends ContentFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Content findMany
   */
  export type ContentFindManyArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * Filter, which Contents to fetch.
     * 
    **/
    where?: ContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contents to fetch.
     * 
    **/
    orderBy?: Enumerable<ContentOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contents.
     * 
    **/
    cursor?: ContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contents from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contents.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ContentScalarFieldEnum>
  }


  /**
   * Content create
   */
  export type ContentCreateArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * The data needed to create a Content.
     * 
    **/
    data: XOR<ContentCreateInput, ContentUncheckedCreateInput>
  }


  /**
   * Content createMany
   */
  export type ContentCreateManyArgs = {
    /**
     * The data used to create many Contents.
     * 
    **/
    data: Enumerable<ContentCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Content update
   */
  export type ContentUpdateArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * The data needed to update a Content.
     * 
    **/
    data: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
    /**
     * Choose, which Content to update.
     * 
    **/
    where: ContentWhereUniqueInput
  }


  /**
   * Content updateMany
   */
  export type ContentUpdateManyArgs = {
    /**
     * The data used to update Contents.
     * 
    **/
    data: XOR<ContentUpdateManyMutationInput, ContentUncheckedUpdateManyInput>
    /**
     * Filter which Contents to update
     * 
    **/
    where?: ContentWhereInput
  }


  /**
   * Content upsert
   */
  export type ContentUpsertArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * The filter to search for the Content to update in case it exists.
     * 
    **/
    where: ContentWhereUniqueInput
    /**
     * In case the Content found by the `where` argument doesn't exist, create a new Content with this data.
     * 
    **/
    create: XOR<ContentCreateInput, ContentUncheckedCreateInput>
    /**
     * In case the Content was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ContentUpdateInput, ContentUncheckedUpdateInput>
  }


  /**
   * Content delete
   */
  export type ContentDeleteArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ContentInclude | null
    /**
     * Filter which Content to delete.
     * 
    **/
    where: ContentWhereUniqueInput
  }


  /**
   * Content deleteMany
   */
  export type ContentDeleteManyArgs = {
    /**
     * Filter which Contents to delete
     * 
    **/
    where?: ContentWhereInput
  }


  /**
   * Content: findUniqueOrThrow
   */
  export type ContentFindUniqueOrThrowArgs = ContentFindUniqueArgsBase
      

  /**
   * Content: findFirstOrThrow
   */
  export type ContentFindFirstOrThrowArgs = ContentFindFirstArgsBase
      

  /**
   * Content without action
   */
  export type ContentArgs = {
    /**
     * Select specific fields to fetch from the Content
     * 
    **/
    select?: ContentSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
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
    _all?: true
  }

  export type ProjectAggregateArgs = {
    /**
     * Filter which Project to aggregate.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
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
    by: Array<ProjectScalarFieldEnum>
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
    _count: ProjectCountAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = PrismaPromise<
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
    user?: boolean | UserArgs
    content?: boolean | ContentFindManyArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    _count?: boolean | ProjectCountOutputTypeArgs
  }

  export type ProjectInclude = {
    user?: boolean | UserArgs
    content?: boolean | ContentFindManyArgs
    youtubeCredentials?: boolean | YoutubeCredentialsArgs
    _count?: boolean | ProjectCountOutputTypeArgs
  }

  export type ProjectGetPayload<
    S extends boolean | null | undefined | ProjectArgs,
    U = keyof S
      > = S extends true
        ? Project
    : S extends undefined
    ? never
    : S extends ProjectArgs | ProjectFindManyArgs
    ?'include' extends U
    ? Project  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['include'], undefined | null>[P]> :
        P extends 'content' ? Array < ContentGetPayload<Exclude<S['include'], undefined | null>[P]>>  :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<Exclude<S['include'], undefined | null>[P]> | null :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? UserGetPayload<Exclude<S['select'], undefined | null>[P]> :
        P extends 'content' ? Array < ContentGetPayload<Exclude<S['select'], undefined | null>[P]>>  :
        P extends 'youtubeCredentials' ? YoutubeCredentialsGetPayload<Exclude<S['select'], undefined | null>[P]> | null :
        P extends '_count' ? ProjectCountOutputTypeGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof Project ? Project[P] : never
  } 
    : Project
  : Project


  type ProjectCountArgs = Merge<
    Omit<ProjectFindManyArgs, 'select' | 'include'> & {
      select?: ProjectCountAggregateInputType | true
    }
  >

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Project'> extends True ? CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>> : CheckSelect<T, Prisma__ProjectClient<Project | null, null>, Prisma__ProjectClient<ProjectGetPayload<T> | null, null>>

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
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Project'> extends True ? CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>> : CheckSelect<T, Prisma__ProjectClient<Project | null, null>, Prisma__ProjectClient<ProjectGetPayload<T> | null, null>>

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
    ): CheckSelect<T, PrismaPromise<Array<Project>>, PrismaPromise<Array<ProjectGetPayload<T>>>>

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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

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
    ): PrismaPromise<BatchPayload>

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
    ): PrismaPromise<BatchPayload>

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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

    /**
     * Find one Project that matches the filter or throw
     * `NotFoundError` if no matches were found.
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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

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
    ): CheckSelect<T, Prisma__ProjectClient<Project>, Prisma__ProjectClient<ProjectGetPayload<T>>>

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
    ): PrismaPromise<
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): PrismaPromise<GetProjectAggregateType<T>>

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
    >(args: SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ProjectClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends UserArgs = {}>(args?: Subset<T, UserArgs>): CheckSelect<T, Prisma__UserClient<User | Null>, Prisma__UserClient<UserGetPayload<T> | Null>>;

    content<T extends ContentFindManyArgs = {}>(args?: Subset<T, ContentFindManyArgs>): CheckSelect<T, PrismaPromise<Array<Content>| Null>, PrismaPromise<Array<ContentGetPayload<T>>| Null>>;

    youtubeCredentials<T extends YoutubeCredentialsArgs = {}>(args?: Subset<T, YoutubeCredentialsArgs>): CheckSelect<T, Prisma__YoutubeCredentialsClient<YoutubeCredentials | Null>, Prisma__YoutubeCredentialsClient<YoutubeCredentialsGetPayload<T> | Null>>;

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
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     * 
    **/
    where: ProjectWhereUniqueInput
  }

  /**
   * Project: findUnique
   */
  export interface ProjectFindUniqueArgs extends ProjectFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project base type for findFirst actions
   */
  export type ProjectFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Project to fetch.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Projects.
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Projects.
     * 
    **/
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }

  /**
   * Project: findFirst
   */
  export interface ProjectFindFirstArgs extends ProjectFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Project findMany
   */
  export type ProjectFindManyArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter, which Projects to fetch.
     * 
    **/
    where?: ProjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Projects to fetch.
     * 
    **/
    orderBy?: Enumerable<ProjectOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Projects.
     * 
    **/
    cursor?: ProjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Projects from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Projects.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ProjectScalarFieldEnum>
  }


  /**
   * Project create
   */
  export type ProjectCreateArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The data needed to create a Project.
     * 
    **/
    data: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
  }


  /**
   * Project createMany
   */
  export type ProjectCreateManyArgs = {
    /**
     * The data used to create many Projects.
     * 
    **/
    data: Enumerable<ProjectCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Project update
   */
  export type ProjectUpdateArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The data needed to update a Project.
     * 
    **/
    data: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
    /**
     * Choose, which Project to update.
     * 
    **/
    where: ProjectWhereUniqueInput
  }


  /**
   * Project updateMany
   */
  export type ProjectUpdateManyArgs = {
    /**
     * The data used to update Projects.
     * 
    **/
    data: XOR<ProjectUpdateManyMutationInput, ProjectUncheckedUpdateManyInput>
    /**
     * Filter which Projects to update
     * 
    **/
    where?: ProjectWhereInput
  }


  /**
   * Project upsert
   */
  export type ProjectUpsertArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * The filter to search for the Project to update in case it exists.
     * 
    **/
    where: ProjectWhereUniqueInput
    /**
     * In case the Project found by the `where` argument doesn't exist, create a new Project with this data.
     * 
    **/
    create: XOR<ProjectCreateInput, ProjectUncheckedCreateInput>
    /**
     * In case the Project was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ProjectUpdateInput, ProjectUncheckedUpdateInput>
  }


  /**
   * Project delete
   */
  export type ProjectDeleteArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
    /**
     * Filter which Project to delete.
     * 
    **/
    where: ProjectWhereUniqueInput
  }


  /**
   * Project deleteMany
   */
  export type ProjectDeleteManyArgs = {
    /**
     * Filter which Projects to delete
     * 
    **/
    where?: ProjectWhereInput
  }


  /**
   * Project: findUniqueOrThrow
   */
  export type ProjectFindUniqueOrThrowArgs = ProjectFindUniqueArgsBase
      

  /**
   * Project: findFirstOrThrow
   */
  export type ProjectFindFirstOrThrowArgs = ProjectFindFirstArgsBase
      

  /**
   * Project without action
   */
  export type ProjectArgs = {
    /**
     * Select specific fields to fetch from the Project
     * 
    **/
    select?: ProjectSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ProjectInclude | null
  }



  /**
   * Model YoutubeShortPost
   */


  export type AggregateYoutubeShortPost = {
    _count: YoutubeShortPostCountAggregateOutputType | null
    _min: YoutubeShortPostMinAggregateOutputType | null
    _max: YoutubeShortPostMaxAggregateOutputType | null
  }

  export type YoutubeShortPostMinAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
  }

  export type YoutubeShortPostMaxAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
  }

  export type YoutubeShortPostCountAggregateOutputType = {
    gcsVideoUrl: number
    postSlug: number
    _all: number
  }


  export type YoutubeShortPostMinAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
  }

  export type YoutubeShortPostMaxAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
  }

  export type YoutubeShortPostCountAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    _all?: true
  }

  export type YoutubeShortPostAggregateArgs = {
    /**
     * Filter which YoutubeShortPost to aggregate.
     * 
    **/
    where?: YoutubeShortPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeShortPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeShortPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: YoutubeShortPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeShortPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeShortPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned YoutubeShortPosts
    **/
    _count?: true | YoutubeShortPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: YoutubeShortPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: YoutubeShortPostMaxAggregateInputType
  }

  export type GetYoutubeShortPostAggregateType<T extends YoutubeShortPostAggregateArgs> = {
        [P in keyof T & keyof AggregateYoutubeShortPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateYoutubeShortPost[P]>
      : GetScalarType<T[P], AggregateYoutubeShortPost[P]>
  }




  export type YoutubeShortPostGroupByArgs = {
    where?: YoutubeShortPostWhereInput
    orderBy?: Enumerable<YoutubeShortPostOrderByWithAggregationInput>
    by: Array<YoutubeShortPostScalarFieldEnum>
    having?: YoutubeShortPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: YoutubeShortPostCountAggregateInputType | true
    _min?: YoutubeShortPostMinAggregateInputType
    _max?: YoutubeShortPostMaxAggregateInputType
  }


  export type YoutubeShortPostGroupByOutputType = {
    gcsVideoUrl: string
    postSlug: string
    _count: YoutubeShortPostCountAggregateOutputType | null
    _min: YoutubeShortPostMinAggregateOutputType | null
    _max: YoutubeShortPostMaxAggregateOutputType | null
  }

  type GetYoutubeShortPostGroupByPayload<T extends YoutubeShortPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<YoutubeShortPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof YoutubeShortPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], YoutubeShortPostGroupByOutputType[P]>
            : GetScalarType<T[P], YoutubeShortPostGroupByOutputType[P]>
        }
      >
    >


  export type YoutubeShortPostSelect = {
    gcsVideoUrl?: boolean
    postSlug?: boolean
  }

  export type YoutubeShortPostGetPayload<
    S extends boolean | null | undefined | YoutubeShortPostArgs,
    U = keyof S
      > = S extends true
        ? YoutubeShortPost
    : S extends undefined
    ? never
    : S extends YoutubeShortPostArgs | YoutubeShortPostFindManyArgs
    ?'include' extends U
    ? YoutubeShortPost 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof YoutubeShortPost ? YoutubeShortPost[P] : never
  } 
    : YoutubeShortPost
  : YoutubeShortPost


  type YoutubeShortPostCountArgs = Merge<
    Omit<YoutubeShortPostFindManyArgs, 'select' | 'include'> & {
      select?: YoutubeShortPostCountAggregateInputType | true
    }
  >

  export interface YoutubeShortPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one YoutubeShortPost that matches the filter.
     * @param {YoutubeShortPostFindUniqueArgs} args - Arguments to find a YoutubeShortPost
     * @example
     * // Get one YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends YoutubeShortPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, YoutubeShortPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'YoutubeShortPost'> extends True ? CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>> : CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost | null, null>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T> | null, null>>

    /**
     * Find the first YoutubeShortPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostFindFirstArgs} args - Arguments to find a YoutubeShortPost
     * @example
     * // Get one YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends YoutubeShortPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, YoutubeShortPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'YoutubeShortPost'> extends True ? CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>> : CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost | null, null>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T> | null, null>>

    /**
     * Find zero or more YoutubeShortPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all YoutubeShortPosts
     * const youtubeShortPosts = await prisma.youtubeShortPost.findMany()
     * 
     * // Get first 10 YoutubeShortPosts
     * const youtubeShortPosts = await prisma.youtubeShortPost.findMany({ take: 10 })
     * 
     * // Only select the `gcsVideoUrl`
     * const youtubeShortPostWithGcsVideoUrlOnly = await prisma.youtubeShortPost.findMany({ select: { gcsVideoUrl: true } })
     * 
    **/
    findMany<T extends YoutubeShortPostFindManyArgs>(
      args?: SelectSubset<T, YoutubeShortPostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<YoutubeShortPost>>, PrismaPromise<Array<YoutubeShortPostGetPayload<T>>>>

    /**
     * Create a YoutubeShortPost.
     * @param {YoutubeShortPostCreateArgs} args - Arguments to create a YoutubeShortPost.
     * @example
     * // Create one YoutubeShortPost
     * const YoutubeShortPost = await prisma.youtubeShortPost.create({
     *   data: {
     *     // ... data to create a YoutubeShortPost
     *   }
     * })
     * 
    **/
    create<T extends YoutubeShortPostCreateArgs>(
      args: SelectSubset<T, YoutubeShortPostCreateArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Create many YoutubeShortPosts.
     *     @param {YoutubeShortPostCreateManyArgs} args - Arguments to create many YoutubeShortPosts.
     *     @example
     *     // Create many YoutubeShortPosts
     *     const youtubeShortPost = await prisma.youtubeShortPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends YoutubeShortPostCreateManyArgs>(
      args?: SelectSubset<T, YoutubeShortPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a YoutubeShortPost.
     * @param {YoutubeShortPostDeleteArgs} args - Arguments to delete one YoutubeShortPost.
     * @example
     * // Delete one YoutubeShortPost
     * const YoutubeShortPost = await prisma.youtubeShortPost.delete({
     *   where: {
     *     // ... filter to delete one YoutubeShortPost
     *   }
     * })
     * 
    **/
    delete<T extends YoutubeShortPostDeleteArgs>(
      args: SelectSubset<T, YoutubeShortPostDeleteArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Update one YoutubeShortPost.
     * @param {YoutubeShortPostUpdateArgs} args - Arguments to update one YoutubeShortPost.
     * @example
     * // Update one YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends YoutubeShortPostUpdateArgs>(
      args: SelectSubset<T, YoutubeShortPostUpdateArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Delete zero or more YoutubeShortPosts.
     * @param {YoutubeShortPostDeleteManyArgs} args - Arguments to filter YoutubeShortPosts to delete.
     * @example
     * // Delete a few YoutubeShortPosts
     * const { count } = await prisma.youtubeShortPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends YoutubeShortPostDeleteManyArgs>(
      args?: SelectSubset<T, YoutubeShortPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more YoutubeShortPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many YoutubeShortPosts
     * const youtubeShortPost = await prisma.youtubeShortPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends YoutubeShortPostUpdateManyArgs>(
      args: SelectSubset<T, YoutubeShortPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one YoutubeShortPost.
     * @param {YoutubeShortPostUpsertArgs} args - Arguments to update or create a YoutubeShortPost.
     * @example
     * // Update or create a YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.upsert({
     *   create: {
     *     // ... data to create a YoutubeShortPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the YoutubeShortPost we want to update
     *   }
     * })
    **/
    upsert<T extends YoutubeShortPostUpsertArgs>(
      args: SelectSubset<T, YoutubeShortPostUpsertArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Find one YoutubeShortPost that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {YoutubeShortPostFindUniqueOrThrowArgs} args - Arguments to find a YoutubeShortPost
     * @example
     * // Get one YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends YoutubeShortPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, YoutubeShortPostFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Find the first YoutubeShortPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostFindFirstOrThrowArgs} args - Arguments to find a YoutubeShortPost
     * @example
     * // Get one YoutubeShortPost
     * const youtubeShortPost = await prisma.youtubeShortPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends YoutubeShortPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, YoutubeShortPostFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__YoutubeShortPostClient<YoutubeShortPost>, Prisma__YoutubeShortPostClient<YoutubeShortPostGetPayload<T>>>

    /**
     * Count the number of YoutubeShortPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostCountArgs} args - Arguments to filter YoutubeShortPosts to count.
     * @example
     * // Count the number of YoutubeShortPosts
     * const count = await prisma.youtubeShortPost.count({
     *   where: {
     *     // ... the filter for the YoutubeShortPosts we want to count
     *   }
     * })
    **/
    count<T extends YoutubeShortPostCountArgs>(
      args?: Subset<T, YoutubeShortPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], YoutubeShortPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a YoutubeShortPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends YoutubeShortPostAggregateArgs>(args: Subset<T, YoutubeShortPostAggregateArgs>): PrismaPromise<GetYoutubeShortPostAggregateType<T>>

    /**
     * Group by YoutubeShortPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {YoutubeShortPostGroupByArgs} args - Group by arguments.
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
      T extends YoutubeShortPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: YoutubeShortPostGroupByArgs['orderBy'] }
        : { orderBy?: YoutubeShortPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, YoutubeShortPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetYoutubeShortPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for YoutubeShortPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__YoutubeShortPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


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
   * YoutubeShortPost base type for findUnique actions
   */
  export type YoutubeShortPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * Filter, which YoutubeShortPost to fetch.
     * 
    **/
    where: YoutubeShortPostWhereUniqueInput
  }

  /**
   * YoutubeShortPost: findUnique
   */
  export interface YoutubeShortPostFindUniqueArgs extends YoutubeShortPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeShortPost base type for findFirst actions
   */
  export type YoutubeShortPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * Filter, which YoutubeShortPost to fetch.
     * 
    **/
    where?: YoutubeShortPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeShortPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeShortPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for YoutubeShortPosts.
     * 
    **/
    cursor?: YoutubeShortPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeShortPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeShortPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of YoutubeShortPosts.
     * 
    **/
    distinct?: Enumerable<YoutubeShortPostScalarFieldEnum>
  }

  /**
   * YoutubeShortPost: findFirst
   */
  export interface YoutubeShortPostFindFirstArgs extends YoutubeShortPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * YoutubeShortPost findMany
   */
  export type YoutubeShortPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * Filter, which YoutubeShortPosts to fetch.
     * 
    **/
    where?: YoutubeShortPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of YoutubeShortPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<YoutubeShortPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing YoutubeShortPosts.
     * 
    **/
    cursor?: YoutubeShortPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` YoutubeShortPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` YoutubeShortPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<YoutubeShortPostScalarFieldEnum>
  }


  /**
   * YoutubeShortPost create
   */
  export type YoutubeShortPostCreateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * The data needed to create a YoutubeShortPost.
     * 
    **/
    data: XOR<YoutubeShortPostCreateInput, YoutubeShortPostUncheckedCreateInput>
  }


  /**
   * YoutubeShortPost createMany
   */
  export type YoutubeShortPostCreateManyArgs = {
    /**
     * The data used to create many YoutubeShortPosts.
     * 
    **/
    data: Enumerable<YoutubeShortPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * YoutubeShortPost update
   */
  export type YoutubeShortPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * The data needed to update a YoutubeShortPost.
     * 
    **/
    data: XOR<YoutubeShortPostUpdateInput, YoutubeShortPostUncheckedUpdateInput>
    /**
     * Choose, which YoutubeShortPost to update.
     * 
    **/
    where: YoutubeShortPostWhereUniqueInput
  }


  /**
   * YoutubeShortPost updateMany
   */
  export type YoutubeShortPostUpdateManyArgs = {
    /**
     * The data used to update YoutubeShortPosts.
     * 
    **/
    data: XOR<YoutubeShortPostUpdateManyMutationInput, YoutubeShortPostUncheckedUpdateManyInput>
    /**
     * Filter which YoutubeShortPosts to update
     * 
    **/
    where?: YoutubeShortPostWhereInput
  }


  /**
   * YoutubeShortPost upsert
   */
  export type YoutubeShortPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * The filter to search for the YoutubeShortPost to update in case it exists.
     * 
    **/
    where: YoutubeShortPostWhereUniqueInput
    /**
     * In case the YoutubeShortPost found by the `where` argument doesn't exist, create a new YoutubeShortPost with this data.
     * 
    **/
    create: XOR<YoutubeShortPostCreateInput, YoutubeShortPostUncheckedCreateInput>
    /**
     * In case the YoutubeShortPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<YoutubeShortPostUpdateInput, YoutubeShortPostUncheckedUpdateInput>
  }


  /**
   * YoutubeShortPost delete
   */
  export type YoutubeShortPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
    /**
     * Filter which YoutubeShortPost to delete.
     * 
    **/
    where: YoutubeShortPostWhereUniqueInput
  }


  /**
   * YoutubeShortPost deleteMany
   */
  export type YoutubeShortPostDeleteManyArgs = {
    /**
     * Filter which YoutubeShortPosts to delete
     * 
    **/
    where?: YoutubeShortPostWhereInput
  }


  /**
   * YoutubeShortPost: findUniqueOrThrow
   */
  export type YoutubeShortPostFindUniqueOrThrowArgs = YoutubeShortPostFindUniqueArgsBase
      

  /**
   * YoutubeShortPost: findFirstOrThrow
   */
  export type YoutubeShortPostFindFirstOrThrowArgs = YoutubeShortPostFindFirstArgsBase
      

  /**
   * YoutubeShortPost without action
   */
  export type YoutubeShortPostArgs = {
    /**
     * Select specific fields to fetch from the YoutubeShortPost
     * 
    **/
    select?: YoutubeShortPostSelect | null
  }



  /**
   * Model TikTokPost
   */


  export type AggregateTikTokPost = {
    _count: TikTokPostCountAggregateOutputType | null
    _min: TikTokPostMinAggregateOutputType | null
    _max: TikTokPostMaxAggregateOutputType | null
  }

  export type TikTokPostMinAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type TikTokPostMaxAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type TikTokPostCountAggregateOutputType = {
    gcsVideoUrl: number
    postSlug: number
    contentProjectId: number
    contentSlug: number
    _all: number
  }


  export type TikTokPostMinAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type TikTokPostMaxAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type TikTokPostCountAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
    _all?: true
  }

  export type TikTokPostAggregateArgs = {
    /**
     * Filter which TikTokPost to aggregate.
     * 
    **/
    where?: TikTokPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: TikTokPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TikTokPosts
    **/
    _count?: true | TikTokPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TikTokPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TikTokPostMaxAggregateInputType
  }

  export type GetTikTokPostAggregateType<T extends TikTokPostAggregateArgs> = {
        [P in keyof T & keyof AggregateTikTokPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTikTokPost[P]>
      : GetScalarType<T[P], AggregateTikTokPost[P]>
  }




  export type TikTokPostGroupByArgs = {
    where?: TikTokPostWhereInput
    orderBy?: Enumerable<TikTokPostOrderByWithAggregationInput>
    by: Array<TikTokPostScalarFieldEnum>
    having?: TikTokPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TikTokPostCountAggregateInputType | true
    _min?: TikTokPostMinAggregateInputType
    _max?: TikTokPostMaxAggregateInputType
  }


  export type TikTokPostGroupByOutputType = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
    _count: TikTokPostCountAggregateOutputType | null
    _min: TikTokPostMinAggregateOutputType | null
    _max: TikTokPostMaxAggregateOutputType | null
  }

  type GetTikTokPostGroupByPayload<T extends TikTokPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TikTokPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TikTokPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TikTokPostGroupByOutputType[P]>
            : GetScalarType<T[P], TikTokPostGroupByOutputType[P]>
        }
      >
    >


  export type TikTokPostSelect = {
    gcsVideoUrl?: boolean
    postSlug?: boolean
    content?: boolean | ContentArgs
    contentProjectId?: boolean
    contentSlug?: boolean
  }

  export type TikTokPostInclude = {
    content?: boolean | ContentArgs
  }

  export type TikTokPostGetPayload<
    S extends boolean | null | undefined | TikTokPostArgs,
    U = keyof S
      > = S extends true
        ? TikTokPost
    : S extends undefined
    ? never
    : S extends TikTokPostArgs | TikTokPostFindManyArgs
    ?'include' extends U
    ? TikTokPost  & {
    [P in TrueKeys<S['include']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof TikTokPost ? TikTokPost[P] : never
  } 
    : TikTokPost
  : TikTokPost


  type TikTokPostCountArgs = Merge<
    Omit<TikTokPostFindManyArgs, 'select' | 'include'> & {
      select?: TikTokPostCountAggregateInputType | true
    }
  >

  export interface TikTokPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one TikTokPost that matches the filter.
     * @param {TikTokPostFindUniqueArgs} args - Arguments to find a TikTokPost
     * @example
     * // Get one TikTokPost
     * const tikTokPost = await prisma.tikTokPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TikTokPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, TikTokPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'TikTokPost'> extends True ? CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>> : CheckSelect<T, Prisma__TikTokPostClient<TikTokPost | null, null>, Prisma__TikTokPostClient<TikTokPostGetPayload<T> | null, null>>

    /**
     * Find the first TikTokPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostFindFirstArgs} args - Arguments to find a TikTokPost
     * @example
     * // Get one TikTokPost
     * const tikTokPost = await prisma.tikTokPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TikTokPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, TikTokPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'TikTokPost'> extends True ? CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>> : CheckSelect<T, Prisma__TikTokPostClient<TikTokPost | null, null>, Prisma__TikTokPostClient<TikTokPostGetPayload<T> | null, null>>

    /**
     * Find zero or more TikTokPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TikTokPosts
     * const tikTokPosts = await prisma.tikTokPost.findMany()
     * 
     * // Get first 10 TikTokPosts
     * const tikTokPosts = await prisma.tikTokPost.findMany({ take: 10 })
     * 
     * // Only select the `gcsVideoUrl`
     * const tikTokPostWithGcsVideoUrlOnly = await prisma.tikTokPost.findMany({ select: { gcsVideoUrl: true } })
     * 
    **/
    findMany<T extends TikTokPostFindManyArgs>(
      args?: SelectSubset<T, TikTokPostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<TikTokPost>>, PrismaPromise<Array<TikTokPostGetPayload<T>>>>

    /**
     * Create a TikTokPost.
     * @param {TikTokPostCreateArgs} args - Arguments to create a TikTokPost.
     * @example
     * // Create one TikTokPost
     * const TikTokPost = await prisma.tikTokPost.create({
     *   data: {
     *     // ... data to create a TikTokPost
     *   }
     * })
     * 
    **/
    create<T extends TikTokPostCreateArgs>(
      args: SelectSubset<T, TikTokPostCreateArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Create many TikTokPosts.
     *     @param {TikTokPostCreateManyArgs} args - Arguments to create many TikTokPosts.
     *     @example
     *     // Create many TikTokPosts
     *     const tikTokPost = await prisma.tikTokPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TikTokPostCreateManyArgs>(
      args?: SelectSubset<T, TikTokPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a TikTokPost.
     * @param {TikTokPostDeleteArgs} args - Arguments to delete one TikTokPost.
     * @example
     * // Delete one TikTokPost
     * const TikTokPost = await prisma.tikTokPost.delete({
     *   where: {
     *     // ... filter to delete one TikTokPost
     *   }
     * })
     * 
    **/
    delete<T extends TikTokPostDeleteArgs>(
      args: SelectSubset<T, TikTokPostDeleteArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Update one TikTokPost.
     * @param {TikTokPostUpdateArgs} args - Arguments to update one TikTokPost.
     * @example
     * // Update one TikTokPost
     * const tikTokPost = await prisma.tikTokPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TikTokPostUpdateArgs>(
      args: SelectSubset<T, TikTokPostUpdateArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Delete zero or more TikTokPosts.
     * @param {TikTokPostDeleteManyArgs} args - Arguments to filter TikTokPosts to delete.
     * @example
     * // Delete a few TikTokPosts
     * const { count } = await prisma.tikTokPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TikTokPostDeleteManyArgs>(
      args?: SelectSubset<T, TikTokPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more TikTokPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TikTokPosts
     * const tikTokPost = await prisma.tikTokPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TikTokPostUpdateManyArgs>(
      args: SelectSubset<T, TikTokPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one TikTokPost.
     * @param {TikTokPostUpsertArgs} args - Arguments to update or create a TikTokPost.
     * @example
     * // Update or create a TikTokPost
     * const tikTokPost = await prisma.tikTokPost.upsert({
     *   create: {
     *     // ... data to create a TikTokPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TikTokPost we want to update
     *   }
     * })
    **/
    upsert<T extends TikTokPostUpsertArgs>(
      args: SelectSubset<T, TikTokPostUpsertArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Find one TikTokPost that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {TikTokPostFindUniqueOrThrowArgs} args - Arguments to find a TikTokPost
     * @example
     * // Get one TikTokPost
     * const tikTokPost = await prisma.tikTokPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TikTokPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, TikTokPostFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Find the first TikTokPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostFindFirstOrThrowArgs} args - Arguments to find a TikTokPost
     * @example
     * // Get one TikTokPost
     * const tikTokPost = await prisma.tikTokPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TikTokPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, TikTokPostFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__TikTokPostClient<TikTokPost>, Prisma__TikTokPostClient<TikTokPostGetPayload<T>>>

    /**
     * Count the number of TikTokPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostCountArgs} args - Arguments to filter TikTokPosts to count.
     * @example
     * // Count the number of TikTokPosts
     * const count = await prisma.tikTokPost.count({
     *   where: {
     *     // ... the filter for the TikTokPosts we want to count
     *   }
     * })
    **/
    count<T extends TikTokPostCountArgs>(
      args?: Subset<T, TikTokPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TikTokPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TikTokPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TikTokPostAggregateArgs>(args: Subset<T, TikTokPostAggregateArgs>): PrismaPromise<GetTikTokPostAggregateType<T>>

    /**
     * Group by TikTokPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TikTokPostGroupByArgs} args - Group by arguments.
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
      T extends TikTokPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TikTokPostGroupByArgs['orderBy'] }
        : { orderBy?: TikTokPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TikTokPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTikTokPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for TikTokPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TikTokPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    content<T extends ContentArgs = {}>(args?: Subset<T, ContentArgs>): CheckSelect<T, Prisma__ContentClient<Content | Null>, Prisma__ContentClient<ContentGetPayload<T> | Null>>;

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
   * TikTokPost base type for findUnique actions
   */
  export type TikTokPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * Filter, which TikTokPost to fetch.
     * 
    **/
    where: TikTokPostWhereUniqueInput
  }

  /**
   * TikTokPost: findUnique
   */
  export interface TikTokPostFindUniqueArgs extends TikTokPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokPost base type for findFirst actions
   */
  export type TikTokPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * Filter, which TikTokPost to fetch.
     * 
    **/
    where?: TikTokPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TikTokPosts.
     * 
    **/
    cursor?: TikTokPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TikTokPosts.
     * 
    **/
    distinct?: Enumerable<TikTokPostScalarFieldEnum>
  }

  /**
   * TikTokPost: findFirst
   */
  export interface TikTokPostFindFirstArgs extends TikTokPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * TikTokPost findMany
   */
  export type TikTokPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * Filter, which TikTokPosts to fetch.
     * 
    **/
    where?: TikTokPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TikTokPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<TikTokPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TikTokPosts.
     * 
    **/
    cursor?: TikTokPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TikTokPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TikTokPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TikTokPostScalarFieldEnum>
  }


  /**
   * TikTokPost create
   */
  export type TikTokPostCreateArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * The data needed to create a TikTokPost.
     * 
    **/
    data: XOR<TikTokPostCreateInput, TikTokPostUncheckedCreateInput>
  }


  /**
   * TikTokPost createMany
   */
  export type TikTokPostCreateManyArgs = {
    /**
     * The data used to create many TikTokPosts.
     * 
    **/
    data: Enumerable<TikTokPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * TikTokPost update
   */
  export type TikTokPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * The data needed to update a TikTokPost.
     * 
    **/
    data: XOR<TikTokPostUpdateInput, TikTokPostUncheckedUpdateInput>
    /**
     * Choose, which TikTokPost to update.
     * 
    **/
    where: TikTokPostWhereUniqueInput
  }


  /**
   * TikTokPost updateMany
   */
  export type TikTokPostUpdateManyArgs = {
    /**
     * The data used to update TikTokPosts.
     * 
    **/
    data: XOR<TikTokPostUpdateManyMutationInput, TikTokPostUncheckedUpdateManyInput>
    /**
     * Filter which TikTokPosts to update
     * 
    **/
    where?: TikTokPostWhereInput
  }


  /**
   * TikTokPost upsert
   */
  export type TikTokPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * The filter to search for the TikTokPost to update in case it exists.
     * 
    **/
    where: TikTokPostWhereUniqueInput
    /**
     * In case the TikTokPost found by the `where` argument doesn't exist, create a new TikTokPost with this data.
     * 
    **/
    create: XOR<TikTokPostCreateInput, TikTokPostUncheckedCreateInput>
    /**
     * In case the TikTokPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<TikTokPostUpdateInput, TikTokPostUncheckedUpdateInput>
  }


  /**
   * TikTokPost delete
   */
  export type TikTokPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
    /**
     * Filter which TikTokPost to delete.
     * 
    **/
    where: TikTokPostWhereUniqueInput
  }


  /**
   * TikTokPost deleteMany
   */
  export type TikTokPostDeleteManyArgs = {
    /**
     * Filter which TikTokPosts to delete
     * 
    **/
    where?: TikTokPostWhereInput
  }


  /**
   * TikTokPost: findUniqueOrThrow
   */
  export type TikTokPostFindUniqueOrThrowArgs = TikTokPostFindUniqueArgsBase
      

  /**
   * TikTokPost: findFirstOrThrow
   */
  export type TikTokPostFindFirstOrThrowArgs = TikTokPostFindFirstArgsBase
      

  /**
   * TikTokPost without action
   */
  export type TikTokPostArgs = {
    /**
     * Select specific fields to fetch from the TikTokPost
     * 
    **/
    select?: TikTokPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: TikTokPostInclude | null
  }



  /**
   * Model InstagramPost
   */


  export type AggregateInstagramPost = {
    _count: InstagramPostCountAggregateOutputType | null
    _min: InstagramPostMinAggregateOutputType | null
    _max: InstagramPostMaxAggregateOutputType | null
  }

  export type InstagramPostMinAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    caption: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type InstagramPostMaxAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    caption: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type InstagramPostCountAggregateOutputType = {
    gcsVideoUrl: number
    postSlug: number
    caption: number
    contentProjectId: number
    contentSlug: number
    _all: number
  }


  export type InstagramPostMinAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    caption?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type InstagramPostMaxAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    caption?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type InstagramPostCountAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    caption?: true
    contentProjectId?: true
    contentSlug?: true
    _all?: true
  }

  export type InstagramPostAggregateArgs = {
    /**
     * Filter which InstagramPost to aggregate.
     * 
    **/
    where?: InstagramPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InstagramPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstagramPosts
    **/
    _count?: true | InstagramPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstagramPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstagramPostMaxAggregateInputType
  }

  export type GetInstagramPostAggregateType<T extends InstagramPostAggregateArgs> = {
        [P in keyof T & keyof AggregateInstagramPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstagramPost[P]>
      : GetScalarType<T[P], AggregateInstagramPost[P]>
  }




  export type InstagramPostGroupByArgs = {
    where?: InstagramPostWhereInput
    orderBy?: Enumerable<InstagramPostOrderByWithAggregationInput>
    by: Array<InstagramPostScalarFieldEnum>
    having?: InstagramPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstagramPostCountAggregateInputType | true
    _min?: InstagramPostMinAggregateInputType
    _max?: InstagramPostMaxAggregateInputType
  }


  export type InstagramPostGroupByOutputType = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
    contentProjectId: string
    contentSlug: string
    _count: InstagramPostCountAggregateOutputType | null
    _min: InstagramPostMinAggregateOutputType | null
    _max: InstagramPostMaxAggregateOutputType | null
  }

  type GetInstagramPostGroupByPayload<T extends InstagramPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InstagramPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstagramPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstagramPostGroupByOutputType[P]>
            : GetScalarType<T[P], InstagramPostGroupByOutputType[P]>
        }
      >
    >


  export type InstagramPostSelect = {
    gcsVideoUrl?: boolean
    postSlug?: boolean
    caption?: boolean
    content?: boolean | ContentArgs
    contentProjectId?: boolean
    contentSlug?: boolean
  }

  export type InstagramPostInclude = {
    content?: boolean | ContentArgs
  }

  export type InstagramPostGetPayload<
    S extends boolean | null | undefined | InstagramPostArgs,
    U = keyof S
      > = S extends true
        ? InstagramPost
    : S extends undefined
    ? never
    : S extends InstagramPostArgs | InstagramPostFindManyArgs
    ?'include' extends U
    ? InstagramPost  & {
    [P in TrueKeys<S['include']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof InstagramPost ? InstagramPost[P] : never
  } 
    : InstagramPost
  : InstagramPost


  type InstagramPostCountArgs = Merge<
    Omit<InstagramPostFindManyArgs, 'select' | 'include'> & {
      select?: InstagramPostCountAggregateInputType | true
    }
  >

  export interface InstagramPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one InstagramPost that matches the filter.
     * @param {InstagramPostFindUniqueArgs} args - Arguments to find a InstagramPost
     * @example
     * // Get one InstagramPost
     * const instagramPost = await prisma.instagramPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InstagramPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InstagramPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InstagramPost'> extends True ? CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>> : CheckSelect<T, Prisma__InstagramPostClient<InstagramPost | null, null>, Prisma__InstagramPostClient<InstagramPostGetPayload<T> | null, null>>

    /**
     * Find the first InstagramPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostFindFirstArgs} args - Arguments to find a InstagramPost
     * @example
     * // Get one InstagramPost
     * const instagramPost = await prisma.instagramPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InstagramPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InstagramPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InstagramPost'> extends True ? CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>> : CheckSelect<T, Prisma__InstagramPostClient<InstagramPost | null, null>, Prisma__InstagramPostClient<InstagramPostGetPayload<T> | null, null>>

    /**
     * Find zero or more InstagramPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstagramPosts
     * const instagramPosts = await prisma.instagramPost.findMany()
     * 
     * // Get first 10 InstagramPosts
     * const instagramPosts = await prisma.instagramPost.findMany({ take: 10 })
     * 
     * // Only select the `gcsVideoUrl`
     * const instagramPostWithGcsVideoUrlOnly = await prisma.instagramPost.findMany({ select: { gcsVideoUrl: true } })
     * 
    **/
    findMany<T extends InstagramPostFindManyArgs>(
      args?: SelectSubset<T, InstagramPostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<InstagramPost>>, PrismaPromise<Array<InstagramPostGetPayload<T>>>>

    /**
     * Create a InstagramPost.
     * @param {InstagramPostCreateArgs} args - Arguments to create a InstagramPost.
     * @example
     * // Create one InstagramPost
     * const InstagramPost = await prisma.instagramPost.create({
     *   data: {
     *     // ... data to create a InstagramPost
     *   }
     * })
     * 
    **/
    create<T extends InstagramPostCreateArgs>(
      args: SelectSubset<T, InstagramPostCreateArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Create many InstagramPosts.
     *     @param {InstagramPostCreateManyArgs} args - Arguments to create many InstagramPosts.
     *     @example
     *     // Create many InstagramPosts
     *     const instagramPost = await prisma.instagramPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends InstagramPostCreateManyArgs>(
      args?: SelectSubset<T, InstagramPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a InstagramPost.
     * @param {InstagramPostDeleteArgs} args - Arguments to delete one InstagramPost.
     * @example
     * // Delete one InstagramPost
     * const InstagramPost = await prisma.instagramPost.delete({
     *   where: {
     *     // ... filter to delete one InstagramPost
     *   }
     * })
     * 
    **/
    delete<T extends InstagramPostDeleteArgs>(
      args: SelectSubset<T, InstagramPostDeleteArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Update one InstagramPost.
     * @param {InstagramPostUpdateArgs} args - Arguments to update one InstagramPost.
     * @example
     * // Update one InstagramPost
     * const instagramPost = await prisma.instagramPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InstagramPostUpdateArgs>(
      args: SelectSubset<T, InstagramPostUpdateArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Delete zero or more InstagramPosts.
     * @param {InstagramPostDeleteManyArgs} args - Arguments to filter InstagramPosts to delete.
     * @example
     * // Delete a few InstagramPosts
     * const { count } = await prisma.instagramPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InstagramPostDeleteManyArgs>(
      args?: SelectSubset<T, InstagramPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstagramPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstagramPosts
     * const instagramPost = await prisma.instagramPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InstagramPostUpdateManyArgs>(
      args: SelectSubset<T, InstagramPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InstagramPost.
     * @param {InstagramPostUpsertArgs} args - Arguments to update or create a InstagramPost.
     * @example
     * // Update or create a InstagramPost
     * const instagramPost = await prisma.instagramPost.upsert({
     *   create: {
     *     // ... data to create a InstagramPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstagramPost we want to update
     *   }
     * })
    **/
    upsert<T extends InstagramPostUpsertArgs>(
      args: SelectSubset<T, InstagramPostUpsertArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Find one InstagramPost that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {InstagramPostFindUniqueOrThrowArgs} args - Arguments to find a InstagramPost
     * @example
     * // Get one InstagramPost
     * const instagramPost = await prisma.instagramPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InstagramPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InstagramPostFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Find the first InstagramPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostFindFirstOrThrowArgs} args - Arguments to find a InstagramPost
     * @example
     * // Get one InstagramPost
     * const instagramPost = await prisma.instagramPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InstagramPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InstagramPostFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__InstagramPostClient<InstagramPost>, Prisma__InstagramPostClient<InstagramPostGetPayload<T>>>

    /**
     * Count the number of InstagramPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostCountArgs} args - Arguments to filter InstagramPosts to count.
     * @example
     * // Count the number of InstagramPosts
     * const count = await prisma.instagramPost.count({
     *   where: {
     *     // ... the filter for the InstagramPosts we want to count
     *   }
     * })
    **/
    count<T extends InstagramPostCountArgs>(
      args?: Subset<T, InstagramPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstagramPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstagramPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InstagramPostAggregateArgs>(args: Subset<T, InstagramPostAggregateArgs>): PrismaPromise<GetInstagramPostAggregateType<T>>

    /**
     * Group by InstagramPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstagramPostGroupByArgs} args - Group by arguments.
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
      T extends InstagramPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstagramPostGroupByArgs['orderBy'] }
        : { orderBy?: InstagramPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, InstagramPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstagramPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InstagramPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InstagramPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    content<T extends ContentArgs = {}>(args?: Subset<T, ContentArgs>): CheckSelect<T, Prisma__ContentClient<Content | Null>, Prisma__ContentClient<ContentGetPayload<T> | Null>>;

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
   * InstagramPost base type for findUnique actions
   */
  export type InstagramPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * Filter, which InstagramPost to fetch.
     * 
    **/
    where: InstagramPostWhereUniqueInput
  }

  /**
   * InstagramPost: findUnique
   */
  export interface InstagramPostFindUniqueArgs extends InstagramPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramPost base type for findFirst actions
   */
  export type InstagramPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * Filter, which InstagramPost to fetch.
     * 
    **/
    where?: InstagramPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstagramPosts.
     * 
    **/
    cursor?: InstagramPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstagramPosts.
     * 
    **/
    distinct?: Enumerable<InstagramPostScalarFieldEnum>
  }

  /**
   * InstagramPost: findFirst
   */
  export interface InstagramPostFindFirstArgs extends InstagramPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InstagramPost findMany
   */
  export type InstagramPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * Filter, which InstagramPosts to fetch.
     * 
    **/
    where?: InstagramPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstagramPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<InstagramPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstagramPosts.
     * 
    **/
    cursor?: InstagramPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstagramPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstagramPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InstagramPostScalarFieldEnum>
  }


  /**
   * InstagramPost create
   */
  export type InstagramPostCreateArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * The data needed to create a InstagramPost.
     * 
    **/
    data: XOR<InstagramPostCreateInput, InstagramPostUncheckedCreateInput>
  }


  /**
   * InstagramPost createMany
   */
  export type InstagramPostCreateManyArgs = {
    /**
     * The data used to create many InstagramPosts.
     * 
    **/
    data: Enumerable<InstagramPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * InstagramPost update
   */
  export type InstagramPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * The data needed to update a InstagramPost.
     * 
    **/
    data: XOR<InstagramPostUpdateInput, InstagramPostUncheckedUpdateInput>
    /**
     * Choose, which InstagramPost to update.
     * 
    **/
    where: InstagramPostWhereUniqueInput
  }


  /**
   * InstagramPost updateMany
   */
  export type InstagramPostUpdateManyArgs = {
    /**
     * The data used to update InstagramPosts.
     * 
    **/
    data: XOR<InstagramPostUpdateManyMutationInput, InstagramPostUncheckedUpdateManyInput>
    /**
     * Filter which InstagramPosts to update
     * 
    **/
    where?: InstagramPostWhereInput
  }


  /**
   * InstagramPost upsert
   */
  export type InstagramPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * The filter to search for the InstagramPost to update in case it exists.
     * 
    **/
    where: InstagramPostWhereUniqueInput
    /**
     * In case the InstagramPost found by the `where` argument doesn't exist, create a new InstagramPost with this data.
     * 
    **/
    create: XOR<InstagramPostCreateInput, InstagramPostUncheckedCreateInput>
    /**
     * In case the InstagramPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InstagramPostUpdateInput, InstagramPostUncheckedUpdateInput>
  }


  /**
   * InstagramPost delete
   */
  export type InstagramPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
    /**
     * Filter which InstagramPost to delete.
     * 
    **/
    where: InstagramPostWhereUniqueInput
  }


  /**
   * InstagramPost deleteMany
   */
  export type InstagramPostDeleteManyArgs = {
    /**
     * Filter which InstagramPosts to delete
     * 
    **/
    where?: InstagramPostWhereInput
  }


  /**
   * InstagramPost: findUniqueOrThrow
   */
  export type InstagramPostFindUniqueOrThrowArgs = InstagramPostFindUniqueArgsBase
      

  /**
   * InstagramPost: findFirstOrThrow
   */
  export type InstagramPostFindFirstOrThrowArgs = InstagramPostFindFirstArgsBase
      

  /**
   * InstagramPost without action
   */
  export type InstagramPostArgs = {
    /**
     * Select specific fields to fetch from the InstagramPost
     * 
    **/
    select?: InstagramPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: InstagramPostInclude | null
  }



  /**
   * Model FacebookPost
   */


  export type AggregateFacebookPost = {
    _count: FacebookPostCountAggregateOutputType | null
    _min: FacebookPostMinAggregateOutputType | null
    _max: FacebookPostMaxAggregateOutputType | null
  }

  export type FacebookPostMinAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type FacebookPostMaxAggregateOutputType = {
    gcsVideoUrl: string | null
    postSlug: string | null
    contentProjectId: string | null
    contentSlug: string | null
  }

  export type FacebookPostCountAggregateOutputType = {
    gcsVideoUrl: number
    postSlug: number
    contentProjectId: number
    contentSlug: number
    _all: number
  }


  export type FacebookPostMinAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type FacebookPostMaxAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
  }

  export type FacebookPostCountAggregateInputType = {
    gcsVideoUrl?: true
    postSlug?: true
    contentProjectId?: true
    contentSlug?: true
    _all?: true
  }

  export type FacebookPostAggregateArgs = {
    /**
     * Filter which FacebookPost to aggregate.
     * 
    **/
    where?: FacebookPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FacebookPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FacebookPosts
    **/
    _count?: true | FacebookPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FacebookPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FacebookPostMaxAggregateInputType
  }

  export type GetFacebookPostAggregateType<T extends FacebookPostAggregateArgs> = {
        [P in keyof T & keyof AggregateFacebookPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFacebookPost[P]>
      : GetScalarType<T[P], AggregateFacebookPost[P]>
  }




  export type FacebookPostGroupByArgs = {
    where?: FacebookPostWhereInput
    orderBy?: Enumerable<FacebookPostOrderByWithAggregationInput>
    by: Array<FacebookPostScalarFieldEnum>
    having?: FacebookPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FacebookPostCountAggregateInputType | true
    _min?: FacebookPostMinAggregateInputType
    _max?: FacebookPostMaxAggregateInputType
  }


  export type FacebookPostGroupByOutputType = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
    _count: FacebookPostCountAggregateOutputType | null
    _min: FacebookPostMinAggregateOutputType | null
    _max: FacebookPostMaxAggregateOutputType | null
  }

  type GetFacebookPostGroupByPayload<T extends FacebookPostGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FacebookPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FacebookPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FacebookPostGroupByOutputType[P]>
            : GetScalarType<T[P], FacebookPostGroupByOutputType[P]>
        }
      >
    >


  export type FacebookPostSelect = {
    gcsVideoUrl?: boolean
    postSlug?: boolean
    content?: boolean | ContentArgs
    contentProjectId?: boolean
    contentSlug?: boolean
  }

  export type FacebookPostInclude = {
    content?: boolean | ContentArgs
  }

  export type FacebookPostGetPayload<
    S extends boolean | null | undefined | FacebookPostArgs,
    U = keyof S
      > = S extends true
        ? FacebookPost
    : S extends undefined
    ? never
    : S extends FacebookPostArgs | FacebookPostFindManyArgs
    ?'include' extends U
    ? FacebookPost  & {
    [P in TrueKeys<S['include']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['include'], undefined | null>[P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'content' ? ContentGetPayload<Exclude<S['select'], undefined | null>[P]> :  P extends keyof FacebookPost ? FacebookPost[P] : never
  } 
    : FacebookPost
  : FacebookPost


  type FacebookPostCountArgs = Merge<
    Omit<FacebookPostFindManyArgs, 'select' | 'include'> & {
      select?: FacebookPostCountAggregateInputType | true
    }
  >

  export interface FacebookPostDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one FacebookPost that matches the filter.
     * @param {FacebookPostFindUniqueArgs} args - Arguments to find a FacebookPost
     * @example
     * // Get one FacebookPost
     * const facebookPost = await prisma.facebookPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FacebookPostFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FacebookPostFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FacebookPost'> extends True ? CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>> : CheckSelect<T, Prisma__FacebookPostClient<FacebookPost | null, null>, Prisma__FacebookPostClient<FacebookPostGetPayload<T> | null, null>>

    /**
     * Find the first FacebookPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostFindFirstArgs} args - Arguments to find a FacebookPost
     * @example
     * // Get one FacebookPost
     * const facebookPost = await prisma.facebookPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FacebookPostFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FacebookPostFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FacebookPost'> extends True ? CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>> : CheckSelect<T, Prisma__FacebookPostClient<FacebookPost | null, null>, Prisma__FacebookPostClient<FacebookPostGetPayload<T> | null, null>>

    /**
     * Find zero or more FacebookPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FacebookPosts
     * const facebookPosts = await prisma.facebookPost.findMany()
     * 
     * // Get first 10 FacebookPosts
     * const facebookPosts = await prisma.facebookPost.findMany({ take: 10 })
     * 
     * // Only select the `gcsVideoUrl`
     * const facebookPostWithGcsVideoUrlOnly = await prisma.facebookPost.findMany({ select: { gcsVideoUrl: true } })
     * 
    **/
    findMany<T extends FacebookPostFindManyArgs>(
      args?: SelectSubset<T, FacebookPostFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<FacebookPost>>, PrismaPromise<Array<FacebookPostGetPayload<T>>>>

    /**
     * Create a FacebookPost.
     * @param {FacebookPostCreateArgs} args - Arguments to create a FacebookPost.
     * @example
     * // Create one FacebookPost
     * const FacebookPost = await prisma.facebookPost.create({
     *   data: {
     *     // ... data to create a FacebookPost
     *   }
     * })
     * 
    **/
    create<T extends FacebookPostCreateArgs>(
      args: SelectSubset<T, FacebookPostCreateArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Create many FacebookPosts.
     *     @param {FacebookPostCreateManyArgs} args - Arguments to create many FacebookPosts.
     *     @example
     *     // Create many FacebookPosts
     *     const facebookPost = await prisma.facebookPost.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FacebookPostCreateManyArgs>(
      args?: SelectSubset<T, FacebookPostCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a FacebookPost.
     * @param {FacebookPostDeleteArgs} args - Arguments to delete one FacebookPost.
     * @example
     * // Delete one FacebookPost
     * const FacebookPost = await prisma.facebookPost.delete({
     *   where: {
     *     // ... filter to delete one FacebookPost
     *   }
     * })
     * 
    **/
    delete<T extends FacebookPostDeleteArgs>(
      args: SelectSubset<T, FacebookPostDeleteArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Update one FacebookPost.
     * @param {FacebookPostUpdateArgs} args - Arguments to update one FacebookPost.
     * @example
     * // Update one FacebookPost
     * const facebookPost = await prisma.facebookPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FacebookPostUpdateArgs>(
      args: SelectSubset<T, FacebookPostUpdateArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Delete zero or more FacebookPosts.
     * @param {FacebookPostDeleteManyArgs} args - Arguments to filter FacebookPosts to delete.
     * @example
     * // Delete a few FacebookPosts
     * const { count } = await prisma.facebookPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FacebookPostDeleteManyArgs>(
      args?: SelectSubset<T, FacebookPostDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more FacebookPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FacebookPosts
     * const facebookPost = await prisma.facebookPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FacebookPostUpdateManyArgs>(
      args: SelectSubset<T, FacebookPostUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one FacebookPost.
     * @param {FacebookPostUpsertArgs} args - Arguments to update or create a FacebookPost.
     * @example
     * // Update or create a FacebookPost
     * const facebookPost = await prisma.facebookPost.upsert({
     *   create: {
     *     // ... data to create a FacebookPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FacebookPost we want to update
     *   }
     * })
    **/
    upsert<T extends FacebookPostUpsertArgs>(
      args: SelectSubset<T, FacebookPostUpsertArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Find one FacebookPost that matches the filter or throw
     * `NotFoundError` if no matches were found.
     * @param {FacebookPostFindUniqueOrThrowArgs} args - Arguments to find a FacebookPost
     * @example
     * // Get one FacebookPost
     * const facebookPost = await prisma.facebookPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FacebookPostFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FacebookPostFindUniqueOrThrowArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Find the first FacebookPost that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostFindFirstOrThrowArgs} args - Arguments to find a FacebookPost
     * @example
     * // Get one FacebookPost
     * const facebookPost = await prisma.facebookPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FacebookPostFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FacebookPostFindFirstOrThrowArgs>
    ): CheckSelect<T, Prisma__FacebookPostClient<FacebookPost>, Prisma__FacebookPostClient<FacebookPostGetPayload<T>>>

    /**
     * Count the number of FacebookPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostCountArgs} args - Arguments to filter FacebookPosts to count.
     * @example
     * // Count the number of FacebookPosts
     * const count = await prisma.facebookPost.count({
     *   where: {
     *     // ... the filter for the FacebookPosts we want to count
     *   }
     * })
    **/
    count<T extends FacebookPostCountArgs>(
      args?: Subset<T, FacebookPostCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FacebookPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FacebookPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FacebookPostAggregateArgs>(args: Subset<T, FacebookPostAggregateArgs>): PrismaPromise<GetFacebookPostAggregateType<T>>

    /**
     * Group by FacebookPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FacebookPostGroupByArgs} args - Group by arguments.
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
      T extends FacebookPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FacebookPostGroupByArgs['orderBy'] }
        : { orderBy?: FacebookPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FacebookPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFacebookPostGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FacebookPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FacebookPostClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    content<T extends ContentArgs = {}>(args?: Subset<T, ContentArgs>): CheckSelect<T, Prisma__ContentClient<Content | Null>, Prisma__ContentClient<ContentGetPayload<T> | Null>>;

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
   * FacebookPost base type for findUnique actions
   */
  export type FacebookPostFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * Filter, which FacebookPost to fetch.
     * 
    **/
    where: FacebookPostWhereUniqueInput
  }

  /**
   * FacebookPost: findUnique
   */
  export interface FacebookPostFindUniqueArgs extends FacebookPostFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookPost base type for findFirst actions
   */
  export type FacebookPostFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * Filter, which FacebookPost to fetch.
     * 
    **/
    where?: FacebookPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FacebookPosts.
     * 
    **/
    cursor?: FacebookPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookPosts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FacebookPosts.
     * 
    **/
    distinct?: Enumerable<FacebookPostScalarFieldEnum>
  }

  /**
   * FacebookPost: findFirst
   */
  export interface FacebookPostFindFirstArgs extends FacebookPostFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FacebookPost findMany
   */
  export type FacebookPostFindManyArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * Filter, which FacebookPosts to fetch.
     * 
    **/
    where?: FacebookPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FacebookPosts to fetch.
     * 
    **/
    orderBy?: Enumerable<FacebookPostOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FacebookPosts.
     * 
    **/
    cursor?: FacebookPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FacebookPosts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FacebookPosts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FacebookPostScalarFieldEnum>
  }


  /**
   * FacebookPost create
   */
  export type FacebookPostCreateArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * The data needed to create a FacebookPost.
     * 
    **/
    data: XOR<FacebookPostCreateInput, FacebookPostUncheckedCreateInput>
  }


  /**
   * FacebookPost createMany
   */
  export type FacebookPostCreateManyArgs = {
    /**
     * The data used to create many FacebookPosts.
     * 
    **/
    data: Enumerable<FacebookPostCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * FacebookPost update
   */
  export type FacebookPostUpdateArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * The data needed to update a FacebookPost.
     * 
    **/
    data: XOR<FacebookPostUpdateInput, FacebookPostUncheckedUpdateInput>
    /**
     * Choose, which FacebookPost to update.
     * 
    **/
    where: FacebookPostWhereUniqueInput
  }


  /**
   * FacebookPost updateMany
   */
  export type FacebookPostUpdateManyArgs = {
    /**
     * The data used to update FacebookPosts.
     * 
    **/
    data: XOR<FacebookPostUpdateManyMutationInput, FacebookPostUncheckedUpdateManyInput>
    /**
     * Filter which FacebookPosts to update
     * 
    **/
    where?: FacebookPostWhereInput
  }


  /**
   * FacebookPost upsert
   */
  export type FacebookPostUpsertArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * The filter to search for the FacebookPost to update in case it exists.
     * 
    **/
    where: FacebookPostWhereUniqueInput
    /**
     * In case the FacebookPost found by the `where` argument doesn't exist, create a new FacebookPost with this data.
     * 
    **/
    create: XOR<FacebookPostCreateInput, FacebookPostUncheckedCreateInput>
    /**
     * In case the FacebookPost was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FacebookPostUpdateInput, FacebookPostUncheckedUpdateInput>
  }


  /**
   * FacebookPost delete
   */
  export type FacebookPostDeleteArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
    /**
     * Filter which FacebookPost to delete.
     * 
    **/
    where: FacebookPostWhereUniqueInput
  }


  /**
   * FacebookPost deleteMany
   */
  export type FacebookPostDeleteManyArgs = {
    /**
     * Filter which FacebookPosts to delete
     * 
    **/
    where?: FacebookPostWhereInput
  }


  /**
   * FacebookPost: findUniqueOrThrow
   */
  export type FacebookPostFindUniqueOrThrowArgs = FacebookPostFindUniqueArgsBase
      

  /**
   * FacebookPost: findFirstOrThrow
   */
  export type FacebookPostFindFirstOrThrowArgs = FacebookPostFindFirstArgsBase
      

  /**
   * FacebookPost without action
   */
  export type FacebookPostArgs = {
    /**
     * Select specific fields to fetch from the FacebookPost
     * 
    **/
    select?: FacebookPostSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: FacebookPostInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ContentScalarFieldEnum: {
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
  };

  export type ContentScalarFieldEnum = (typeof ContentScalarFieldEnum)[keyof typeof ContentScalarFieldEnum]


  export const FacebookCredentialsScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    pageId: 'pageId',
    userId: 'userId'
  };

  export type FacebookCredentialsScalarFieldEnum = (typeof FacebookCredentialsScalarFieldEnum)[keyof typeof FacebookCredentialsScalarFieldEnum]


  export const FacebookPostScalarFieldEnum: {
    gcsVideoUrl: 'gcsVideoUrl',
    postSlug: 'postSlug',
    contentProjectId: 'contentProjectId',
    contentSlug: 'contentSlug'
  };

  export type FacebookPostScalarFieldEnum = (typeof FacebookPostScalarFieldEnum)[keyof typeof FacebookPostScalarFieldEnum]


  export const InstagramCredentialsScalarFieldEnum: {
    id: 'id',
    accessToken: 'accessToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    username: 'username',
    userId: 'userId'
  };

  export type InstagramCredentialsScalarFieldEnum = (typeof InstagramCredentialsScalarFieldEnum)[keyof typeof InstagramCredentialsScalarFieldEnum]


  export const InstagramPostScalarFieldEnum: {
    gcsVideoUrl: 'gcsVideoUrl',
    postSlug: 'postSlug',
    caption: 'caption',
    contentProjectId: 'contentProjectId',
    contentSlug: 'contentSlug'
  };

  export type InstagramPostScalarFieldEnum = (typeof InstagramPostScalarFieldEnum)[keyof typeof InstagramPostScalarFieldEnum]


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
    userId: 'userId'
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
    clientKey: 'clientKey',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    accessToken: 'accessToken',
    openId: 'openId',
    username: 'username',
    userId: 'userId'
  };

  export type TikTokCredentialsScalarFieldEnum = (typeof TikTokCredentialsScalarFieldEnum)[keyof typeof TikTokCredentialsScalarFieldEnum]


  export const TikTokPostScalarFieldEnum: {
    gcsVideoUrl: 'gcsVideoUrl',
    postSlug: 'postSlug',
    contentProjectId: 'contentProjectId',
    contentSlug: 'contentSlug'
  };

  export type TikTokPostScalarFieldEnum = (typeof TikTokPostScalarFieldEnum)[keyof typeof TikTokPostScalarFieldEnum]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    currentProjectId: 'currentProjectId',
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
    userId: 'userId',
    projectId: 'projectId'
  };

  export type YoutubeCredentialsScalarFieldEnum = (typeof YoutubeCredentialsScalarFieldEnum)[keyof typeof YoutubeCredentialsScalarFieldEnum]


  export const YoutubeShortPostScalarFieldEnum: {
    gcsVideoUrl: 'gcsVideoUrl',
    postSlug: 'postSlug'
  };

  export type YoutubeShortPostScalarFieldEnum = (typeof YoutubeShortPostScalarFieldEnum)[keyof typeof YoutubeShortPostScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    password?: XOR<PasswordRelationFilter, PasswordWhereInput> | null
    projects?: ProjectListRelationFilter
    currentProjectId?: StringNullableFilter | string | null
    facebookCredentials?: XOR<FacebookCredentialsRelationFilter, FacebookCredentialsWhereInput> | null
    instagramCredentials?: XOR<InstagramCredentialsRelationFilter, InstagramCredentialsWhereInput> | null
    tikTokCredentials?: XOR<TikTokCredentialsRelationFilter, TikTokCredentialsWhereInput> | null
    youtubeCredentials?: XOR<YoutubeCredentialsRelationFilter, YoutubeCredentialsWhereInput> | null
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: PasswordOrderByWithRelationInput
    projects?: ProjectOrderByRelationAggregateInput
    currentProjectId?: SortOrder
    facebookCredentials?: FacebookCredentialsOrderByWithRelationInput
    instagramCredentials?: InstagramCredentialsOrderByWithRelationInput
    tikTokCredentials?: TikTokCredentialsOrderByWithRelationInput
    youtubeCredentials?: YoutubeCredentialsOrderByWithRelationInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
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
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
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
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
  }

  export type YoutubeCredentialsWhereUniqueInput = {
    id?: string
    userId?: string
    projectId?: string
  }

  export type YoutubeCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
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
    userId?: StringWithAggregatesFilter | string
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
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type InstagramCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type InstagramCredentialsWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type InstagramCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    userId?: SortOrder
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
    userId?: StringWithAggregatesFilter | string
  }

  export type TikTokCredentialsWhereInput = {
    AND?: Enumerable<TikTokCredentialsWhereInput>
    OR?: Enumerable<TikTokCredentialsWhereInput>
    NOT?: Enumerable<TikTokCredentialsWhereInput>
    id?: StringFilter | string
    clientKey?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    accessToken?: StringFilter | string
    openId?: StringFilter | string
    username?: StringFilter | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type TikTokCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    clientKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accessToken?: SortOrder
    openId?: SortOrder
    username?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TikTokCredentialsWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type TikTokCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    clientKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accessToken?: SortOrder
    openId?: SortOrder
    username?: SortOrder
    userId?: SortOrder
    _count?: TikTokCredentialsCountOrderByAggregateInput
    _max?: TikTokCredentialsMaxOrderByAggregateInput
    _min?: TikTokCredentialsMinOrderByAggregateInput
  }

  export type TikTokCredentialsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    OR?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TikTokCredentialsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    clientKey?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
    accessToken?: StringWithAggregatesFilter | string
    openId?: StringWithAggregatesFilter | string
    username?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
  }

  export type FacebookCredentialsWhereInput = {
    AND?: Enumerable<FacebookCredentialsWhereInput>
    OR?: Enumerable<FacebookCredentialsWhereInput>
    NOT?: Enumerable<FacebookCredentialsWhereInput>
    id?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    pageId?: StringFilter | string
    userId?: StringFilter | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type FacebookCredentialsOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FacebookCredentialsWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type FacebookCredentialsOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
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
    userId?: StringWithAggregatesFilter | string
  }

  export type ContentWhereInput = {
    AND?: Enumerable<ContentWhereInput>
    OR?: Enumerable<ContentWhereInput>
    NOT?: Enumerable<ContentWhereInput>
    slug?: StringFilter | string
    title?: StringFilter | string
    description?: StringNullableFilter | string | null
    markdown?: StringNullableFilter | string | null
    thumbnail?: StringNullableFilter | string | null
    video?: StringNullableFilter | string | null
    tags?: StringNullableListFilter
    published?: BoolNullableFilter | boolean | null
    createdAt?: DateTimeNullableFilter | Date | string | null
    updatedAt?: DateTimeNullableFilter | Date | string | null
    projectId?: StringFilter | string
    project?: XOR<ProjectRelationFilter, ProjectWhereInput>
    tikTokPost?: XOR<TikTokPostRelationFilter, TikTokPostWhereInput> | null
    instagramPost?: XOR<InstagramPostRelationFilter, InstagramPostWhereInput> | null
    facebookPost?: XOR<FacebookPostRelationFilter, FacebookPostWhereInput> | null
  }

  export type ContentOrderByWithRelationInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    markdown?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
    project?: ProjectOrderByWithRelationInput
    tikTokPost?: TikTokPostOrderByWithRelationInput
    instagramPost?: InstagramPostOrderByWithRelationInput
    facebookPost?: FacebookPostOrderByWithRelationInput
  }

  export type ContentWhereUniqueInput = {
    slug?: string
    projectId_slug?: ContentProjectIdSlugCompoundUniqueInput
  }

  export type ContentOrderByWithAggregationInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    markdown?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
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
    markdown?: StringNullableWithAggregatesFilter | string | null
    thumbnail?: StringNullableWithAggregatesFilter | string | null
    video?: StringNullableWithAggregatesFilter | string | null
    tags?: StringNullableListFilter
    published?: BoolNullableWithAggregatesFilter | boolean | null
    createdAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    projectId?: StringWithAggregatesFilter | string
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
    user?: XOR<UserRelationFilter, UserWhereInput>
    content?: ContentListRelationFilter
    youtubeCredentials?: XOR<YoutubeCredentialsRelationFilter, YoutubeCredentialsWhereInput> | null
  }

  export type ProjectOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    content?: ContentOrderByRelationAggregateInput
    youtubeCredentials?: YoutubeCredentialsOrderByWithRelationInput
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
  }

  export type YoutubeShortPostWhereInput = {
    AND?: Enumerable<YoutubeShortPostWhereInput>
    OR?: Enumerable<YoutubeShortPostWhereInput>
    NOT?: Enumerable<YoutubeShortPostWhereInput>
    gcsVideoUrl?: StringFilter | string
    postSlug?: StringFilter | string
  }

  export type YoutubeShortPostOrderByWithRelationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
  }

  export type YoutubeShortPostWhereUniqueInput = {
    postSlug?: string
  }

  export type YoutubeShortPostOrderByWithAggregationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    _count?: YoutubeShortPostCountOrderByAggregateInput
    _max?: YoutubeShortPostMaxOrderByAggregateInput
    _min?: YoutubeShortPostMinOrderByAggregateInput
  }

  export type YoutubeShortPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<YoutubeShortPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<YoutubeShortPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<YoutubeShortPostScalarWhereWithAggregatesInput>
    gcsVideoUrl?: StringWithAggregatesFilter | string
    postSlug?: StringWithAggregatesFilter | string
  }

  export type TikTokPostWhereInput = {
    AND?: Enumerable<TikTokPostWhereInput>
    OR?: Enumerable<TikTokPostWhereInput>
    NOT?: Enumerable<TikTokPostWhereInput>
    gcsVideoUrl?: StringFilter | string
    postSlug?: StringFilter | string
    content?: XOR<ContentRelationFilter, ContentWhereInput>
    contentProjectId?: StringFilter | string
    contentSlug?: StringFilter | string
  }

  export type TikTokPostOrderByWithRelationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    content?: ContentOrderByWithRelationInput
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type TikTokPostWhereUniqueInput = {
    postSlug?: string
    contentProjectId_contentSlug?: TikTokPostContentProjectIdContentSlugCompoundUniqueInput
  }

  export type TikTokPostOrderByWithAggregationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
    _count?: TikTokPostCountOrderByAggregateInput
    _max?: TikTokPostMaxOrderByAggregateInput
    _min?: TikTokPostMinOrderByAggregateInput
  }

  export type TikTokPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<TikTokPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<TikTokPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<TikTokPostScalarWhereWithAggregatesInput>
    gcsVideoUrl?: StringWithAggregatesFilter | string
    postSlug?: StringWithAggregatesFilter | string
    contentProjectId?: StringWithAggregatesFilter | string
    contentSlug?: StringWithAggregatesFilter | string
  }

  export type InstagramPostWhereInput = {
    AND?: Enumerable<InstagramPostWhereInput>
    OR?: Enumerable<InstagramPostWhereInput>
    NOT?: Enumerable<InstagramPostWhereInput>
    gcsVideoUrl?: StringFilter | string
    postSlug?: StringFilter | string
    caption?: StringFilter | string
    content?: XOR<ContentRelationFilter, ContentWhereInput>
    contentProjectId?: StringFilter | string
    contentSlug?: StringFilter | string
  }

  export type InstagramPostOrderByWithRelationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    caption?: SortOrder
    content?: ContentOrderByWithRelationInput
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type InstagramPostWhereUniqueInput = {
    postSlug?: string
    contentProjectId_contentSlug?: InstagramPostContentProjectIdContentSlugCompoundUniqueInput
  }

  export type InstagramPostOrderByWithAggregationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    caption?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
    _count?: InstagramPostCountOrderByAggregateInput
    _max?: InstagramPostMaxOrderByAggregateInput
    _min?: InstagramPostMinOrderByAggregateInput
  }

  export type InstagramPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InstagramPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<InstagramPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InstagramPostScalarWhereWithAggregatesInput>
    gcsVideoUrl?: StringWithAggregatesFilter | string
    postSlug?: StringWithAggregatesFilter | string
    caption?: StringWithAggregatesFilter | string
    contentProjectId?: StringWithAggregatesFilter | string
    contentSlug?: StringWithAggregatesFilter | string
  }

  export type FacebookPostWhereInput = {
    AND?: Enumerable<FacebookPostWhereInput>
    OR?: Enumerable<FacebookPostWhereInput>
    NOT?: Enumerable<FacebookPostWhereInput>
    gcsVideoUrl?: StringFilter | string
    postSlug?: StringFilter | string
    content?: XOR<ContentRelationFilter, ContentWhereInput>
    contentProjectId?: StringFilter | string
    contentSlug?: StringFilter | string
  }

  export type FacebookPostOrderByWithRelationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    content?: ContentOrderByWithRelationInput
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type FacebookPostWhereUniqueInput = {
    postSlug?: string
    contentProjectId_contentSlug?: FacebookPostContentProjectIdContentSlugCompoundUniqueInput
  }

  export type FacebookPostOrderByWithAggregationInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
    _count?: FacebookPostCountOrderByAggregateInput
    _max?: FacebookPostMaxOrderByAggregateInput
    _min?: FacebookPostMinOrderByAggregateInput
  }

  export type FacebookPostScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FacebookPostScalarWhereWithAggregatesInput>
    OR?: Enumerable<FacebookPostScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FacebookPostScalarWhereWithAggregatesInput>
    gcsVideoUrl?: StringWithAggregatesFilter | string
    postSlug?: StringWithAggregatesFilter | string
    contentProjectId?: StringWithAggregatesFilter | string
    contentSlug?: StringWithAggregatesFilter | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    currentProjectId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
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
    user: UserCreateNestedOneWithoutYoutubeCredentialsInput
    project: ProjectCreateNestedOneWithoutYoutubeCredentialsInput
  }

  export type YoutubeCredentialsUncheckedCreateInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    userId: string
    projectId: string
  }

  export type YoutubeCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutYoutubeCredentialsNestedInput
    project?: ProjectUpdateOneRequiredWithoutYoutubeCredentialsNestedInput
  }

  export type YoutubeCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeCredentialsCreateManyInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    userId: string
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
    userId?: StringFieldUpdateOperationsInput | string
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsCreateInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    user: UserCreateNestedOneWithoutInstagramCredentialsInput
  }

  export type InstagramCredentialsUncheckedCreateInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    userId: string
  }

  export type InstagramCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutInstagramCredentialsNestedInput
  }

  export type InstagramCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsCreateManyInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
    userId: string
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
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsCreateInput = {
    id?: string
    clientKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accessToken: string
    openId: string
    username: string
    user: UserCreateNestedOneWithoutTikTokCredentialsInput
  }

  export type TikTokCredentialsUncheckedCreateInput = {
    id?: string
    clientKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accessToken: string
    openId: string
    username: string
    userId: string
  }

  export type TikTokCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutTikTokCredentialsNestedInput
  }

  export type TikTokCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsCreateManyInput = {
    id?: string
    clientKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accessToken: string
    openId: string
    username: string
    userId: string
  }

  export type TikTokCredentialsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    user: UserCreateNestedOneWithoutFacebookCredentialsInput
  }

  export type FacebookCredentialsUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    userId: string
  }

  export type FacebookCredentialsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutFacebookCredentialsNestedInput
  }

  export type FacebookCredentialsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsCreateManyInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
    userId: string
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
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutContentInput
    tikTokPost?: TikTokPostCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    tikTokPost?: TikTokPostUncheckedCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostUncheckedCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostUncheckedCreateNestedOneWithoutContentInput
  }

  export type ContentUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutContentNestedInput
    tikTokPost?: TikTokPostUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    tikTokPost?: TikTokPostUncheckedUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUncheckedUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUncheckedUpdateOneWithoutContentNestedInput
  }

  export type ContentCreateManyInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
  }

  export type ContentUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ContentUncheckedUpdateManyInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type ProjectCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectCreateManyInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type ProjectUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeShortPostCreateInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type YoutubeShortPostUncheckedCreateInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type YoutubeShortPostUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeShortPostUncheckedUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeShortPostCreateManyInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type YoutubeShortPostUpdateManyMutationInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeShortPostUncheckedUpdateManyInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokPostCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    content: ContentCreateNestedOneWithoutTikTokPostInput
  }

  export type TikTokPostUncheckedCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
  }

  export type TikTokPostUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    content?: ContentUpdateOneRequiredWithoutTikTokPostNestedInput
  }

  export type TikTokPostUncheckedUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokPostCreateManyInput = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
  }

  export type TikTokPostUpdateManyMutationInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokPostUncheckedUpdateManyInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramPostCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
    content: ContentCreateNestedOneWithoutInstagramPostInput
  }

  export type InstagramPostUncheckedCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
    contentProjectId: string
    contentSlug: string
  }

  export type InstagramPostUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    content?: ContentUpdateOneRequiredWithoutInstagramPostNestedInput
  }

  export type InstagramPostUncheckedUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramPostCreateManyInput = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
    contentProjectId: string
    contentSlug: string
  }

  export type InstagramPostUpdateManyMutationInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramPostUncheckedUpdateManyInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookPostCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    content: ContentCreateNestedOneWithoutFacebookPostInput
  }

  export type FacebookPostUncheckedCreateInput = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
  }

  export type FacebookPostUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    content?: ContentUpdateOneRequiredWithoutFacebookPostNestedInput
  }

  export type FacebookPostUncheckedUpdateInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookPostCreateManyInput = {
    gcsVideoUrl: string
    postSlug: string
    contentProjectId: string
    contentSlug: string
  }

  export type FacebookPostUpdateManyMutationInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookPostUncheckedUpdateManyInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    contentProjectId?: StringFieldUpdateOperationsInput | string
    contentSlug?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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

  export type PasswordRelationFilter = {
    is?: PasswordWhereInput | null
    isNot?: PasswordWhereInput | null
  }

  export type ProjectListRelationFilter = {
    every?: ProjectWhereInput
    some?: ProjectWhereInput
    none?: ProjectWhereInput
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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

  export type FacebookCredentialsRelationFilter = {
    is?: FacebookCredentialsWhereInput | null
    isNot?: FacebookCredentialsWhereInput | null
  }

  export type InstagramCredentialsRelationFilter = {
    is?: InstagramCredentialsWhereInput | null
    isNot?: InstagramCredentialsWhereInput | null
  }

  export type TikTokCredentialsRelationFilter = {
    is?: TikTokCredentialsWhereInput | null
    isNot?: TikTokCredentialsWhereInput | null
  }

  export type YoutubeCredentialsRelationFilter = {
    is?: YoutubeCredentialsWhereInput | null
    isNot?: YoutubeCredentialsWhereInput | null
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type ProjectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    currentProjectId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
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
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type YoutubeCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type YoutubeCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    channelId?: SortOrder
    userId?: SortOrder
    projectId?: SortOrder
  }

  export type InstagramCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type InstagramCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type InstagramCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    accessToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type TikTokCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    clientKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accessToken?: SortOrder
    openId?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type TikTokCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    clientKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accessToken?: SortOrder
    openId?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type TikTokCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    clientKey?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    accessToken?: SortOrder
    openId?: SortOrder
    username?: SortOrder
    userId?: SortOrder
  }

  export type FacebookCredentialsCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
  }

  export type FacebookCredentialsMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
  }

  export type FacebookCredentialsMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    pageId?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableListFilter = {
    equals?: Enumerable<string> | null
    has?: string | null
    hasEvery?: Enumerable<string>
    hasSome?: Enumerable<string>
    isEmpty?: boolean
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type TikTokPostRelationFilter = {
    is?: TikTokPostWhereInput | null
    isNot?: TikTokPostWhereInput | null
  }

  export type InstagramPostRelationFilter = {
    is?: InstagramPostWhereInput | null
    isNot?: InstagramPostWhereInput | null
  }

  export type FacebookPostRelationFilter = {
    is?: FacebookPostWhereInput | null
    isNot?: FacebookPostWhereInput | null
  }

  export type ContentProjectIdSlugCompoundUniqueInput = {
    projectId: string
    slug: string
  }

  export type ContentCountOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    markdown?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    tags?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type ContentMaxOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    markdown?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type ContentMinOrderByAggregateInput = {
    slug?: SortOrder
    title?: SortOrder
    description?: SortOrder
    markdown?: SortOrder
    thumbnail?: SortOrder
    video?: SortOrder
    published?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    projectId?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type ContentListRelationFilter = {
    every?: ContentWhereInput
    some?: ContentWhereInput
    none?: ContentWhereInput
  }

  export type ContentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProjectCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
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

  export type YoutubeShortPostCountOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
  }

  export type YoutubeShortPostMaxOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
  }

  export type YoutubeShortPostMinOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
  }

  export type ContentRelationFilter = {
    is?: ContentWhereInput
    isNot?: ContentWhereInput
  }

  export type TikTokPostContentProjectIdContentSlugCompoundUniqueInput = {
    contentProjectId: string
    contentSlug: string
  }

  export type TikTokPostCountOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type TikTokPostMaxOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type TikTokPostMinOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type InstagramPostContentProjectIdContentSlugCompoundUniqueInput = {
    contentProjectId: string
    contentSlug: string
  }

  export type InstagramPostCountOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    caption?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type InstagramPostMaxOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    caption?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type InstagramPostMinOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    caption?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type FacebookPostContentProjectIdContentSlugCompoundUniqueInput = {
    contentProjectId: string
    contentSlug: string
  }

  export type FacebookPostCountOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type FacebookPostMaxOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
  }

  export type FacebookPostMinOrderByAggregateInput = {
    gcsVideoUrl?: SortOrder
    postSlug?: SortOrder
    contentProjectId?: SortOrder
    contentSlug?: SortOrder
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

  export type FacebookCredentialsCreateNestedOneWithoutUserInput = {
    create?: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutUserInput
    connect?: FacebookCredentialsWhereUniqueInput
  }

  export type InstagramCredentialsCreateNestedOneWithoutUserInput = {
    create?: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutUserInput
    connect?: InstagramCredentialsWhereUniqueInput
  }

  export type TikTokCredentialsCreateNestedOneWithoutUserInput = {
    create?: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutUserInput
    connect?: TikTokCredentialsWhereUniqueInput
  }

  export type YoutubeCredentialsCreateNestedOneWithoutUserInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutUserInput
    connect?: YoutubeCredentialsWhereUniqueInput
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

  export type FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutUserInput
    connect?: FacebookCredentialsWhereUniqueInput
  }

  export type InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutUserInput
    connect?: InstagramCredentialsWhereUniqueInput
  }

  export type TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutUserInput
    connect?: TikTokCredentialsWhereUniqueInput
  }

  export type YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutUserInput
    connect?: YoutubeCredentialsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
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

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type FacebookCredentialsUpdateOneWithoutUserNestedInput = {
    create?: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutUserInput
    upsert?: FacebookCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookCredentialsWhereUniqueInput
    update?: XOR<FacebookCredentialsUpdateWithoutUserInput, FacebookCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type InstagramCredentialsUpdateOneWithoutUserNestedInput = {
    create?: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutUserInput
    upsert?: InstagramCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramCredentialsWhereUniqueInput
    update?: XOR<InstagramCredentialsUpdateWithoutUserInput, InstagramCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type TikTokCredentialsUpdateOneWithoutUserNestedInput = {
    create?: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutUserInput
    upsert?: TikTokCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokCredentialsWhereUniqueInput
    update?: XOR<TikTokCredentialsUpdateWithoutUserInput, TikTokCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type YoutubeCredentialsUpdateOneWithoutUserNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutUserInput
    upsert?: YoutubeCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutUserInput, YoutubeCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: FacebookCredentialsCreateOrConnectWithoutUserInput
    upsert?: FacebookCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookCredentialsWhereUniqueInput
    update?: XOR<FacebookCredentialsUpdateWithoutUserInput, FacebookCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: InstagramCredentialsCreateOrConnectWithoutUserInput
    upsert?: InstagramCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramCredentialsWhereUniqueInput
    update?: XOR<InstagramCredentialsUpdateWithoutUserInput, InstagramCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: TikTokCredentialsCreateOrConnectWithoutUserInput
    upsert?: TikTokCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokCredentialsWhereUniqueInput
    update?: XOR<TikTokCredentialsUpdateWithoutUserInput, TikTokCredentialsUncheckedUpdateWithoutUserInput>
  }

  export type YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutUserInput
    upsert?: YoutubeCredentialsUpsertWithoutUserInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutUserInput, YoutubeCredentialsUncheckedUpdateWithoutUserInput>
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

  export type UserCreateNestedOneWithoutYoutubeCredentialsInput = {
    create?: XOR<UserCreateWithoutYoutubeCredentialsInput, UserUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutYoutubeCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type ProjectCreateNestedOneWithoutYoutubeCredentialsInput = {
    create?: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutYoutubeCredentialsInput
    connect?: ProjectWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutYoutubeCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutYoutubeCredentialsInput, UserUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutYoutubeCredentialsInput
    upsert?: UserUpsertWithoutYoutubeCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutYoutubeCredentialsInput, UserUncheckedUpdateWithoutYoutubeCredentialsInput>
  }

  export type ProjectUpdateOneRequiredWithoutYoutubeCredentialsNestedInput = {
    create?: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutYoutubeCredentialsInput
    upsert?: ProjectUpsertWithoutYoutubeCredentialsInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutYoutubeCredentialsInput, ProjectUncheckedUpdateWithoutYoutubeCredentialsInput>
  }

  export type UserCreateNestedOneWithoutInstagramCredentialsInput = {
    create?: XOR<UserCreateWithoutInstagramCredentialsInput, UserUncheckedCreateWithoutInstagramCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstagramCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutInstagramCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutInstagramCredentialsInput, UserUncheckedCreateWithoutInstagramCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstagramCredentialsInput
    upsert?: UserUpsertWithoutInstagramCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutInstagramCredentialsInput, UserUncheckedUpdateWithoutInstagramCredentialsInput>
  }

  export type UserCreateNestedOneWithoutTikTokCredentialsInput = {
    create?: XOR<UserCreateWithoutTikTokCredentialsInput, UserUncheckedCreateWithoutTikTokCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTikTokCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTikTokCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutTikTokCredentialsInput, UserUncheckedCreateWithoutTikTokCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTikTokCredentialsInput
    upsert?: UserUpsertWithoutTikTokCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutTikTokCredentialsInput, UserUncheckedUpdateWithoutTikTokCredentialsInput>
  }

  export type UserCreateNestedOneWithoutFacebookCredentialsInput = {
    create?: XOR<UserCreateWithoutFacebookCredentialsInput, UserUncheckedCreateWithoutFacebookCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFacebookCredentialsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFacebookCredentialsNestedInput = {
    create?: XOR<UserCreateWithoutFacebookCredentialsInput, UserUncheckedCreateWithoutFacebookCredentialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFacebookCredentialsInput
    upsert?: UserUpsertWithoutFacebookCredentialsInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutFacebookCredentialsInput, UserUncheckedUpdateWithoutFacebookCredentialsInput>
  }

  export type ContentCreatetagsInput = {
    set: Enumerable<string>
  }

  export type ProjectCreateNestedOneWithoutContentInput = {
    create?: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContentInput
    connect?: ProjectWhereUniqueInput
  }

  export type TikTokPostCreateNestedOneWithoutContentInput = {
    create?: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: TikTokPostCreateOrConnectWithoutContentInput
    connect?: TikTokPostWhereUniqueInput
  }

  export type InstagramPostCreateNestedOneWithoutContentInput = {
    create?: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: InstagramPostCreateOrConnectWithoutContentInput
    connect?: InstagramPostWhereUniqueInput
  }

  export type FacebookPostCreateNestedOneWithoutContentInput = {
    create?: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: FacebookPostCreateOrConnectWithoutContentInput
    connect?: FacebookPostWhereUniqueInput
  }

  export type TikTokPostUncheckedCreateNestedOneWithoutContentInput = {
    create?: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: TikTokPostCreateOrConnectWithoutContentInput
    connect?: TikTokPostWhereUniqueInput
  }

  export type InstagramPostUncheckedCreateNestedOneWithoutContentInput = {
    create?: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: InstagramPostCreateOrConnectWithoutContentInput
    connect?: InstagramPostWhereUniqueInput
  }

  export type FacebookPostUncheckedCreateNestedOneWithoutContentInput = {
    create?: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: FacebookPostCreateOrConnectWithoutContentInput
    connect?: FacebookPostWhereUniqueInput
  }

  export type ContentUpdatetagsInput = {
    set?: Enumerable<string>
    push?: string | Enumerable<string>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ProjectUpdateOneRequiredWithoutContentNestedInput = {
    create?: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
    connectOrCreate?: ProjectCreateOrConnectWithoutContentInput
    upsert?: ProjectUpsertWithoutContentInput
    connect?: ProjectWhereUniqueInput
    update?: XOR<ProjectUpdateWithoutContentInput, ProjectUncheckedUpdateWithoutContentInput>
  }

  export type TikTokPostUpdateOneWithoutContentNestedInput = {
    create?: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: TikTokPostCreateOrConnectWithoutContentInput
    upsert?: TikTokPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokPostWhereUniqueInput
    update?: XOR<TikTokPostUpdateWithoutContentInput, TikTokPostUncheckedUpdateWithoutContentInput>
  }

  export type InstagramPostUpdateOneWithoutContentNestedInput = {
    create?: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: InstagramPostCreateOrConnectWithoutContentInput
    upsert?: InstagramPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramPostWhereUniqueInput
    update?: XOR<InstagramPostUpdateWithoutContentInput, InstagramPostUncheckedUpdateWithoutContentInput>
  }

  export type FacebookPostUpdateOneWithoutContentNestedInput = {
    create?: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: FacebookPostCreateOrConnectWithoutContentInput
    upsert?: FacebookPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookPostWhereUniqueInput
    update?: XOR<FacebookPostUpdateWithoutContentInput, FacebookPostUncheckedUpdateWithoutContentInput>
  }

  export type TikTokPostUncheckedUpdateOneWithoutContentNestedInput = {
    create?: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: TikTokPostCreateOrConnectWithoutContentInput
    upsert?: TikTokPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: TikTokPostWhereUniqueInput
    update?: XOR<TikTokPostUpdateWithoutContentInput, TikTokPostUncheckedUpdateWithoutContentInput>
  }

  export type InstagramPostUncheckedUpdateOneWithoutContentNestedInput = {
    create?: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: InstagramPostCreateOrConnectWithoutContentInput
    upsert?: InstagramPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: InstagramPostWhereUniqueInput
    update?: XOR<InstagramPostUpdateWithoutContentInput, InstagramPostUncheckedUpdateWithoutContentInput>
  }

  export type FacebookPostUncheckedUpdateOneWithoutContentNestedInput = {
    create?: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
    connectOrCreate?: FacebookPostCreateOrConnectWithoutContentInput
    upsert?: FacebookPostUpsertWithoutContentInput
    disconnect?: boolean
    delete?: boolean
    connect?: FacebookPostWhereUniqueInput
    update?: XOR<FacebookPostUpdateWithoutContentInput, FacebookPostUncheckedUpdateWithoutContentInput>
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

  export type YoutubeCredentialsCreateNestedOneWithoutProjectInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    connect?: YoutubeCredentialsWhereUniqueInput
  }

  export type ContentUncheckedCreateNestedManyWithoutProjectInput = {
    create?: XOR<Enumerable<ContentCreateWithoutProjectInput>, Enumerable<ContentUncheckedCreateWithoutProjectInput>>
    connectOrCreate?: Enumerable<ContentCreateOrConnectWithoutProjectInput>
    createMany?: ContentCreateManyProjectInputEnvelope
    connect?: Enumerable<ContentWhereUniqueInput>
  }

  export type YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    connect?: YoutubeCredentialsWhereUniqueInput
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

  export type YoutubeCredentialsUpdateOneWithoutProjectNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    upsert?: YoutubeCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutProjectInput, YoutubeCredentialsUncheckedUpdateWithoutProjectInput>
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

  export type YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput = {
    create?: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
    connectOrCreate?: YoutubeCredentialsCreateOrConnectWithoutProjectInput
    upsert?: YoutubeCredentialsUpsertWithoutProjectInput
    disconnect?: boolean
    delete?: boolean
    connect?: YoutubeCredentialsWhereUniqueInput
    update?: XOR<YoutubeCredentialsUpdateWithoutProjectInput, YoutubeCredentialsUncheckedUpdateWithoutProjectInput>
  }

  export type ContentCreateNestedOneWithoutTikTokPostInput = {
    create?: XOR<ContentCreateWithoutTikTokPostInput, ContentUncheckedCreateWithoutTikTokPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutTikTokPostInput
    connect?: ContentWhereUniqueInput
  }

  export type ContentUpdateOneRequiredWithoutTikTokPostNestedInput = {
    create?: XOR<ContentCreateWithoutTikTokPostInput, ContentUncheckedCreateWithoutTikTokPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutTikTokPostInput
    upsert?: ContentUpsertWithoutTikTokPostInput
    connect?: ContentWhereUniqueInput
    update?: XOR<ContentUpdateWithoutTikTokPostInput, ContentUncheckedUpdateWithoutTikTokPostInput>
  }

  export type ContentCreateNestedOneWithoutInstagramPostInput = {
    create?: XOR<ContentCreateWithoutInstagramPostInput, ContentUncheckedCreateWithoutInstagramPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutInstagramPostInput
    connect?: ContentWhereUniqueInput
  }

  export type ContentUpdateOneRequiredWithoutInstagramPostNestedInput = {
    create?: XOR<ContentCreateWithoutInstagramPostInput, ContentUncheckedCreateWithoutInstagramPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutInstagramPostInput
    upsert?: ContentUpsertWithoutInstagramPostInput
    connect?: ContentWhereUniqueInput
    update?: XOR<ContentUpdateWithoutInstagramPostInput, ContentUncheckedUpdateWithoutInstagramPostInput>
  }

  export type ContentCreateNestedOneWithoutFacebookPostInput = {
    create?: XOR<ContentCreateWithoutFacebookPostInput, ContentUncheckedCreateWithoutFacebookPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutFacebookPostInput
    connect?: ContentWhereUniqueInput
  }

  export type ContentUpdateOneRequiredWithoutFacebookPostNestedInput = {
    create?: XOR<ContentCreateWithoutFacebookPostInput, ContentUncheckedCreateWithoutFacebookPostInput>
    connectOrCreate?: ContentCreateOrConnectWithoutFacebookPostInput
    upsert?: ContentUpsertWithoutFacebookPostInput
    connect?: ContentWhereUniqueInput
    update?: XOR<ContentUpdateWithoutFacebookPostInput, ContentUncheckedUpdateWithoutFacebookPostInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
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
    content?: ContentCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutUserInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutUserInput, ProjectUncheckedCreateWithoutUserInput>
  }

  export type ProjectCreateManyUserInputEnvelope = {
    data: Enumerable<ProjectCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type FacebookCredentialsCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
  }

  export type FacebookCredentialsUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pageId: string
  }

  export type FacebookCredentialsCreateOrConnectWithoutUserInput = {
    where: FacebookCredentialsWhereUniqueInput
    create: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
  }

  export type InstagramCredentialsCreateWithoutUserInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
  }

  export type InstagramCredentialsUncheckedCreateWithoutUserInput = {
    id?: string
    accessToken: string
    createdAt?: Date | string
    updatedAt?: Date | string
    username: string
  }

  export type InstagramCredentialsCreateOrConnectWithoutUserInput = {
    where: InstagramCredentialsWhereUniqueInput
    create: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
  }

  export type TikTokCredentialsCreateWithoutUserInput = {
    id?: string
    clientKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accessToken: string
    openId: string
    username: string
  }

  export type TikTokCredentialsUncheckedCreateWithoutUserInput = {
    id?: string
    clientKey: string
    createdAt?: Date | string
    updatedAt?: Date | string
    accessToken: string
    openId: string
    username: string
  }

  export type TikTokCredentialsCreateOrConnectWithoutUserInput = {
    where: TikTokCredentialsWhereUniqueInput
    create: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
  }

  export type YoutubeCredentialsCreateWithoutUserInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    project: ProjectCreateNestedOneWithoutYoutubeCredentialsInput
  }

  export type YoutubeCredentialsUncheckedCreateWithoutUserInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    projectId: string
  }

  export type YoutubeCredentialsCreateOrConnectWithoutUserInput = {
    where: YoutubeCredentialsWhereUniqueInput
    create: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
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
  }

  export type FacebookCredentialsUpsertWithoutUserInput = {
    update: XOR<FacebookCredentialsUpdateWithoutUserInput, FacebookCredentialsUncheckedUpdateWithoutUserInput>
    create: XOR<FacebookCredentialsCreateWithoutUserInput, FacebookCredentialsUncheckedCreateWithoutUserInput>
  }

  export type FacebookCredentialsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookCredentialsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pageId?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsUpsertWithoutUserInput = {
    update: XOR<InstagramCredentialsUpdateWithoutUserInput, InstagramCredentialsUncheckedUpdateWithoutUserInput>
    create: XOR<InstagramCredentialsCreateWithoutUserInput, InstagramCredentialsUncheckedCreateWithoutUserInput>
  }

  export type InstagramCredentialsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramCredentialsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUpsertWithoutUserInput = {
    update: XOR<TikTokCredentialsUpdateWithoutUserInput, TikTokCredentialsUncheckedUpdateWithoutUserInput>
    create: XOR<TikTokCredentialsCreateWithoutUserInput, TikTokCredentialsUncheckedCreateWithoutUserInput>
  }

  export type TikTokCredentialsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokCredentialsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientKey?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    accessToken?: StringFieldUpdateOperationsInput | string
    openId?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
  }

  export type YoutubeCredentialsUpsertWithoutUserInput = {
    update: XOR<YoutubeCredentialsUpdateWithoutUserInput, YoutubeCredentialsUncheckedUpdateWithoutUserInput>
    create: XOR<YoutubeCredentialsCreateWithoutUserInput, YoutubeCredentialsUncheckedCreateWithoutUserInput>
  }

  export type YoutubeCredentialsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    project?: ProjectUpdateOneRequiredWithoutYoutubeCredentialsNestedInput
  }

  export type YoutubeCredentialsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    projectId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutPasswordInput = {
    id?: string
    email: string
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutPasswordInput = {
    id?: string
    email: string
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
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
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutPasswordInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutYoutubeCredentialsInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutYoutubeCredentialsInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutYoutubeCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutYoutubeCredentialsInput, UserUncheckedCreateWithoutYoutubeCredentialsInput>
  }

  export type ProjectCreateWithoutYoutubeCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    content?: ContentCreateNestedManyWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutYoutubeCredentialsInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    content?: ContentUncheckedCreateNestedManyWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutYoutubeCredentialsInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutYoutubeCredentialsInput, ProjectUncheckedCreateWithoutYoutubeCredentialsInput>
  }

  export type UserUpsertWithoutYoutubeCredentialsInput = {
    update: XOR<UserUpdateWithoutYoutubeCredentialsInput, UserUncheckedUpdateWithoutYoutubeCredentialsInput>
    create: XOR<UserCreateWithoutYoutubeCredentialsInput, UserUncheckedCreateWithoutYoutubeCredentialsInput>
  }

  export type UserUpdateWithoutYoutubeCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutYoutubeCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    content?: ContentUpdateManyWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutYoutubeCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
  }

  export type UserCreateWithoutInstagramCredentialsInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutInstagramCredentialsInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutInstagramCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInstagramCredentialsInput, UserUncheckedCreateWithoutInstagramCredentialsInput>
  }

  export type UserUpsertWithoutInstagramCredentialsInput = {
    update: XOR<UserUpdateWithoutInstagramCredentialsInput, UserUncheckedUpdateWithoutInstagramCredentialsInput>
    create: XOR<UserCreateWithoutInstagramCredentialsInput, UserUncheckedCreateWithoutInstagramCredentialsInput>
  }

  export type UserUpdateWithoutInstagramCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutInstagramCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutTikTokCredentialsInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutTikTokCredentialsInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutTikTokCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTikTokCredentialsInput, UserUncheckedCreateWithoutTikTokCredentialsInput>
  }

  export type UserUpsertWithoutTikTokCredentialsInput = {
    update: XOR<UserUpdateWithoutTikTokCredentialsInput, UserUncheckedUpdateWithoutTikTokCredentialsInput>
    create: XOR<UserCreateWithoutTikTokCredentialsInput, UserUncheckedCreateWithoutTikTokCredentialsInput>
  }

  export type UserUpdateWithoutTikTokCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutTikTokCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutFacebookCredentialsInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    projects?: ProjectCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutFacebookCredentialsInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    projects?: ProjectUncheckedCreateNestedManyWithoutUserInput
    currentProjectId?: string | null
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutFacebookCredentialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFacebookCredentialsInput, UserUncheckedCreateWithoutFacebookCredentialsInput>
  }

  export type UserUpsertWithoutFacebookCredentialsInput = {
    update: XOR<UserUpdateWithoutFacebookCredentialsInput, UserUncheckedUpdateWithoutFacebookCredentialsInput>
    create: XOR<UserCreateWithoutFacebookCredentialsInput, UserUncheckedCreateWithoutFacebookCredentialsInput>
  }

  export type UserUpdateWithoutFacebookCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    projects?: ProjectUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutFacebookCredentialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    projects?: ProjectUncheckedUpdateManyWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProjectCreateWithoutContentInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProjectsInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutProjectInput
  }

  export type ProjectUncheckedCreateWithoutContentInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutProjectInput
  }

  export type ProjectCreateOrConnectWithoutContentInput = {
    where: ProjectWhereUniqueInput
    create: XOR<ProjectCreateWithoutContentInput, ProjectUncheckedCreateWithoutContentInput>
  }

  export type TikTokPostCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type TikTokPostUncheckedCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type TikTokPostCreateOrConnectWithoutContentInput = {
    where: TikTokPostWhereUniqueInput
    create: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
  }

  export type InstagramPostCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
  }

  export type InstagramPostUncheckedCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
    caption: string
  }

  export type InstagramPostCreateOrConnectWithoutContentInput = {
    where: InstagramPostWhereUniqueInput
    create: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
  }

  export type FacebookPostCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type FacebookPostUncheckedCreateWithoutContentInput = {
    gcsVideoUrl: string
    postSlug: string
  }

  export type FacebookPostCreateOrConnectWithoutContentInput = {
    where: FacebookPostWhereUniqueInput
    create: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
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
    user?: UserUpdateOneRequiredWithoutProjectsNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutContentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type TikTokPostUpsertWithoutContentInput = {
    update: XOR<TikTokPostUpdateWithoutContentInput, TikTokPostUncheckedUpdateWithoutContentInput>
    create: XOR<TikTokPostCreateWithoutContentInput, TikTokPostUncheckedCreateWithoutContentInput>
  }

  export type TikTokPostUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type TikTokPostUncheckedUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramPostUpsertWithoutContentInput = {
    update: XOR<InstagramPostUpdateWithoutContentInput, InstagramPostUncheckedUpdateWithoutContentInput>
    create: XOR<InstagramPostCreateWithoutContentInput, InstagramPostUncheckedCreateWithoutContentInput>
  }

  export type InstagramPostUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
  }

  export type InstagramPostUncheckedUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
    caption?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookPostUpsertWithoutContentInput = {
    update: XOR<FacebookPostUpdateWithoutContentInput, FacebookPostUncheckedUpdateWithoutContentInput>
    create: XOR<FacebookPostCreateWithoutContentInput, FacebookPostUncheckedCreateWithoutContentInput>
  }

  export type FacebookPostUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type FacebookPostUncheckedUpdateWithoutContentInput = {
    gcsVideoUrl?: StringFieldUpdateOperationsInput | string
    postSlug?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateWithoutProjectsInput = {
    id?: string
    email: string
    password?: PasswordCreateNestedOneWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutProjectsInput = {
    id?: string
    email: string
    password?: PasswordUncheckedCreateNestedOneWithoutUserInput
    currentProjectId?: string | null
    facebookCredentials?: FacebookCredentialsUncheckedCreateNestedOneWithoutUserInput
    instagramCredentials?: InstagramCredentialsUncheckedCreateNestedOneWithoutUserInput
    tikTokCredentials?: TikTokCredentialsUncheckedCreateNestedOneWithoutUserInput
    youtubeCredentials?: YoutubeCredentialsUncheckedCreateNestedOneWithoutUserInput
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutProjectsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type ContentCreateWithoutProjectInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    tikTokPost?: TikTokPostCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutProjectInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    tikTokPost?: TikTokPostUncheckedCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostUncheckedCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostUncheckedCreateNestedOneWithoutContentInput
  }

  export type ContentCreateOrConnectWithoutProjectInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutProjectInput, ContentUncheckedCreateWithoutProjectInput>
  }

  export type ContentCreateManyProjectInputEnvelope = {
    data: Enumerable<ContentCreateManyProjectInput>
    skipDuplicates?: boolean
  }

  export type YoutubeCredentialsCreateWithoutProjectInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    user: UserCreateNestedOneWithoutYoutubeCredentialsInput
  }

  export type YoutubeCredentialsUncheckedCreateWithoutProjectInput = {
    id?: string
    accessToken?: string | null
    refreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    channelId?: string | null
    userId: string
  }

  export type YoutubeCredentialsCreateOrConnectWithoutProjectInput = {
    where: YoutubeCredentialsWhereUniqueInput
    create: XOR<YoutubeCredentialsCreateWithoutProjectInput, YoutubeCredentialsUncheckedCreateWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectsInput = {
    update: XOR<UserUpdateWithoutProjectsInput, UserUncheckedUpdateWithoutProjectsInput>
    create: XOR<UserCreateWithoutProjectsInput, UserUncheckedCreateWithoutProjectsInput>
  }

  export type UserUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUpdateOneWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: PasswordUncheckedUpdateOneWithoutUserNestedInput
    currentProjectId?: NullableStringFieldUpdateOperationsInput | string | null
    facebookCredentials?: FacebookCredentialsUncheckedUpdateOneWithoutUserNestedInput
    instagramCredentials?: InstagramCredentialsUncheckedUpdateOneWithoutUserNestedInput
    tikTokCredentials?: TikTokCredentialsUncheckedUpdateOneWithoutUserNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutUserNestedInput
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    markdown?: StringNullableFilter | string | null
    thumbnail?: StringNullableFilter | string | null
    video?: StringNullableFilter | string | null
    tags?: StringNullableListFilter
    published?: BoolNullableFilter | boolean | null
    createdAt?: DateTimeNullableFilter | Date | string | null
    updatedAt?: DateTimeNullableFilter | Date | string | null
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
    user?: UserUpdateOneRequiredWithoutYoutubeCredentialsNestedInput
  }

  export type YoutubeCredentialsUncheckedUpdateWithoutProjectInput = {
    id?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    channelId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ContentCreateWithoutTikTokPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutTikTokPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    instagramPost?: InstagramPostUncheckedCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostUncheckedCreateNestedOneWithoutContentInput
  }

  export type ContentCreateOrConnectWithoutTikTokPostInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutTikTokPostInput, ContentUncheckedCreateWithoutTikTokPostInput>
  }

  export type ContentUpsertWithoutTikTokPostInput = {
    update: XOR<ContentUpdateWithoutTikTokPostInput, ContentUncheckedUpdateWithoutTikTokPostInput>
    create: XOR<ContentCreateWithoutTikTokPostInput, ContentUncheckedCreateWithoutTikTokPostInput>
  }

  export type ContentUpdateWithoutTikTokPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutContentNestedInput
    instagramPost?: InstagramPostUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutTikTokPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    instagramPost?: InstagramPostUncheckedUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUncheckedUpdateOneWithoutContentNestedInput
  }

  export type ContentCreateWithoutInstagramPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutContentInput
    tikTokPost?: TikTokPostCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutInstagramPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    tikTokPost?: TikTokPostUncheckedCreateNestedOneWithoutContentInput
    facebookPost?: FacebookPostUncheckedCreateNestedOneWithoutContentInput
  }

  export type ContentCreateOrConnectWithoutInstagramPostInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutInstagramPostInput, ContentUncheckedCreateWithoutInstagramPostInput>
  }

  export type ContentUpsertWithoutInstagramPostInput = {
    update: XOR<ContentUpdateWithoutInstagramPostInput, ContentUncheckedUpdateWithoutInstagramPostInput>
    create: XOR<ContentCreateWithoutInstagramPostInput, ContentUncheckedCreateWithoutInstagramPostInput>
  }

  export type ContentUpdateWithoutInstagramPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutContentNestedInput
    tikTokPost?: TikTokPostUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutInstagramPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    tikTokPost?: TikTokPostUncheckedUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUncheckedUpdateOneWithoutContentNestedInput
  }

  export type ContentCreateWithoutFacebookPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    project: ProjectCreateNestedOneWithoutContentInput
    tikTokPost?: TikTokPostCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostCreateNestedOneWithoutContentInput
  }

  export type ContentUncheckedCreateWithoutFacebookPostInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
    projectId: string
    tikTokPost?: TikTokPostUncheckedCreateNestedOneWithoutContentInput
    instagramPost?: InstagramPostUncheckedCreateNestedOneWithoutContentInput
  }

  export type ContentCreateOrConnectWithoutFacebookPostInput = {
    where: ContentWhereUniqueInput
    create: XOR<ContentCreateWithoutFacebookPostInput, ContentUncheckedCreateWithoutFacebookPostInput>
  }

  export type ContentUpsertWithoutFacebookPostInput = {
    update: XOR<ContentUpdateWithoutFacebookPostInput, ContentUncheckedUpdateWithoutFacebookPostInput>
    create: XOR<ContentCreateWithoutFacebookPostInput, ContentUncheckedCreateWithoutFacebookPostInput>
  }

  export type ContentUpdateWithoutFacebookPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project?: ProjectUpdateOneRequiredWithoutContentNestedInput
    tikTokPost?: TikTokPostUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutFacebookPostInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    projectId?: StringFieldUpdateOperationsInput | string
    tikTokPost?: TikTokPostUncheckedUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUncheckedUpdateOneWithoutContentNestedInput
  }

  export type ProjectCreateManyUserInput = {
    id?: string
    title: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProjectUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: ContentUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    content?: ContentUncheckedUpdateManyWithoutProjectNestedInput
    youtubeCredentials?: YoutubeCredentialsUncheckedUpdateOneWithoutProjectNestedInput
  }

  export type ProjectUncheckedUpdateManyWithoutProjectsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContentCreateManyProjectInput = {
    slug: string
    title: string
    description?: string | null
    markdown?: string | null
    thumbnail?: string | null
    video?: string | null
    tags?: ContentCreatetagsInput | Enumerable<string>
    published?: boolean | null
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type ContentUpdateWithoutProjectInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokPost?: TikTokPostUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateWithoutProjectInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    tikTokPost?: TikTokPostUncheckedUpdateOneWithoutContentNestedInput
    instagramPost?: InstagramPostUncheckedUpdateOneWithoutContentNestedInput
    facebookPost?: FacebookPostUncheckedUpdateOneWithoutContentNestedInput
  }

  export type ContentUncheckedUpdateManyWithoutContentInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    markdown?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    video?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: ContentUpdatetagsInput | Enumerable<string>
    published?: NullableBoolFieldUpdateOperationsInput | boolean | null
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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