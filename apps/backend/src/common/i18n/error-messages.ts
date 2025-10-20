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
  | 'INVALID_INPUT'
  | 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL'
  | 'FRIEND_REQUEST_SENT'
  | 'FRIEND_REQUEST_ACCEPTED'
  | 'FRIEND_REQUEST_REJECTED'
  | 'FRIEND_REMOVED'
  | 'FRIEND_REQUEST_ALREADY_EXISTS'
  | 'FRIEND_REQUEST_NOT_FOUND'
  | 'CANNOT_SEND_REQUEST_TO_SELF'
  | 'ALREADY_FRIENDS'
  | 'FRIEND_NOT_FOUND'
  | 'GROUP_CREATED'
  | 'GROUP_UPDATED'
  | 'GROUP_DELETED'
  | 'MEMBER_ADDED'
  | 'MEMBER_REMOVED';

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
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    en: 'User already exists. Use another email',
    uz: 'Foydalanuvchi allaqachon mavjud. Boshqa emaildan foydalaning',
    ru: 'Пользователь уже существует. Используйте другой email',
    kr: '사용자가 이미 존재합니다. 다른 이메일을 사용하세요',
  },
  FRIEND_REQUEST_SENT: {
    en: 'Friend request sent successfully',
    uz: "Do'stlik so'rovi muvaffaqiyatli yuborildi",
    ru: 'Запрос на добавление в друзья отправлен',
    kr: '친구 요청이 성공적으로 전송되었습니다',
  },
  FRIEND_REQUEST_ACCEPTED: {
    en: 'Friend request accepted',
    uz: "Do'stlik so'rovi qabul qilindi",
    ru: 'Запрос на добавление в друзья принят',
    kr: '친구 요청이 수락되었습니다',
  },
  FRIEND_REQUEST_REJECTED: {
    en: 'Friend request rejected',
    uz: "Do'stlik so'rovi rad etildi",
    ru: 'Запрос на добавление в друзья отклонен',
    kr: '친구 요청이 거부되었습니다',
  },
  FRIEND_REMOVED: {
    en: 'Friend removed successfully',
    uz: "Do'st muvaffaqiyatli o'chirildi",
    ru: 'Друг успешно удален',
    kr: '친구가 성공적으로 제거되었습니다',
  },
  FRIEND_REQUEST_ALREADY_EXISTS: {
    en: 'Friend request already exists',
    uz: "Do'stlik so'rovi allaqachon mavjud",
    ru: 'Запрос на добавление в друзья уже существует',
    kr: '친구 요청이 이미 존재합니다',
  },
  FRIEND_REQUEST_NOT_FOUND: {
    en: 'Friend request not found',
    uz: "Do'stlik so'rovi topilmadi",
    ru: 'Запрос на добавление в друзья не найден',
    kr: '친구 요청을 찾을 수 없습니다',
  },
  CANNOT_SEND_REQUEST_TO_SELF: {
    en: 'You cannot send a friend request to yourself',
    uz: "O'zingizga do'stlik so'rovi yubora olmaysiz",
    ru: 'Вы не можете отправить запрос на добавление в друзья самому себе',
    kr: '자신에게 친구 요청을 보낼 수 없습니다',
  },
  ALREADY_FRIENDS: {
    en: 'You are already friends',
    uz: "Siz allaqachon do'stsiz",
    ru: 'Вы уже друзья',
    kr: '이미 친구입니다',
  },
  FRIEND_NOT_FOUND: {
    en: 'Friend not found',
    uz: "Do'st topilmadi",
    ru: 'Друг не найден',
    kr: '친구를 찾을 수 없습니다',
  },
  GROUP_CREATED: {
    en: 'Group created successfully',
    uz: 'Guruh muvaffaqiyatli yaratildi',
    ru: 'Группа успешно создана',
    kr: '그룹이 성공적으로 생성되었습니다',
  },
  GROUP_UPDATED: {
    en: 'Group updated successfully',
    uz: 'Guruh muvaffaqiyatli yangilandi',
    ru: 'Группа успешно обновлена',
    kr: '그룹이 성공적으로 업데이트되었습니다',
  },
  GROUP_DELETED: {
    en: 'Group deleted successfully',
    uz: "Guruh muvaffaqiyatli o'chirildi",
    ru: 'Группа успешно удалена',
    kr: '그룹이 성공적으로 삭제되었습니다',
  },
  MEMBER_ADDED: {
    en: 'Member added to group successfully',
    uz: "A'zo guruhga muvaffaqiyatli qo'shildi",
    ru: 'Участник успешно добавлен в группу',
    kr: '멤버가 그룹에 성공적으로 추가되었습니다',
  },
  MEMBER_REMOVED: {
    en: 'Member removed from group successfully',
    uz: "A'zo guruhdan muvaffaqiyatli o'chirildi",
    ru: 'Участник успешно удален из группы',
    kr: '멤버가 그룹에서 성공적으로 제거되었습니다',
  },
};

export function getErrorMessage(key: ErrorKey, locale: Locale = 'en'): string {
  return ERROR_MESSAGES[key]?.[locale] || ERROR_MESSAGES[key].en;
}

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
