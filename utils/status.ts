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

// Response Utility Function
export function createResponse<T>(
  status: StatusCode,
  message: string,
  data: T = null,
) {
  return new Response(
    JSON.stringify({
      status,
      message,
      data,
    }),
    { status },
  );
}
