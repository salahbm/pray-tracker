// Enum for Status Codes
export enum StatusCode {
  // information 100 - 199
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  EARLY_HINTS = 103,

  // success 200 - 299
  SUCCESS = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  PARTIAL_CONTENT = 206,

  // redirection 300 - 399
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,

  // client error 400 - 499
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,

  // server error 500 - 599
  INTERNAL_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  VARIANT_ALSO_NEGOTIATES = 506,
  INSUFFICIENT_STORAGE = 507,
  LOOP_DETECTED = 508,
  NOT_EXTENDED = 510,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
  NETWORK_READ_TIMEOUT_ERROR = 599,
}

export enum MessageCodes {
  // general
  SOMETHING_WENT_WRONG = 9999,
  SUCCESS = 1000,
  CREATED = 1001,
  BAD_REQUEST = 1002,
  UNAUTHORIZED = 1003,
  FORBIDDEN = 1004,
  NOT_FOUND = 1005,
  INTERNAL_ERROR = 1006,
  CONFLICT = 1007,
  UNPROCESSABLE_ENTITY = 1008,
  TOO_MANY_REQUESTS = 1009,

  // user related
  USER_NOT_FOUND = 3000,
  USER_ALREADY_EXISTS = 3001,
  USER_CREATED = 3002,
  USER_DELETED = 3003,
  USER_UPDATED = 3004,
  USER_FETCHED = 3005,
  USER_UNAUTHORIZED = 3006,

  // pray related
  PRAY_NOT_FOUND = 4000,
  PRAY_CREATED = 4001,
  PRAY_DELETED = 4002,
  PRAY_UPDATED = 4003,
  PRAY_FETCHED = 4004,

  // friend related
  FRIEND_NOT_FOUND = 5000,
  FRIEND_APPROVED = 5001,
  FRIEND_DELETED = 5002,
  FRIEND_REQUESTED = 5003,
  FRIEND_FETCHED = 5004,
  FRIEND_EXISTS = 5005,
  FRIEND_CANCELLED = 5006,
  FRIEND_REJECTED = 5007,
  FRIEND_FRIENDSHIP_NOT_FOUND = 5008,

  // award related
  AWARD_NOT_FOUND = 6000,
  AWARD_CREATED = 6001,
  AWARD_DELETED = 6002,
  AWARD_UPDATED = 6003,
  AWARD_FETCHED = 6004,
}

// Response Utility Function
export function createResponse<T>({
  status,
  message,
  code,
  data = null,
}: {
  status: StatusCode;
  message: string;
  code?: MessageCodes;
  data: T;
}) {
  return new Response(
    JSON.stringify({
      status,
      message,
      code,
      data,
    }),
    { status },
  );
}
