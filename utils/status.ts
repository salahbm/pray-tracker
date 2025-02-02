// Enum for Status Codes
export enum StatusCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
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
