
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Verification
 * 
 */
export type Verification = $Result.DefaultSelection<Prisma.$VerificationPayload>
/**
 * Model Prayer
 * 
 */
export type Prayer = $Result.DefaultSelection<Prisma.$PrayerPayload>
/**
 * Model Fasting
 * 
 */
export type Fasting = $Result.DefaultSelection<Prisma.$FastingPayload>
/**
 * Model FriendGroup
 * 
 */
export type FriendGroup = $Result.DefaultSelection<Prisma.$FriendGroupPayload>
/**
 * Model FriendGroupMember
 * 
 */
export type FriendGroupMember = $Result.DefaultSelection<Prisma.$FriendGroupMemberPayload>
/**
 * Model Friend
 * 
 */
export type Friend = $Result.DefaultSelection<Prisma.$FriendPayload>
/**
 * Model Inquiry
 * 
 */
export type Inquiry = $Result.DefaultSelection<Prisma.$InquiryPayload>
/**
 * Model InquiryMessage
 * 
 */
export type InquiryMessage = $Result.DefaultSelection<Prisma.$InquiryMessagePayload>
/**
 * Model Onboarding
 * 
 */
export type Onboarding = $Result.DefaultSelection<Prisma.$OnboardingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const InquiryStatus: {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
};

export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus]


export const InquirySenderRole: {
  USER: 'USER',
  OWNER: 'OWNER'
};

export type InquirySenderRole = (typeof InquirySenderRole)[keyof typeof InquirySenderRole]


export const FriendStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type FriendStatus = (typeof FriendStatus)[keyof typeof FriendStatus]

}

export type InquiryStatus = $Enums.InquiryStatus

export const InquiryStatus: typeof $Enums.InquiryStatus

export type InquirySenderRole = $Enums.InquirySenderRole

export const InquirySenderRole: typeof $Enums.InquirySenderRole

export type FriendStatus = $Enums.FriendStatus

export const FriendStatus: typeof $Enums.FriendStatus

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
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

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
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **Verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.VerificationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.prayer`: Exposes CRUD operations for the **Prayer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prayers
    * const prayers = await prisma.prayer.findMany()
    * ```
    */
  get prayer(): Prisma.PrayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fasting`: Exposes CRUD operations for the **Fasting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Fastings
    * const fastings = await prisma.fasting.findMany()
    * ```
    */
  get fasting(): Prisma.FastingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendGroup`: Exposes CRUD operations for the **FriendGroup** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendGroups
    * const friendGroups = await prisma.friendGroup.findMany()
    * ```
    */
  get friendGroup(): Prisma.FriendGroupDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friendGroupMember`: Exposes CRUD operations for the **FriendGroupMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FriendGroupMembers
    * const friendGroupMembers = await prisma.friendGroupMember.findMany()
    * ```
    */
  get friendGroupMember(): Prisma.FriendGroupMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.friend`: Exposes CRUD operations for the **Friend** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Friends
    * const friends = await prisma.friend.findMany()
    * ```
    */
  get friend(): Prisma.FriendDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquiry`: Exposes CRUD operations for the **Inquiry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inquiries
    * const inquiries = await prisma.inquiry.findMany()
    * ```
    */
  get inquiry(): Prisma.InquiryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inquiryMessage`: Exposes CRUD operations for the **InquiryMessage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InquiryMessages
    * const inquiryMessages = await prisma.inquiryMessage.findMany()
    * ```
    */
  get inquiryMessage(): Prisma.InquiryMessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.onboarding`: Exposes CRUD operations for the **Onboarding** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Onboardings
    * const onboardings = await prisma.onboarding.findMany()
    * ```
    */
  get onboarding(): Prisma.OnboardingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Session: 'Session',
    Account: 'Account',
    Verification: 'Verification',
    Prayer: 'Prayer',
    Fasting: 'Fasting',
    FriendGroup: 'FriendGroup',
    FriendGroupMember: 'FriendGroupMember',
    Friend: 'Friend',
    Inquiry: 'Inquiry',
    InquiryMessage: 'InquiryMessage',
    Onboarding: 'Onboarding'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "session" | "account" | "verification" | "prayer" | "fasting" | "friendGroup" | "friendGroupMember" | "friend" | "inquiry" | "inquiryMessage" | "onboarding"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Verification: {
        payload: Prisma.$VerificationPayload<ExtArgs>
        fields: Prisma.VerificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VerificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VerificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findFirst: {
            args: Prisma.VerificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VerificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          findMany: {
            args: Prisma.VerificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          create: {
            args: Prisma.VerificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          createMany: {
            args: Prisma.VerificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VerificationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          delete: {
            args: Prisma.VerificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          update: {
            args: Prisma.VerificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          deleteMany: {
            args: Prisma.VerificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VerificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VerificationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>[]
          }
          upsert: {
            args: Prisma.VerificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VerificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.VerificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.VerificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
      Prayer: {
        payload: Prisma.$PrayerPayload<ExtArgs>
        fields: Prisma.PrayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          findFirst: {
            args: Prisma.PrayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          findMany: {
            args: Prisma.PrayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>[]
          }
          create: {
            args: Prisma.PrayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          createMany: {
            args: Prisma.PrayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>[]
          }
          delete: {
            args: Prisma.PrayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          update: {
            args: Prisma.PrayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          deleteMany: {
            args: Prisma.PrayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PrayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>[]
          }
          upsert: {
            args: Prisma.PrayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrayerPayload>
          }
          aggregate: {
            args: Prisma.PrayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrayer>
          }
          groupBy: {
            args: Prisma.PrayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrayerCountArgs<ExtArgs>
            result: $Utils.Optional<PrayerCountAggregateOutputType> | number
          }
        }
      }
      Fasting: {
        payload: Prisma.$FastingPayload<ExtArgs>
        fields: Prisma.FastingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FastingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FastingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          findFirst: {
            args: Prisma.FastingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FastingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          findMany: {
            args: Prisma.FastingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>[]
          }
          create: {
            args: Prisma.FastingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          createMany: {
            args: Prisma.FastingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FastingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>[]
          }
          delete: {
            args: Prisma.FastingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          update: {
            args: Prisma.FastingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          deleteMany: {
            args: Prisma.FastingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FastingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FastingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>[]
          }
          upsert: {
            args: Prisma.FastingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FastingPayload>
          }
          aggregate: {
            args: Prisma.FastingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFasting>
          }
          groupBy: {
            args: Prisma.FastingGroupByArgs<ExtArgs>
            result: $Utils.Optional<FastingGroupByOutputType>[]
          }
          count: {
            args: Prisma.FastingCountArgs<ExtArgs>
            result: $Utils.Optional<FastingCountAggregateOutputType> | number
          }
        }
      }
      FriendGroup: {
        payload: Prisma.$FriendGroupPayload<ExtArgs>
        fields: Prisma.FriendGroupFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendGroupFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendGroupFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          findFirst: {
            args: Prisma.FriendGroupFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendGroupFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          findMany: {
            args: Prisma.FriendGroupFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>[]
          }
          create: {
            args: Prisma.FriendGroupCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          createMany: {
            args: Prisma.FriendGroupCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendGroupCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>[]
          }
          delete: {
            args: Prisma.FriendGroupDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          update: {
            args: Prisma.FriendGroupUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          deleteMany: {
            args: Prisma.FriendGroupDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendGroupUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendGroupUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>[]
          }
          upsert: {
            args: Prisma.FriendGroupUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupPayload>
          }
          aggregate: {
            args: Prisma.FriendGroupAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendGroup>
          }
          groupBy: {
            args: Prisma.FriendGroupGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendGroupCountArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupCountAggregateOutputType> | number
          }
        }
      }
      FriendGroupMember: {
        payload: Prisma.$FriendGroupMemberPayload<ExtArgs>
        fields: Prisma.FriendGroupMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendGroupMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendGroupMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          findFirst: {
            args: Prisma.FriendGroupMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendGroupMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          findMany: {
            args: Prisma.FriendGroupMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>[]
          }
          create: {
            args: Prisma.FriendGroupMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          createMany: {
            args: Prisma.FriendGroupMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendGroupMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>[]
          }
          delete: {
            args: Prisma.FriendGroupMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          update: {
            args: Prisma.FriendGroupMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          deleteMany: {
            args: Prisma.FriendGroupMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendGroupMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendGroupMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>[]
          }
          upsert: {
            args: Prisma.FriendGroupMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendGroupMemberPayload>
          }
          aggregate: {
            args: Prisma.FriendGroupMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriendGroupMember>
          }
          groupBy: {
            args: Prisma.FriendGroupMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendGroupMemberCountArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupMemberCountAggregateOutputType> | number
          }
        }
      }
      Friend: {
        payload: Prisma.$FriendPayload<ExtArgs>
        fields: Prisma.FriendFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FriendFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FriendFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findFirst: {
            args: Prisma.FriendFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FriendFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          findMany: {
            args: Prisma.FriendFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          create: {
            args: Prisma.FriendCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          createMany: {
            args: Prisma.FriendCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FriendCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          delete: {
            args: Prisma.FriendDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          update: {
            args: Prisma.FriendUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          deleteMany: {
            args: Prisma.FriendDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FriendUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FriendUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>[]
          }
          upsert: {
            args: Prisma.FriendUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FriendPayload>
          }
          aggregate: {
            args: Prisma.FriendAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFriend>
          }
          groupBy: {
            args: Prisma.FriendGroupByArgs<ExtArgs>
            result: $Utils.Optional<FriendGroupByOutputType>[]
          }
          count: {
            args: Prisma.FriendCountArgs<ExtArgs>
            result: $Utils.Optional<FriendCountAggregateOutputType> | number
          }
        }
      }
      Inquiry: {
        payload: Prisma.$InquiryPayload<ExtArgs>
        fields: Prisma.InquiryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findFirst: {
            args: Prisma.InquiryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          findMany: {
            args: Prisma.InquiryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          create: {
            args: Prisma.InquiryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          createMany: {
            args: Prisma.InquiryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InquiryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          delete: {
            args: Prisma.InquiryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          update: {
            args: Prisma.InquiryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          deleteMany: {
            args: Prisma.InquiryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InquiryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>[]
          }
          upsert: {
            args: Prisma.InquiryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryPayload>
          }
          aggregate: {
            args: Prisma.InquiryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquiry>
          }
          groupBy: {
            args: Prisma.InquiryGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquiryGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryCountArgs<ExtArgs>
            result: $Utils.Optional<InquiryCountAggregateOutputType> | number
          }
        }
      }
      InquiryMessage: {
        payload: Prisma.$InquiryMessagePayload<ExtArgs>
        fields: Prisma.InquiryMessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InquiryMessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InquiryMessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          findFirst: {
            args: Prisma.InquiryMessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InquiryMessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          findMany: {
            args: Prisma.InquiryMessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>[]
          }
          create: {
            args: Prisma.InquiryMessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          createMany: {
            args: Prisma.InquiryMessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InquiryMessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>[]
          }
          delete: {
            args: Prisma.InquiryMessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          update: {
            args: Prisma.InquiryMessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          deleteMany: {
            args: Prisma.InquiryMessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InquiryMessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InquiryMessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>[]
          }
          upsert: {
            args: Prisma.InquiryMessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InquiryMessagePayload>
          }
          aggregate: {
            args: Prisma.InquiryMessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInquiryMessage>
          }
          groupBy: {
            args: Prisma.InquiryMessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<InquiryMessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.InquiryMessageCountArgs<ExtArgs>
            result: $Utils.Optional<InquiryMessageCountAggregateOutputType> | number
          }
        }
      }
      Onboarding: {
        payload: Prisma.$OnboardingPayload<ExtArgs>
        fields: Prisma.OnboardingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OnboardingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OnboardingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          findFirst: {
            args: Prisma.OnboardingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OnboardingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          findMany: {
            args: Prisma.OnboardingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>[]
          }
          create: {
            args: Prisma.OnboardingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          createMany: {
            args: Prisma.OnboardingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OnboardingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>[]
          }
          delete: {
            args: Prisma.OnboardingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          update: {
            args: Prisma.OnboardingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          deleteMany: {
            args: Prisma.OnboardingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OnboardingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OnboardingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>[]
          }
          upsert: {
            args: Prisma.OnboardingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OnboardingPayload>
          }
          aggregate: {
            args: Prisma.OnboardingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOnboarding>
          }
          groupBy: {
            args: Prisma.OnboardingGroupByArgs<ExtArgs>
            result: $Utils.Optional<OnboardingGroupByOutputType>[]
          }
          count: {
            args: Prisma.OnboardingCountArgs<ExtArgs>
            result: $Utils.Optional<OnboardingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    session?: SessionOmit
    account?: AccountOmit
    verification?: VerificationOmit
    prayer?: PrayerOmit
    fasting?: FastingOmit
    friendGroup?: FriendGroupOmit
    friendGroupMember?: FriendGroupMemberOmit
    friend?: FriendOmit
    inquiry?: InquiryOmit
    inquiryMessage?: InquiryMessageOmit
    onboarding?: OnboardingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

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
    prayers: number
    inquiries: number
    inquiryMessages: number
    fasting: number
    sentRequests: number
    receivedRequests: number
    friendGroups: number
    groupMemberships: number
    sessions: number
    accounts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prayers?: boolean | UserCountOutputTypeCountPrayersArgs
    inquiries?: boolean | UserCountOutputTypeCountInquiriesArgs
    inquiryMessages?: boolean | UserCountOutputTypeCountInquiryMessagesArgs
    fasting?: boolean | UserCountOutputTypeCountFastingArgs
    sentRequests?: boolean | UserCountOutputTypeCountSentRequestsArgs
    receivedRequests?: boolean | UserCountOutputTypeCountReceivedRequestsArgs
    friendGroups?: boolean | UserCountOutputTypeCountFriendGroupsArgs
    groupMemberships?: boolean | UserCountOutputTypeCountGroupMembershipsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
    accounts?: boolean | UserCountOutputTypeCountAccountsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrayerWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInquiryMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryMessageWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFastingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FastingWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReceivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFriendGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendGroupWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGroupMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendGroupMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAccountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }


  /**
   * Count Type FriendGroupCountOutputType
   */

  export type FriendGroupCountOutputType = {
    members: number
  }

  export type FriendGroupCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | FriendGroupCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * FriendGroupCountOutputType without action
   */
  export type FriendGroupCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupCountOutputType
     */
    select?: FriendGroupCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FriendGroupCountOutputType without action
   */
  export type FriendGroupCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendGroupMemberWhereInput
  }


  /**
   * Count Type InquiryCountOutputType
   */

  export type InquiryCountOutputType = {
    messages: number
  }

  export type InquiryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | InquiryCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryCountOutputType
     */
    select?: InquiryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InquiryCountOutputType without action
   */
  export type InquiryCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryMessageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    totalPoints: number | null
  }

  export type UserSumAggregateOutputType = {
    totalPoints: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    locale: string | null
    pushToken: string | null
    totalPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    locale: string | null
    pushToken: string | null
    totalPoints: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    locale: number
    pushToken: number
    totalPoints: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    totalPoints?: true
  }

  export type UserSumAggregateInputType = {
    totalPoints?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    locale?: true
    pushToken?: true
    totalPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    locale?: true
    pushToken?: true
    totalPoints?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    locale?: true
    pushToken?: true
    totalPoints?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    locale: string | null
    pushToken: string | null
    totalPoints: number | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    locale?: boolean
    pushToken?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    prayers?: boolean | User$prayersArgs<ExtArgs>
    inquiries?: boolean | User$inquiriesArgs<ExtArgs>
    inquiryMessages?: boolean | User$inquiryMessagesArgs<ExtArgs>
    fasting?: boolean | User$fastingArgs<ExtArgs>
    sentRequests?: boolean | User$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | User$receivedRequestsArgs<ExtArgs>
    friendGroups?: boolean | User$friendGroupsArgs<ExtArgs>
    groupMemberships?: boolean | User$groupMembershipsArgs<ExtArgs>
    onboarding?: boolean | User$onboardingArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    locale?: boolean
    pushToken?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    locale?: boolean
    pushToken?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    locale?: boolean
    pushToken?: boolean
    totalPoints?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "locale" | "pushToken" | "totalPoints" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prayers?: boolean | User$prayersArgs<ExtArgs>
    inquiries?: boolean | User$inquiriesArgs<ExtArgs>
    inquiryMessages?: boolean | User$inquiryMessagesArgs<ExtArgs>
    fasting?: boolean | User$fastingArgs<ExtArgs>
    sentRequests?: boolean | User$sentRequestsArgs<ExtArgs>
    receivedRequests?: boolean | User$receivedRequestsArgs<ExtArgs>
    friendGroups?: boolean | User$friendGroupsArgs<ExtArgs>
    groupMemberships?: boolean | User$groupMembershipsArgs<ExtArgs>
    onboarding?: boolean | User$onboardingArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    accounts?: boolean | User$accountsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      prayers: Prisma.$PrayerPayload<ExtArgs>[]
      inquiries: Prisma.$InquiryPayload<ExtArgs>[]
      inquiryMessages: Prisma.$InquiryMessagePayload<ExtArgs>[]
      fasting: Prisma.$FastingPayload<ExtArgs>[]
      sentRequests: Prisma.$FriendPayload<ExtArgs>[]
      receivedRequests: Prisma.$FriendPayload<ExtArgs>[]
      friendGroups: Prisma.$FriendGroupPayload<ExtArgs>[]
      groupMemberships: Prisma.$FriendGroupMemberPayload<ExtArgs>[]
      onboarding: Prisma.$OnboardingPayload<ExtArgs> | null
      sessions: Prisma.$SessionPayload<ExtArgs>[]
      accounts: Prisma.$AccountPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      locale: string | null
      pushToken: string | null
      totalPoints: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
      T extends $Utils.Record<'select', any>
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
      ByFields extends MaybeTupleToUnion<T['by']>,
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
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prayers<T extends User$prayersArgs<ExtArgs> = {}>(args?: Subset<T, User$prayersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inquiries<T extends User$inquiriesArgs<ExtArgs> = {}>(args?: Subset<T, User$inquiriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inquiryMessages<T extends User$inquiryMessagesArgs<ExtArgs> = {}>(args?: Subset<T, User$inquiryMessagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fasting<T extends User$fastingArgs<ExtArgs> = {}>(args?: Subset<T, User$fastingArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sentRequests<T extends User$sentRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$sentRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    receivedRequests<T extends User$receivedRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$receivedRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    friendGroups<T extends User$friendGroupsArgs<ExtArgs> = {}>(args?: Subset<T, User$friendGroupsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    groupMemberships<T extends User$groupMembershipsArgs<ExtArgs> = {}>(args?: Subset<T, User$groupMembershipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    onboarding<T extends User$onboardingArgs<ExtArgs> = {}>(args?: Subset<T, User$onboardingArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    accounts<T extends User$accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly emailVerified: FieldRef<"User", 'Boolean'>
    readonly image: FieldRef<"User", 'String'>
    readonly locale: FieldRef<"User", 'String'>
    readonly pushToken: FieldRef<"User", 'String'>
    readonly totalPoints: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.prayers
   */
  export type User$prayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    where?: PrayerWhereInput
    orderBy?: PrayerOrderByWithRelationInput | PrayerOrderByWithRelationInput[]
    cursor?: PrayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrayerScalarFieldEnum | PrayerScalarFieldEnum[]
  }

  /**
   * User.inquiries
   */
  export type User$inquiriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    cursor?: InquiryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * User.inquiryMessages
   */
  export type User$inquiryMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    where?: InquiryMessageWhereInput
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    cursor?: InquiryMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryMessageScalarFieldEnum | InquiryMessageScalarFieldEnum[]
  }

  /**
   * User.fasting
   */
  export type User$fastingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    where?: FastingWhereInput
    orderBy?: FastingOrderByWithRelationInput | FastingOrderByWithRelationInput[]
    cursor?: FastingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FastingScalarFieldEnum | FastingScalarFieldEnum[]
  }

  /**
   * User.sentRequests
   */
  export type User$sentRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.receivedRequests
   */
  export type User$receivedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    cursor?: FriendWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * User.friendGroups
   */
  export type User$friendGroupsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    where?: FriendGroupWhereInput
    orderBy?: FriendGroupOrderByWithRelationInput | FriendGroupOrderByWithRelationInput[]
    cursor?: FriendGroupWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendGroupScalarFieldEnum | FriendGroupScalarFieldEnum[]
  }

  /**
   * User.groupMemberships
   */
  export type User$groupMembershipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    where?: FriendGroupMemberWhereInput
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    cursor?: FriendGroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendGroupMemberScalarFieldEnum | FriendGroupMemberScalarFieldEnum[]
  }

  /**
   * User.onboarding
   */
  export type User$onboardingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    where?: OnboardingWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User.accounts
   */
  export type User$accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions and returns the data updated in the database.
     * @param {SessionUpdateManyAndReturnArgs} args - Arguments to update many Sessions.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SessionUpdateManyAndReturnArgs>(args: SelectSubset<T, SessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
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
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly token: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session updateManyAndReturn
   */
  export type SessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
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
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly accountId: FieldRef<"Account", 'String'>
    readonly providerId: FieldRef<"Account", 'String'>
    readonly userId: FieldRef<"Account", 'String'>
    readonly accessToken: FieldRef<"Account", 'String'>
    readonly refreshToken: FieldRef<"Account", 'String'>
    readonly idToken: FieldRef<"Account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"Account", 'DateTime'>
    readonly scope: FieldRef<"Account", 'String'>
    readonly password: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verification to aggregate.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type VerificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VerificationWhereInput
    orderBy?: VerificationOrderByWithAggregationInput | VerificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: VerificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date
    updatedAt: Date
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends VerificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type VerificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>

  export type VerificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VerificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $VerificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type VerificationGetPayload<S extends boolean | null | undefined | VerificationDefaultArgs> = $Result.GetResult<Prisma.$VerificationPayload, S>

  type VerificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VerificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface VerificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Verification'], meta: { name: 'Verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {VerificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VerificationFindUniqueArgs>(args: SelectSubset<T, VerificationFindUniqueArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VerificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VerificationFindUniqueOrThrowArgs>(args: SelectSubset<T, VerificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VerificationFindFirstArgs>(args?: SelectSubset<T, VerificationFindFirstArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VerificationFindFirstOrThrowArgs>(args?: SelectSubset<T, VerificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VerificationFindManyArgs>(args?: SelectSubset<T, VerificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {VerificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends VerificationCreateArgs>(args: SelectSubset<T, VerificationCreateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {VerificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VerificationCreateManyArgs>(args?: SelectSubset<T, VerificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Verifications and returns the data saved in the database.
     * @param {VerificationCreateManyAndReturnArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VerificationCreateManyAndReturnArgs>(args?: SelectSubset<T, VerificationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Verification.
     * @param {VerificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends VerificationDeleteArgs>(args: SelectSubset<T, VerificationDeleteArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {VerificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VerificationUpdateArgs>(args: SelectSubset<T, VerificationUpdateArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {VerificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VerificationDeleteManyArgs>(args?: SelectSubset<T, VerificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VerificationUpdateManyArgs>(args: SelectSubset<T, VerificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications and returns the data updated in the database.
     * @param {VerificationUpdateManyAndReturnArgs} args - Arguments to update many Verifications.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Verifications and only return the `id`
     * const verificationWithIdOnly = await prisma.verification.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VerificationUpdateManyAndReturnArgs>(args: SelectSubset<T, VerificationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Verification.
     * @param {VerificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends VerificationUpsertArgs>(args: SelectSubset<T, VerificationUpsertArgs<ExtArgs>>): Prisma__VerificationClient<$Result.GetResult<Prisma.$VerificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends VerificationCountArgs>(
      args?: Subset<T, VerificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationGroupByArgs} args - Group by arguments.
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
      T extends VerificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VerificationGroupByArgs['orderBy'] }
        : { orderBy?: VerificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, VerificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Verification model
   */
  readonly fields: VerificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VerificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Verification model
   */
  interface VerificationFieldRefs {
    readonly id: FieldRef<"Verification", 'String'>
    readonly identifier: FieldRef<"Verification", 'String'>
    readonly value: FieldRef<"Verification", 'String'>
    readonly expiresAt: FieldRef<"Verification", 'DateTime'>
    readonly createdAt: FieldRef<"Verification", 'DateTime'>
    readonly updatedAt: FieldRef<"Verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Verification findUnique
   */
  export type VerificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findUniqueOrThrow
   */
  export type VerificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification findFirst
   */
  export type VerificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findFirstOrThrow
   */
  export type VerificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verification to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification findMany
   */
  export type VerificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter, which Verifications to fetch.
     */
    where?: VerificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Verifications to fetch.
     */
    orderBy?: VerificationOrderByWithRelationInput | VerificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Verifications.
     */
    cursor?: VerificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * Verification create
   */
  export type VerificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to create a Verification.
     */
    data: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
  }

  /**
   * Verification createMany
   */
  export type VerificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification createManyAndReturn
   */
  export type VerificationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to create many Verifications.
     */
    data: VerificationCreateManyInput | VerificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Verification update
   */
  export type VerificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data needed to update a Verification.
     */
    data: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
    /**
     * Choose, which Verification to update.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification updateMany
   */
  export type VerificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification updateManyAndReturn
   */
  export type VerificationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The data used to update Verifications.
     */
    data: XOR<VerificationUpdateManyMutationInput, VerificationUncheckedUpdateManyInput>
    /**
     * Filter which Verifications to update
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to update.
     */
    limit?: number
  }

  /**
   * Verification upsert
   */
  export type VerificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * The filter to search for the Verification to update in case it exists.
     */
    where: VerificationWhereUniqueInput
    /**
     * In case the Verification found by the `where` argument doesn't exist, create a new Verification with this data.
     */
    create: XOR<VerificationCreateInput, VerificationUncheckedCreateInput>
    /**
     * In case the Verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VerificationUpdateInput, VerificationUncheckedUpdateInput>
  }

  /**
   * Verification delete
   */
  export type VerificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
    /**
     * Filter which Verification to delete.
     */
    where: VerificationWhereUniqueInput
  }

  /**
   * Verification deleteMany
   */
  export type VerificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Verifications to delete
     */
    where?: VerificationWhereInput
    /**
     * Limit how many Verifications to delete.
     */
    limit?: number
  }

  /**
   * Verification without action
   */
  export type VerificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Verification
     */
    select?: VerificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Verification
     */
    omit?: VerificationOmit<ExtArgs> | null
  }


  /**
   * Model Prayer
   */

  export type AggregatePrayer = {
    _count: PrayerCountAggregateOutputType | null
    _avg: PrayerAvgAggregateOutputType | null
    _sum: PrayerSumAggregateOutputType | null
    _min: PrayerMinAggregateOutputType | null
    _max: PrayerMaxAggregateOutputType | null
  }

  export type PrayerAvgAggregateOutputType = {
    fajr: number | null
    dhuhr: number | null
    asr: number | null
    maghrib: number | null
    isha: number | null
    nafl: number | null
  }

  export type PrayerSumAggregateOutputType = {
    fajr: number | null
    dhuhr: number | null
    asr: number | null
    maghrib: number | null
    isha: number | null
    nafl: number | null
  }

  export type PrayerMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    fajr: number | null
    dhuhr: number | null
    asr: number | null
    maghrib: number | null
    isha: number | null
    nafl: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrayerMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    fajr: number | null
    dhuhr: number | null
    asr: number | null
    maghrib: number | null
    isha: number | null
    nafl: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PrayerCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    fajr: number
    dhuhr: number
    asr: number
    maghrib: number
    isha: number
    nafl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PrayerAvgAggregateInputType = {
    fajr?: true
    dhuhr?: true
    asr?: true
    maghrib?: true
    isha?: true
    nafl?: true
  }

  export type PrayerSumAggregateInputType = {
    fajr?: true
    dhuhr?: true
    asr?: true
    maghrib?: true
    isha?: true
    nafl?: true
  }

  export type PrayerMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fajr?: true
    dhuhr?: true
    asr?: true
    maghrib?: true
    isha?: true
    nafl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrayerMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fajr?: true
    dhuhr?: true
    asr?: true
    maghrib?: true
    isha?: true
    nafl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PrayerCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fajr?: true
    dhuhr?: true
    asr?: true
    maghrib?: true
    isha?: true
    nafl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PrayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prayer to aggregate.
     */
    where?: PrayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prayers to fetch.
     */
    orderBy?: PrayerOrderByWithRelationInput | PrayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prayers
    **/
    _count?: true | PrayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrayerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrayerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrayerMaxAggregateInputType
  }

  export type GetPrayerAggregateType<T extends PrayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePrayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrayer[P]>
      : GetScalarType<T[P], AggregatePrayer[P]>
  }




  export type PrayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrayerWhereInput
    orderBy?: PrayerOrderByWithAggregationInput | PrayerOrderByWithAggregationInput[]
    by: PrayerScalarFieldEnum[] | PrayerScalarFieldEnum
    having?: PrayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrayerCountAggregateInputType | true
    _avg?: PrayerAvgAggregateInputType
    _sum?: PrayerSumAggregateInputType
    _min?: PrayerMinAggregateInputType
    _max?: PrayerMaxAggregateInputType
  }

  export type PrayerGroupByOutputType = {
    id: string
    userId: string
    date: Date
    fajr: number
    dhuhr: number
    asr: number
    maghrib: number
    isha: number
    nafl: number
    createdAt: Date
    updatedAt: Date
    _count: PrayerCountAggregateOutputType | null
    _avg: PrayerAvgAggregateOutputType | null
    _sum: PrayerSumAggregateOutputType | null
    _min: PrayerMinAggregateOutputType | null
    _max: PrayerMaxAggregateOutputType | null
  }

  type GetPrayerGroupByPayload<T extends PrayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrayerGroupByOutputType[P]>
            : GetScalarType<T[P], PrayerGroupByOutputType[P]>
        }
      >
    >


  export type PrayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fajr?: boolean
    dhuhr?: boolean
    asr?: boolean
    maghrib?: boolean
    isha?: boolean
    nafl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prayer"]>

  export type PrayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fajr?: boolean
    dhuhr?: boolean
    asr?: boolean
    maghrib?: boolean
    isha?: boolean
    nafl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prayer"]>

  export type PrayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fajr?: boolean
    dhuhr?: boolean
    asr?: boolean
    maghrib?: boolean
    isha?: boolean
    nafl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["prayer"]>

  export type PrayerSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    fajr?: boolean
    dhuhr?: boolean
    asr?: boolean
    maghrib?: boolean
    isha?: boolean
    nafl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PrayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "fajr" | "dhuhr" | "asr" | "maghrib" | "isha" | "nafl" | "createdAt" | "updatedAt", ExtArgs["result"]["prayer"]>
  export type PrayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PrayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PrayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PrayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prayer"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      fajr: number
      dhuhr: number
      asr: number
      maghrib: number
      isha: number
      nafl: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["prayer"]>
    composites: {}
  }

  type PrayerGetPayload<S extends boolean | null | undefined | PrayerDefaultArgs> = $Result.GetResult<Prisma.$PrayerPayload, S>

  type PrayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PrayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PrayerCountAggregateInputType | true
    }

  export interface PrayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prayer'], meta: { name: 'Prayer' } }
    /**
     * Find zero or one Prayer that matches the filter.
     * @param {PrayerFindUniqueArgs} args - Arguments to find a Prayer
     * @example
     * // Get one Prayer
     * const prayer = await prisma.prayer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrayerFindUniqueArgs>(args: SelectSubset<T, PrayerFindUniqueArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Prayer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PrayerFindUniqueOrThrowArgs} args - Arguments to find a Prayer
     * @example
     * // Get one Prayer
     * const prayer = await prisma.prayer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PrayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prayer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerFindFirstArgs} args - Arguments to find a Prayer
     * @example
     * // Get one Prayer
     * const prayer = await prisma.prayer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrayerFindFirstArgs>(args?: SelectSubset<T, PrayerFindFirstArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Prayer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerFindFirstOrThrowArgs} args - Arguments to find a Prayer
     * @example
     * // Get one Prayer
     * const prayer = await prisma.prayer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PrayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Prayers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prayers
     * const prayers = await prisma.prayer.findMany()
     * 
     * // Get first 10 Prayers
     * const prayers = await prisma.prayer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prayerWithIdOnly = await prisma.prayer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrayerFindManyArgs>(args?: SelectSubset<T, PrayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Prayer.
     * @param {PrayerCreateArgs} args - Arguments to create a Prayer.
     * @example
     * // Create one Prayer
     * const Prayer = await prisma.prayer.create({
     *   data: {
     *     // ... data to create a Prayer
     *   }
     * })
     * 
     */
    create<T extends PrayerCreateArgs>(args: SelectSubset<T, PrayerCreateArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Prayers.
     * @param {PrayerCreateManyArgs} args - Arguments to create many Prayers.
     * @example
     * // Create many Prayers
     * const prayer = await prisma.prayer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrayerCreateManyArgs>(args?: SelectSubset<T, PrayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prayers and returns the data saved in the database.
     * @param {PrayerCreateManyAndReturnArgs} args - Arguments to create many Prayers.
     * @example
     * // Create many Prayers
     * const prayer = await prisma.prayer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prayers and only return the `id`
     * const prayerWithIdOnly = await prisma.prayer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PrayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Prayer.
     * @param {PrayerDeleteArgs} args - Arguments to delete one Prayer.
     * @example
     * // Delete one Prayer
     * const Prayer = await prisma.prayer.delete({
     *   where: {
     *     // ... filter to delete one Prayer
     *   }
     * })
     * 
     */
    delete<T extends PrayerDeleteArgs>(args: SelectSubset<T, PrayerDeleteArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Prayer.
     * @param {PrayerUpdateArgs} args - Arguments to update one Prayer.
     * @example
     * // Update one Prayer
     * const prayer = await prisma.prayer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrayerUpdateArgs>(args: SelectSubset<T, PrayerUpdateArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Prayers.
     * @param {PrayerDeleteManyArgs} args - Arguments to filter Prayers to delete.
     * @example
     * // Delete a few Prayers
     * const { count } = await prisma.prayer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrayerDeleteManyArgs>(args?: SelectSubset<T, PrayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prayers
     * const prayer = await prisma.prayer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrayerUpdateManyArgs>(args: SelectSubset<T, PrayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prayers and returns the data updated in the database.
     * @param {PrayerUpdateManyAndReturnArgs} args - Arguments to update many Prayers.
     * @example
     * // Update many Prayers
     * const prayer = await prisma.prayer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Prayers and only return the `id`
     * const prayerWithIdOnly = await prisma.prayer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PrayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PrayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Prayer.
     * @param {PrayerUpsertArgs} args - Arguments to update or create a Prayer.
     * @example
     * // Update or create a Prayer
     * const prayer = await prisma.prayer.upsert({
     *   create: {
     *     // ... data to create a Prayer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prayer we want to update
     *   }
     * })
     */
    upsert<T extends PrayerUpsertArgs>(args: SelectSubset<T, PrayerUpsertArgs<ExtArgs>>): Prisma__PrayerClient<$Result.GetResult<Prisma.$PrayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Prayers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerCountArgs} args - Arguments to filter Prayers to count.
     * @example
     * // Count the number of Prayers
     * const count = await prisma.prayer.count({
     *   where: {
     *     // ... the filter for the Prayers we want to count
     *   }
     * })
    **/
    count<T extends PrayerCountArgs>(
      args?: Subset<T, PrayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PrayerAggregateArgs>(args: Subset<T, PrayerAggregateArgs>): Prisma.PrismaPromise<GetPrayerAggregateType<T>>

    /**
     * Group by Prayer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrayerGroupByArgs} args - Group by arguments.
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
      T extends PrayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrayerGroupByArgs['orderBy'] }
        : { orderBy?: PrayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PrayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prayer model
   */
  readonly fields: PrayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prayer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prayer model
   */
  interface PrayerFieldRefs {
    readonly id: FieldRef<"Prayer", 'String'>
    readonly userId: FieldRef<"Prayer", 'String'>
    readonly date: FieldRef<"Prayer", 'DateTime'>
    readonly fajr: FieldRef<"Prayer", 'Int'>
    readonly dhuhr: FieldRef<"Prayer", 'Int'>
    readonly asr: FieldRef<"Prayer", 'Int'>
    readonly maghrib: FieldRef<"Prayer", 'Int'>
    readonly isha: FieldRef<"Prayer", 'Int'>
    readonly nafl: FieldRef<"Prayer", 'Int'>
    readonly createdAt: FieldRef<"Prayer", 'DateTime'>
    readonly updatedAt: FieldRef<"Prayer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prayer findUnique
   */
  export type PrayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter, which Prayer to fetch.
     */
    where: PrayerWhereUniqueInput
  }

  /**
   * Prayer findUniqueOrThrow
   */
  export type PrayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter, which Prayer to fetch.
     */
    where: PrayerWhereUniqueInput
  }

  /**
   * Prayer findFirst
   */
  export type PrayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter, which Prayer to fetch.
     */
    where?: PrayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prayers to fetch.
     */
    orderBy?: PrayerOrderByWithRelationInput | PrayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prayers.
     */
    cursor?: PrayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prayers.
     */
    distinct?: PrayerScalarFieldEnum | PrayerScalarFieldEnum[]
  }

  /**
   * Prayer findFirstOrThrow
   */
  export type PrayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter, which Prayer to fetch.
     */
    where?: PrayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prayers to fetch.
     */
    orderBy?: PrayerOrderByWithRelationInput | PrayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prayers.
     */
    cursor?: PrayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prayers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prayers.
     */
    distinct?: PrayerScalarFieldEnum | PrayerScalarFieldEnum[]
  }

  /**
   * Prayer findMany
   */
  export type PrayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter, which Prayers to fetch.
     */
    where?: PrayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prayers to fetch.
     */
    orderBy?: PrayerOrderByWithRelationInput | PrayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prayers.
     */
    cursor?: PrayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prayers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prayers.
     */
    skip?: number
    distinct?: PrayerScalarFieldEnum | PrayerScalarFieldEnum[]
  }

  /**
   * Prayer create
   */
  export type PrayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Prayer.
     */
    data: XOR<PrayerCreateInput, PrayerUncheckedCreateInput>
  }

  /**
   * Prayer createMany
   */
  export type PrayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prayers.
     */
    data: PrayerCreateManyInput | PrayerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prayer createManyAndReturn
   */
  export type PrayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * The data used to create many Prayers.
     */
    data: PrayerCreateManyInput | PrayerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prayer update
   */
  export type PrayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Prayer.
     */
    data: XOR<PrayerUpdateInput, PrayerUncheckedUpdateInput>
    /**
     * Choose, which Prayer to update.
     */
    where: PrayerWhereUniqueInput
  }

  /**
   * Prayer updateMany
   */
  export type PrayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prayers.
     */
    data: XOR<PrayerUpdateManyMutationInput, PrayerUncheckedUpdateManyInput>
    /**
     * Filter which Prayers to update
     */
    where?: PrayerWhereInput
    /**
     * Limit how many Prayers to update.
     */
    limit?: number
  }

  /**
   * Prayer updateManyAndReturn
   */
  export type PrayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * The data used to update Prayers.
     */
    data: XOR<PrayerUpdateManyMutationInput, PrayerUncheckedUpdateManyInput>
    /**
     * Filter which Prayers to update
     */
    where?: PrayerWhereInput
    /**
     * Limit how many Prayers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prayer upsert
   */
  export type PrayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Prayer to update in case it exists.
     */
    where: PrayerWhereUniqueInput
    /**
     * In case the Prayer found by the `where` argument doesn't exist, create a new Prayer with this data.
     */
    create: XOR<PrayerCreateInput, PrayerUncheckedCreateInput>
    /**
     * In case the Prayer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrayerUpdateInput, PrayerUncheckedUpdateInput>
  }

  /**
   * Prayer delete
   */
  export type PrayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
    /**
     * Filter which Prayer to delete.
     */
    where: PrayerWhereUniqueInput
  }

  /**
   * Prayer deleteMany
   */
  export type PrayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prayers to delete
     */
    where?: PrayerWhereInput
    /**
     * Limit how many Prayers to delete.
     */
    limit?: number
  }

  /**
   * Prayer without action
   */
  export type PrayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prayer
     */
    select?: PrayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Prayer
     */
    omit?: PrayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrayerInclude<ExtArgs> | null
  }


  /**
   * Model Fasting
   */

  export type AggregateFasting = {
    _count: FastingCountAggregateOutputType | null
    _min: FastingMinAggregateOutputType | null
    _max: FastingMaxAggregateOutputType | null
  }

  export type FastingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    fasted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FastingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    fasted: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FastingCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    fasted: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FastingMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fasted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FastingMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fasted?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FastingCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    fasted?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FastingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fasting to aggregate.
     */
    where?: FastingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fastings to fetch.
     */
    orderBy?: FastingOrderByWithRelationInput | FastingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FastingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Fastings
    **/
    _count?: true | FastingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FastingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FastingMaxAggregateInputType
  }

  export type GetFastingAggregateType<T extends FastingAggregateArgs> = {
        [P in keyof T & keyof AggregateFasting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFasting[P]>
      : GetScalarType<T[P], AggregateFasting[P]>
  }




  export type FastingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FastingWhereInput
    orderBy?: FastingOrderByWithAggregationInput | FastingOrderByWithAggregationInput[]
    by: FastingScalarFieldEnum[] | FastingScalarFieldEnum
    having?: FastingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FastingCountAggregateInputType | true
    _min?: FastingMinAggregateInputType
    _max?: FastingMaxAggregateInputType
  }

  export type FastingGroupByOutputType = {
    id: string
    userId: string
    date: Date
    fasted: boolean
    createdAt: Date
    updatedAt: Date
    _count: FastingCountAggregateOutputType | null
    _min: FastingMinAggregateOutputType | null
    _max: FastingMaxAggregateOutputType | null
  }

  type GetFastingGroupByPayload<T extends FastingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FastingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FastingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FastingGroupByOutputType[P]>
            : GetScalarType<T[P], FastingGroupByOutputType[P]>
        }
      >
    >


  export type FastingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fasted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fasting"]>

  export type FastingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fasted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fasting"]>

  export type FastingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    fasted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["fasting"]>

  export type FastingSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    fasted?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FastingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "fasted" | "createdAt" | "updatedAt", ExtArgs["result"]["fasting"]>
  export type FastingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FastingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FastingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FastingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Fasting"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      fasted: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["fasting"]>
    composites: {}
  }

  type FastingGetPayload<S extends boolean | null | undefined | FastingDefaultArgs> = $Result.GetResult<Prisma.$FastingPayload, S>

  type FastingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FastingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FastingCountAggregateInputType | true
    }

  export interface FastingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Fasting'], meta: { name: 'Fasting' } }
    /**
     * Find zero or one Fasting that matches the filter.
     * @param {FastingFindUniqueArgs} args - Arguments to find a Fasting
     * @example
     * // Get one Fasting
     * const fasting = await prisma.fasting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FastingFindUniqueArgs>(args: SelectSubset<T, FastingFindUniqueArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Fasting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FastingFindUniqueOrThrowArgs} args - Arguments to find a Fasting
     * @example
     * // Get one Fasting
     * const fasting = await prisma.fasting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FastingFindUniqueOrThrowArgs>(args: SelectSubset<T, FastingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fasting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingFindFirstArgs} args - Arguments to find a Fasting
     * @example
     * // Get one Fasting
     * const fasting = await prisma.fasting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FastingFindFirstArgs>(args?: SelectSubset<T, FastingFindFirstArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Fasting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingFindFirstOrThrowArgs} args - Arguments to find a Fasting
     * @example
     * // Get one Fasting
     * const fasting = await prisma.fasting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FastingFindFirstOrThrowArgs>(args?: SelectSubset<T, FastingFindFirstOrThrowArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Fastings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Fastings
     * const fastings = await prisma.fasting.findMany()
     * 
     * // Get first 10 Fastings
     * const fastings = await prisma.fasting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fastingWithIdOnly = await prisma.fasting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FastingFindManyArgs>(args?: SelectSubset<T, FastingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Fasting.
     * @param {FastingCreateArgs} args - Arguments to create a Fasting.
     * @example
     * // Create one Fasting
     * const Fasting = await prisma.fasting.create({
     *   data: {
     *     // ... data to create a Fasting
     *   }
     * })
     * 
     */
    create<T extends FastingCreateArgs>(args: SelectSubset<T, FastingCreateArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Fastings.
     * @param {FastingCreateManyArgs} args - Arguments to create many Fastings.
     * @example
     * // Create many Fastings
     * const fasting = await prisma.fasting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FastingCreateManyArgs>(args?: SelectSubset<T, FastingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Fastings and returns the data saved in the database.
     * @param {FastingCreateManyAndReturnArgs} args - Arguments to create many Fastings.
     * @example
     * // Create many Fastings
     * const fasting = await prisma.fasting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Fastings and only return the `id`
     * const fastingWithIdOnly = await prisma.fasting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FastingCreateManyAndReturnArgs>(args?: SelectSubset<T, FastingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Fasting.
     * @param {FastingDeleteArgs} args - Arguments to delete one Fasting.
     * @example
     * // Delete one Fasting
     * const Fasting = await prisma.fasting.delete({
     *   where: {
     *     // ... filter to delete one Fasting
     *   }
     * })
     * 
     */
    delete<T extends FastingDeleteArgs>(args: SelectSubset<T, FastingDeleteArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Fasting.
     * @param {FastingUpdateArgs} args - Arguments to update one Fasting.
     * @example
     * // Update one Fasting
     * const fasting = await prisma.fasting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FastingUpdateArgs>(args: SelectSubset<T, FastingUpdateArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Fastings.
     * @param {FastingDeleteManyArgs} args - Arguments to filter Fastings to delete.
     * @example
     * // Delete a few Fastings
     * const { count } = await prisma.fasting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FastingDeleteManyArgs>(args?: SelectSubset<T, FastingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Fastings
     * const fasting = await prisma.fasting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FastingUpdateManyArgs>(args: SelectSubset<T, FastingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Fastings and returns the data updated in the database.
     * @param {FastingUpdateManyAndReturnArgs} args - Arguments to update many Fastings.
     * @example
     * // Update many Fastings
     * const fasting = await prisma.fasting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Fastings and only return the `id`
     * const fastingWithIdOnly = await prisma.fasting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FastingUpdateManyAndReturnArgs>(args: SelectSubset<T, FastingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Fasting.
     * @param {FastingUpsertArgs} args - Arguments to update or create a Fasting.
     * @example
     * // Update or create a Fasting
     * const fasting = await prisma.fasting.upsert({
     *   create: {
     *     // ... data to create a Fasting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Fasting we want to update
     *   }
     * })
     */
    upsert<T extends FastingUpsertArgs>(args: SelectSubset<T, FastingUpsertArgs<ExtArgs>>): Prisma__FastingClient<$Result.GetResult<Prisma.$FastingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Fastings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingCountArgs} args - Arguments to filter Fastings to count.
     * @example
     * // Count the number of Fastings
     * const count = await prisma.fasting.count({
     *   where: {
     *     // ... the filter for the Fastings we want to count
     *   }
     * })
    **/
    count<T extends FastingCountArgs>(
      args?: Subset<T, FastingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FastingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Fasting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FastingAggregateArgs>(args: Subset<T, FastingAggregateArgs>): Prisma.PrismaPromise<GetFastingAggregateType<T>>

    /**
     * Group by Fasting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FastingGroupByArgs} args - Group by arguments.
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
      T extends FastingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FastingGroupByArgs['orderBy'] }
        : { orderBy?: FastingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FastingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFastingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Fasting model
   */
  readonly fields: FastingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Fasting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FastingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Fasting model
   */
  interface FastingFieldRefs {
    readonly id: FieldRef<"Fasting", 'String'>
    readonly userId: FieldRef<"Fasting", 'String'>
    readonly date: FieldRef<"Fasting", 'DateTime'>
    readonly fasted: FieldRef<"Fasting", 'Boolean'>
    readonly createdAt: FieldRef<"Fasting", 'DateTime'>
    readonly updatedAt: FieldRef<"Fasting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Fasting findUnique
   */
  export type FastingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter, which Fasting to fetch.
     */
    where: FastingWhereUniqueInput
  }

  /**
   * Fasting findUniqueOrThrow
   */
  export type FastingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter, which Fasting to fetch.
     */
    where: FastingWhereUniqueInput
  }

  /**
   * Fasting findFirst
   */
  export type FastingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter, which Fasting to fetch.
     */
    where?: FastingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fastings to fetch.
     */
    orderBy?: FastingOrderByWithRelationInput | FastingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fastings.
     */
    cursor?: FastingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fastings.
     */
    distinct?: FastingScalarFieldEnum | FastingScalarFieldEnum[]
  }

  /**
   * Fasting findFirstOrThrow
   */
  export type FastingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter, which Fasting to fetch.
     */
    where?: FastingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fastings to fetch.
     */
    orderBy?: FastingOrderByWithRelationInput | FastingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Fastings.
     */
    cursor?: FastingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fastings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Fastings.
     */
    distinct?: FastingScalarFieldEnum | FastingScalarFieldEnum[]
  }

  /**
   * Fasting findMany
   */
  export type FastingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter, which Fastings to fetch.
     */
    where?: FastingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Fastings to fetch.
     */
    orderBy?: FastingOrderByWithRelationInput | FastingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Fastings.
     */
    cursor?: FastingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Fastings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Fastings.
     */
    skip?: number
    distinct?: FastingScalarFieldEnum | FastingScalarFieldEnum[]
  }

  /**
   * Fasting create
   */
  export type FastingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * The data needed to create a Fasting.
     */
    data: XOR<FastingCreateInput, FastingUncheckedCreateInput>
  }

  /**
   * Fasting createMany
   */
  export type FastingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Fastings.
     */
    data: FastingCreateManyInput | FastingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Fasting createManyAndReturn
   */
  export type FastingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * The data used to create many Fastings.
     */
    data: FastingCreateManyInput | FastingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fasting update
   */
  export type FastingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * The data needed to update a Fasting.
     */
    data: XOR<FastingUpdateInput, FastingUncheckedUpdateInput>
    /**
     * Choose, which Fasting to update.
     */
    where: FastingWhereUniqueInput
  }

  /**
   * Fasting updateMany
   */
  export type FastingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Fastings.
     */
    data: XOR<FastingUpdateManyMutationInput, FastingUncheckedUpdateManyInput>
    /**
     * Filter which Fastings to update
     */
    where?: FastingWhereInput
    /**
     * Limit how many Fastings to update.
     */
    limit?: number
  }

  /**
   * Fasting updateManyAndReturn
   */
  export type FastingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * The data used to update Fastings.
     */
    data: XOR<FastingUpdateManyMutationInput, FastingUncheckedUpdateManyInput>
    /**
     * Filter which Fastings to update
     */
    where?: FastingWhereInput
    /**
     * Limit how many Fastings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Fasting upsert
   */
  export type FastingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * The filter to search for the Fasting to update in case it exists.
     */
    where: FastingWhereUniqueInput
    /**
     * In case the Fasting found by the `where` argument doesn't exist, create a new Fasting with this data.
     */
    create: XOR<FastingCreateInput, FastingUncheckedCreateInput>
    /**
     * In case the Fasting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FastingUpdateInput, FastingUncheckedUpdateInput>
  }

  /**
   * Fasting delete
   */
  export type FastingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
    /**
     * Filter which Fasting to delete.
     */
    where: FastingWhereUniqueInput
  }

  /**
   * Fasting deleteMany
   */
  export type FastingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Fastings to delete
     */
    where?: FastingWhereInput
    /**
     * Limit how many Fastings to delete.
     */
    limit?: number
  }

  /**
   * Fasting without action
   */
  export type FastingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Fasting
     */
    select?: FastingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Fasting
     */
    omit?: FastingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FastingInclude<ExtArgs> | null
  }


  /**
   * Model FriendGroup
   */

  export type AggregateFriendGroup = {
    _count: FriendGroupCountAggregateOutputType | null
    _min: FriendGroupMinAggregateOutputType | null
    _max: FriendGroupMaxAggregateOutputType | null
  }

  export type FriendGroupMinAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendGroupMaxAggregateOutputType = {
    id: string | null
    name: string | null
    userId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendGroupCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendGroupMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendGroupMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendGroupCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendGroupAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendGroup to aggregate.
     */
    where?: FriendGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroups to fetch.
     */
    orderBy?: FriendGroupOrderByWithRelationInput | FriendGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendGroups
    **/
    _count?: true | FriendGroupCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendGroupMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendGroupMaxAggregateInputType
  }

  export type GetFriendGroupAggregateType<T extends FriendGroupAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendGroup]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendGroup[P]>
      : GetScalarType<T[P], AggregateFriendGroup[P]>
  }




  export type FriendGroupGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendGroupWhereInput
    orderBy?: FriendGroupOrderByWithAggregationInput | FriendGroupOrderByWithAggregationInput[]
    by: FriendGroupScalarFieldEnum[] | FriendGroupScalarFieldEnum
    having?: FriendGroupScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendGroupCountAggregateInputType | true
    _min?: FriendGroupMinAggregateInputType
    _max?: FriendGroupMaxAggregateInputType
  }

  export type FriendGroupGroupByOutputType = {
    id: string
    name: string
    userId: string
    createdAt: Date
    updatedAt: Date
    _count: FriendGroupCountAggregateOutputType | null
    _min: FriendGroupMinAggregateOutputType | null
    _max: FriendGroupMaxAggregateOutputType | null
  }

  type GetFriendGroupGroupByPayload<T extends FriendGroupGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupGroupByOutputType[P]>
        }
      >
    >


  export type FriendGroupSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | FriendGroup$membersArgs<ExtArgs>
    _count?: boolean | FriendGroupCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroup"]>

  export type FriendGroupSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroup"]>

  export type FriendGroupSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroup"]>

  export type FriendGroupSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendGroupOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["friendGroup"]>
  export type FriendGroupInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    members?: boolean | FriendGroup$membersArgs<ExtArgs>
    _count?: boolean | FriendGroupCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type FriendGroupIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendGroupIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendGroupPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendGroup"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      members: Prisma.$FriendGroupMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      userId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friendGroup"]>
    composites: {}
  }

  type FriendGroupGetPayload<S extends boolean | null | undefined | FriendGroupDefaultArgs> = $Result.GetResult<Prisma.$FriendGroupPayload, S>

  type FriendGroupCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendGroupFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendGroupCountAggregateInputType | true
    }

  export interface FriendGroupDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendGroup'], meta: { name: 'FriendGroup' } }
    /**
     * Find zero or one FriendGroup that matches the filter.
     * @param {FriendGroupFindUniqueArgs} args - Arguments to find a FriendGroup
     * @example
     * // Get one FriendGroup
     * const friendGroup = await prisma.friendGroup.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendGroupFindUniqueArgs>(args: SelectSubset<T, FriendGroupFindUniqueArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendGroup that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendGroupFindUniqueOrThrowArgs} args - Arguments to find a FriendGroup
     * @example
     * // Get one FriendGroup
     * const friendGroup = await prisma.friendGroup.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendGroupFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendGroupFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendGroup that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupFindFirstArgs} args - Arguments to find a FriendGroup
     * @example
     * // Get one FriendGroup
     * const friendGroup = await prisma.friendGroup.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendGroupFindFirstArgs>(args?: SelectSubset<T, FriendGroupFindFirstArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendGroup that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupFindFirstOrThrowArgs} args - Arguments to find a FriendGroup
     * @example
     * // Get one FriendGroup
     * const friendGroup = await prisma.friendGroup.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendGroupFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendGroupFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendGroups that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendGroups
     * const friendGroups = await prisma.friendGroup.findMany()
     * 
     * // Get first 10 FriendGroups
     * const friendGroups = await prisma.friendGroup.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendGroupWithIdOnly = await prisma.friendGroup.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendGroupFindManyArgs>(args?: SelectSubset<T, FriendGroupFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendGroup.
     * @param {FriendGroupCreateArgs} args - Arguments to create a FriendGroup.
     * @example
     * // Create one FriendGroup
     * const FriendGroup = await prisma.friendGroup.create({
     *   data: {
     *     // ... data to create a FriendGroup
     *   }
     * })
     * 
     */
    create<T extends FriendGroupCreateArgs>(args: SelectSubset<T, FriendGroupCreateArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendGroups.
     * @param {FriendGroupCreateManyArgs} args - Arguments to create many FriendGroups.
     * @example
     * // Create many FriendGroups
     * const friendGroup = await prisma.friendGroup.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendGroupCreateManyArgs>(args?: SelectSubset<T, FriendGroupCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendGroups and returns the data saved in the database.
     * @param {FriendGroupCreateManyAndReturnArgs} args - Arguments to create many FriendGroups.
     * @example
     * // Create many FriendGroups
     * const friendGroup = await prisma.friendGroup.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendGroups and only return the `id`
     * const friendGroupWithIdOnly = await prisma.friendGroup.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendGroupCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendGroupCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendGroup.
     * @param {FriendGroupDeleteArgs} args - Arguments to delete one FriendGroup.
     * @example
     * // Delete one FriendGroup
     * const FriendGroup = await prisma.friendGroup.delete({
     *   where: {
     *     // ... filter to delete one FriendGroup
     *   }
     * })
     * 
     */
    delete<T extends FriendGroupDeleteArgs>(args: SelectSubset<T, FriendGroupDeleteArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendGroup.
     * @param {FriendGroupUpdateArgs} args - Arguments to update one FriendGroup.
     * @example
     * // Update one FriendGroup
     * const friendGroup = await prisma.friendGroup.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendGroupUpdateArgs>(args: SelectSubset<T, FriendGroupUpdateArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendGroups.
     * @param {FriendGroupDeleteManyArgs} args - Arguments to filter FriendGroups to delete.
     * @example
     * // Delete a few FriendGroups
     * const { count } = await prisma.friendGroup.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendGroupDeleteManyArgs>(args?: SelectSubset<T, FriendGroupDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendGroups
     * const friendGroup = await prisma.friendGroup.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendGroupUpdateManyArgs>(args: SelectSubset<T, FriendGroupUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendGroups and returns the data updated in the database.
     * @param {FriendGroupUpdateManyAndReturnArgs} args - Arguments to update many FriendGroups.
     * @example
     * // Update many FriendGroups
     * const friendGroup = await prisma.friendGroup.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendGroups and only return the `id`
     * const friendGroupWithIdOnly = await prisma.friendGroup.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendGroupUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendGroupUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendGroup.
     * @param {FriendGroupUpsertArgs} args - Arguments to update or create a FriendGroup.
     * @example
     * // Update or create a FriendGroup
     * const friendGroup = await prisma.friendGroup.upsert({
     *   create: {
     *     // ... data to create a FriendGroup
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendGroup we want to update
     *   }
     * })
     */
    upsert<T extends FriendGroupUpsertArgs>(args: SelectSubset<T, FriendGroupUpsertArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendGroups.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupCountArgs} args - Arguments to filter FriendGroups to count.
     * @example
     * // Count the number of FriendGroups
     * const count = await prisma.friendGroup.count({
     *   where: {
     *     // ... the filter for the FriendGroups we want to count
     *   }
     * })
    **/
    count<T extends FriendGroupCountArgs>(
      args?: Subset<T, FriendGroupCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendGroupCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FriendGroupAggregateArgs>(args: Subset<T, FriendGroupAggregateArgs>): Prisma.PrismaPromise<GetFriendGroupAggregateType<T>>

    /**
     * Group by FriendGroup.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupGroupByArgs} args - Group by arguments.
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
      T extends FriendGroupGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FriendGroupGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendGroup model
   */
  readonly fields: FriendGroupFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendGroup.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendGroupClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends FriendGroup$membersArgs<ExtArgs> = {}>(args?: Subset<T, FriendGroup$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendGroup model
   */
  interface FriendGroupFieldRefs {
    readonly id: FieldRef<"FriendGroup", 'String'>
    readonly name: FieldRef<"FriendGroup", 'String'>
    readonly userId: FieldRef<"FriendGroup", 'String'>
    readonly createdAt: FieldRef<"FriendGroup", 'DateTime'>
    readonly updatedAt: FieldRef<"FriendGroup", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendGroup findUnique
   */
  export type FriendGroupFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroup to fetch.
     */
    where: FriendGroupWhereUniqueInput
  }

  /**
   * FriendGroup findUniqueOrThrow
   */
  export type FriendGroupFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroup to fetch.
     */
    where: FriendGroupWhereUniqueInput
  }

  /**
   * FriendGroup findFirst
   */
  export type FriendGroupFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroup to fetch.
     */
    where?: FriendGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroups to fetch.
     */
    orderBy?: FriendGroupOrderByWithRelationInput | FriendGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendGroups.
     */
    cursor?: FriendGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendGroups.
     */
    distinct?: FriendGroupScalarFieldEnum | FriendGroupScalarFieldEnum[]
  }

  /**
   * FriendGroup findFirstOrThrow
   */
  export type FriendGroupFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroup to fetch.
     */
    where?: FriendGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroups to fetch.
     */
    orderBy?: FriendGroupOrderByWithRelationInput | FriendGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendGroups.
     */
    cursor?: FriendGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroups.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendGroups.
     */
    distinct?: FriendGroupScalarFieldEnum | FriendGroupScalarFieldEnum[]
  }

  /**
   * FriendGroup findMany
   */
  export type FriendGroupFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroups to fetch.
     */
    where?: FriendGroupWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroups to fetch.
     */
    orderBy?: FriendGroupOrderByWithRelationInput | FriendGroupOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendGroups.
     */
    cursor?: FriendGroupWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroups from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroups.
     */
    skip?: number
    distinct?: FriendGroupScalarFieldEnum | FriendGroupScalarFieldEnum[]
  }

  /**
   * FriendGroup create
   */
  export type FriendGroupCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendGroup.
     */
    data: XOR<FriendGroupCreateInput, FriendGroupUncheckedCreateInput>
  }

  /**
   * FriendGroup createMany
   */
  export type FriendGroupCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendGroups.
     */
    data: FriendGroupCreateManyInput | FriendGroupCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendGroup createManyAndReturn
   */
  export type FriendGroupCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * The data used to create many FriendGroups.
     */
    data: FriendGroupCreateManyInput | FriendGroupCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendGroup update
   */
  export type FriendGroupUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendGroup.
     */
    data: XOR<FriendGroupUpdateInput, FriendGroupUncheckedUpdateInput>
    /**
     * Choose, which FriendGroup to update.
     */
    where: FriendGroupWhereUniqueInput
  }

  /**
   * FriendGroup updateMany
   */
  export type FriendGroupUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendGroups.
     */
    data: XOR<FriendGroupUpdateManyMutationInput, FriendGroupUncheckedUpdateManyInput>
    /**
     * Filter which FriendGroups to update
     */
    where?: FriendGroupWhereInput
    /**
     * Limit how many FriendGroups to update.
     */
    limit?: number
  }

  /**
   * FriendGroup updateManyAndReturn
   */
  export type FriendGroupUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * The data used to update FriendGroups.
     */
    data: XOR<FriendGroupUpdateManyMutationInput, FriendGroupUncheckedUpdateManyInput>
    /**
     * Filter which FriendGroups to update
     */
    where?: FriendGroupWhereInput
    /**
     * Limit how many FriendGroups to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendGroup upsert
   */
  export type FriendGroupUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendGroup to update in case it exists.
     */
    where: FriendGroupWhereUniqueInput
    /**
     * In case the FriendGroup found by the `where` argument doesn't exist, create a new FriendGroup with this data.
     */
    create: XOR<FriendGroupCreateInput, FriendGroupUncheckedCreateInput>
    /**
     * In case the FriendGroup was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendGroupUpdateInput, FriendGroupUncheckedUpdateInput>
  }

  /**
   * FriendGroup delete
   */
  export type FriendGroupDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
    /**
     * Filter which FriendGroup to delete.
     */
    where: FriendGroupWhereUniqueInput
  }

  /**
   * FriendGroup deleteMany
   */
  export type FriendGroupDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendGroups to delete
     */
    where?: FriendGroupWhereInput
    /**
     * Limit how many FriendGroups to delete.
     */
    limit?: number
  }

  /**
   * FriendGroup.members
   */
  export type FriendGroup$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    where?: FriendGroupMemberWhereInput
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    cursor?: FriendGroupMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FriendGroupMemberScalarFieldEnum | FriendGroupMemberScalarFieldEnum[]
  }

  /**
   * FriendGroup without action
   */
  export type FriendGroupDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroup
     */
    select?: FriendGroupSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroup
     */
    omit?: FriendGroupOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupInclude<ExtArgs> | null
  }


  /**
   * Model FriendGroupMember
   */

  export type AggregateFriendGroupMember = {
    _count: FriendGroupMemberCountAggregateOutputType | null
    _min: FriendGroupMemberMinAggregateOutputType | null
    _max: FriendGroupMemberMaxAggregateOutputType | null
  }

  export type FriendGroupMemberMinAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type FriendGroupMemberMaxAggregateOutputType = {
    id: string | null
    groupId: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type FriendGroupMemberCountAggregateOutputType = {
    id: number
    groupId: number
    userId: number
    createdAt: number
    _all: number
  }


  export type FriendGroupMemberMinAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    createdAt?: true
  }

  export type FriendGroupMemberMaxAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    createdAt?: true
  }

  export type FriendGroupMemberCountAggregateInputType = {
    id?: true
    groupId?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type FriendGroupMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendGroupMember to aggregate.
     */
    where?: FriendGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroupMembers to fetch.
     */
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FriendGroupMembers
    **/
    _count?: true | FriendGroupMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendGroupMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendGroupMemberMaxAggregateInputType
  }

  export type GetFriendGroupMemberAggregateType<T extends FriendGroupMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateFriendGroupMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriendGroupMember[P]>
      : GetScalarType<T[P], AggregateFriendGroupMember[P]>
  }




  export type FriendGroupMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendGroupMemberWhereInput
    orderBy?: FriendGroupMemberOrderByWithAggregationInput | FriendGroupMemberOrderByWithAggregationInput[]
    by: FriendGroupMemberScalarFieldEnum[] | FriendGroupMemberScalarFieldEnum
    having?: FriendGroupMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendGroupMemberCountAggregateInputType | true
    _min?: FriendGroupMemberMinAggregateInputType
    _max?: FriendGroupMemberMaxAggregateInputType
  }

  export type FriendGroupMemberGroupByOutputType = {
    id: string
    groupId: string
    userId: string
    createdAt: Date
    _count: FriendGroupMemberCountAggregateOutputType | null
    _min: FriendGroupMemberMinAggregateOutputType | null
    _max: FriendGroupMemberMaxAggregateOutputType | null
  }

  type GetFriendGroupMemberGroupByPayload<T extends FriendGroupMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupMemberGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupMemberGroupByOutputType[P]>
        }
      >
    >


  export type FriendGroupMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    userId?: boolean
    createdAt?: boolean
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroupMember"]>

  export type FriendGroupMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    userId?: boolean
    createdAt?: boolean
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroupMember"]>

  export type FriendGroupMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    groupId?: boolean
    userId?: boolean
    createdAt?: boolean
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friendGroupMember"]>

  export type FriendGroupMemberSelectScalar = {
    id?: boolean
    groupId?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type FriendGroupMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "groupId" | "userId" | "createdAt", ExtArgs["result"]["friendGroupMember"]>
  export type FriendGroupMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendGroupMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendGroupMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    group?: boolean | FriendGroupDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendGroupMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FriendGroupMember"
    objects: {
      group: Prisma.$FriendGroupPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      groupId: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["friendGroupMember"]>
    composites: {}
  }

  type FriendGroupMemberGetPayload<S extends boolean | null | undefined | FriendGroupMemberDefaultArgs> = $Result.GetResult<Prisma.$FriendGroupMemberPayload, S>

  type FriendGroupMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendGroupMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendGroupMemberCountAggregateInputType | true
    }

  export interface FriendGroupMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FriendGroupMember'], meta: { name: 'FriendGroupMember' } }
    /**
     * Find zero or one FriendGroupMember that matches the filter.
     * @param {FriendGroupMemberFindUniqueArgs} args - Arguments to find a FriendGroupMember
     * @example
     * // Get one FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendGroupMemberFindUniqueArgs>(args: SelectSubset<T, FriendGroupMemberFindUniqueArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FriendGroupMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendGroupMemberFindUniqueOrThrowArgs} args - Arguments to find a FriendGroupMember
     * @example
     * // Get one FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendGroupMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendGroupMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendGroupMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberFindFirstArgs} args - Arguments to find a FriendGroupMember
     * @example
     * // Get one FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendGroupMemberFindFirstArgs>(args?: SelectSubset<T, FriendGroupMemberFindFirstArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FriendGroupMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberFindFirstOrThrowArgs} args - Arguments to find a FriendGroupMember
     * @example
     * // Get one FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendGroupMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendGroupMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FriendGroupMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FriendGroupMembers
     * const friendGroupMembers = await prisma.friendGroupMember.findMany()
     * 
     * // Get first 10 FriendGroupMembers
     * const friendGroupMembers = await prisma.friendGroupMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendGroupMemberWithIdOnly = await prisma.friendGroupMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendGroupMemberFindManyArgs>(args?: SelectSubset<T, FriendGroupMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FriendGroupMember.
     * @param {FriendGroupMemberCreateArgs} args - Arguments to create a FriendGroupMember.
     * @example
     * // Create one FriendGroupMember
     * const FriendGroupMember = await prisma.friendGroupMember.create({
     *   data: {
     *     // ... data to create a FriendGroupMember
     *   }
     * })
     * 
     */
    create<T extends FriendGroupMemberCreateArgs>(args: SelectSubset<T, FriendGroupMemberCreateArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FriendGroupMembers.
     * @param {FriendGroupMemberCreateManyArgs} args - Arguments to create many FriendGroupMembers.
     * @example
     * // Create many FriendGroupMembers
     * const friendGroupMember = await prisma.friendGroupMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendGroupMemberCreateManyArgs>(args?: SelectSubset<T, FriendGroupMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FriendGroupMembers and returns the data saved in the database.
     * @param {FriendGroupMemberCreateManyAndReturnArgs} args - Arguments to create many FriendGroupMembers.
     * @example
     * // Create many FriendGroupMembers
     * const friendGroupMember = await prisma.friendGroupMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FriendGroupMembers and only return the `id`
     * const friendGroupMemberWithIdOnly = await prisma.friendGroupMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendGroupMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendGroupMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FriendGroupMember.
     * @param {FriendGroupMemberDeleteArgs} args - Arguments to delete one FriendGroupMember.
     * @example
     * // Delete one FriendGroupMember
     * const FriendGroupMember = await prisma.friendGroupMember.delete({
     *   where: {
     *     // ... filter to delete one FriendGroupMember
     *   }
     * })
     * 
     */
    delete<T extends FriendGroupMemberDeleteArgs>(args: SelectSubset<T, FriendGroupMemberDeleteArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FriendGroupMember.
     * @param {FriendGroupMemberUpdateArgs} args - Arguments to update one FriendGroupMember.
     * @example
     * // Update one FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendGroupMemberUpdateArgs>(args: SelectSubset<T, FriendGroupMemberUpdateArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FriendGroupMembers.
     * @param {FriendGroupMemberDeleteManyArgs} args - Arguments to filter FriendGroupMembers to delete.
     * @example
     * // Delete a few FriendGroupMembers
     * const { count } = await prisma.friendGroupMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendGroupMemberDeleteManyArgs>(args?: SelectSubset<T, FriendGroupMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendGroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FriendGroupMembers
     * const friendGroupMember = await prisma.friendGroupMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendGroupMemberUpdateManyArgs>(args: SelectSubset<T, FriendGroupMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FriendGroupMembers and returns the data updated in the database.
     * @param {FriendGroupMemberUpdateManyAndReturnArgs} args - Arguments to update many FriendGroupMembers.
     * @example
     * // Update many FriendGroupMembers
     * const friendGroupMember = await prisma.friendGroupMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FriendGroupMembers and only return the `id`
     * const friendGroupMemberWithIdOnly = await prisma.friendGroupMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendGroupMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendGroupMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FriendGroupMember.
     * @param {FriendGroupMemberUpsertArgs} args - Arguments to update or create a FriendGroupMember.
     * @example
     * // Update or create a FriendGroupMember
     * const friendGroupMember = await prisma.friendGroupMember.upsert({
     *   create: {
     *     // ... data to create a FriendGroupMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FriendGroupMember we want to update
     *   }
     * })
     */
    upsert<T extends FriendGroupMemberUpsertArgs>(args: SelectSubset<T, FriendGroupMemberUpsertArgs<ExtArgs>>): Prisma__FriendGroupMemberClient<$Result.GetResult<Prisma.$FriendGroupMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FriendGroupMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberCountArgs} args - Arguments to filter FriendGroupMembers to count.
     * @example
     * // Count the number of FriendGroupMembers
     * const count = await prisma.friendGroupMember.count({
     *   where: {
     *     // ... the filter for the FriendGroupMembers we want to count
     *   }
     * })
    **/
    count<T extends FriendGroupMemberCountArgs>(
      args?: Subset<T, FriendGroupMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendGroupMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FriendGroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FriendGroupMemberAggregateArgs>(args: Subset<T, FriendGroupMemberAggregateArgs>): Prisma.PrismaPromise<GetFriendGroupMemberAggregateType<T>>

    /**
     * Group by FriendGroupMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupMemberGroupByArgs} args - Group by arguments.
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
      T extends FriendGroupMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupMemberGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FriendGroupMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FriendGroupMember model
   */
  readonly fields: FriendGroupMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FriendGroupMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendGroupMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    group<T extends FriendGroupDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FriendGroupDefaultArgs<ExtArgs>>): Prisma__FriendGroupClient<$Result.GetResult<Prisma.$FriendGroupPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FriendGroupMember model
   */
  interface FriendGroupMemberFieldRefs {
    readonly id: FieldRef<"FriendGroupMember", 'String'>
    readonly groupId: FieldRef<"FriendGroupMember", 'String'>
    readonly userId: FieldRef<"FriendGroupMember", 'String'>
    readonly createdAt: FieldRef<"FriendGroupMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FriendGroupMember findUnique
   */
  export type FriendGroupMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroupMember to fetch.
     */
    where: FriendGroupMemberWhereUniqueInput
  }

  /**
   * FriendGroupMember findUniqueOrThrow
   */
  export type FriendGroupMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroupMember to fetch.
     */
    where: FriendGroupMemberWhereUniqueInput
  }

  /**
   * FriendGroupMember findFirst
   */
  export type FriendGroupMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroupMember to fetch.
     */
    where?: FriendGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroupMembers to fetch.
     */
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendGroupMembers.
     */
    cursor?: FriendGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendGroupMembers.
     */
    distinct?: FriendGroupMemberScalarFieldEnum | FriendGroupMemberScalarFieldEnum[]
  }

  /**
   * FriendGroupMember findFirstOrThrow
   */
  export type FriendGroupMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroupMember to fetch.
     */
    where?: FriendGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroupMembers to fetch.
     */
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FriendGroupMembers.
     */
    cursor?: FriendGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroupMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FriendGroupMembers.
     */
    distinct?: FriendGroupMemberScalarFieldEnum | FriendGroupMemberScalarFieldEnum[]
  }

  /**
   * FriendGroupMember findMany
   */
  export type FriendGroupMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter, which FriendGroupMembers to fetch.
     */
    where?: FriendGroupMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FriendGroupMembers to fetch.
     */
    orderBy?: FriendGroupMemberOrderByWithRelationInput | FriendGroupMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FriendGroupMembers.
     */
    cursor?: FriendGroupMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FriendGroupMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FriendGroupMembers.
     */
    skip?: number
    distinct?: FriendGroupMemberScalarFieldEnum | FriendGroupMemberScalarFieldEnum[]
  }

  /**
   * FriendGroupMember create
   */
  export type FriendGroupMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a FriendGroupMember.
     */
    data: XOR<FriendGroupMemberCreateInput, FriendGroupMemberUncheckedCreateInput>
  }

  /**
   * FriendGroupMember createMany
   */
  export type FriendGroupMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FriendGroupMembers.
     */
    data: FriendGroupMemberCreateManyInput | FriendGroupMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FriendGroupMember createManyAndReturn
   */
  export type FriendGroupMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * The data used to create many FriendGroupMembers.
     */
    data: FriendGroupMemberCreateManyInput | FriendGroupMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendGroupMember update
   */
  export type FriendGroupMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a FriendGroupMember.
     */
    data: XOR<FriendGroupMemberUpdateInput, FriendGroupMemberUncheckedUpdateInput>
    /**
     * Choose, which FriendGroupMember to update.
     */
    where: FriendGroupMemberWhereUniqueInput
  }

  /**
   * FriendGroupMember updateMany
   */
  export type FriendGroupMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FriendGroupMembers.
     */
    data: XOR<FriendGroupMemberUpdateManyMutationInput, FriendGroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which FriendGroupMembers to update
     */
    where?: FriendGroupMemberWhereInput
    /**
     * Limit how many FriendGroupMembers to update.
     */
    limit?: number
  }

  /**
   * FriendGroupMember updateManyAndReturn
   */
  export type FriendGroupMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * The data used to update FriendGroupMembers.
     */
    data: XOR<FriendGroupMemberUpdateManyMutationInput, FriendGroupMemberUncheckedUpdateManyInput>
    /**
     * Filter which FriendGroupMembers to update
     */
    where?: FriendGroupMemberWhereInput
    /**
     * Limit how many FriendGroupMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FriendGroupMember upsert
   */
  export type FriendGroupMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the FriendGroupMember to update in case it exists.
     */
    where: FriendGroupMemberWhereUniqueInput
    /**
     * In case the FriendGroupMember found by the `where` argument doesn't exist, create a new FriendGroupMember with this data.
     */
    create: XOR<FriendGroupMemberCreateInput, FriendGroupMemberUncheckedCreateInput>
    /**
     * In case the FriendGroupMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendGroupMemberUpdateInput, FriendGroupMemberUncheckedUpdateInput>
  }

  /**
   * FriendGroupMember delete
   */
  export type FriendGroupMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
    /**
     * Filter which FriendGroupMember to delete.
     */
    where: FriendGroupMemberWhereUniqueInput
  }

  /**
   * FriendGroupMember deleteMany
   */
  export type FriendGroupMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FriendGroupMembers to delete
     */
    where?: FriendGroupMemberWhereInput
    /**
     * Limit how many FriendGroupMembers to delete.
     */
    limit?: number
  }

  /**
   * FriendGroupMember without action
   */
  export type FriendGroupMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FriendGroupMember
     */
    select?: FriendGroupMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FriendGroupMember
     */
    omit?: FriendGroupMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendGroupMemberInclude<ExtArgs> | null
  }


  /**
   * Model Friend
   */

  export type AggregateFriend = {
    _count: FriendCountAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  export type FriendMinAggregateOutputType = {
    id: string | null
    userId: string | null
    friendId: string | null
    status: $Enums.FriendStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    friendId: string | null
    status: $Enums.FriendStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type FriendCountAggregateOutputType = {
    id: number
    userId: number
    friendId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type FriendMinAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendMaxAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type FriendCountAggregateInputType = {
    id?: true
    userId?: true
    friendId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type FriendAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friend to aggregate.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Friends
    **/
    _count?: true | FriendCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FriendMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FriendMaxAggregateInputType
  }

  export type GetFriendAggregateType<T extends FriendAggregateArgs> = {
        [P in keyof T & keyof AggregateFriend]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFriend[P]>
      : GetScalarType<T[P], AggregateFriend[P]>
  }




  export type FriendGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FriendWhereInput
    orderBy?: FriendOrderByWithAggregationInput | FriendOrderByWithAggregationInput[]
    by: FriendScalarFieldEnum[] | FriendScalarFieldEnum
    having?: FriendScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FriendCountAggregateInputType | true
    _min?: FriendMinAggregateInputType
    _max?: FriendMaxAggregateInputType
  }

  export type FriendGroupByOutputType = {
    id: string
    userId: string
    friendId: string
    status: $Enums.FriendStatus
    createdAt: Date
    updatedAt: Date
    _count: FriendCountAggregateOutputType | null
    _min: FriendMinAggregateOutputType | null
    _max: FriendMaxAggregateOutputType | null
  }

  type GetFriendGroupByPayload<T extends FriendGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FriendGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FriendGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FriendGroupByOutputType[P]>
            : GetScalarType<T[P], FriendGroupByOutputType[P]>
        }
      >
    >


  export type FriendSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["friend"]>

  export type FriendSelectScalar = {
    id?: boolean
    userId?: boolean
    friendId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type FriendOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "friendId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["friend"]>
  export type FriendInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type FriendIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    friend?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $FriendPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Friend"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      friend: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      friendId: string
      status: $Enums.FriendStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["friend"]>
    composites: {}
  }

  type FriendGetPayload<S extends boolean | null | undefined | FriendDefaultArgs> = $Result.GetResult<Prisma.$FriendPayload, S>

  type FriendCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FriendFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FriendCountAggregateInputType | true
    }

  export interface FriendDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Friend'], meta: { name: 'Friend' } }
    /**
     * Find zero or one Friend that matches the filter.
     * @param {FriendFindUniqueArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FriendFindUniqueArgs>(args: SelectSubset<T, FriendFindUniqueArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Friend that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FriendFindUniqueOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FriendFindUniqueOrThrowArgs>(args: SelectSubset<T, FriendFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FriendFindFirstArgs>(args?: SelectSubset<T, FriendFindFirstArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Friend that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindFirstOrThrowArgs} args - Arguments to find a Friend
     * @example
     * // Get one Friend
     * const friend = await prisma.friend.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FriendFindFirstOrThrowArgs>(args?: SelectSubset<T, FriendFindFirstOrThrowArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Friends that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Friends
     * const friends = await prisma.friend.findMany()
     * 
     * // Get first 10 Friends
     * const friends = await prisma.friend.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const friendWithIdOnly = await prisma.friend.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FriendFindManyArgs>(args?: SelectSubset<T, FriendFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Friend.
     * @param {FriendCreateArgs} args - Arguments to create a Friend.
     * @example
     * // Create one Friend
     * const Friend = await prisma.friend.create({
     *   data: {
     *     // ... data to create a Friend
     *   }
     * })
     * 
     */
    create<T extends FriendCreateArgs>(args: SelectSubset<T, FriendCreateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Friends.
     * @param {FriendCreateManyArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FriendCreateManyArgs>(args?: SelectSubset<T, FriendCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Friends and returns the data saved in the database.
     * @param {FriendCreateManyAndReturnArgs} args - Arguments to create many Friends.
     * @example
     * // Create many Friends
     * const friend = await prisma.friend.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FriendCreateManyAndReturnArgs>(args?: SelectSubset<T, FriendCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Friend.
     * @param {FriendDeleteArgs} args - Arguments to delete one Friend.
     * @example
     * // Delete one Friend
     * const Friend = await prisma.friend.delete({
     *   where: {
     *     // ... filter to delete one Friend
     *   }
     * })
     * 
     */
    delete<T extends FriendDeleteArgs>(args: SelectSubset<T, FriendDeleteArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Friend.
     * @param {FriendUpdateArgs} args - Arguments to update one Friend.
     * @example
     * // Update one Friend
     * const friend = await prisma.friend.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FriendUpdateArgs>(args: SelectSubset<T, FriendUpdateArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Friends.
     * @param {FriendDeleteManyArgs} args - Arguments to filter Friends to delete.
     * @example
     * // Delete a few Friends
     * const { count } = await prisma.friend.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FriendDeleteManyArgs>(args?: SelectSubset<T, FriendDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FriendUpdateManyArgs>(args: SelectSubset<T, FriendUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Friends and returns the data updated in the database.
     * @param {FriendUpdateManyAndReturnArgs} args - Arguments to update many Friends.
     * @example
     * // Update many Friends
     * const friend = await prisma.friend.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Friends and only return the `id`
     * const friendWithIdOnly = await prisma.friend.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FriendUpdateManyAndReturnArgs>(args: SelectSubset<T, FriendUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Friend.
     * @param {FriendUpsertArgs} args - Arguments to update or create a Friend.
     * @example
     * // Update or create a Friend
     * const friend = await prisma.friend.upsert({
     *   create: {
     *     // ... data to create a Friend
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Friend we want to update
     *   }
     * })
     */
    upsert<T extends FriendUpsertArgs>(args: SelectSubset<T, FriendUpsertArgs<ExtArgs>>): Prisma__FriendClient<$Result.GetResult<Prisma.$FriendPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Friends.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendCountArgs} args - Arguments to filter Friends to count.
     * @example
     * // Count the number of Friends
     * const count = await prisma.friend.count({
     *   where: {
     *     // ... the filter for the Friends we want to count
     *   }
     * })
    **/
    count<T extends FriendCountArgs>(
      args?: Subset<T, FriendCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FriendCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FriendAggregateArgs>(args: Subset<T, FriendAggregateArgs>): Prisma.PrismaPromise<GetFriendAggregateType<T>>

    /**
     * Group by Friend.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FriendGroupByArgs} args - Group by arguments.
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
      T extends FriendGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FriendGroupByArgs['orderBy'] }
        : { orderBy?: FriendGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, FriendGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFriendGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Friend model
   */
  readonly fields: FriendFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Friend.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FriendClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    friend<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Friend model
   */
  interface FriendFieldRefs {
    readonly id: FieldRef<"Friend", 'String'>
    readonly userId: FieldRef<"Friend", 'String'>
    readonly friendId: FieldRef<"Friend", 'String'>
    readonly status: FieldRef<"Friend", 'FriendStatus'>
    readonly createdAt: FieldRef<"Friend", 'DateTime'>
    readonly updatedAt: FieldRef<"Friend", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Friend findUnique
   */
  export type FriendFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findUniqueOrThrow
   */
  export type FriendFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend findFirst
   */
  export type FriendFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findFirstOrThrow
   */
  export type FriendFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friend to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Friends.
     */
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend findMany
   */
  export type FriendFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter, which Friends to fetch.
     */
    where?: FriendWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Friends to fetch.
     */
    orderBy?: FriendOrderByWithRelationInput | FriendOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Friends.
     */
    cursor?: FriendWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Friends from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Friends.
     */
    skip?: number
    distinct?: FriendScalarFieldEnum | FriendScalarFieldEnum[]
  }

  /**
   * Friend create
   */
  export type FriendCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to create a Friend.
     */
    data: XOR<FriendCreateInput, FriendUncheckedCreateInput>
  }

  /**
   * Friend createMany
   */
  export type FriendCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Friend createManyAndReturn
   */
  export type FriendCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to create many Friends.
     */
    data: FriendCreateManyInput | FriendCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend update
   */
  export type FriendUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The data needed to update a Friend.
     */
    data: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
    /**
     * Choose, which Friend to update.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend updateMany
   */
  export type FriendUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
  }

  /**
   * Friend updateManyAndReturn
   */
  export type FriendUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * The data used to update Friends.
     */
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyInput>
    /**
     * Filter which Friends to update
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Friend upsert
   */
  export type FriendUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * The filter to search for the Friend to update in case it exists.
     */
    where: FriendWhereUniqueInput
    /**
     * In case the Friend found by the `where` argument doesn't exist, create a new Friend with this data.
     */
    create: XOR<FriendCreateInput, FriendUncheckedCreateInput>
    /**
     * In case the Friend was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FriendUpdateInput, FriendUncheckedUpdateInput>
  }

  /**
   * Friend delete
   */
  export type FriendDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
    /**
     * Filter which Friend to delete.
     */
    where: FriendWhereUniqueInput
  }

  /**
   * Friend deleteMany
   */
  export type FriendDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Friends to delete
     */
    where?: FriendWhereInput
    /**
     * Limit how many Friends to delete.
     */
    limit?: number
  }

  /**
   * Friend without action
   */
  export type FriendDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Friend
     */
    select?: FriendSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Friend
     */
    omit?: FriendOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FriendInclude<ExtArgs> | null
  }


  /**
   * Model Inquiry
   */

  export type AggregateInquiry = {
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  export type InquiryMinAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    subject: string | null
    status: $Enums.InquiryStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InquiryMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    email: string | null
    subject: string | null
    status: $Enums.InquiryStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InquiryCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    subject: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InquiryMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    subject?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InquiryMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    subject?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InquiryCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    subject?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InquiryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiry to aggregate.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inquiries
    **/
    _count?: true | InquiryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryMaxAggregateInputType
  }

  export type GetInquiryAggregateType<T extends InquiryAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiry[P]>
      : GetScalarType<T[P], AggregateInquiry[P]>
  }




  export type InquiryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryWhereInput
    orderBy?: InquiryOrderByWithAggregationInput | InquiryOrderByWithAggregationInput[]
    by: InquiryScalarFieldEnum[] | InquiryScalarFieldEnum
    having?: InquiryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryCountAggregateInputType | true
    _min?: InquiryMinAggregateInputType
    _max?: InquiryMaxAggregateInputType
  }

  export type InquiryGroupByOutputType = {
    id: string
    userId: string | null
    email: string
    subject: string
    status: $Enums.InquiryStatus
    createdAt: Date
    updatedAt: Date
    _count: InquiryCountAggregateOutputType | null
    _min: InquiryMinAggregateOutputType | null
    _max: InquiryMaxAggregateOutputType | null
  }

  type GetInquiryGroupByPayload<T extends InquiryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryGroupByOutputType[P]>
        }
      >
    >


  export type InquirySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    subject?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Inquiry$userArgs<ExtArgs>
    messages?: boolean | Inquiry$messagesArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    subject?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Inquiry$userArgs<ExtArgs>
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    subject?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | Inquiry$userArgs<ExtArgs>
  }, ExtArgs["result"]["inquiry"]>

  export type InquirySelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    subject?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InquiryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "subject" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["inquiry"]>
  export type InquiryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Inquiry$userArgs<ExtArgs>
    messages?: boolean | Inquiry$messagesArgs<ExtArgs>
    _count?: boolean | InquiryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InquiryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Inquiry$userArgs<ExtArgs>
  }
  export type InquiryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Inquiry$userArgs<ExtArgs>
  }

  export type $InquiryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inquiry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      messages: Prisma.$InquiryMessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      email: string
      subject: string
      status: $Enums.InquiryStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["inquiry"]>
    composites: {}
  }

  type InquiryGetPayload<S extends boolean | null | undefined | InquiryDefaultArgs> = $Result.GetResult<Prisma.$InquiryPayload, S>

  type InquiryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquiryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquiryCountAggregateInputType | true
    }

  export interface InquiryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inquiry'], meta: { name: 'Inquiry' } }
    /**
     * Find zero or one Inquiry that matches the filter.
     * @param {InquiryFindUniqueArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquiryFindUniqueArgs>(args: SelectSubset<T, InquiryFindUniqueArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inquiry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquiryFindUniqueOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquiryFindUniqueOrThrowArgs>(args: SelectSubset<T, InquiryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquiryFindFirstArgs>(args?: SelectSubset<T, InquiryFindFirstArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inquiry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindFirstOrThrowArgs} args - Arguments to find a Inquiry
     * @example
     * // Get one Inquiry
     * const inquiry = await prisma.inquiry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquiryFindFirstOrThrowArgs>(args?: SelectSubset<T, InquiryFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inquiries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inquiries
     * const inquiries = await prisma.inquiry.findMany()
     * 
     * // Get first 10 Inquiries
     * const inquiries = await prisma.inquiry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquiryFindManyArgs>(args?: SelectSubset<T, InquiryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inquiry.
     * @param {InquiryCreateArgs} args - Arguments to create a Inquiry.
     * @example
     * // Create one Inquiry
     * const Inquiry = await prisma.inquiry.create({
     *   data: {
     *     // ... data to create a Inquiry
     *   }
     * })
     * 
     */
    create<T extends InquiryCreateArgs>(args: SelectSubset<T, InquiryCreateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inquiries.
     * @param {InquiryCreateManyArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquiryCreateManyArgs>(args?: SelectSubset<T, InquiryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inquiries and returns the data saved in the database.
     * @param {InquiryCreateManyAndReturnArgs} args - Arguments to create many Inquiries.
     * @example
     * // Create many Inquiries
     * const inquiry = await prisma.inquiry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inquiries and only return the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InquiryCreateManyAndReturnArgs>(args?: SelectSubset<T, InquiryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inquiry.
     * @param {InquiryDeleteArgs} args - Arguments to delete one Inquiry.
     * @example
     * // Delete one Inquiry
     * const Inquiry = await prisma.inquiry.delete({
     *   where: {
     *     // ... filter to delete one Inquiry
     *   }
     * })
     * 
     */
    delete<T extends InquiryDeleteArgs>(args: SelectSubset<T, InquiryDeleteArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inquiry.
     * @param {InquiryUpdateArgs} args - Arguments to update one Inquiry.
     * @example
     * // Update one Inquiry
     * const inquiry = await prisma.inquiry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquiryUpdateArgs>(args: SelectSubset<T, InquiryUpdateArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inquiries.
     * @param {InquiryDeleteManyArgs} args - Arguments to filter Inquiries to delete.
     * @example
     * // Delete a few Inquiries
     * const { count } = await prisma.inquiry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquiryDeleteManyArgs>(args?: SelectSubset<T, InquiryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquiryUpdateManyArgs>(args: SelectSubset<T, InquiryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inquiries and returns the data updated in the database.
     * @param {InquiryUpdateManyAndReturnArgs} args - Arguments to update many Inquiries.
     * @example
     * // Update many Inquiries
     * const inquiry = await prisma.inquiry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inquiries and only return the `id`
     * const inquiryWithIdOnly = await prisma.inquiry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InquiryUpdateManyAndReturnArgs>(args: SelectSubset<T, InquiryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inquiry.
     * @param {InquiryUpsertArgs} args - Arguments to update or create a Inquiry.
     * @example
     * // Update or create a Inquiry
     * const inquiry = await prisma.inquiry.upsert({
     *   create: {
     *     // ... data to create a Inquiry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inquiry we want to update
     *   }
     * })
     */
    upsert<T extends InquiryUpsertArgs>(args: SelectSubset<T, InquiryUpsertArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inquiries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryCountArgs} args - Arguments to filter Inquiries to count.
     * @example
     * // Count the number of Inquiries
     * const count = await prisma.inquiry.count({
     *   where: {
     *     // ... the filter for the Inquiries we want to count
     *   }
     * })
    **/
    count<T extends InquiryCountArgs>(
      args?: Subset<T, InquiryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InquiryAggregateArgs>(args: Subset<T, InquiryAggregateArgs>): Prisma.PrismaPromise<GetInquiryAggregateType<T>>

    /**
     * Group by Inquiry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryGroupByArgs} args - Group by arguments.
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
      T extends InquiryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryGroupByArgs['orderBy'] }
        : { orderBy?: InquiryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, InquiryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inquiry model
   */
  readonly fields: InquiryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inquiry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Inquiry$userArgs<ExtArgs> = {}>(args?: Subset<T, Inquiry$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Inquiry$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Inquiry$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inquiry model
   */
  interface InquiryFieldRefs {
    readonly id: FieldRef<"Inquiry", 'String'>
    readonly userId: FieldRef<"Inquiry", 'String'>
    readonly email: FieldRef<"Inquiry", 'String'>
    readonly subject: FieldRef<"Inquiry", 'String'>
    readonly status: FieldRef<"Inquiry", 'InquiryStatus'>
    readonly createdAt: FieldRef<"Inquiry", 'DateTime'>
    readonly updatedAt: FieldRef<"Inquiry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Inquiry findUnique
   */
  export type InquiryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findUniqueOrThrow
   */
  export type InquiryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry findFirst
   */
  export type InquiryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findFirstOrThrow
   */
  export type InquiryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiry to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inquiries.
     */
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry findMany
   */
  export type InquiryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter, which Inquiries to fetch.
     */
    where?: InquiryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inquiries to fetch.
     */
    orderBy?: InquiryOrderByWithRelationInput | InquiryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inquiries.
     */
    cursor?: InquiryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inquiries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inquiries.
     */
    skip?: number
    distinct?: InquiryScalarFieldEnum | InquiryScalarFieldEnum[]
  }

  /**
   * Inquiry create
   */
  export type InquiryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to create a Inquiry.
     */
    data: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
  }

  /**
   * Inquiry createMany
   */
  export type InquiryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inquiry createManyAndReturn
   */
  export type InquiryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data used to create many Inquiries.
     */
    data: InquiryCreateManyInput | InquiryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inquiry update
   */
  export type InquiryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The data needed to update a Inquiry.
     */
    data: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
    /**
     * Choose, which Inquiry to update.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry updateMany
   */
  export type InquiryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to update.
     */
    limit?: number
  }

  /**
   * Inquiry updateManyAndReturn
   */
  export type InquiryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * The data used to update Inquiries.
     */
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyInput>
    /**
     * Filter which Inquiries to update
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inquiry upsert
   */
  export type InquiryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * The filter to search for the Inquiry to update in case it exists.
     */
    where: InquiryWhereUniqueInput
    /**
     * In case the Inquiry found by the `where` argument doesn't exist, create a new Inquiry with this data.
     */
    create: XOR<InquiryCreateInput, InquiryUncheckedCreateInput>
    /**
     * In case the Inquiry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryUpdateInput, InquiryUncheckedUpdateInput>
  }

  /**
   * Inquiry delete
   */
  export type InquiryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
    /**
     * Filter which Inquiry to delete.
     */
    where: InquiryWhereUniqueInput
  }

  /**
   * Inquiry deleteMany
   */
  export type InquiryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inquiries to delete
     */
    where?: InquiryWhereInput
    /**
     * Limit how many Inquiries to delete.
     */
    limit?: number
  }

  /**
   * Inquiry.user
   */
  export type Inquiry$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Inquiry.messages
   */
  export type Inquiry$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    where?: InquiryMessageWhereInput
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    cursor?: InquiryMessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InquiryMessageScalarFieldEnum | InquiryMessageScalarFieldEnum[]
  }

  /**
   * Inquiry without action
   */
  export type InquiryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inquiry
     */
    select?: InquirySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inquiry
     */
    omit?: InquiryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryInclude<ExtArgs> | null
  }


  /**
   * Model InquiryMessage
   */

  export type AggregateInquiryMessage = {
    _count: InquiryMessageCountAggregateOutputType | null
    _min: InquiryMessageMinAggregateOutputType | null
    _max: InquiryMessageMaxAggregateOutputType | null
  }

  export type InquiryMessageMinAggregateOutputType = {
    id: string | null
    inquiryId: string | null
    senderRole: $Enums.InquirySenderRole | null
    body: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type InquiryMessageMaxAggregateOutputType = {
    id: string | null
    inquiryId: string | null
    senderRole: $Enums.InquirySenderRole | null
    body: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type InquiryMessageCountAggregateOutputType = {
    id: number
    inquiryId: number
    senderRole: number
    body: number
    userId: number
    createdAt: number
    _all: number
  }


  export type InquiryMessageMinAggregateInputType = {
    id?: true
    inquiryId?: true
    senderRole?: true
    body?: true
    userId?: true
    createdAt?: true
  }

  export type InquiryMessageMaxAggregateInputType = {
    id?: true
    inquiryId?: true
    senderRole?: true
    body?: true
    userId?: true
    createdAt?: true
  }

  export type InquiryMessageCountAggregateInputType = {
    id?: true
    inquiryId?: true
    senderRole?: true
    body?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type InquiryMessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryMessage to aggregate.
     */
    where?: InquiryMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryMessages to fetch.
     */
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InquiryMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InquiryMessages
    **/
    _count?: true | InquiryMessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InquiryMessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InquiryMessageMaxAggregateInputType
  }

  export type GetInquiryMessageAggregateType<T extends InquiryMessageAggregateArgs> = {
        [P in keyof T & keyof AggregateInquiryMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInquiryMessage[P]>
      : GetScalarType<T[P], AggregateInquiryMessage[P]>
  }




  export type InquiryMessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InquiryMessageWhereInput
    orderBy?: InquiryMessageOrderByWithAggregationInput | InquiryMessageOrderByWithAggregationInput[]
    by: InquiryMessageScalarFieldEnum[] | InquiryMessageScalarFieldEnum
    having?: InquiryMessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InquiryMessageCountAggregateInputType | true
    _min?: InquiryMessageMinAggregateInputType
    _max?: InquiryMessageMaxAggregateInputType
  }

  export type InquiryMessageGroupByOutputType = {
    id: string
    inquiryId: string
    senderRole: $Enums.InquirySenderRole
    body: string
    userId: string | null
    createdAt: Date
    _count: InquiryMessageCountAggregateOutputType | null
    _min: InquiryMessageMinAggregateOutputType | null
    _max: InquiryMessageMaxAggregateOutputType | null
  }

  type GetInquiryMessageGroupByPayload<T extends InquiryMessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InquiryMessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InquiryMessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InquiryMessageGroupByOutputType[P]>
            : GetScalarType<T[P], InquiryMessageGroupByOutputType[P]>
        }
      >
    >


  export type InquiryMessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquiryId?: boolean
    senderRole?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }, ExtArgs["result"]["inquiryMessage"]>

  export type InquiryMessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquiryId?: boolean
    senderRole?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }, ExtArgs["result"]["inquiryMessage"]>

  export type InquiryMessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    inquiryId?: boolean
    senderRole?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }, ExtArgs["result"]["inquiryMessage"]>

  export type InquiryMessageSelectScalar = {
    id?: boolean
    inquiryId?: boolean
    senderRole?: boolean
    body?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type InquiryMessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "inquiryId" | "senderRole" | "body" | "userId" | "createdAt", ExtArgs["result"]["inquiryMessage"]>
  export type InquiryMessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }
  export type InquiryMessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }
  export type InquiryMessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    inquiry?: boolean | InquiryDefaultArgs<ExtArgs>
    user?: boolean | InquiryMessage$userArgs<ExtArgs>
  }

  export type $InquiryMessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InquiryMessage"
    objects: {
      inquiry: Prisma.$InquiryPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      inquiryId: string
      senderRole: $Enums.InquirySenderRole
      body: string
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["inquiryMessage"]>
    composites: {}
  }

  type InquiryMessageGetPayload<S extends boolean | null | undefined | InquiryMessageDefaultArgs> = $Result.GetResult<Prisma.$InquiryMessagePayload, S>

  type InquiryMessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InquiryMessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InquiryMessageCountAggregateInputType | true
    }

  export interface InquiryMessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InquiryMessage'], meta: { name: 'InquiryMessage' } }
    /**
     * Find zero or one InquiryMessage that matches the filter.
     * @param {InquiryMessageFindUniqueArgs} args - Arguments to find a InquiryMessage
     * @example
     * // Get one InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InquiryMessageFindUniqueArgs>(args: SelectSubset<T, InquiryMessageFindUniqueArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InquiryMessage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InquiryMessageFindUniqueOrThrowArgs} args - Arguments to find a InquiryMessage
     * @example
     * // Get one InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InquiryMessageFindUniqueOrThrowArgs>(args: SelectSubset<T, InquiryMessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InquiryMessage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageFindFirstArgs} args - Arguments to find a InquiryMessage
     * @example
     * // Get one InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InquiryMessageFindFirstArgs>(args?: SelectSubset<T, InquiryMessageFindFirstArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InquiryMessage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageFindFirstOrThrowArgs} args - Arguments to find a InquiryMessage
     * @example
     * // Get one InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InquiryMessageFindFirstOrThrowArgs>(args?: SelectSubset<T, InquiryMessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InquiryMessages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InquiryMessages
     * const inquiryMessages = await prisma.inquiryMessage.findMany()
     * 
     * // Get first 10 InquiryMessages
     * const inquiryMessages = await prisma.inquiryMessage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const inquiryMessageWithIdOnly = await prisma.inquiryMessage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InquiryMessageFindManyArgs>(args?: SelectSubset<T, InquiryMessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InquiryMessage.
     * @param {InquiryMessageCreateArgs} args - Arguments to create a InquiryMessage.
     * @example
     * // Create one InquiryMessage
     * const InquiryMessage = await prisma.inquiryMessage.create({
     *   data: {
     *     // ... data to create a InquiryMessage
     *   }
     * })
     * 
     */
    create<T extends InquiryMessageCreateArgs>(args: SelectSubset<T, InquiryMessageCreateArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InquiryMessages.
     * @param {InquiryMessageCreateManyArgs} args - Arguments to create many InquiryMessages.
     * @example
     * // Create many InquiryMessages
     * const inquiryMessage = await prisma.inquiryMessage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InquiryMessageCreateManyArgs>(args?: SelectSubset<T, InquiryMessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InquiryMessages and returns the data saved in the database.
     * @param {InquiryMessageCreateManyAndReturnArgs} args - Arguments to create many InquiryMessages.
     * @example
     * // Create many InquiryMessages
     * const inquiryMessage = await prisma.inquiryMessage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InquiryMessages and only return the `id`
     * const inquiryMessageWithIdOnly = await prisma.inquiryMessage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InquiryMessageCreateManyAndReturnArgs>(args?: SelectSubset<T, InquiryMessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InquiryMessage.
     * @param {InquiryMessageDeleteArgs} args - Arguments to delete one InquiryMessage.
     * @example
     * // Delete one InquiryMessage
     * const InquiryMessage = await prisma.inquiryMessage.delete({
     *   where: {
     *     // ... filter to delete one InquiryMessage
     *   }
     * })
     * 
     */
    delete<T extends InquiryMessageDeleteArgs>(args: SelectSubset<T, InquiryMessageDeleteArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InquiryMessage.
     * @param {InquiryMessageUpdateArgs} args - Arguments to update one InquiryMessage.
     * @example
     * // Update one InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InquiryMessageUpdateArgs>(args: SelectSubset<T, InquiryMessageUpdateArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InquiryMessages.
     * @param {InquiryMessageDeleteManyArgs} args - Arguments to filter InquiryMessages to delete.
     * @example
     * // Delete a few InquiryMessages
     * const { count } = await prisma.inquiryMessage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InquiryMessageDeleteManyArgs>(args?: SelectSubset<T, InquiryMessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InquiryMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InquiryMessages
     * const inquiryMessage = await prisma.inquiryMessage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InquiryMessageUpdateManyArgs>(args: SelectSubset<T, InquiryMessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InquiryMessages and returns the data updated in the database.
     * @param {InquiryMessageUpdateManyAndReturnArgs} args - Arguments to update many InquiryMessages.
     * @example
     * // Update many InquiryMessages
     * const inquiryMessage = await prisma.inquiryMessage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InquiryMessages and only return the `id`
     * const inquiryMessageWithIdOnly = await prisma.inquiryMessage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InquiryMessageUpdateManyAndReturnArgs>(args: SelectSubset<T, InquiryMessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InquiryMessage.
     * @param {InquiryMessageUpsertArgs} args - Arguments to update or create a InquiryMessage.
     * @example
     * // Update or create a InquiryMessage
     * const inquiryMessage = await prisma.inquiryMessage.upsert({
     *   create: {
     *     // ... data to create a InquiryMessage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InquiryMessage we want to update
     *   }
     * })
     */
    upsert<T extends InquiryMessageUpsertArgs>(args: SelectSubset<T, InquiryMessageUpsertArgs<ExtArgs>>): Prisma__InquiryMessageClient<$Result.GetResult<Prisma.$InquiryMessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InquiryMessages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageCountArgs} args - Arguments to filter InquiryMessages to count.
     * @example
     * // Count the number of InquiryMessages
     * const count = await prisma.inquiryMessage.count({
     *   where: {
     *     // ... the filter for the InquiryMessages we want to count
     *   }
     * })
    **/
    count<T extends InquiryMessageCountArgs>(
      args?: Subset<T, InquiryMessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InquiryMessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InquiryMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends InquiryMessageAggregateArgs>(args: Subset<T, InquiryMessageAggregateArgs>): Prisma.PrismaPromise<GetInquiryMessageAggregateType<T>>

    /**
     * Group by InquiryMessage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InquiryMessageGroupByArgs} args - Group by arguments.
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
      T extends InquiryMessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InquiryMessageGroupByArgs['orderBy'] }
        : { orderBy?: InquiryMessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, InquiryMessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInquiryMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InquiryMessage model
   */
  readonly fields: InquiryMessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InquiryMessage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InquiryMessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    inquiry<T extends InquiryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InquiryDefaultArgs<ExtArgs>>): Prisma__InquiryClient<$Result.GetResult<Prisma.$InquiryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends InquiryMessage$userArgs<ExtArgs> = {}>(args?: Subset<T, InquiryMessage$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InquiryMessage model
   */
  interface InquiryMessageFieldRefs {
    readonly id: FieldRef<"InquiryMessage", 'String'>
    readonly inquiryId: FieldRef<"InquiryMessage", 'String'>
    readonly senderRole: FieldRef<"InquiryMessage", 'InquirySenderRole'>
    readonly body: FieldRef<"InquiryMessage", 'String'>
    readonly userId: FieldRef<"InquiryMessage", 'String'>
    readonly createdAt: FieldRef<"InquiryMessage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InquiryMessage findUnique
   */
  export type InquiryMessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter, which InquiryMessage to fetch.
     */
    where: InquiryMessageWhereUniqueInput
  }

  /**
   * InquiryMessage findUniqueOrThrow
   */
  export type InquiryMessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter, which InquiryMessage to fetch.
     */
    where: InquiryMessageWhereUniqueInput
  }

  /**
   * InquiryMessage findFirst
   */
  export type InquiryMessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter, which InquiryMessage to fetch.
     */
    where?: InquiryMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryMessages to fetch.
     */
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryMessages.
     */
    cursor?: InquiryMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryMessages.
     */
    distinct?: InquiryMessageScalarFieldEnum | InquiryMessageScalarFieldEnum[]
  }

  /**
   * InquiryMessage findFirstOrThrow
   */
  export type InquiryMessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter, which InquiryMessage to fetch.
     */
    where?: InquiryMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryMessages to fetch.
     */
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InquiryMessages.
     */
    cursor?: InquiryMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryMessages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InquiryMessages.
     */
    distinct?: InquiryMessageScalarFieldEnum | InquiryMessageScalarFieldEnum[]
  }

  /**
   * InquiryMessage findMany
   */
  export type InquiryMessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter, which InquiryMessages to fetch.
     */
    where?: InquiryMessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InquiryMessages to fetch.
     */
    orderBy?: InquiryMessageOrderByWithRelationInput | InquiryMessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InquiryMessages.
     */
    cursor?: InquiryMessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InquiryMessages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InquiryMessages.
     */
    skip?: number
    distinct?: InquiryMessageScalarFieldEnum | InquiryMessageScalarFieldEnum[]
  }

  /**
   * InquiryMessage create
   */
  export type InquiryMessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * The data needed to create a InquiryMessage.
     */
    data: XOR<InquiryMessageCreateInput, InquiryMessageUncheckedCreateInput>
  }

  /**
   * InquiryMessage createMany
   */
  export type InquiryMessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InquiryMessages.
     */
    data: InquiryMessageCreateManyInput | InquiryMessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InquiryMessage createManyAndReturn
   */
  export type InquiryMessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * The data used to create many InquiryMessages.
     */
    data: InquiryMessageCreateManyInput | InquiryMessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InquiryMessage update
   */
  export type InquiryMessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * The data needed to update a InquiryMessage.
     */
    data: XOR<InquiryMessageUpdateInput, InquiryMessageUncheckedUpdateInput>
    /**
     * Choose, which InquiryMessage to update.
     */
    where: InquiryMessageWhereUniqueInput
  }

  /**
   * InquiryMessage updateMany
   */
  export type InquiryMessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InquiryMessages.
     */
    data: XOR<InquiryMessageUpdateManyMutationInput, InquiryMessageUncheckedUpdateManyInput>
    /**
     * Filter which InquiryMessages to update
     */
    where?: InquiryMessageWhereInput
    /**
     * Limit how many InquiryMessages to update.
     */
    limit?: number
  }

  /**
   * InquiryMessage updateManyAndReturn
   */
  export type InquiryMessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * The data used to update InquiryMessages.
     */
    data: XOR<InquiryMessageUpdateManyMutationInput, InquiryMessageUncheckedUpdateManyInput>
    /**
     * Filter which InquiryMessages to update
     */
    where?: InquiryMessageWhereInput
    /**
     * Limit how many InquiryMessages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InquiryMessage upsert
   */
  export type InquiryMessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * The filter to search for the InquiryMessage to update in case it exists.
     */
    where: InquiryMessageWhereUniqueInput
    /**
     * In case the InquiryMessage found by the `where` argument doesn't exist, create a new InquiryMessage with this data.
     */
    create: XOR<InquiryMessageCreateInput, InquiryMessageUncheckedCreateInput>
    /**
     * In case the InquiryMessage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InquiryMessageUpdateInput, InquiryMessageUncheckedUpdateInput>
  }

  /**
   * InquiryMessage delete
   */
  export type InquiryMessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
    /**
     * Filter which InquiryMessage to delete.
     */
    where: InquiryMessageWhereUniqueInput
  }

  /**
   * InquiryMessage deleteMany
   */
  export type InquiryMessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InquiryMessages to delete
     */
    where?: InquiryMessageWhereInput
    /**
     * Limit how many InquiryMessages to delete.
     */
    limit?: number
  }

  /**
   * InquiryMessage.user
   */
  export type InquiryMessage$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * InquiryMessage without action
   */
  export type InquiryMessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InquiryMessage
     */
    select?: InquiryMessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InquiryMessage
     */
    omit?: InquiryMessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InquiryMessageInclude<ExtArgs> | null
  }


  /**
   * Model Onboarding
   */

  export type AggregateOnboarding = {
    _count: OnboardingCountAggregateOutputType | null
    _min: OnboardingMinAggregateOutputType | null
    _max: OnboardingMaxAggregateOutputType | null
  }

  export type OnboardingMinAggregateOutputType = {
    id: string | null
    userId: string | null
    prayerKnowledge: string | null
    supportNeeded: string | null
    learnIslam: string | null
    whereDidYouHearAboutUs: string | null
    locationPermissionGranted: boolean | null
    locationCity: string | null
    locationTimezone: string | null
    notificationPermissionGranted: boolean | null
    notificationPreset: string | null
    defaultHomeTab: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OnboardingMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    prayerKnowledge: string | null
    supportNeeded: string | null
    learnIslam: string | null
    whereDidYouHearAboutUs: string | null
    locationPermissionGranted: boolean | null
    locationCity: string | null
    locationTimezone: string | null
    notificationPermissionGranted: boolean | null
    notificationPreset: string | null
    defaultHomeTab: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OnboardingCountAggregateOutputType = {
    id: number
    userId: number
    prayerKnowledge: number
    supportNeeded: number
    learnIslam: number
    whyHere: number
    whereDidYouHearAboutUs: number
    locationPermissionGranted: number
    locationCity: number
    locationTimezone: number
    notificationPermissionGranted: number
    notificationPreset: number
    enabledModules: number
    defaultHomeTab: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OnboardingMinAggregateInputType = {
    id?: true
    userId?: true
    prayerKnowledge?: true
    supportNeeded?: true
    learnIslam?: true
    whereDidYouHearAboutUs?: true
    locationPermissionGranted?: true
    locationCity?: true
    locationTimezone?: true
    notificationPermissionGranted?: true
    notificationPreset?: true
    defaultHomeTab?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OnboardingMaxAggregateInputType = {
    id?: true
    userId?: true
    prayerKnowledge?: true
    supportNeeded?: true
    learnIslam?: true
    whereDidYouHearAboutUs?: true
    locationPermissionGranted?: true
    locationCity?: true
    locationTimezone?: true
    notificationPermissionGranted?: true
    notificationPreset?: true
    defaultHomeTab?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OnboardingCountAggregateInputType = {
    id?: true
    userId?: true
    prayerKnowledge?: true
    supportNeeded?: true
    learnIslam?: true
    whyHere?: true
    whereDidYouHearAboutUs?: true
    locationPermissionGranted?: true
    locationCity?: true
    locationTimezone?: true
    notificationPermissionGranted?: true
    notificationPreset?: true
    enabledModules?: true
    defaultHomeTab?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OnboardingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Onboarding to aggregate.
     */
    where?: OnboardingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Onboardings to fetch.
     */
    orderBy?: OnboardingOrderByWithRelationInput | OnboardingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OnboardingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Onboardings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Onboardings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Onboardings
    **/
    _count?: true | OnboardingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OnboardingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OnboardingMaxAggregateInputType
  }

  export type GetOnboardingAggregateType<T extends OnboardingAggregateArgs> = {
        [P in keyof T & keyof AggregateOnboarding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOnboarding[P]>
      : GetScalarType<T[P], AggregateOnboarding[P]>
  }




  export type OnboardingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OnboardingWhereInput
    orderBy?: OnboardingOrderByWithAggregationInput | OnboardingOrderByWithAggregationInput[]
    by: OnboardingScalarFieldEnum[] | OnboardingScalarFieldEnum
    having?: OnboardingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OnboardingCountAggregateInputType | true
    _min?: OnboardingMinAggregateInputType
    _max?: OnboardingMaxAggregateInputType
  }

  export type OnboardingGroupByOutputType = {
    id: string
    userId: string
    prayerKnowledge: string | null
    supportNeeded: string | null
    learnIslam: string | null
    whyHere: JsonValue | null
    whereDidYouHearAboutUs: string | null
    locationPermissionGranted: boolean
    locationCity: string | null
    locationTimezone: string | null
    notificationPermissionGranted: boolean
    notificationPreset: string | null
    enabledModules: JsonValue | null
    defaultHomeTab: string | null
    createdAt: Date
    updatedAt: Date
    _count: OnboardingCountAggregateOutputType | null
    _min: OnboardingMinAggregateOutputType | null
    _max: OnboardingMaxAggregateOutputType | null
  }

  type GetOnboardingGroupByPayload<T extends OnboardingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OnboardingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OnboardingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OnboardingGroupByOutputType[P]>
            : GetScalarType<T[P], OnboardingGroupByOutputType[P]>
        }
      >
    >


  export type OnboardingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prayerKnowledge?: boolean
    supportNeeded?: boolean
    learnIslam?: boolean
    whyHere?: boolean
    whereDidYouHearAboutUs?: boolean
    locationPermissionGranted?: boolean
    locationCity?: boolean
    locationTimezone?: boolean
    notificationPermissionGranted?: boolean
    notificationPreset?: boolean
    enabledModules?: boolean
    defaultHomeTab?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onboarding"]>

  export type OnboardingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prayerKnowledge?: boolean
    supportNeeded?: boolean
    learnIslam?: boolean
    whyHere?: boolean
    whereDidYouHearAboutUs?: boolean
    locationPermissionGranted?: boolean
    locationCity?: boolean
    locationTimezone?: boolean
    notificationPermissionGranted?: boolean
    notificationPreset?: boolean
    enabledModules?: boolean
    defaultHomeTab?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onboarding"]>

  export type OnboardingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    prayerKnowledge?: boolean
    supportNeeded?: boolean
    learnIslam?: boolean
    whyHere?: boolean
    whereDidYouHearAboutUs?: boolean
    locationPermissionGranted?: boolean
    locationCity?: boolean
    locationTimezone?: boolean
    notificationPermissionGranted?: boolean
    notificationPreset?: boolean
    enabledModules?: boolean
    defaultHomeTab?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["onboarding"]>

  export type OnboardingSelectScalar = {
    id?: boolean
    userId?: boolean
    prayerKnowledge?: boolean
    supportNeeded?: boolean
    learnIslam?: boolean
    whyHere?: boolean
    whereDidYouHearAboutUs?: boolean
    locationPermissionGranted?: boolean
    locationCity?: boolean
    locationTimezone?: boolean
    notificationPermissionGranted?: boolean
    notificationPreset?: boolean
    enabledModules?: boolean
    defaultHomeTab?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OnboardingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "prayerKnowledge" | "supportNeeded" | "learnIslam" | "whyHere" | "whereDidYouHearAboutUs" | "locationPermissionGranted" | "locationCity" | "locationTimezone" | "notificationPermissionGranted" | "notificationPreset" | "enabledModules" | "defaultHomeTab" | "createdAt" | "updatedAt", ExtArgs["result"]["onboarding"]>
  export type OnboardingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OnboardingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OnboardingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OnboardingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Onboarding"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      prayerKnowledge: string | null
      supportNeeded: string | null
      learnIslam: string | null
      whyHere: Prisma.JsonValue | null
      whereDidYouHearAboutUs: string | null
      locationPermissionGranted: boolean
      locationCity: string | null
      locationTimezone: string | null
      notificationPermissionGranted: boolean
      notificationPreset: string | null
      enabledModules: Prisma.JsonValue | null
      defaultHomeTab: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["onboarding"]>
    composites: {}
  }

  type OnboardingGetPayload<S extends boolean | null | undefined | OnboardingDefaultArgs> = $Result.GetResult<Prisma.$OnboardingPayload, S>

  type OnboardingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OnboardingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OnboardingCountAggregateInputType | true
    }

  export interface OnboardingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Onboarding'], meta: { name: 'Onboarding' } }
    /**
     * Find zero or one Onboarding that matches the filter.
     * @param {OnboardingFindUniqueArgs} args - Arguments to find a Onboarding
     * @example
     * // Get one Onboarding
     * const onboarding = await prisma.onboarding.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OnboardingFindUniqueArgs>(args: SelectSubset<T, OnboardingFindUniqueArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Onboarding that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OnboardingFindUniqueOrThrowArgs} args - Arguments to find a Onboarding
     * @example
     * // Get one Onboarding
     * const onboarding = await prisma.onboarding.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OnboardingFindUniqueOrThrowArgs>(args: SelectSubset<T, OnboardingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Onboarding that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingFindFirstArgs} args - Arguments to find a Onboarding
     * @example
     * // Get one Onboarding
     * const onboarding = await prisma.onboarding.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OnboardingFindFirstArgs>(args?: SelectSubset<T, OnboardingFindFirstArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Onboarding that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingFindFirstOrThrowArgs} args - Arguments to find a Onboarding
     * @example
     * // Get one Onboarding
     * const onboarding = await prisma.onboarding.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OnboardingFindFirstOrThrowArgs>(args?: SelectSubset<T, OnboardingFindFirstOrThrowArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Onboardings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Onboardings
     * const onboardings = await prisma.onboarding.findMany()
     * 
     * // Get first 10 Onboardings
     * const onboardings = await prisma.onboarding.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const onboardingWithIdOnly = await prisma.onboarding.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OnboardingFindManyArgs>(args?: SelectSubset<T, OnboardingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Onboarding.
     * @param {OnboardingCreateArgs} args - Arguments to create a Onboarding.
     * @example
     * // Create one Onboarding
     * const Onboarding = await prisma.onboarding.create({
     *   data: {
     *     // ... data to create a Onboarding
     *   }
     * })
     * 
     */
    create<T extends OnboardingCreateArgs>(args: SelectSubset<T, OnboardingCreateArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Onboardings.
     * @param {OnboardingCreateManyArgs} args - Arguments to create many Onboardings.
     * @example
     * // Create many Onboardings
     * const onboarding = await prisma.onboarding.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OnboardingCreateManyArgs>(args?: SelectSubset<T, OnboardingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Onboardings and returns the data saved in the database.
     * @param {OnboardingCreateManyAndReturnArgs} args - Arguments to create many Onboardings.
     * @example
     * // Create many Onboardings
     * const onboarding = await prisma.onboarding.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Onboardings and only return the `id`
     * const onboardingWithIdOnly = await prisma.onboarding.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OnboardingCreateManyAndReturnArgs>(args?: SelectSubset<T, OnboardingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Onboarding.
     * @param {OnboardingDeleteArgs} args - Arguments to delete one Onboarding.
     * @example
     * // Delete one Onboarding
     * const Onboarding = await prisma.onboarding.delete({
     *   where: {
     *     // ... filter to delete one Onboarding
     *   }
     * })
     * 
     */
    delete<T extends OnboardingDeleteArgs>(args: SelectSubset<T, OnboardingDeleteArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Onboarding.
     * @param {OnboardingUpdateArgs} args - Arguments to update one Onboarding.
     * @example
     * // Update one Onboarding
     * const onboarding = await prisma.onboarding.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OnboardingUpdateArgs>(args: SelectSubset<T, OnboardingUpdateArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Onboardings.
     * @param {OnboardingDeleteManyArgs} args - Arguments to filter Onboardings to delete.
     * @example
     * // Delete a few Onboardings
     * const { count } = await prisma.onboarding.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OnboardingDeleteManyArgs>(args?: SelectSubset<T, OnboardingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Onboardings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Onboardings
     * const onboarding = await prisma.onboarding.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OnboardingUpdateManyArgs>(args: SelectSubset<T, OnboardingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Onboardings and returns the data updated in the database.
     * @param {OnboardingUpdateManyAndReturnArgs} args - Arguments to update many Onboardings.
     * @example
     * // Update many Onboardings
     * const onboarding = await prisma.onboarding.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Onboardings and only return the `id`
     * const onboardingWithIdOnly = await prisma.onboarding.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OnboardingUpdateManyAndReturnArgs>(args: SelectSubset<T, OnboardingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Onboarding.
     * @param {OnboardingUpsertArgs} args - Arguments to update or create a Onboarding.
     * @example
     * // Update or create a Onboarding
     * const onboarding = await prisma.onboarding.upsert({
     *   create: {
     *     // ... data to create a Onboarding
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Onboarding we want to update
     *   }
     * })
     */
    upsert<T extends OnboardingUpsertArgs>(args: SelectSubset<T, OnboardingUpsertArgs<ExtArgs>>): Prisma__OnboardingClient<$Result.GetResult<Prisma.$OnboardingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Onboardings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingCountArgs} args - Arguments to filter Onboardings to count.
     * @example
     * // Count the number of Onboardings
     * const count = await prisma.onboarding.count({
     *   where: {
     *     // ... the filter for the Onboardings we want to count
     *   }
     * })
    **/
    count<T extends OnboardingCountArgs>(
      args?: Subset<T, OnboardingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OnboardingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Onboarding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends OnboardingAggregateArgs>(args: Subset<T, OnboardingAggregateArgs>): Prisma.PrismaPromise<GetOnboardingAggregateType<T>>

    /**
     * Group by Onboarding.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OnboardingGroupByArgs} args - Group by arguments.
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
      T extends OnboardingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OnboardingGroupByArgs['orderBy'] }
        : { orderBy?: OnboardingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, OnboardingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOnboardingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Onboarding model
   */
  readonly fields: OnboardingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Onboarding.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OnboardingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Onboarding model
   */
  interface OnboardingFieldRefs {
    readonly id: FieldRef<"Onboarding", 'String'>
    readonly userId: FieldRef<"Onboarding", 'String'>
    readonly prayerKnowledge: FieldRef<"Onboarding", 'String'>
    readonly supportNeeded: FieldRef<"Onboarding", 'String'>
    readonly learnIslam: FieldRef<"Onboarding", 'String'>
    readonly whyHere: FieldRef<"Onboarding", 'Json'>
    readonly whereDidYouHearAboutUs: FieldRef<"Onboarding", 'String'>
    readonly locationPermissionGranted: FieldRef<"Onboarding", 'Boolean'>
    readonly locationCity: FieldRef<"Onboarding", 'String'>
    readonly locationTimezone: FieldRef<"Onboarding", 'String'>
    readonly notificationPermissionGranted: FieldRef<"Onboarding", 'Boolean'>
    readonly notificationPreset: FieldRef<"Onboarding", 'String'>
    readonly enabledModules: FieldRef<"Onboarding", 'Json'>
    readonly defaultHomeTab: FieldRef<"Onboarding", 'String'>
    readonly createdAt: FieldRef<"Onboarding", 'DateTime'>
    readonly updatedAt: FieldRef<"Onboarding", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Onboarding findUnique
   */
  export type OnboardingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter, which Onboarding to fetch.
     */
    where: OnboardingWhereUniqueInput
  }

  /**
   * Onboarding findUniqueOrThrow
   */
  export type OnboardingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter, which Onboarding to fetch.
     */
    where: OnboardingWhereUniqueInput
  }

  /**
   * Onboarding findFirst
   */
  export type OnboardingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter, which Onboarding to fetch.
     */
    where?: OnboardingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Onboardings to fetch.
     */
    orderBy?: OnboardingOrderByWithRelationInput | OnboardingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Onboardings.
     */
    cursor?: OnboardingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Onboardings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Onboardings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Onboardings.
     */
    distinct?: OnboardingScalarFieldEnum | OnboardingScalarFieldEnum[]
  }

  /**
   * Onboarding findFirstOrThrow
   */
  export type OnboardingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter, which Onboarding to fetch.
     */
    where?: OnboardingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Onboardings to fetch.
     */
    orderBy?: OnboardingOrderByWithRelationInput | OnboardingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Onboardings.
     */
    cursor?: OnboardingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Onboardings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Onboardings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Onboardings.
     */
    distinct?: OnboardingScalarFieldEnum | OnboardingScalarFieldEnum[]
  }

  /**
   * Onboarding findMany
   */
  export type OnboardingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter, which Onboardings to fetch.
     */
    where?: OnboardingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Onboardings to fetch.
     */
    orderBy?: OnboardingOrderByWithRelationInput | OnboardingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Onboardings.
     */
    cursor?: OnboardingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Onboardings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Onboardings.
     */
    skip?: number
    distinct?: OnboardingScalarFieldEnum | OnboardingScalarFieldEnum[]
  }

  /**
   * Onboarding create
   */
  export type OnboardingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * The data needed to create a Onboarding.
     */
    data: XOR<OnboardingCreateInput, OnboardingUncheckedCreateInput>
  }

  /**
   * Onboarding createMany
   */
  export type OnboardingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Onboardings.
     */
    data: OnboardingCreateManyInput | OnboardingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Onboarding createManyAndReturn
   */
  export type OnboardingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * The data used to create many Onboardings.
     */
    data: OnboardingCreateManyInput | OnboardingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Onboarding update
   */
  export type OnboardingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * The data needed to update a Onboarding.
     */
    data: XOR<OnboardingUpdateInput, OnboardingUncheckedUpdateInput>
    /**
     * Choose, which Onboarding to update.
     */
    where: OnboardingWhereUniqueInput
  }

  /**
   * Onboarding updateMany
   */
  export type OnboardingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Onboardings.
     */
    data: XOR<OnboardingUpdateManyMutationInput, OnboardingUncheckedUpdateManyInput>
    /**
     * Filter which Onboardings to update
     */
    where?: OnboardingWhereInput
    /**
     * Limit how many Onboardings to update.
     */
    limit?: number
  }

  /**
   * Onboarding updateManyAndReturn
   */
  export type OnboardingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * The data used to update Onboardings.
     */
    data: XOR<OnboardingUpdateManyMutationInput, OnboardingUncheckedUpdateManyInput>
    /**
     * Filter which Onboardings to update
     */
    where?: OnboardingWhereInput
    /**
     * Limit how many Onboardings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Onboarding upsert
   */
  export type OnboardingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * The filter to search for the Onboarding to update in case it exists.
     */
    where: OnboardingWhereUniqueInput
    /**
     * In case the Onboarding found by the `where` argument doesn't exist, create a new Onboarding with this data.
     */
    create: XOR<OnboardingCreateInput, OnboardingUncheckedCreateInput>
    /**
     * In case the Onboarding was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OnboardingUpdateInput, OnboardingUncheckedUpdateInput>
  }

  /**
   * Onboarding delete
   */
  export type OnboardingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
    /**
     * Filter which Onboarding to delete.
     */
    where: OnboardingWhereUniqueInput
  }

  /**
   * Onboarding deleteMany
   */
  export type OnboardingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Onboardings to delete
     */
    where?: OnboardingWhereInput
    /**
     * Limit how many Onboardings to delete.
     */
    limit?: number
  }

  /**
   * Onboarding without action
   */
  export type OnboardingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Onboarding
     */
    select?: OnboardingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Onboarding
     */
    omit?: OnboardingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OnboardingInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    locale: 'locale',
    pushToken: 'pushToken',
    totalPoints: 'totalPoints',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const PrayerScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    fajr: 'fajr',
    dhuhr: 'dhuhr',
    asr: 'asr',
    maghrib: 'maghrib',
    isha: 'isha',
    nafl: 'nafl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PrayerScalarFieldEnum = (typeof PrayerScalarFieldEnum)[keyof typeof PrayerScalarFieldEnum]


  export const FastingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    fasted: 'fasted',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FastingScalarFieldEnum = (typeof FastingScalarFieldEnum)[keyof typeof FastingScalarFieldEnum]


  export const FriendGroupScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendGroupScalarFieldEnum = (typeof FriendGroupScalarFieldEnum)[keyof typeof FriendGroupScalarFieldEnum]


  export const FriendGroupMemberScalarFieldEnum: {
    id: 'id',
    groupId: 'groupId',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type FriendGroupMemberScalarFieldEnum = (typeof FriendGroupMemberScalarFieldEnum)[keyof typeof FriendGroupMemberScalarFieldEnum]


  export const FriendScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    friendId: 'friendId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type FriendScalarFieldEnum = (typeof FriendScalarFieldEnum)[keyof typeof FriendScalarFieldEnum]


  export const InquiryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    subject: 'subject',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InquiryScalarFieldEnum = (typeof InquiryScalarFieldEnum)[keyof typeof InquiryScalarFieldEnum]


  export const InquiryMessageScalarFieldEnum: {
    id: 'id',
    inquiryId: 'inquiryId',
    senderRole: 'senderRole',
    body: 'body',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type InquiryMessageScalarFieldEnum = (typeof InquiryMessageScalarFieldEnum)[keyof typeof InquiryMessageScalarFieldEnum]


  export const OnboardingScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    prayerKnowledge: 'prayerKnowledge',
    supportNeeded: 'supportNeeded',
    learnIslam: 'learnIslam',
    whyHere: 'whyHere',
    whereDidYouHearAboutUs: 'whereDidYouHearAboutUs',
    locationPermissionGranted: 'locationPermissionGranted',
    locationCity: 'locationCity',
    locationTimezone: 'locationTimezone',
    notificationPermissionGranted: 'notificationPermissionGranted',
    notificationPreset: 'notificationPreset',
    enabledModules: 'enabledModules',
    defaultHomeTab: 'defaultHomeTab',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OnboardingScalarFieldEnum = (typeof OnboardingScalarFieldEnum)[keyof typeof OnboardingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'FriendStatus'
   */
  export type EnumFriendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendStatus'>
    


  /**
   * Reference to a field of type 'FriendStatus[]'
   */
  export type ListEnumFriendStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'FriendStatus[]'>
    


  /**
   * Reference to a field of type 'InquiryStatus'
   */
  export type EnumInquiryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryStatus'>
    


  /**
   * Reference to a field of type 'InquiryStatus[]'
   */
  export type ListEnumInquiryStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquiryStatus[]'>
    


  /**
   * Reference to a field of type 'InquirySenderRole'
   */
  export type EnumInquirySenderRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquirySenderRole'>
    


  /**
   * Reference to a field of type 'InquirySenderRole[]'
   */
  export type ListEnumInquirySenderRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'InquirySenderRole[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    locale?: StringNullableFilter<"User"> | string | null
    pushToken?: StringNullableFilter<"User"> | string | null
    totalPoints?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    prayers?: PrayerListRelationFilter
    inquiries?: InquiryListRelationFilter
    inquiryMessages?: InquiryMessageListRelationFilter
    fasting?: FastingListRelationFilter
    sentRequests?: FriendListRelationFilter
    receivedRequests?: FriendListRelationFilter
    friendGroups?: FriendGroupListRelationFilter
    groupMemberships?: FriendGroupMemberListRelationFilter
    onboarding?: XOR<OnboardingNullableScalarRelationFilter, OnboardingWhereInput> | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    pushToken?: SortOrderInput | SortOrder
    totalPoints?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    prayers?: PrayerOrderByRelationAggregateInput
    inquiries?: InquiryOrderByRelationAggregateInput
    inquiryMessages?: InquiryMessageOrderByRelationAggregateInput
    fasting?: FastingOrderByRelationAggregateInput
    sentRequests?: FriendOrderByRelationAggregateInput
    receivedRequests?: FriendOrderByRelationAggregateInput
    friendGroups?: FriendGroupOrderByRelationAggregateInput
    groupMemberships?: FriendGroupMemberOrderByRelationAggregateInput
    onboarding?: OnboardingOrderByWithRelationInput
    sessions?: SessionOrderByRelationAggregateInput
    accounts?: AccountOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    emailVerified?: BoolFilter<"User"> | boolean
    image?: StringNullableFilter<"User"> | string | null
    locale?: StringNullableFilter<"User"> | string | null
    pushToken?: StringNullableFilter<"User"> | string | null
    totalPoints?: IntNullableFilter<"User"> | number | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    prayers?: PrayerListRelationFilter
    inquiries?: InquiryListRelationFilter
    inquiryMessages?: InquiryMessageListRelationFilter
    fasting?: FastingListRelationFilter
    sentRequests?: FriendListRelationFilter
    receivedRequests?: FriendListRelationFilter
    friendGroups?: FriendGroupListRelationFilter
    groupMemberships?: FriendGroupMemberListRelationFilter
    onboarding?: XOR<OnboardingNullableScalarRelationFilter, OnboardingWhereInput> | null
    sessions?: SessionListRelationFilter
    accounts?: AccountListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    locale?: SortOrderInput | SortOrder
    pushToken?: SortOrderInput | SortOrder
    totalPoints?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    emailVerified?: BoolWithAggregatesFilter<"User"> | boolean
    image?: StringNullableWithAggregatesFilter<"User"> | string | null
    locale?: StringNullableWithAggregatesFilter<"User"> | string | null
    pushToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    totalPoints?: IntNullableWithAggregatesFilter<"User"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    token?: StringWithAggregatesFilter<"Session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userId?: StringWithAggregatesFilter<"Session"> | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Account"> | string
    accountId?: StringWithAggregatesFilter<"Account"> | string
    providerId?: StringWithAggregatesFilter<"Account"> | string
    userId?: StringWithAggregatesFilter<"Account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"Account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"Account"> | string | null
    password?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type VerificationWhereInput = {
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    id?: StringFilter<"Verification"> | string
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }

  export type VerificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VerificationWhereInput | VerificationWhereInput[]
    OR?: VerificationWhereInput[]
    NOT?: VerificationWhereInput | VerificationWhereInput[]
    identifier?: StringFilter<"Verification"> | string
    value?: StringFilter<"Verification"> | string
    expiresAt?: DateTimeFilter<"Verification"> | Date | string
    createdAt?: DateTimeFilter<"Verification"> | Date | string
    updatedAt?: DateTimeFilter<"Verification"> | Date | string
  }, "id">

  export type VerificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VerificationCountOrderByAggregateInput
    _max?: VerificationMaxOrderByAggregateInput
    _min?: VerificationMinOrderByAggregateInput
  }

  export type VerificationScalarWhereWithAggregatesInput = {
    AND?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    OR?: VerificationScalarWhereWithAggregatesInput[]
    NOT?: VerificationScalarWhereWithAggregatesInput | VerificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Verification"> | string
    identifier?: StringWithAggregatesFilter<"Verification"> | string
    value?: StringWithAggregatesFilter<"Verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Verification"> | Date | string
  }

  export type PrayerWhereInput = {
    AND?: PrayerWhereInput | PrayerWhereInput[]
    OR?: PrayerWhereInput[]
    NOT?: PrayerWhereInput | PrayerWhereInput[]
    id?: StringFilter<"Prayer"> | string
    userId?: StringFilter<"Prayer"> | string
    date?: DateTimeFilter<"Prayer"> | Date | string
    fajr?: IntFilter<"Prayer"> | number
    dhuhr?: IntFilter<"Prayer"> | number
    asr?: IntFilter<"Prayer"> | number
    maghrib?: IntFilter<"Prayer"> | number
    isha?: IntFilter<"Prayer"> | number
    nafl?: IntFilter<"Prayer"> | number
    createdAt?: DateTimeFilter<"Prayer"> | Date | string
    updatedAt?: DateTimeFilter<"Prayer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type PrayerOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PrayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: PrayerUserIdDateCompoundUniqueInput
    AND?: PrayerWhereInput | PrayerWhereInput[]
    OR?: PrayerWhereInput[]
    NOT?: PrayerWhereInput | PrayerWhereInput[]
    userId?: StringFilter<"Prayer"> | string
    date?: DateTimeFilter<"Prayer"> | Date | string
    fajr?: IntFilter<"Prayer"> | number
    dhuhr?: IntFilter<"Prayer"> | number
    asr?: IntFilter<"Prayer"> | number
    maghrib?: IntFilter<"Prayer"> | number
    isha?: IntFilter<"Prayer"> | number
    nafl?: IntFilter<"Prayer"> | number
    createdAt?: DateTimeFilter<"Prayer"> | Date | string
    updatedAt?: DateTimeFilter<"Prayer"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type PrayerOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PrayerCountOrderByAggregateInput
    _avg?: PrayerAvgOrderByAggregateInput
    _max?: PrayerMaxOrderByAggregateInput
    _min?: PrayerMinOrderByAggregateInput
    _sum?: PrayerSumOrderByAggregateInput
  }

  export type PrayerScalarWhereWithAggregatesInput = {
    AND?: PrayerScalarWhereWithAggregatesInput | PrayerScalarWhereWithAggregatesInput[]
    OR?: PrayerScalarWhereWithAggregatesInput[]
    NOT?: PrayerScalarWhereWithAggregatesInput | PrayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Prayer"> | string
    userId?: StringWithAggregatesFilter<"Prayer"> | string
    date?: DateTimeWithAggregatesFilter<"Prayer"> | Date | string
    fajr?: IntWithAggregatesFilter<"Prayer"> | number
    dhuhr?: IntWithAggregatesFilter<"Prayer"> | number
    asr?: IntWithAggregatesFilter<"Prayer"> | number
    maghrib?: IntWithAggregatesFilter<"Prayer"> | number
    isha?: IntWithAggregatesFilter<"Prayer"> | number
    nafl?: IntWithAggregatesFilter<"Prayer"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Prayer"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Prayer"> | Date | string
  }

  export type FastingWhereInput = {
    AND?: FastingWhereInput | FastingWhereInput[]
    OR?: FastingWhereInput[]
    NOT?: FastingWhereInput | FastingWhereInput[]
    id?: StringFilter<"Fasting"> | string
    userId?: StringFilter<"Fasting"> | string
    date?: DateTimeFilter<"Fasting"> | Date | string
    fasted?: BoolFilter<"Fasting"> | boolean
    createdAt?: DateTimeFilter<"Fasting"> | Date | string
    updatedAt?: DateTimeFilter<"Fasting"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FastingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fasted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FastingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: FastingUserIdDateCompoundUniqueInput
    AND?: FastingWhereInput | FastingWhereInput[]
    OR?: FastingWhereInput[]
    NOT?: FastingWhereInput | FastingWhereInput[]
    userId?: StringFilter<"Fasting"> | string
    date?: DateTimeFilter<"Fasting"> | Date | string
    fasted?: BoolFilter<"Fasting"> | boolean
    createdAt?: DateTimeFilter<"Fasting"> | Date | string
    updatedAt?: DateTimeFilter<"Fasting"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_date">

  export type FastingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fasted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FastingCountOrderByAggregateInput
    _max?: FastingMaxOrderByAggregateInput
    _min?: FastingMinOrderByAggregateInput
  }

  export type FastingScalarWhereWithAggregatesInput = {
    AND?: FastingScalarWhereWithAggregatesInput | FastingScalarWhereWithAggregatesInput[]
    OR?: FastingScalarWhereWithAggregatesInput[]
    NOT?: FastingScalarWhereWithAggregatesInput | FastingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Fasting"> | string
    userId?: StringWithAggregatesFilter<"Fasting"> | string
    date?: DateTimeWithAggregatesFilter<"Fasting"> | Date | string
    fasted?: BoolWithAggregatesFilter<"Fasting"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Fasting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Fasting"> | Date | string
  }

  export type FriendGroupWhereInput = {
    AND?: FriendGroupWhereInput | FriendGroupWhereInput[]
    OR?: FriendGroupWhereInput[]
    NOT?: FriendGroupWhereInput | FriendGroupWhereInput[]
    id?: StringFilter<"FriendGroup"> | string
    name?: StringFilter<"FriendGroup"> | string
    userId?: StringFilter<"FriendGroup"> | string
    createdAt?: DateTimeFilter<"FriendGroup"> | Date | string
    updatedAt?: DateTimeFilter<"FriendGroup"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: FriendGroupMemberListRelationFilter
  }

  export type FriendGroupOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    members?: FriendGroupMemberOrderByRelationAggregateInput
  }

  export type FriendGroupWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FriendGroupWhereInput | FriendGroupWhereInput[]
    OR?: FriendGroupWhereInput[]
    NOT?: FriendGroupWhereInput | FriendGroupWhereInput[]
    name?: StringFilter<"FriendGroup"> | string
    userId?: StringFilter<"FriendGroup"> | string
    createdAt?: DateTimeFilter<"FriendGroup"> | Date | string
    updatedAt?: DateTimeFilter<"FriendGroup"> | Date | string
    owner?: XOR<UserScalarRelationFilter, UserWhereInput>
    members?: FriendGroupMemberListRelationFilter
  }, "id">

  export type FriendGroupOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendGroupCountOrderByAggregateInput
    _max?: FriendGroupMaxOrderByAggregateInput
    _min?: FriendGroupMinOrderByAggregateInput
  }

  export type FriendGroupScalarWhereWithAggregatesInput = {
    AND?: FriendGroupScalarWhereWithAggregatesInput | FriendGroupScalarWhereWithAggregatesInput[]
    OR?: FriendGroupScalarWhereWithAggregatesInput[]
    NOT?: FriendGroupScalarWhereWithAggregatesInput | FriendGroupScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendGroup"> | string
    name?: StringWithAggregatesFilter<"FriendGroup"> | string
    userId?: StringWithAggregatesFilter<"FriendGroup"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FriendGroup"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"FriendGroup"> | Date | string
  }

  export type FriendGroupMemberWhereInput = {
    AND?: FriendGroupMemberWhereInput | FriendGroupMemberWhereInput[]
    OR?: FriendGroupMemberWhereInput[]
    NOT?: FriendGroupMemberWhereInput | FriendGroupMemberWhereInput[]
    id?: StringFilter<"FriendGroupMember"> | string
    groupId?: StringFilter<"FriendGroupMember"> | string
    userId?: StringFilter<"FriendGroupMember"> | string
    createdAt?: DateTimeFilter<"FriendGroupMember"> | Date | string
    group?: XOR<FriendGroupScalarRelationFilter, FriendGroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendGroupMemberOrderByWithRelationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    group?: FriendGroupOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type FriendGroupMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    groupId_userId?: FriendGroupMemberGroupIdUserIdCompoundUniqueInput
    AND?: FriendGroupMemberWhereInput | FriendGroupMemberWhereInput[]
    OR?: FriendGroupMemberWhereInput[]
    NOT?: FriendGroupMemberWhereInput | FriendGroupMemberWhereInput[]
    groupId?: StringFilter<"FriendGroupMember"> | string
    userId?: StringFilter<"FriendGroupMember"> | string
    createdAt?: DateTimeFilter<"FriendGroupMember"> | Date | string
    group?: XOR<FriendGroupScalarRelationFilter, FriendGroupWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "groupId_userId">

  export type FriendGroupMemberOrderByWithAggregationInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: FriendGroupMemberCountOrderByAggregateInput
    _max?: FriendGroupMemberMaxOrderByAggregateInput
    _min?: FriendGroupMemberMinOrderByAggregateInput
  }

  export type FriendGroupMemberScalarWhereWithAggregatesInput = {
    AND?: FriendGroupMemberScalarWhereWithAggregatesInput | FriendGroupMemberScalarWhereWithAggregatesInput[]
    OR?: FriendGroupMemberScalarWhereWithAggregatesInput[]
    NOT?: FriendGroupMemberScalarWhereWithAggregatesInput | FriendGroupMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"FriendGroupMember"> | string
    groupId?: StringWithAggregatesFilter<"FriendGroupMember"> | string
    userId?: StringWithAggregatesFilter<"FriendGroupMember"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FriendGroupMember"> | Date | string
  }

  export type FriendWhereInput = {
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    id?: StringFilter<"Friend"> | string
    userId?: StringFilter<"Friend"> | string
    friendId?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    updatedAt?: DateTimeFilter<"Friend"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type FriendOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    friend?: UserOrderByWithRelationInput
  }

  export type FriendWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_friendId?: FriendUserIdFriendIdCompoundUniqueInput
    AND?: FriendWhereInput | FriendWhereInput[]
    OR?: FriendWhereInput[]
    NOT?: FriendWhereInput | FriendWhereInput[]
    userId?: StringFilter<"Friend"> | string
    friendId?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    updatedAt?: DateTimeFilter<"Friend"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    friend?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId_friendId">

  export type FriendOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: FriendCountOrderByAggregateInput
    _max?: FriendMaxOrderByAggregateInput
    _min?: FriendMinOrderByAggregateInput
  }

  export type FriendScalarWhereWithAggregatesInput = {
    AND?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    OR?: FriendScalarWhereWithAggregatesInput[]
    NOT?: FriendScalarWhereWithAggregatesInput | FriendScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Friend"> | string
    userId?: StringWithAggregatesFilter<"Friend"> | string
    friendId?: StringWithAggregatesFilter<"Friend"> | string
    status?: EnumFriendStatusWithAggregatesFilter<"Friend"> | $Enums.FriendStatus
    createdAt?: DateTimeWithAggregatesFilter<"Friend"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Friend"> | Date | string
  }

  export type InquiryWhereInput = {
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    id?: StringFilter<"Inquiry"> | string
    userId?: StringNullableFilter<"Inquiry"> | string | null
    email?: StringFilter<"Inquiry"> | string
    subject?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: InquiryMessageListRelationFilter
  }

  export type InquiryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    messages?: InquiryMessageOrderByRelationAggregateInput
  }

  export type InquiryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InquiryWhereInput | InquiryWhereInput[]
    OR?: InquiryWhereInput[]
    NOT?: InquiryWhereInput | InquiryWhereInput[]
    userId?: StringNullableFilter<"Inquiry"> | string | null
    email?: StringFilter<"Inquiry"> | string
    subject?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    messages?: InquiryMessageListRelationFilter
  }, "id">

  export type InquiryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InquiryCountOrderByAggregateInput
    _max?: InquiryMaxOrderByAggregateInput
    _min?: InquiryMinOrderByAggregateInput
  }

  export type InquiryScalarWhereWithAggregatesInput = {
    AND?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    OR?: InquiryScalarWhereWithAggregatesInput[]
    NOT?: InquiryScalarWhereWithAggregatesInput | InquiryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Inquiry"> | string
    userId?: StringNullableWithAggregatesFilter<"Inquiry"> | string | null
    email?: StringWithAggregatesFilter<"Inquiry"> | string
    subject?: StringWithAggregatesFilter<"Inquiry"> | string
    status?: EnumInquiryStatusWithAggregatesFilter<"Inquiry"> | $Enums.InquiryStatus
    createdAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Inquiry"> | Date | string
  }

  export type InquiryMessageWhereInput = {
    AND?: InquiryMessageWhereInput | InquiryMessageWhereInput[]
    OR?: InquiryMessageWhereInput[]
    NOT?: InquiryMessageWhereInput | InquiryMessageWhereInput[]
    id?: StringFilter<"InquiryMessage"> | string
    inquiryId?: StringFilter<"InquiryMessage"> | string
    senderRole?: EnumInquirySenderRoleFilter<"InquiryMessage"> | $Enums.InquirySenderRole
    body?: StringFilter<"InquiryMessage"> | string
    userId?: StringNullableFilter<"InquiryMessage"> | string | null
    createdAt?: DateTimeFilter<"InquiryMessage"> | Date | string
    inquiry?: XOR<InquiryScalarRelationFilter, InquiryWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type InquiryMessageOrderByWithRelationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    senderRole?: SortOrder
    body?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    inquiry?: InquiryOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type InquiryMessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InquiryMessageWhereInput | InquiryMessageWhereInput[]
    OR?: InquiryMessageWhereInput[]
    NOT?: InquiryMessageWhereInput | InquiryMessageWhereInput[]
    inquiryId?: StringFilter<"InquiryMessage"> | string
    senderRole?: EnumInquirySenderRoleFilter<"InquiryMessage"> | $Enums.InquirySenderRole
    body?: StringFilter<"InquiryMessage"> | string
    userId?: StringNullableFilter<"InquiryMessage"> | string | null
    createdAt?: DateTimeFilter<"InquiryMessage"> | Date | string
    inquiry?: XOR<InquiryScalarRelationFilter, InquiryWhereInput>
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type InquiryMessageOrderByWithAggregationInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    senderRole?: SortOrder
    body?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: InquiryMessageCountOrderByAggregateInput
    _max?: InquiryMessageMaxOrderByAggregateInput
    _min?: InquiryMessageMinOrderByAggregateInput
  }

  export type InquiryMessageScalarWhereWithAggregatesInput = {
    AND?: InquiryMessageScalarWhereWithAggregatesInput | InquiryMessageScalarWhereWithAggregatesInput[]
    OR?: InquiryMessageScalarWhereWithAggregatesInput[]
    NOT?: InquiryMessageScalarWhereWithAggregatesInput | InquiryMessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InquiryMessage"> | string
    inquiryId?: StringWithAggregatesFilter<"InquiryMessage"> | string
    senderRole?: EnumInquirySenderRoleWithAggregatesFilter<"InquiryMessage"> | $Enums.InquirySenderRole
    body?: StringWithAggregatesFilter<"InquiryMessage"> | string
    userId?: StringNullableWithAggregatesFilter<"InquiryMessage"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"InquiryMessage"> | Date | string
  }

  export type OnboardingWhereInput = {
    AND?: OnboardingWhereInput | OnboardingWhereInput[]
    OR?: OnboardingWhereInput[]
    NOT?: OnboardingWhereInput | OnboardingWhereInput[]
    id?: StringFilter<"Onboarding"> | string
    userId?: StringFilter<"Onboarding"> | string
    prayerKnowledge?: StringNullableFilter<"Onboarding"> | string | null
    supportNeeded?: StringNullableFilter<"Onboarding"> | string | null
    learnIslam?: StringNullableFilter<"Onboarding"> | string | null
    whyHere?: JsonNullableFilter<"Onboarding">
    whereDidYouHearAboutUs?: StringNullableFilter<"Onboarding"> | string | null
    locationPermissionGranted?: BoolFilter<"Onboarding"> | boolean
    locationCity?: StringNullableFilter<"Onboarding"> | string | null
    locationTimezone?: StringNullableFilter<"Onboarding"> | string | null
    notificationPermissionGranted?: BoolFilter<"Onboarding"> | boolean
    notificationPreset?: StringNullableFilter<"Onboarding"> | string | null
    enabledModules?: JsonNullableFilter<"Onboarding">
    defaultHomeTab?: StringNullableFilter<"Onboarding"> | string | null
    createdAt?: DateTimeFilter<"Onboarding"> | Date | string
    updatedAt?: DateTimeFilter<"Onboarding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OnboardingOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    prayerKnowledge?: SortOrderInput | SortOrder
    supportNeeded?: SortOrderInput | SortOrder
    learnIslam?: SortOrderInput | SortOrder
    whyHere?: SortOrderInput | SortOrder
    whereDidYouHearAboutUs?: SortOrderInput | SortOrder
    locationPermissionGranted?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationTimezone?: SortOrderInput | SortOrder
    notificationPermissionGranted?: SortOrder
    notificationPreset?: SortOrderInput | SortOrder
    enabledModules?: SortOrderInput | SortOrder
    defaultHomeTab?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OnboardingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: OnboardingWhereInput | OnboardingWhereInput[]
    OR?: OnboardingWhereInput[]
    NOT?: OnboardingWhereInput | OnboardingWhereInput[]
    prayerKnowledge?: StringNullableFilter<"Onboarding"> | string | null
    supportNeeded?: StringNullableFilter<"Onboarding"> | string | null
    learnIslam?: StringNullableFilter<"Onboarding"> | string | null
    whyHere?: JsonNullableFilter<"Onboarding">
    whereDidYouHearAboutUs?: StringNullableFilter<"Onboarding"> | string | null
    locationPermissionGranted?: BoolFilter<"Onboarding"> | boolean
    locationCity?: StringNullableFilter<"Onboarding"> | string | null
    locationTimezone?: StringNullableFilter<"Onboarding"> | string | null
    notificationPermissionGranted?: BoolFilter<"Onboarding"> | boolean
    notificationPreset?: StringNullableFilter<"Onboarding"> | string | null
    enabledModules?: JsonNullableFilter<"Onboarding">
    defaultHomeTab?: StringNullableFilter<"Onboarding"> | string | null
    createdAt?: DateTimeFilter<"Onboarding"> | Date | string
    updatedAt?: DateTimeFilter<"Onboarding"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type OnboardingOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    prayerKnowledge?: SortOrderInput | SortOrder
    supportNeeded?: SortOrderInput | SortOrder
    learnIslam?: SortOrderInput | SortOrder
    whyHere?: SortOrderInput | SortOrder
    whereDidYouHearAboutUs?: SortOrderInput | SortOrder
    locationPermissionGranted?: SortOrder
    locationCity?: SortOrderInput | SortOrder
    locationTimezone?: SortOrderInput | SortOrder
    notificationPermissionGranted?: SortOrder
    notificationPreset?: SortOrderInput | SortOrder
    enabledModules?: SortOrderInput | SortOrder
    defaultHomeTab?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OnboardingCountOrderByAggregateInput
    _max?: OnboardingMaxOrderByAggregateInput
    _min?: OnboardingMinOrderByAggregateInput
  }

  export type OnboardingScalarWhereWithAggregatesInput = {
    AND?: OnboardingScalarWhereWithAggregatesInput | OnboardingScalarWhereWithAggregatesInput[]
    OR?: OnboardingScalarWhereWithAggregatesInput[]
    NOT?: OnboardingScalarWhereWithAggregatesInput | OnboardingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Onboarding"> | string
    userId?: StringWithAggregatesFilter<"Onboarding"> | string
    prayerKnowledge?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    supportNeeded?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    learnIslam?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    whyHere?: JsonNullableWithAggregatesFilter<"Onboarding">
    whereDidYouHearAboutUs?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    locationPermissionGranted?: BoolWithAggregatesFilter<"Onboarding"> | boolean
    locationCity?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    locationTimezone?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    notificationPermissionGranted?: BoolWithAggregatesFilter<"Onboarding"> | boolean
    notificationPreset?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    enabledModules?: JsonNullableWithAggregatesFilter<"Onboarding">
    defaultHomeTab?: StringNullableWithAggregatesFilter<"Onboarding"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Onboarding"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Onboarding"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type SessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountCreateInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutAccountsInput
  }

  export type AccountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutAccountsNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VerificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VerificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrayerCreateInput = {
    id?: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPrayersInput
  }

  export type PrayerUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPrayersNestedInput
  }

  export type PrayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrayerCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingCreateInput = {
    id?: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutFastingInput
  }

  export type FastingUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FastingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutFastingNestedInput
  }

  export type FastingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FastingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupCreateInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutFriendGroupsInput
    members?: FriendGroupMemberCreateNestedManyWithoutGroupInput
  }

  export type FriendGroupUncheckedCreateInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: FriendGroupMemberUncheckedCreateNestedManyWithoutGroupInput
  }

  export type FriendGroupUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutFriendGroupsNestedInput
    members?: FriendGroupMemberUpdateManyWithoutGroupNestedInput
  }

  export type FriendGroupUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: FriendGroupMemberUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type FriendGroupCreateManyInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendGroupUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberCreateInput = {
    id?: string
    createdAt?: Date | string
    group: FriendGroupCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutGroupMembershipsInput
  }

  export type FriendGroupMemberUncheckedCreateInput = {
    id?: string
    groupId: string
    userId: string
    createdAt?: Date | string
  }

  export type FriendGroupMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: FriendGroupUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutGroupMembershipsNestedInput
  }

  export type FriendGroupMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberCreateManyInput = {
    id?: string
    groupId: string
    userId: string
    createdAt?: Date | string
  }

  export type FriendGroupMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendCreateInput = {
    id?: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSentRequestsInput
    friend: UserCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendUncheckedCreateInput = {
    id?: string
    userId: string
    friendId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSentRequestsNestedInput
    friend?: UserUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendCreateManyInput = {
    id?: string
    userId: string
    friendId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryCreateInput = {
    id?: string
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutInquiriesInput
    messages?: InquiryMessageCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateInput = {
    id?: string
    userId?: string | null
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: InquiryMessageUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutInquiriesNestedInput
    messages?: InquiryMessageUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: InquiryMessageUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryCreateManyInput = {
    id?: string
    userId?: string | null
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageCreateInput = {
    id?: string
    senderRole: $Enums.InquirySenderRole
    body: string
    createdAt?: Date | string
    inquiry: InquiryCreateNestedOneWithoutMessagesInput
    user?: UserCreateNestedOneWithoutInquiryMessagesInput
  }

  export type InquiryMessageUncheckedCreateInput = {
    id?: string
    inquiryId: string
    senderRole: $Enums.InquirySenderRole
    body: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type InquiryMessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiry?: InquiryUpdateOneRequiredWithoutMessagesNestedInput
    user?: UserUpdateOneWithoutInquiryMessagesNestedInput
  }

  export type InquiryMessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageCreateManyInput = {
    id?: string
    inquiryId: string
    senderRole: $Enums.InquirySenderRole
    body: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type InquiryMessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingCreateInput = {
    id?: string
    prayerKnowledge?: string | null
    supportNeeded?: string | null
    learnIslam?: string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: string | null
    locationPermissionGranted?: boolean
    locationCity?: string | null
    locationTimezone?: string | null
    notificationPermissionGranted?: boolean
    notificationPreset?: string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOnboardingInput
  }

  export type OnboardingUncheckedCreateInput = {
    id?: string
    userId: string
    prayerKnowledge?: string | null
    supportNeeded?: string | null
    learnIslam?: string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: string | null
    locationPermissionGranted?: boolean
    locationCity?: string | null
    locationTimezone?: string | null
    notificationPermissionGranted?: boolean
    notificationPreset?: string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOnboardingNestedInput
  }

  export type OnboardingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingCreateManyInput = {
    id?: string
    userId: string
    prayerKnowledge?: string | null
    supportNeeded?: string | null
    learnIslam?: string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: string | null
    locationPermissionGranted?: boolean
    locationCity?: string | null
    locationTimezone?: string | null
    notificationPermissionGranted?: boolean
    notificationPreset?: string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PrayerListRelationFilter = {
    every?: PrayerWhereInput
    some?: PrayerWhereInput
    none?: PrayerWhereInput
  }

  export type InquiryListRelationFilter = {
    every?: InquiryWhereInput
    some?: InquiryWhereInput
    none?: InquiryWhereInput
  }

  export type InquiryMessageListRelationFilter = {
    every?: InquiryMessageWhereInput
    some?: InquiryMessageWhereInput
    none?: InquiryMessageWhereInput
  }

  export type FastingListRelationFilter = {
    every?: FastingWhereInput
    some?: FastingWhereInput
    none?: FastingWhereInput
  }

  export type FriendListRelationFilter = {
    every?: FriendWhereInput
    some?: FriendWhereInput
    none?: FriendWhereInput
  }

  export type FriendGroupListRelationFilter = {
    every?: FriendGroupWhereInput
    some?: FriendGroupWhereInput
    none?: FriendGroupWhereInput
  }

  export type FriendGroupMemberListRelationFilter = {
    every?: FriendGroupMemberWhereInput
    some?: FriendGroupMemberWhereInput
    none?: FriendGroupMemberWhereInput
  }

  export type OnboardingNullableScalarRelationFilter = {
    is?: OnboardingWhereInput | null
    isNot?: OnboardingWhereInput | null
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PrayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InquiryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InquiryMessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FastingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendGroupOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FriendGroupMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    locale?: SortOrder
    pushToken?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    totalPoints?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    locale?: SortOrder
    pushToken?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    locale?: SortOrder
    pushToken?: SortOrder
    totalPoints?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    totalPoints?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type VerificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VerificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type PrayerUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type PrayerCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrayerAvgOrderByAggregateInput = {
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
  }

  export type PrayerMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrayerMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PrayerSumOrderByAggregateInput = {
    fajr?: SortOrder
    dhuhr?: SortOrder
    asr?: SortOrder
    maghrib?: SortOrder
    isha?: SortOrder
    nafl?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type FastingUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type FastingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fasted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FastingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fasted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FastingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    fasted?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendGroupCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendGroupMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendGroupMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendGroupScalarRelationFilter = {
    is?: FriendGroupWhereInput
    isNot?: FriendGroupWhereInput
  }

  export type FriendGroupMemberGroupIdUserIdCompoundUniqueInput = {
    groupId: string
    userId: string
  }

  export type FriendGroupMemberCountOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendGroupMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type FriendGroupMemberMinOrderByAggregateInput = {
    id?: SortOrder
    groupId?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type FriendUserIdFriendIdCompoundUniqueInput = {
    userId: string
    friendId: string
  }

  export type FriendCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type FriendMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    friendId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type EnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InquiryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InquiryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InquiryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type EnumInquirySenderRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.InquirySenderRole | EnumInquirySenderRoleFieldRefInput<$PrismaModel>
    in?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumInquirySenderRoleFilter<$PrismaModel> | $Enums.InquirySenderRole
  }

  export type InquiryScalarRelationFilter = {
    is?: InquiryWhereInput
    isNot?: InquiryWhereInput
  }

  export type InquiryMessageCountOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    senderRole?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryMessageMaxOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    senderRole?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type InquiryMessageMinOrderByAggregateInput = {
    id?: SortOrder
    inquiryId?: SortOrder
    senderRole?: SortOrder
    body?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumInquirySenderRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquirySenderRole | EnumInquirySenderRoleFieldRefInput<$PrismaModel>
    in?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumInquirySenderRoleWithAggregatesFilter<$PrismaModel> | $Enums.InquirySenderRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquirySenderRoleFilter<$PrismaModel>
    _max?: NestedEnumInquirySenderRoleFilter<$PrismaModel>
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type OnboardingCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prayerKnowledge?: SortOrder
    supportNeeded?: SortOrder
    learnIslam?: SortOrder
    whyHere?: SortOrder
    whereDidYouHearAboutUs?: SortOrder
    locationPermissionGranted?: SortOrder
    locationCity?: SortOrder
    locationTimezone?: SortOrder
    notificationPermissionGranted?: SortOrder
    notificationPreset?: SortOrder
    enabledModules?: SortOrder
    defaultHomeTab?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OnboardingMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prayerKnowledge?: SortOrder
    supportNeeded?: SortOrder
    learnIslam?: SortOrder
    whereDidYouHearAboutUs?: SortOrder
    locationPermissionGranted?: SortOrder
    locationCity?: SortOrder
    locationTimezone?: SortOrder
    notificationPermissionGranted?: SortOrder
    notificationPreset?: SortOrder
    defaultHomeTab?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OnboardingMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    prayerKnowledge?: SortOrder
    supportNeeded?: SortOrder
    learnIslam?: SortOrder
    whereDidYouHearAboutUs?: SortOrder
    locationPermissionGranted?: SortOrder
    locationCity?: SortOrder
    locationTimezone?: SortOrder
    notificationPermissionGranted?: SortOrder
    notificationPreset?: SortOrder
    defaultHomeTab?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type PrayerCreateNestedManyWithoutUserInput = {
    create?: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput> | PrayerCreateWithoutUserInput[] | PrayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrayerCreateOrConnectWithoutUserInput | PrayerCreateOrConnectWithoutUserInput[]
    createMany?: PrayerCreateManyUserInputEnvelope
    connect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
  }

  export type InquiryCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryMessageCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput> | InquiryMessageCreateWithoutUserInput[] | InquiryMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutUserInput | InquiryMessageCreateOrConnectWithoutUserInput[]
    createMany?: InquiryMessageCreateManyUserInputEnvelope
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
  }

  export type FastingCreateNestedManyWithoutUserInput = {
    create?: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput> | FastingCreateWithoutUserInput[] | FastingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FastingCreateOrConnectWithoutUserInput | FastingCreateOrConnectWithoutUserInput[]
    createMany?: FastingCreateManyUserInputEnvelope
    connect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
  }

  export type FriendCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendGroupCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput> | FriendGroupCreateWithoutOwnerInput[] | FriendGroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FriendGroupCreateOrConnectWithoutOwnerInput | FriendGroupCreateOrConnectWithoutOwnerInput[]
    createMany?: FriendGroupCreateManyOwnerInputEnvelope
    connect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
  }

  export type FriendGroupMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput> | FriendGroupMemberCreateWithoutUserInput[] | FriendGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutUserInput | FriendGroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: FriendGroupMemberCreateManyUserInputEnvelope
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
  }

  export type OnboardingCreateNestedOneWithoutUserInput = {
    create?: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
    connectOrCreate?: OnboardingCreateOrConnectWithoutUserInput
    connect?: OnboardingWhereUniqueInput
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type PrayerUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput> | PrayerCreateWithoutUserInput[] | PrayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrayerCreateOrConnectWithoutUserInput | PrayerCreateOrConnectWithoutUserInput[]
    createMany?: PrayerCreateManyUserInputEnvelope
    connect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
  }

  export type InquiryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
  }

  export type InquiryMessageUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput> | InquiryMessageCreateWithoutUserInput[] | InquiryMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutUserInput | InquiryMessageCreateOrConnectWithoutUserInput[]
    createMany?: InquiryMessageCreateManyUserInputEnvelope
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
  }

  export type FastingUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput> | FastingCreateWithoutUserInput[] | FastingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FastingCreateOrConnectWithoutUserInput | FastingCreateOrConnectWithoutUserInput[]
    createMany?: FastingCreateManyUserInputEnvelope
    connect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendUncheckedCreateNestedManyWithoutFriendInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
  }

  export type FriendGroupUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput> | FriendGroupCreateWithoutOwnerInput[] | FriendGroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FriendGroupCreateOrConnectWithoutOwnerInput | FriendGroupCreateOrConnectWithoutOwnerInput[]
    createMany?: FriendGroupCreateManyOwnerInputEnvelope
    connect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
  }

  export type FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput> | FriendGroupMemberCreateWithoutUserInput[] | FriendGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutUserInput | FriendGroupMemberCreateOrConnectWithoutUserInput[]
    createMany?: FriendGroupMemberCreateManyUserInputEnvelope
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
  }

  export type OnboardingUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
    connectOrCreate?: OnboardingCreateOrConnectWithoutUserInput
    connect?: OnboardingWhereUniqueInput
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PrayerUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput> | PrayerCreateWithoutUserInput[] | PrayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrayerCreateOrConnectWithoutUserInput | PrayerCreateOrConnectWithoutUserInput[]
    upsert?: PrayerUpsertWithWhereUniqueWithoutUserInput | PrayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrayerCreateManyUserInputEnvelope
    set?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    disconnect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    delete?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    connect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    update?: PrayerUpdateWithWhereUniqueWithoutUserInput | PrayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrayerUpdateManyWithWhereWithoutUserInput | PrayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrayerScalarWhereInput | PrayerScalarWhereInput[]
  }

  export type InquiryUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutUserInput | InquiryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutUserInput | InquiryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutUserInput | InquiryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryMessageUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput> | InquiryMessageCreateWithoutUserInput[] | InquiryMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutUserInput | InquiryMessageCreateOrConnectWithoutUserInput[]
    upsert?: InquiryMessageUpsertWithWhereUniqueWithoutUserInput | InquiryMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryMessageCreateManyUserInputEnvelope
    set?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    disconnect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    delete?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    update?: InquiryMessageUpdateWithWhereUniqueWithoutUserInput | InquiryMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryMessageUpdateManyWithWhereWithoutUserInput | InquiryMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
  }

  export type FastingUpdateManyWithoutUserNestedInput = {
    create?: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput> | FastingCreateWithoutUserInput[] | FastingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FastingCreateOrConnectWithoutUserInput | FastingCreateOrConnectWithoutUserInput[]
    upsert?: FastingUpsertWithWhereUniqueWithoutUserInput | FastingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FastingCreateManyUserInputEnvelope
    set?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    disconnect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    delete?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    connect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    update?: FastingUpdateWithWhereUniqueWithoutUserInput | FastingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FastingUpdateManyWithWhereWithoutUserInput | FastingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FastingScalarWhereInput | FastingScalarWhereInput[]
  }

  export type FriendUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendGroupUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput> | FriendGroupCreateWithoutOwnerInput[] | FriendGroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FriendGroupCreateOrConnectWithoutOwnerInput | FriendGroupCreateOrConnectWithoutOwnerInput[]
    upsert?: FriendGroupUpsertWithWhereUniqueWithoutOwnerInput | FriendGroupUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FriendGroupCreateManyOwnerInputEnvelope
    set?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    disconnect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    delete?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    connect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    update?: FriendGroupUpdateWithWhereUniqueWithoutOwnerInput | FriendGroupUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FriendGroupUpdateManyWithWhereWithoutOwnerInput | FriendGroupUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FriendGroupScalarWhereInput | FriendGroupScalarWhereInput[]
  }

  export type FriendGroupMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput> | FriendGroupMemberCreateWithoutUserInput[] | FriendGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutUserInput | FriendGroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: FriendGroupMemberUpsertWithWhereUniqueWithoutUserInput | FriendGroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendGroupMemberCreateManyUserInputEnvelope
    set?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    disconnect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    delete?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    update?: FriendGroupMemberUpdateWithWhereUniqueWithoutUserInput | FriendGroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendGroupMemberUpdateManyWithWhereWithoutUserInput | FriendGroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
  }

  export type OnboardingUpdateOneWithoutUserNestedInput = {
    create?: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
    connectOrCreate?: OnboardingCreateOrConnectWithoutUserInput
    upsert?: OnboardingUpsertWithoutUserInput
    disconnect?: OnboardingWhereInput | boolean
    delete?: OnboardingWhereInput | boolean
    connect?: OnboardingWhereUniqueInput
    update?: XOR<XOR<OnboardingUpdateToOneWithWhereWithoutUserInput, OnboardingUpdateWithoutUserInput>, OnboardingUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type PrayerUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput> | PrayerCreateWithoutUserInput[] | PrayerUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PrayerCreateOrConnectWithoutUserInput | PrayerCreateOrConnectWithoutUserInput[]
    upsert?: PrayerUpsertWithWhereUniqueWithoutUserInput | PrayerUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PrayerCreateManyUserInputEnvelope
    set?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    disconnect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    delete?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    connect?: PrayerWhereUniqueInput | PrayerWhereUniqueInput[]
    update?: PrayerUpdateWithWhereUniqueWithoutUserInput | PrayerUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PrayerUpdateManyWithWhereWithoutUserInput | PrayerUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PrayerScalarWhereInput | PrayerScalarWhereInput[]
  }

  export type InquiryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput> | InquiryCreateWithoutUserInput[] | InquiryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryCreateOrConnectWithoutUserInput | InquiryCreateOrConnectWithoutUserInput[]
    upsert?: InquiryUpsertWithWhereUniqueWithoutUserInput | InquiryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryCreateManyUserInputEnvelope
    set?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    disconnect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    delete?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    connect?: InquiryWhereUniqueInput | InquiryWhereUniqueInput[]
    update?: InquiryUpdateWithWhereUniqueWithoutUserInput | InquiryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryUpdateManyWithWhereWithoutUserInput | InquiryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
  }

  export type InquiryMessageUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput> | InquiryMessageCreateWithoutUserInput[] | InquiryMessageUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutUserInput | InquiryMessageCreateOrConnectWithoutUserInput[]
    upsert?: InquiryMessageUpsertWithWhereUniqueWithoutUserInput | InquiryMessageUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InquiryMessageCreateManyUserInputEnvelope
    set?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    disconnect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    delete?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    update?: InquiryMessageUpdateWithWhereUniqueWithoutUserInput | InquiryMessageUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InquiryMessageUpdateManyWithWhereWithoutUserInput | InquiryMessageUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
  }

  export type FastingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput> | FastingCreateWithoutUserInput[] | FastingUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FastingCreateOrConnectWithoutUserInput | FastingCreateOrConnectWithoutUserInput[]
    upsert?: FastingUpsertWithWhereUniqueWithoutUserInput | FastingUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FastingCreateManyUserInputEnvelope
    set?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    disconnect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    delete?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    connect?: FastingWhereUniqueInput | FastingWhereUniqueInput[]
    update?: FastingUpdateWithWhereUniqueWithoutUserInput | FastingUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FastingUpdateManyWithWhereWithoutUserInput | FastingUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FastingScalarWhereInput | FastingScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput> | FriendCreateWithoutUserInput[] | FriendUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutUserInput | FriendCreateOrConnectWithoutUserInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutUserInput | FriendUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendCreateManyUserInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutUserInput | FriendUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutUserInput | FriendUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendUncheckedUpdateManyWithoutFriendNestedInput = {
    create?: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput> | FriendCreateWithoutFriendInput[] | FriendUncheckedCreateWithoutFriendInput[]
    connectOrCreate?: FriendCreateOrConnectWithoutFriendInput | FriendCreateOrConnectWithoutFriendInput[]
    upsert?: FriendUpsertWithWhereUniqueWithoutFriendInput | FriendUpsertWithWhereUniqueWithoutFriendInput[]
    createMany?: FriendCreateManyFriendInputEnvelope
    set?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    disconnect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    delete?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    connect?: FriendWhereUniqueInput | FriendWhereUniqueInput[]
    update?: FriendUpdateWithWhereUniqueWithoutFriendInput | FriendUpdateWithWhereUniqueWithoutFriendInput[]
    updateMany?: FriendUpdateManyWithWhereWithoutFriendInput | FriendUpdateManyWithWhereWithoutFriendInput[]
    deleteMany?: FriendScalarWhereInput | FriendScalarWhereInput[]
  }

  export type FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput> | FriendGroupCreateWithoutOwnerInput[] | FriendGroupUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: FriendGroupCreateOrConnectWithoutOwnerInput | FriendGroupCreateOrConnectWithoutOwnerInput[]
    upsert?: FriendGroupUpsertWithWhereUniqueWithoutOwnerInput | FriendGroupUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: FriendGroupCreateManyOwnerInputEnvelope
    set?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    disconnect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    delete?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    connect?: FriendGroupWhereUniqueInput | FriendGroupWhereUniqueInput[]
    update?: FriendGroupUpdateWithWhereUniqueWithoutOwnerInput | FriendGroupUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: FriendGroupUpdateManyWithWhereWithoutOwnerInput | FriendGroupUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: FriendGroupScalarWhereInput | FriendGroupScalarWhereInput[]
  }

  export type FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput> | FriendGroupMemberCreateWithoutUserInput[] | FriendGroupMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutUserInput | FriendGroupMemberCreateOrConnectWithoutUserInput[]
    upsert?: FriendGroupMemberUpsertWithWhereUniqueWithoutUserInput | FriendGroupMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: FriendGroupMemberCreateManyUserInputEnvelope
    set?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    disconnect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    delete?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    update?: FriendGroupMemberUpdateWithWhereUniqueWithoutUserInput | FriendGroupMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: FriendGroupMemberUpdateManyWithWhereWithoutUserInput | FriendGroupMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
  }

  export type OnboardingUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
    connectOrCreate?: OnboardingCreateOrConnectWithoutUserInput
    upsert?: OnboardingUpsertWithoutUserInput
    disconnect?: OnboardingWhereInput | boolean
    delete?: OnboardingWhereInput | boolean
    connect?: OnboardingWhereUniqueInput
    update?: XOR<XOR<OnboardingUpdateToOneWithWhereWithoutUserInput, OnboardingUpdateWithoutUserInput>, OnboardingUncheckedUpdateWithoutUserInput>
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput> | AccountCreateWithoutUserInput[] | AccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutUserInput | AccountCreateOrConnectWithoutUserInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutUserInput | AccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AccountCreateManyUserInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutUserInput | AccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutUserInput | AccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserCreateNestedOneWithoutAccountsInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutAccountsNestedInput = {
    create?: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAccountsInput
    upsert?: UserUpsertWithoutAccountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAccountsInput, UserUpdateWithoutAccountsInput>, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserCreateNestedOneWithoutPrayersInput = {
    create?: XOR<UserCreateWithoutPrayersInput, UserUncheckedCreateWithoutPrayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrayersInput
    connect?: UserWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutPrayersNestedInput = {
    create?: XOR<UserCreateWithoutPrayersInput, UserUncheckedCreateWithoutPrayersInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrayersInput
    upsert?: UserUpsertWithoutPrayersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrayersInput, UserUpdateWithoutPrayersInput>, UserUncheckedUpdateWithoutPrayersInput>
  }

  export type UserCreateNestedOneWithoutFastingInput = {
    create?: XOR<UserCreateWithoutFastingInput, UserUncheckedCreateWithoutFastingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFastingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutFastingNestedInput = {
    create?: XOR<UserCreateWithoutFastingInput, UserUncheckedCreateWithoutFastingInput>
    connectOrCreate?: UserCreateOrConnectWithoutFastingInput
    upsert?: UserUpsertWithoutFastingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFastingInput, UserUpdateWithoutFastingInput>, UserUncheckedUpdateWithoutFastingInput>
  }

  export type UserCreateNestedOneWithoutFriendGroupsInput = {
    create?: XOR<UserCreateWithoutFriendGroupsInput, UserUncheckedCreateWithoutFriendGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendGroupsInput
    connect?: UserWhereUniqueInput
  }

  export type FriendGroupMemberCreateNestedManyWithoutGroupInput = {
    create?: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput> | FriendGroupMemberCreateWithoutGroupInput[] | FriendGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutGroupInput | FriendGroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: FriendGroupMemberCreateManyGroupInputEnvelope
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
  }

  export type FriendGroupMemberUncheckedCreateNestedManyWithoutGroupInput = {
    create?: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput> | FriendGroupMemberCreateWithoutGroupInput[] | FriendGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutGroupInput | FriendGroupMemberCreateOrConnectWithoutGroupInput[]
    createMany?: FriendGroupMemberCreateManyGroupInputEnvelope
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutFriendGroupsNestedInput = {
    create?: XOR<UserCreateWithoutFriendGroupsInput, UserUncheckedCreateWithoutFriendGroupsInput>
    connectOrCreate?: UserCreateOrConnectWithoutFriendGroupsInput
    upsert?: UserUpsertWithoutFriendGroupsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFriendGroupsInput, UserUpdateWithoutFriendGroupsInput>, UserUncheckedUpdateWithoutFriendGroupsInput>
  }

  export type FriendGroupMemberUpdateManyWithoutGroupNestedInput = {
    create?: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput> | FriendGroupMemberCreateWithoutGroupInput[] | FriendGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutGroupInput | FriendGroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: FriendGroupMemberUpsertWithWhereUniqueWithoutGroupInput | FriendGroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: FriendGroupMemberCreateManyGroupInputEnvelope
    set?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    disconnect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    delete?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    update?: FriendGroupMemberUpdateWithWhereUniqueWithoutGroupInput | FriendGroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: FriendGroupMemberUpdateManyWithWhereWithoutGroupInput | FriendGroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
  }

  export type FriendGroupMemberUncheckedUpdateManyWithoutGroupNestedInput = {
    create?: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput> | FriendGroupMemberCreateWithoutGroupInput[] | FriendGroupMemberUncheckedCreateWithoutGroupInput[]
    connectOrCreate?: FriendGroupMemberCreateOrConnectWithoutGroupInput | FriendGroupMemberCreateOrConnectWithoutGroupInput[]
    upsert?: FriendGroupMemberUpsertWithWhereUniqueWithoutGroupInput | FriendGroupMemberUpsertWithWhereUniqueWithoutGroupInput[]
    createMany?: FriendGroupMemberCreateManyGroupInputEnvelope
    set?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    disconnect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    delete?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    connect?: FriendGroupMemberWhereUniqueInput | FriendGroupMemberWhereUniqueInput[]
    update?: FriendGroupMemberUpdateWithWhereUniqueWithoutGroupInput | FriendGroupMemberUpdateWithWhereUniqueWithoutGroupInput[]
    updateMany?: FriendGroupMemberUpdateManyWithWhereWithoutGroupInput | FriendGroupMemberUpdateManyWithWhereWithoutGroupInput[]
    deleteMany?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
  }

  export type FriendGroupCreateNestedOneWithoutMembersInput = {
    create?: XOR<FriendGroupCreateWithoutMembersInput, FriendGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FriendGroupCreateOrConnectWithoutMembersInput
    connect?: FriendGroupWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutGroupMembershipsInput = {
    create?: XOR<UserCreateWithoutGroupMembershipsInput, UserUncheckedCreateWithoutGroupMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembershipsInput
    connect?: UserWhereUniqueInput
  }

  export type FriendGroupUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<FriendGroupCreateWithoutMembersInput, FriendGroupUncheckedCreateWithoutMembersInput>
    connectOrCreate?: FriendGroupCreateOrConnectWithoutMembersInput
    upsert?: FriendGroupUpsertWithoutMembersInput
    connect?: FriendGroupWhereUniqueInput
    update?: XOR<XOR<FriendGroupUpdateToOneWithWhereWithoutMembersInput, FriendGroupUpdateWithoutMembersInput>, FriendGroupUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutGroupMembershipsNestedInput = {
    create?: XOR<UserCreateWithoutGroupMembershipsInput, UserUncheckedCreateWithoutGroupMembershipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGroupMembershipsInput
    upsert?: UserUpsertWithoutGroupMembershipsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGroupMembershipsInput, UserUpdateWithoutGroupMembershipsInput>, UserUncheckedUpdateWithoutGroupMembershipsInput>
  }

  export type UserCreateNestedOneWithoutSentRequestsInput = {
    create?: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutReceivedRequestsInput = {
    create?: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumFriendStatusFieldUpdateOperationsInput = {
    set?: $Enums.FriendStatus
  }

  export type UserUpdateOneRequiredWithoutSentRequestsNestedInput = {
    create?: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSentRequestsInput
    upsert?: UserUpsertWithoutSentRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSentRequestsInput, UserUpdateWithoutSentRequestsInput>, UserUncheckedUpdateWithoutSentRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutReceivedRequestsNestedInput = {
    create?: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutReceivedRequestsInput
    upsert?: UserUpsertWithoutReceivedRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutReceivedRequestsInput, UserUpdateWithoutReceivedRequestsInput>, UserUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type UserCreateNestedOneWithoutInquiriesInput = {
    create?: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiriesInput
    connect?: UserWhereUniqueInput
  }

  export type InquiryMessageCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput> | InquiryMessageCreateWithoutInquiryInput[] | InquiryMessageUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutInquiryInput | InquiryMessageCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryMessageCreateManyInquiryInputEnvelope
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
  }

  export type InquiryMessageUncheckedCreateNestedManyWithoutInquiryInput = {
    create?: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput> | InquiryMessageCreateWithoutInquiryInput[] | InquiryMessageUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutInquiryInput | InquiryMessageCreateOrConnectWithoutInquiryInput[]
    createMany?: InquiryMessageCreateManyInquiryInputEnvelope
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
  }

  export type EnumInquiryStatusFieldUpdateOperationsInput = {
    set?: $Enums.InquiryStatus
  }

  export type UserUpdateOneWithoutInquiriesNestedInput = {
    create?: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiriesInput
    upsert?: UserUpsertWithoutInquiriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInquiriesInput, UserUpdateWithoutInquiriesInput>, UserUncheckedUpdateWithoutInquiriesInput>
  }

  export type InquiryMessageUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput> | InquiryMessageCreateWithoutInquiryInput[] | InquiryMessageUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutInquiryInput | InquiryMessageCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryMessageUpsertWithWhereUniqueWithoutInquiryInput | InquiryMessageUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryMessageCreateManyInquiryInputEnvelope
    set?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    disconnect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    delete?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    update?: InquiryMessageUpdateWithWhereUniqueWithoutInquiryInput | InquiryMessageUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryMessageUpdateManyWithWhereWithoutInquiryInput | InquiryMessageUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
  }

  export type InquiryMessageUncheckedUpdateManyWithoutInquiryNestedInput = {
    create?: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput> | InquiryMessageCreateWithoutInquiryInput[] | InquiryMessageUncheckedCreateWithoutInquiryInput[]
    connectOrCreate?: InquiryMessageCreateOrConnectWithoutInquiryInput | InquiryMessageCreateOrConnectWithoutInquiryInput[]
    upsert?: InquiryMessageUpsertWithWhereUniqueWithoutInquiryInput | InquiryMessageUpsertWithWhereUniqueWithoutInquiryInput[]
    createMany?: InquiryMessageCreateManyInquiryInputEnvelope
    set?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    disconnect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    delete?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    connect?: InquiryMessageWhereUniqueInput | InquiryMessageWhereUniqueInput[]
    update?: InquiryMessageUpdateWithWhereUniqueWithoutInquiryInput | InquiryMessageUpdateWithWhereUniqueWithoutInquiryInput[]
    updateMany?: InquiryMessageUpdateManyWithWhereWithoutInquiryInput | InquiryMessageUpdateManyWithWhereWithoutInquiryInput[]
    deleteMany?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
  }

  export type InquiryCreateNestedOneWithoutMessagesInput = {
    create?: XOR<InquiryCreateWithoutMessagesInput, InquiryUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutMessagesInput
    connect?: InquiryWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutInquiryMessagesInput = {
    create?: XOR<UserCreateWithoutInquiryMessagesInput, UserUncheckedCreateWithoutInquiryMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiryMessagesInput
    connect?: UserWhereUniqueInput
  }

  export type EnumInquirySenderRoleFieldUpdateOperationsInput = {
    set?: $Enums.InquirySenderRole
  }

  export type InquiryUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<InquiryCreateWithoutMessagesInput, InquiryUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: InquiryCreateOrConnectWithoutMessagesInput
    upsert?: InquiryUpsertWithoutMessagesInput
    connect?: InquiryWhereUniqueInput
    update?: XOR<XOR<InquiryUpdateToOneWithWhereWithoutMessagesInput, InquiryUpdateWithoutMessagesInput>, InquiryUncheckedUpdateWithoutMessagesInput>
  }

  export type UserUpdateOneWithoutInquiryMessagesNestedInput = {
    create?: XOR<UserCreateWithoutInquiryMessagesInput, UserUncheckedCreateWithoutInquiryMessagesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInquiryMessagesInput
    upsert?: UserUpsertWithoutInquiryMessagesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInquiryMessagesInput, UserUpdateWithoutInquiryMessagesInput>, UserUncheckedUpdateWithoutInquiryMessagesInput>
  }

  export type UserCreateNestedOneWithoutOnboardingInput = {
    create?: XOR<UserCreateWithoutOnboardingInput, UserUncheckedCreateWithoutOnboardingInput>
    connectOrCreate?: UserCreateOrConnectWithoutOnboardingInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOnboardingNestedInput = {
    create?: XOR<UserCreateWithoutOnboardingInput, UserUncheckedCreateWithoutOnboardingInput>
    connectOrCreate?: UserCreateOrConnectWithoutOnboardingInput
    upsert?: UserUpsertWithoutOnboardingInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOnboardingInput, UserUpdateWithoutOnboardingInput>, UserUncheckedUpdateWithoutOnboardingInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumFriendStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendStatusFilter<$PrismaModel> | $Enums.FriendStatus
  }

  export type NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.FriendStatus | EnumFriendStatusFieldRefInput<$PrismaModel>
    in?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.FriendStatus[] | ListEnumFriendStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumFriendStatusWithAggregatesFilter<$PrismaModel> | $Enums.FriendStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumFriendStatusFilter<$PrismaModel>
    _max?: NestedEnumFriendStatusFilter<$PrismaModel>
  }

  export type NestedEnumInquiryStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusFilter<$PrismaModel> | $Enums.InquiryStatus
  }

  export type NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquiryStatus | EnumInquiryStatusFieldRefInput<$PrismaModel>
    in?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquiryStatus[] | ListEnumInquiryStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumInquiryStatusWithAggregatesFilter<$PrismaModel> | $Enums.InquiryStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquiryStatusFilter<$PrismaModel>
    _max?: NestedEnumInquiryStatusFilter<$PrismaModel>
  }

  export type NestedEnumInquirySenderRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.InquirySenderRole | EnumInquirySenderRoleFieldRefInput<$PrismaModel>
    in?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumInquirySenderRoleFilter<$PrismaModel> | $Enums.InquirySenderRole
  }

  export type NestedEnumInquirySenderRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InquirySenderRole | EnumInquirySenderRoleFieldRefInput<$PrismaModel>
    in?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.InquirySenderRole[] | ListEnumInquirySenderRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumInquirySenderRoleWithAggregatesFilter<$PrismaModel> | $Enums.InquirySenderRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumInquirySenderRoleFilter<$PrismaModel>
    _max?: NestedEnumInquirySenderRoleFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PrayerCreateWithoutUserInput = {
    id?: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrayerUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrayerCreateOrConnectWithoutUserInput = {
    where: PrayerWhereUniqueInput
    create: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput>
  }

  export type PrayerCreateManyUserInputEnvelope = {
    data: PrayerCreateManyUserInput | PrayerCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InquiryCreateWithoutUserInput = {
    id?: string
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: InquiryMessageCreateNestedManyWithoutInquiryInput
  }

  export type InquiryUncheckedCreateWithoutUserInput = {
    id?: string
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: InquiryMessageUncheckedCreateNestedManyWithoutInquiryInput
  }

  export type InquiryCreateOrConnectWithoutUserInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput>
  }

  export type InquiryCreateManyUserInputEnvelope = {
    data: InquiryCreateManyUserInput | InquiryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type InquiryMessageCreateWithoutUserInput = {
    id?: string
    senderRole: $Enums.InquirySenderRole
    body: string
    createdAt?: Date | string
    inquiry: InquiryCreateNestedOneWithoutMessagesInput
  }

  export type InquiryMessageUncheckedCreateWithoutUserInput = {
    id?: string
    inquiryId: string
    senderRole: $Enums.InquirySenderRole
    body: string
    createdAt?: Date | string
  }

  export type InquiryMessageCreateOrConnectWithoutUserInput = {
    where: InquiryMessageWhereUniqueInput
    create: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput>
  }

  export type InquiryMessageCreateManyUserInputEnvelope = {
    data: InquiryMessageCreateManyUserInput | InquiryMessageCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FastingCreateWithoutUserInput = {
    id?: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FastingUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FastingCreateOrConnectWithoutUserInput = {
    where: FastingWhereUniqueInput
    create: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput>
  }

  export type FastingCreateManyUserInputEnvelope = {
    data: FastingCreateManyUserInput | FastingCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendCreateWithoutUserInput = {
    id?: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    friend: UserCreateNestedOneWithoutReceivedRequestsInput
  }

  export type FriendUncheckedCreateWithoutUserInput = {
    id?: string
    friendId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendCreateOrConnectWithoutUserInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendCreateManyUserInputEnvelope = {
    data: FriendCreateManyUserInput | FriendCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FriendCreateWithoutFriendInput = {
    id?: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutSentRequestsInput
  }

  export type FriendUncheckedCreateWithoutFriendInput = {
    id?: string
    userId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendCreateOrConnectWithoutFriendInput = {
    where: FriendWhereUniqueInput
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendCreateManyFriendInputEnvelope = {
    data: FriendCreateManyFriendInput | FriendCreateManyFriendInput[]
    skipDuplicates?: boolean
  }

  export type FriendGroupCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: FriendGroupMemberCreateNestedManyWithoutGroupInput
  }

  export type FriendGroupUncheckedCreateWithoutOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: FriendGroupMemberUncheckedCreateNestedManyWithoutGroupInput
  }

  export type FriendGroupCreateOrConnectWithoutOwnerInput = {
    where: FriendGroupWhereUniqueInput
    create: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput>
  }

  export type FriendGroupCreateManyOwnerInputEnvelope = {
    data: FriendGroupCreateManyOwnerInput | FriendGroupCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type FriendGroupMemberCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    group: FriendGroupCreateNestedOneWithoutMembersInput
  }

  export type FriendGroupMemberUncheckedCreateWithoutUserInput = {
    id?: string
    groupId: string
    createdAt?: Date | string
  }

  export type FriendGroupMemberCreateOrConnectWithoutUserInput = {
    where: FriendGroupMemberWhereUniqueInput
    create: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput>
  }

  export type FriendGroupMemberCreateManyUserInputEnvelope = {
    data: FriendGroupMemberCreateManyUserInput | FriendGroupMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OnboardingCreateWithoutUserInput = {
    id?: string
    prayerKnowledge?: string | null
    supportNeeded?: string | null
    learnIslam?: string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: string | null
    locationPermissionGranted?: boolean
    locationCity?: string | null
    locationTimezone?: string | null
    notificationPermissionGranted?: boolean
    notificationPreset?: string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingUncheckedCreateWithoutUserInput = {
    id?: string
    prayerKnowledge?: string | null
    supportNeeded?: string | null
    learnIslam?: string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: string | null
    locationPermissionGranted?: boolean
    locationCity?: string | null
    locationTimezone?: string | null
    notificationPermissionGranted?: boolean
    notificationPreset?: string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OnboardingCreateOrConnectWithoutUserInput = {
    where: OnboardingWhereUniqueInput
    create: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AccountCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUncheckedCreateWithoutUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountCreateOrConnectWithoutUserInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountCreateManyUserInputEnvelope = {
    data: AccountCreateManyUserInput | AccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type PrayerUpsertWithWhereUniqueWithoutUserInput = {
    where: PrayerWhereUniqueInput
    update: XOR<PrayerUpdateWithoutUserInput, PrayerUncheckedUpdateWithoutUserInput>
    create: XOR<PrayerCreateWithoutUserInput, PrayerUncheckedCreateWithoutUserInput>
  }

  export type PrayerUpdateWithWhereUniqueWithoutUserInput = {
    where: PrayerWhereUniqueInput
    data: XOR<PrayerUpdateWithoutUserInput, PrayerUncheckedUpdateWithoutUserInput>
  }

  export type PrayerUpdateManyWithWhereWithoutUserInput = {
    where: PrayerScalarWhereInput
    data: XOR<PrayerUpdateManyMutationInput, PrayerUncheckedUpdateManyWithoutUserInput>
  }

  export type PrayerScalarWhereInput = {
    AND?: PrayerScalarWhereInput | PrayerScalarWhereInput[]
    OR?: PrayerScalarWhereInput[]
    NOT?: PrayerScalarWhereInput | PrayerScalarWhereInput[]
    id?: StringFilter<"Prayer"> | string
    userId?: StringFilter<"Prayer"> | string
    date?: DateTimeFilter<"Prayer"> | Date | string
    fajr?: IntFilter<"Prayer"> | number
    dhuhr?: IntFilter<"Prayer"> | number
    asr?: IntFilter<"Prayer"> | number
    maghrib?: IntFilter<"Prayer"> | number
    isha?: IntFilter<"Prayer"> | number
    nafl?: IntFilter<"Prayer"> | number
    createdAt?: DateTimeFilter<"Prayer"> | Date | string
    updatedAt?: DateTimeFilter<"Prayer"> | Date | string
  }

  export type InquiryUpsertWithWhereUniqueWithoutUserInput = {
    where: InquiryWhereUniqueInput
    update: XOR<InquiryUpdateWithoutUserInput, InquiryUncheckedUpdateWithoutUserInput>
    create: XOR<InquiryCreateWithoutUserInput, InquiryUncheckedCreateWithoutUserInput>
  }

  export type InquiryUpdateWithWhereUniqueWithoutUserInput = {
    where: InquiryWhereUniqueInput
    data: XOR<InquiryUpdateWithoutUserInput, InquiryUncheckedUpdateWithoutUserInput>
  }

  export type InquiryUpdateManyWithWhereWithoutUserInput = {
    where: InquiryScalarWhereInput
    data: XOR<InquiryUpdateManyMutationInput, InquiryUncheckedUpdateManyWithoutUserInput>
  }

  export type InquiryScalarWhereInput = {
    AND?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    OR?: InquiryScalarWhereInput[]
    NOT?: InquiryScalarWhereInput | InquiryScalarWhereInput[]
    id?: StringFilter<"Inquiry"> | string
    userId?: StringNullableFilter<"Inquiry"> | string | null
    email?: StringFilter<"Inquiry"> | string
    subject?: StringFilter<"Inquiry"> | string
    status?: EnumInquiryStatusFilter<"Inquiry"> | $Enums.InquiryStatus
    createdAt?: DateTimeFilter<"Inquiry"> | Date | string
    updatedAt?: DateTimeFilter<"Inquiry"> | Date | string
  }

  export type InquiryMessageUpsertWithWhereUniqueWithoutUserInput = {
    where: InquiryMessageWhereUniqueInput
    update: XOR<InquiryMessageUpdateWithoutUserInput, InquiryMessageUncheckedUpdateWithoutUserInput>
    create: XOR<InquiryMessageCreateWithoutUserInput, InquiryMessageUncheckedCreateWithoutUserInput>
  }

  export type InquiryMessageUpdateWithWhereUniqueWithoutUserInput = {
    where: InquiryMessageWhereUniqueInput
    data: XOR<InquiryMessageUpdateWithoutUserInput, InquiryMessageUncheckedUpdateWithoutUserInput>
  }

  export type InquiryMessageUpdateManyWithWhereWithoutUserInput = {
    where: InquiryMessageScalarWhereInput
    data: XOR<InquiryMessageUpdateManyMutationInput, InquiryMessageUncheckedUpdateManyWithoutUserInput>
  }

  export type InquiryMessageScalarWhereInput = {
    AND?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
    OR?: InquiryMessageScalarWhereInput[]
    NOT?: InquiryMessageScalarWhereInput | InquiryMessageScalarWhereInput[]
    id?: StringFilter<"InquiryMessage"> | string
    inquiryId?: StringFilter<"InquiryMessage"> | string
    senderRole?: EnumInquirySenderRoleFilter<"InquiryMessage"> | $Enums.InquirySenderRole
    body?: StringFilter<"InquiryMessage"> | string
    userId?: StringNullableFilter<"InquiryMessage"> | string | null
    createdAt?: DateTimeFilter<"InquiryMessage"> | Date | string
  }

  export type FastingUpsertWithWhereUniqueWithoutUserInput = {
    where: FastingWhereUniqueInput
    update: XOR<FastingUpdateWithoutUserInput, FastingUncheckedUpdateWithoutUserInput>
    create: XOR<FastingCreateWithoutUserInput, FastingUncheckedCreateWithoutUserInput>
  }

  export type FastingUpdateWithWhereUniqueWithoutUserInput = {
    where: FastingWhereUniqueInput
    data: XOR<FastingUpdateWithoutUserInput, FastingUncheckedUpdateWithoutUserInput>
  }

  export type FastingUpdateManyWithWhereWithoutUserInput = {
    where: FastingScalarWhereInput
    data: XOR<FastingUpdateManyMutationInput, FastingUncheckedUpdateManyWithoutUserInput>
  }

  export type FastingScalarWhereInput = {
    AND?: FastingScalarWhereInput | FastingScalarWhereInput[]
    OR?: FastingScalarWhereInput[]
    NOT?: FastingScalarWhereInput | FastingScalarWhereInput[]
    id?: StringFilter<"Fasting"> | string
    userId?: StringFilter<"Fasting"> | string
    date?: DateTimeFilter<"Fasting"> | Date | string
    fasted?: BoolFilter<"Fasting"> | boolean
    createdAt?: DateTimeFilter<"Fasting"> | Date | string
    updatedAt?: DateTimeFilter<"Fasting"> | Date | string
  }

  export type FriendUpsertWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
    create: XOR<FriendCreateWithoutUserInput, FriendUncheckedCreateWithoutUserInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutUserInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutUserInput, FriendUncheckedUpdateWithoutUserInput>
  }

  export type FriendUpdateManyWithWhereWithoutUserInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutUserInput>
  }

  export type FriendScalarWhereInput = {
    AND?: FriendScalarWhereInput | FriendScalarWhereInput[]
    OR?: FriendScalarWhereInput[]
    NOT?: FriendScalarWhereInput | FriendScalarWhereInput[]
    id?: StringFilter<"Friend"> | string
    userId?: StringFilter<"Friend"> | string
    friendId?: StringFilter<"Friend"> | string
    status?: EnumFriendStatusFilter<"Friend"> | $Enums.FriendStatus
    createdAt?: DateTimeFilter<"Friend"> | Date | string
    updatedAt?: DateTimeFilter<"Friend"> | Date | string
  }

  export type FriendUpsertWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    update: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
    create: XOR<FriendCreateWithoutFriendInput, FriendUncheckedCreateWithoutFriendInput>
  }

  export type FriendUpdateWithWhereUniqueWithoutFriendInput = {
    where: FriendWhereUniqueInput
    data: XOR<FriendUpdateWithoutFriendInput, FriendUncheckedUpdateWithoutFriendInput>
  }

  export type FriendUpdateManyWithWhereWithoutFriendInput = {
    where: FriendScalarWhereInput
    data: XOR<FriendUpdateManyMutationInput, FriendUncheckedUpdateManyWithoutFriendInput>
  }

  export type FriendGroupUpsertWithWhereUniqueWithoutOwnerInput = {
    where: FriendGroupWhereUniqueInput
    update: XOR<FriendGroupUpdateWithoutOwnerInput, FriendGroupUncheckedUpdateWithoutOwnerInput>
    create: XOR<FriendGroupCreateWithoutOwnerInput, FriendGroupUncheckedCreateWithoutOwnerInput>
  }

  export type FriendGroupUpdateWithWhereUniqueWithoutOwnerInput = {
    where: FriendGroupWhereUniqueInput
    data: XOR<FriendGroupUpdateWithoutOwnerInput, FriendGroupUncheckedUpdateWithoutOwnerInput>
  }

  export type FriendGroupUpdateManyWithWhereWithoutOwnerInput = {
    where: FriendGroupScalarWhereInput
    data: XOR<FriendGroupUpdateManyMutationInput, FriendGroupUncheckedUpdateManyWithoutOwnerInput>
  }

  export type FriendGroupScalarWhereInput = {
    AND?: FriendGroupScalarWhereInput | FriendGroupScalarWhereInput[]
    OR?: FriendGroupScalarWhereInput[]
    NOT?: FriendGroupScalarWhereInput | FriendGroupScalarWhereInput[]
    id?: StringFilter<"FriendGroup"> | string
    name?: StringFilter<"FriendGroup"> | string
    userId?: StringFilter<"FriendGroup"> | string
    createdAt?: DateTimeFilter<"FriendGroup"> | Date | string
    updatedAt?: DateTimeFilter<"FriendGroup"> | Date | string
  }

  export type FriendGroupMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: FriendGroupMemberWhereUniqueInput
    update: XOR<FriendGroupMemberUpdateWithoutUserInput, FriendGroupMemberUncheckedUpdateWithoutUserInput>
    create: XOR<FriendGroupMemberCreateWithoutUserInput, FriendGroupMemberUncheckedCreateWithoutUserInput>
  }

  export type FriendGroupMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: FriendGroupMemberWhereUniqueInput
    data: XOR<FriendGroupMemberUpdateWithoutUserInput, FriendGroupMemberUncheckedUpdateWithoutUserInput>
  }

  export type FriendGroupMemberUpdateManyWithWhereWithoutUserInput = {
    where: FriendGroupMemberScalarWhereInput
    data: XOR<FriendGroupMemberUpdateManyMutationInput, FriendGroupMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type FriendGroupMemberScalarWhereInput = {
    AND?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
    OR?: FriendGroupMemberScalarWhereInput[]
    NOT?: FriendGroupMemberScalarWhereInput | FriendGroupMemberScalarWhereInput[]
    id?: StringFilter<"FriendGroupMember"> | string
    groupId?: StringFilter<"FriendGroupMember"> | string
    userId?: StringFilter<"FriendGroupMember"> | string
    createdAt?: DateTimeFilter<"FriendGroupMember"> | Date | string
  }

  export type OnboardingUpsertWithoutUserInput = {
    update: XOR<OnboardingUpdateWithoutUserInput, OnboardingUncheckedUpdateWithoutUserInput>
    create: XOR<OnboardingCreateWithoutUserInput, OnboardingUncheckedCreateWithoutUserInput>
    where?: OnboardingWhereInput
  }

  export type OnboardingUpdateToOneWithWhereWithoutUserInput = {
    where?: OnboardingWhereInput
    data: XOR<OnboardingUpdateWithoutUserInput, OnboardingUncheckedUpdateWithoutUserInput>
  }

  export type OnboardingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OnboardingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    prayerKnowledge?: NullableStringFieldUpdateOperationsInput | string | null
    supportNeeded?: NullableStringFieldUpdateOperationsInput | string | null
    learnIslam?: NullableStringFieldUpdateOperationsInput | string | null
    whyHere?: NullableJsonNullValueInput | InputJsonValue
    whereDidYouHearAboutUs?: NullableStringFieldUpdateOperationsInput | string | null
    locationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    locationCity?: NullableStringFieldUpdateOperationsInput | string | null
    locationTimezone?: NullableStringFieldUpdateOperationsInput | string | null
    notificationPermissionGranted?: BoolFieldUpdateOperationsInput | boolean
    notificationPreset?: NullableStringFieldUpdateOperationsInput | string | null
    enabledModules?: NullableJsonNullValueInput | InputJsonValue
    defaultHomeTab?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    token?: StringFilter<"Session"> | string
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    userId?: StringFilter<"Session"> | string
  }

  export type AccountUpsertWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
    create: XOR<AccountCreateWithoutUserInput, AccountUncheckedCreateWithoutUserInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutUserInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutUserInput, AccountUncheckedUpdateWithoutUserInput>
  }

  export type AccountUpdateManyWithWhereWithoutUserInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutUserInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: StringFilter<"Account"> | string
    accountId?: StringFilter<"Account"> | string
    providerId?: StringFilter<"Account"> | string
    userId?: StringFilter<"Account"> | string
    accessToken?: StringNullableFilter<"Account"> | string | null
    refreshToken?: StringNullableFilter<"Account"> | string | null
    idToken?: StringNullableFilter<"Account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"Account"> | Date | string | null
    scope?: StringNullableFilter<"Account"> | string | null
    password?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutAccountsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutAccountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
  }

  export type UserUpsertWithoutAccountsInput = {
    update: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
    create: XOR<UserCreateWithoutAccountsInput, UserUncheckedCreateWithoutAccountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAccountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAccountsInput, UserUncheckedUpdateWithoutAccountsInput>
  }

  export type UserUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutAccountsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutPrayersInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPrayersInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPrayersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrayersInput, UserUncheckedCreateWithoutPrayersInput>
  }

  export type UserUpsertWithoutPrayersInput = {
    update: XOR<UserUpdateWithoutPrayersInput, UserUncheckedUpdateWithoutPrayersInput>
    create: XOR<UserCreateWithoutPrayersInput, UserUncheckedCreateWithoutPrayersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrayersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrayersInput, UserUncheckedUpdateWithoutPrayersInput>
  }

  export type UserUpdateWithoutPrayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPrayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFastingInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFastingInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFastingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFastingInput, UserUncheckedCreateWithoutFastingInput>
  }

  export type UserUpsertWithoutFastingInput = {
    update: XOR<UserUpdateWithoutFastingInput, UserUncheckedUpdateWithoutFastingInput>
    create: XOR<UserCreateWithoutFastingInput, UserUncheckedCreateWithoutFastingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFastingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFastingInput, UserUncheckedUpdateWithoutFastingInput>
  }

  export type UserUpdateWithoutFastingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFastingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutFriendGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFriendGroupsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFriendGroupsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFriendGroupsInput, UserUncheckedCreateWithoutFriendGroupsInput>
  }

  export type FriendGroupMemberCreateWithoutGroupInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutGroupMembershipsInput
  }

  export type FriendGroupMemberUncheckedCreateWithoutGroupInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type FriendGroupMemberCreateOrConnectWithoutGroupInput = {
    where: FriendGroupMemberWhereUniqueInput
    create: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type FriendGroupMemberCreateManyGroupInputEnvelope = {
    data: FriendGroupMemberCreateManyGroupInput | FriendGroupMemberCreateManyGroupInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutFriendGroupsInput = {
    update: XOR<UserUpdateWithoutFriendGroupsInput, UserUncheckedUpdateWithoutFriendGroupsInput>
    create: XOR<UserCreateWithoutFriendGroupsInput, UserUncheckedCreateWithoutFriendGroupsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFriendGroupsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFriendGroupsInput, UserUncheckedUpdateWithoutFriendGroupsInput>
  }

  export type UserUpdateWithoutFriendGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFriendGroupsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type FriendGroupMemberUpsertWithWhereUniqueWithoutGroupInput = {
    where: FriendGroupMemberWhereUniqueInput
    update: XOR<FriendGroupMemberUpdateWithoutGroupInput, FriendGroupMemberUncheckedUpdateWithoutGroupInput>
    create: XOR<FriendGroupMemberCreateWithoutGroupInput, FriendGroupMemberUncheckedCreateWithoutGroupInput>
  }

  export type FriendGroupMemberUpdateWithWhereUniqueWithoutGroupInput = {
    where: FriendGroupMemberWhereUniqueInput
    data: XOR<FriendGroupMemberUpdateWithoutGroupInput, FriendGroupMemberUncheckedUpdateWithoutGroupInput>
  }

  export type FriendGroupMemberUpdateManyWithWhereWithoutGroupInput = {
    where: FriendGroupMemberScalarWhereInput
    data: XOR<FriendGroupMemberUpdateManyMutationInput, FriendGroupMemberUncheckedUpdateManyWithoutGroupInput>
  }

  export type FriendGroupCreateWithoutMembersInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutFriendGroupsInput
  }

  export type FriendGroupUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    userId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendGroupCreateOrConnectWithoutMembersInput = {
    where: FriendGroupWhereUniqueInput
    create: XOR<FriendGroupCreateWithoutMembersInput, FriendGroupUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutGroupMembershipsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutGroupMembershipsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutGroupMembershipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGroupMembershipsInput, UserUncheckedCreateWithoutGroupMembershipsInput>
  }

  export type FriendGroupUpsertWithoutMembersInput = {
    update: XOR<FriendGroupUpdateWithoutMembersInput, FriendGroupUncheckedUpdateWithoutMembersInput>
    create: XOR<FriendGroupCreateWithoutMembersInput, FriendGroupUncheckedCreateWithoutMembersInput>
    where?: FriendGroupWhereInput
  }

  export type FriendGroupUpdateToOneWithWhereWithoutMembersInput = {
    where?: FriendGroupWhereInput
    data: XOR<FriendGroupUpdateWithoutMembersInput, FriendGroupUncheckedUpdateWithoutMembersInput>
  }

  export type FriendGroupUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutFriendGroupsNestedInput
  }

  export type FriendGroupUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutGroupMembershipsInput = {
    update: XOR<UserUpdateWithoutGroupMembershipsInput, UserUncheckedUpdateWithoutGroupMembershipsInput>
    create: XOR<UserCreateWithoutGroupMembershipsInput, UserUncheckedCreateWithoutGroupMembershipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGroupMembershipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGroupMembershipsInput, UserUncheckedUpdateWithoutGroupMembershipsInput>
  }

  export type UserUpdateWithoutGroupMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGroupMembershipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutSentRequestsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSentRequestsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSentRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
  }

  export type UserCreateWithoutReceivedRequestsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReceivedRequestsInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutReceivedRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
  }

  export type UserUpsertWithoutSentRequestsInput = {
    update: XOR<UserUpdateWithoutSentRequestsInput, UserUncheckedUpdateWithoutSentRequestsInput>
    create: XOR<UserCreateWithoutSentRequestsInput, UserUncheckedCreateWithoutSentRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSentRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSentRequestsInput, UserUncheckedUpdateWithoutSentRequestsInput>
  }

  export type UserUpdateWithoutSentRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSentRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutReceivedRequestsInput = {
    update: XOR<UserUpdateWithoutReceivedRequestsInput, UserUncheckedUpdateWithoutReceivedRequestsInput>
    create: XOR<UserCreateWithoutReceivedRequestsInput, UserUncheckedCreateWithoutReceivedRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutReceivedRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutReceivedRequestsInput, UserUncheckedUpdateWithoutReceivedRequestsInput>
  }

  export type UserUpdateWithoutReceivedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReceivedRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutInquiriesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInquiriesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInquiriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
  }

  export type InquiryMessageCreateWithoutInquiryInput = {
    id?: string
    senderRole: $Enums.InquirySenderRole
    body: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutInquiryMessagesInput
  }

  export type InquiryMessageUncheckedCreateWithoutInquiryInput = {
    id?: string
    senderRole: $Enums.InquirySenderRole
    body: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type InquiryMessageCreateOrConnectWithoutInquiryInput = {
    where: InquiryMessageWhereUniqueInput
    create: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryMessageCreateManyInquiryInputEnvelope = {
    data: InquiryMessageCreateManyInquiryInput | InquiryMessageCreateManyInquiryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutInquiriesInput = {
    update: XOR<UserUpdateWithoutInquiriesInput, UserUncheckedUpdateWithoutInquiriesInput>
    create: XOR<UserCreateWithoutInquiriesInput, UserUncheckedCreateWithoutInquiriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInquiriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInquiriesInput, UserUncheckedUpdateWithoutInquiriesInput>
  }

  export type UserUpdateWithoutInquiriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInquiriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InquiryMessageUpsertWithWhereUniqueWithoutInquiryInput = {
    where: InquiryMessageWhereUniqueInput
    update: XOR<InquiryMessageUpdateWithoutInquiryInput, InquiryMessageUncheckedUpdateWithoutInquiryInput>
    create: XOR<InquiryMessageCreateWithoutInquiryInput, InquiryMessageUncheckedCreateWithoutInquiryInput>
  }

  export type InquiryMessageUpdateWithWhereUniqueWithoutInquiryInput = {
    where: InquiryMessageWhereUniqueInput
    data: XOR<InquiryMessageUpdateWithoutInquiryInput, InquiryMessageUncheckedUpdateWithoutInquiryInput>
  }

  export type InquiryMessageUpdateManyWithWhereWithoutInquiryInput = {
    where: InquiryMessageScalarWhereInput
    data: XOR<InquiryMessageUpdateManyMutationInput, InquiryMessageUncheckedUpdateManyWithoutInquiryInput>
  }

  export type InquiryCreateWithoutMessagesInput = {
    id?: string
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutInquiriesInput
  }

  export type InquiryUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId?: string | null
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryCreateOrConnectWithoutMessagesInput = {
    where: InquiryWhereUniqueInput
    create: XOR<InquiryCreateWithoutMessagesInput, InquiryUncheckedCreateWithoutMessagesInput>
  }

  export type UserCreateWithoutInquiryMessagesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    onboarding?: OnboardingCreateNestedOneWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInquiryMessagesInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    onboarding?: OnboardingUncheckedCreateNestedOneWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInquiryMessagesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInquiryMessagesInput, UserUncheckedCreateWithoutInquiryMessagesInput>
  }

  export type InquiryUpsertWithoutMessagesInput = {
    update: XOR<InquiryUpdateWithoutMessagesInput, InquiryUncheckedUpdateWithoutMessagesInput>
    create: XOR<InquiryCreateWithoutMessagesInput, InquiryUncheckedCreateWithoutMessagesInput>
    where?: InquiryWhereInput
  }

  export type InquiryUpdateToOneWithWhereWithoutMessagesInput = {
    where?: InquiryWhereInput
    data: XOR<InquiryUpdateWithoutMessagesInput, InquiryUncheckedUpdateWithoutMessagesInput>
  }

  export type InquiryUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutInquiriesNestedInput
  }

  export type InquiryUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutInquiryMessagesInput = {
    update: XOR<UserUpdateWithoutInquiryMessagesInput, UserUncheckedUpdateWithoutInquiryMessagesInput>
    create: XOR<UserCreateWithoutInquiryMessagesInput, UserUncheckedCreateWithoutInquiryMessagesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInquiryMessagesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInquiryMessagesInput, UserUncheckedUpdateWithoutInquiryMessagesInput>
  }

  export type UserUpdateWithoutInquiryMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUpdateOneWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInquiryMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    onboarding?: OnboardingUncheckedUpdateOneWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOnboardingInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerCreateNestedManyWithoutUserInput
    inquiries?: InquiryCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageCreateNestedManyWithoutUserInput
    fasting?: FastingCreateNestedManyWithoutUserInput
    sentRequests?: FriendCreateNestedManyWithoutUserInput
    receivedRequests?: FriendCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberCreateNestedManyWithoutUserInput
    sessions?: SessionCreateNestedManyWithoutUserInput
    accounts?: AccountCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOnboardingInput = {
    id?: string
    name: string
    email: string
    emailVerified?: boolean
    image?: string | null
    locale?: string | null
    pushToken?: string | null
    totalPoints?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    prayers?: PrayerUncheckedCreateNestedManyWithoutUserInput
    inquiries?: InquiryUncheckedCreateNestedManyWithoutUserInput
    inquiryMessages?: InquiryMessageUncheckedCreateNestedManyWithoutUserInput
    fasting?: FastingUncheckedCreateNestedManyWithoutUserInput
    sentRequests?: FriendUncheckedCreateNestedManyWithoutUserInput
    receivedRequests?: FriendUncheckedCreateNestedManyWithoutFriendInput
    friendGroups?: FriendGroupUncheckedCreateNestedManyWithoutOwnerInput
    groupMemberships?: FriendGroupMemberUncheckedCreateNestedManyWithoutUserInput
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
    accounts?: AccountUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOnboardingInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOnboardingInput, UserUncheckedCreateWithoutOnboardingInput>
  }

  export type UserUpsertWithoutOnboardingInput = {
    update: XOR<UserUpdateWithoutOnboardingInput, UserUncheckedUpdateWithoutOnboardingInput>
    create: XOR<UserCreateWithoutOnboardingInput, UserUncheckedCreateWithoutOnboardingInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOnboardingInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOnboardingInput, UserUncheckedUpdateWithoutOnboardingInput>
  }

  export type UserUpdateWithoutOnboardingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUpdateManyWithoutUserNestedInput
    fasting?: FastingUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUpdateManyWithoutUserNestedInput
    sessions?: SessionUpdateManyWithoutUserNestedInput
    accounts?: AccountUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOnboardingInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    locale?: NullableStringFieldUpdateOperationsInput | string | null
    pushToken?: NullableStringFieldUpdateOperationsInput | string | null
    totalPoints?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    prayers?: PrayerUncheckedUpdateManyWithoutUserNestedInput
    inquiries?: InquiryUncheckedUpdateManyWithoutUserNestedInput
    inquiryMessages?: InquiryMessageUncheckedUpdateManyWithoutUserNestedInput
    fasting?: FastingUncheckedUpdateManyWithoutUserNestedInput
    sentRequests?: FriendUncheckedUpdateManyWithoutUserNestedInput
    receivedRequests?: FriendUncheckedUpdateManyWithoutFriendNestedInput
    friendGroups?: FriendGroupUncheckedUpdateManyWithoutOwnerNestedInput
    groupMemberships?: FriendGroupMemberUncheckedUpdateManyWithoutUserNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
    accounts?: AccountUncheckedUpdateManyWithoutUserNestedInput
  }

  export type PrayerCreateManyUserInput = {
    id?: string
    date: Date | string
    fajr?: number
    dhuhr?: number
    asr?: number
    maghrib?: number
    isha?: number
    nafl?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryCreateManyUserInput = {
    id?: string
    email: string
    subject: string
    status?: $Enums.InquiryStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InquiryMessageCreateManyUserInput = {
    id?: string
    inquiryId: string
    senderRole: $Enums.InquirySenderRole
    body: string
    createdAt?: Date | string
  }

  export type FastingCreateManyUserInput = {
    id?: string
    date: Date | string
    fasted?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendCreateManyUserInput = {
    id?: string
    friendId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendCreateManyFriendInput = {
    id?: string
    userId: string
    status?: $Enums.FriendStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendGroupCreateManyOwnerInput = {
    id?: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FriendGroupMemberCreateManyUserInput = {
    id?: string
    groupId: string
    createdAt?: Date | string
  }

  export type SessionCreateManyUserInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt?: Date | string
    updatedAt?: Date | string
    ipAddress?: string | null
    userAgent?: string | null
  }

  export type AccountCreateManyUserInput = {
    id: string
    accountId: string
    providerId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PrayerUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrayerUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrayerUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fajr?: IntFieldUpdateOperationsInput | number
    dhuhr?: IntFieldUpdateOperationsInput | number
    asr?: IntFieldUpdateOperationsInput | number
    maghrib?: IntFieldUpdateOperationsInput | number
    isha?: IntFieldUpdateOperationsInput | number
    nafl?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: InquiryMessageUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: InquiryMessageUncheckedUpdateManyWithoutInquiryNestedInput
  }

  export type InquiryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumInquiryStatusFieldUpdateOperationsInput | $Enums.InquiryStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    inquiry?: InquiryUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type InquiryMessageUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    inquiryId?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FastingUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    fasted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    friend?: UserUpdateOneRequiredWithoutReceivedRequestsNestedInput
  }

  export type FriendUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    friendId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUpdateWithoutFriendInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSentRequestsNestedInput
  }

  export type FriendUncheckedUpdateWithoutFriendInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendUncheckedUpdateManyWithoutFriendInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumFriendStatusFieldUpdateOperationsInput | $Enums.FriendStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: FriendGroupMemberUpdateManyWithoutGroupNestedInput
  }

  export type FriendGroupUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: FriendGroupMemberUncheckedUpdateManyWithoutGroupNestedInput
  }

  export type FriendGroupUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    group?: FriendGroupUpdateOneRequiredWithoutMembersNestedInput
  }

  export type FriendGroupMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    groupId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberCreateManyGroupInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type FriendGroupMemberUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGroupMembershipsNestedInput
  }

  export type FriendGroupMemberUncheckedUpdateWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FriendGroupMemberUncheckedUpdateManyWithoutGroupInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageCreateManyInquiryInput = {
    id?: string
    senderRole: $Enums.InquirySenderRole
    body: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type InquiryMessageUpdateWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutInquiryMessagesNestedInput
  }

  export type InquiryMessageUncheckedUpdateWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InquiryMessageUncheckedUpdateManyWithoutInquiryInput = {
    id?: StringFieldUpdateOperationsInput | string
    senderRole?: EnumInquirySenderRoleFieldUpdateOperationsInput | $Enums.InquirySenderRole
    body?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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