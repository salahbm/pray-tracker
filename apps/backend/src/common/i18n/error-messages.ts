import { Locale } from '../utils/response.utils';

export type ErrorKey =
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'BAD_REQUEST'
  | 'INTERNAL_SERVER_ERROR'
  | 'VALIDATION_ERROR'
  | 'USER_NOT_FOUND'
  | 'USER_ALREADY_EXISTS'
  | 'INVALID_CREDENTIALS'
  | 'SESSION_EXPIRED'
  | 'NO_ACTIVE_SESSION'
  | 'INVALID_TOKEN'
  | 'EMAIL_ALREADY_EXISTS'
  | 'WEAK_PASSWORD'
  | 'INVALID_EMAIL'
  | 'REQUIRED_FIELD'
  | 'INVALID_INPUT';

type ErrorMessages = Record<ErrorKey, Record<Locale, string>>;

export const ERROR_MESSAGES: ErrorMessages = {
  UNAUTHORIZED: {
    en: 'Unauthorized access',
    uz: 'Ruxsatsiz kirish',
    ru: 'Неавторизованный доступ',
    kr: '무단 액세스',
  },
  FORBIDDEN: {
    en: 'Access forbidden',
    uz: 'Kirish taqiqlangan',
    ru: 'Доступ запрещен',
    kr: '접근 금지',
  },
  NOT_FOUND: {
    en: 'Resource not found',
    uz: 'Resurs topilmadi',
    ru: 'Ресурс не найден',
    kr: '리소스를 찾을 수 없습니다',
  },
  BAD_REQUEST: {
    en: 'Bad request',
    uz: "Noto'g'ri so'rov",
    ru: 'Неверный запрос',
    kr: '잘못된 요청',
  },
  INTERNAL_SERVER_ERROR: {
    en: 'Internal server error',
    uz: 'Ichki server xatosi',
    ru: 'Внутренняя ошибка сервера',
    kr: '내부 서버 오류',
  },
  VALIDATION_ERROR: {
    en: 'Validation error',
    uz: 'Tekshirish xatosi',
    ru: 'Ошибка валидации',
    kr: '유효성 검사 오류',
  },
  USER_NOT_FOUND: {
    en: 'User not found',
    uz: 'Foydalanuvchi topilmadi',
    ru: 'Пользователь не найден',
    kr: '사용자를 찾을 수 없습니다',
  },
  USER_ALREADY_EXISTS: {
    en: 'User already exists',
    uz: 'Foydalanuvchi allaqachon mavjud',
    ru: 'Пользователь уже существует',
    kr: '사용자가 이미 존재합니다',
  },
  INVALID_CREDENTIALS: {
    en: 'Invalid email or password',
    uz: "Email yoki parol noto'g'ri",
    ru: 'Неверный email или пароль',
    kr: '잘못된 이메일 또는 비밀번호',
  },
  SESSION_EXPIRED: {
    en: 'Session expired. Please login again',
    uz: 'Sessiya muddati tugadi. Iltimos, qaytadan kiring',
    ru: 'Сессия истекла. Пожалуйста, войдите снова',
    kr: '세션이 만료되었습니다. 다시 로그인하세요',
  },
  NO_ACTIVE_SESSION: {
    en: 'No active session found',
    uz: 'Faol sessiya topilmadi',
    ru: 'Активная сессия не найдена',
    kr: '활성 세션을 찾을 수 없습니다',
  },
  INVALID_TOKEN: {
    en: 'Invalid or expired token',
    uz: "Noto'g'ri yoki muddati o'tgan token",
    ru: 'Недействительный или истекший токен',
    kr: '유효하지 않거나 만료된 토큰',
  },
  EMAIL_ALREADY_EXISTS: {
    en: 'Email already exists',
    uz: 'Email allaqachon mavjud',
    ru: 'Email уже существует',
    kr: '이메일이 이미 존재합니다',
  },
  WEAK_PASSWORD: {
    en: 'Password must be at least 8 characters',
    uz: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
    ru: 'Пароль должен содержать не менее 8 символов',
    kr: '비밀번호는 최소 8자 이상이어야 합니다',
  },
  INVALID_EMAIL: {
    en: 'Invalid email format',
    uz: "Email formati noto'g'ri",
    ru: 'Неверный формат email',
    kr: '잘못된 이메일 형식',
  },
  REQUIRED_FIELD: {
    en: 'This field is required',
    uz: 'Bu maydon majburiy',
    ru: 'Это поле обязательно',
    kr: '이 필드는 필수입니다',
  },
  INVALID_INPUT: {
    en: 'Invalid input provided',
    uz: "Noto'g'ri ma'lumot kiritildi",
    ru: 'Предоставлены неверные данные',
    kr: '잘못된 입력이 제공되었습니다',
  },
};

/**
 * Get localized error message
 */
export function getErrorMessage(key: ErrorKey, locale: Locale = 'en'): string {
  return ERROR_MESSAGES[key][locale] || ERROR_MESSAGES[key].en;
}

/**
 * Get localized error message with custom fallback
 */
export function getErrorMessageWithFallback(
  key: ErrorKey,
  locale: Locale = 'en',
  fallback?: string,
): string {
  return (
    ERROR_MESSAGES[key]?.[locale] ||
    fallback ||
    ERROR_MESSAGES[key]?.en ||
    'An error occurred'
  );
}
