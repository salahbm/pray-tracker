export type Locale = 'en' | 'uz' | 'ru' | 'kr';

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
): ErrorResponse {
  return {
    success: false,
    error,
    message,
    statusCode,
    timestamp: new Date().toISOString(),
    ...(path && { path }),
  };
}

/**
 * Get locale from request headers
 */
export function getLocaleFromRequest(headers: Record<string, unknown>): Locale {
  const localeHeader = headers['accept-language'] || headers['locale'];

  if (!localeHeader || typeof localeHeader !== 'string') {
    return 'en';
  }

  const localeStr = localeHeader.toLowerCase().split('-')[0];

  if (['en', 'uz', 'ru', 'kr'].includes(localeStr)) {
    return localeStr as Locale;
  }

  return 'en';
}
