export type Locale = 'en' | 'uz' | 'ru' | 'tr';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  statusCode?: number;
}

export interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  path?: string;
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  };
}

/**
 * Create error response
 */
export function createErrorResponse(
  error: string,
  message: string,
  statusCode: number,
  path?: string,
  debug?: unknown,
): ErrorResponse & { debug?: unknown } {
  return {
    success: false,
    error,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    ...(path && { path }),
    ...(debug ? { debug } : {}),
  };
}
