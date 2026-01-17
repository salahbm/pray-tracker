import { Locale } from './response.utils';

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

  const supportedLocales: Locale[] = ['en', 'uz', 'ru', 'tr'];
  return (
    supportedLocales.includes(locale as Locale) ? locale : 'en'
  ) as Locale;
}
