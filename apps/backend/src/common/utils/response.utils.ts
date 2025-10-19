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
export function getLocaleFromRequest(
  headers: Headers | Record<string, unknown>,
): Locale {
  let localeHeader: string | undefined;

  // Detect what type of headers we’re working with
  if (headers instanceof Headers) {
    // Works with Better Auth’s Web Fetch-style Headers
    localeHeader =
      headers.get('locale') ||
      headers.get('Locale') ||
      headers.get('accept-language') ||
      headers.get('Accept-Language') ||
      undefined;
  } else if (typeof headers === 'object') {
    // Works with NestJS’s plain object headers
    localeHeader =
      (headers['locale'] as string) ||
      (headers['Locale'] as string) ||
      (headers['accept-language'] as string) ||
      (headers['Accept-Language'] as string) ||
      undefined;
  }

  const locale = (localeHeader || 'en')
    .split(',')[0]
    .trim()
    .slice(0, 2)
    .toLowerCase();

  const supportedLocales: Locale[] = ['en', 'uz', 'ru', 'kr'];
  return (
    supportedLocales.includes(locale as Locale) ? locale : 'en'
  ) as Locale;
}
