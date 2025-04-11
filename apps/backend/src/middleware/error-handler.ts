import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { StatusCode, type MessageCodes } from '../utils/status';

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

// Fix this by properly binding the route handlers
export function handleError(res: Response, error: unknown): Response {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      code: error.code ?? 'UNKNOWN_ERROR',
      status: error.status,
      message: error.message,
      details: error.details ?? null,
    });
  }

  console.error('Unhandled error:', error);

  return res.status(StatusCode.INTERNAL_ERROR).json({
    status: StatusCode.INTERNAL_ERROR,
    message: 'An unexpected error occurred',
  });
}

// Fix this by properly binding the route handlers
export const errorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('[Unhandled Error]', err);

  const status =
    err instanceof ApiError ? err.status : StatusCode.INTERNAL_ERROR;
  const code = err instanceof ApiError ? err.code : 'UNKNOWN_ERROR';
  const details = err instanceof ApiError ? err.details : null;

  res.status(status).json({
    status,
    message: err.message || 'Something went wrong',
    code,
    details,
  });
};
