import { MessageCodes, StatusCode } from './status';

export class ApiError<T = unknown> extends Error {
  public status: number;
  public code?: MessageCodes;
  public details?: T;

  constructor({
    message,
    status,
    code,
    details,
  }: {
    message: string;
    status: number;
    code?: MessageCodes;
    details?: T;
  }) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace?.(this, ApiError);
  }
}

export function handleError(error: unknown): Response {
  if (error instanceof ApiError) {
    return new Response(
      JSON.stringify({
        code: error.code ?? 'UNKNOWN_ERROR',
        status: error.status,
        message: error.message,
        details: error.details ?? null,
      }),
      { status: error.status },
    );
  }

  console.error('Unhandled error:', error);

  return new Response(
    JSON.stringify({
      status: StatusCode.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
    }),
    {
      status: StatusCode.INTERNAL_ERROR,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}
