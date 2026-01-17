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
  | 'SIGN_OUT_SUCCESS'
  | 'SIGN_OUT_FAILED'
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
  | 'GROUP_NOT_FOUND'
  | 'MEMBER_ADDED'
  | 'MEMBER_REMOVED'
  | 'ONLY_FRIENDS_CAN_BE_ADDED'
  | 'ALREADY_GROUP_MEMBER';

type ErrorMessages = Record<ErrorKey, Record<Locale, string>>;

export const ERROR_MESSAGES: ErrorMessages = {
  UNAUTHORIZED: {
    en: 'Unauthorized access',
    uz: 'Ruxsatsiz kirish',
    ru: 'Неавторизованный доступ',

    tr: 'Yetkisiz erişim',
  },
  FORBIDDEN: {
    en: 'Access forbidden',
    uz: 'Bu murojaatga ruxsat berilmagan',
    ru: 'Доступ запрещен',
    tr: 'Erişim yasak',
  },
  NOT_FOUND: {
    en: 'Resource not found',
    uz: 'Manba topilmadi',
    ru: 'Ресурс не найден',
    tr: 'Kaynak bulunamadı',
  },
  BAD_REQUEST: {
    en: 'Bad request',
    uz: "Noto'g'ri so'rov",
    ru: 'Неверный запрос',

    tr: 'Geçersiz istek',
  },
  INTERNAL_SERVER_ERROR: {
    en: 'Internal server error',
    uz: 'Ichki server xatosi',
    ru: 'Внутренняя ошибка сервера',
    tr: 'Sunucu hatası',
  },
  VALIDATION_ERROR: {
    en: 'Validation error',
    uz: 'Tekshirish xatosi',
    ru: 'Ошибка валидации',

    tr: 'Doğrulama hatası',
  },
  USER_NOT_FOUND: {
    en: 'User not found',
    uz: 'Foydalanuvchi topilmadi',
    ru: 'Пользователь не найден',
    tr: 'Kullanıcı bulunamadı',
  },
  USER_ALREADY_EXISTS: {
    en: 'User already exists',
    uz: 'Foydalanuvchi allaqachon mavjud',
    ru: 'Пользователь уже существует',

    tr: 'Kullanıcı zaten mevcut',
  },
  INVALID_CREDENTIALS: {
    en: 'Invalid email or password',
    uz: "Email yoki parol noto'g'ri",
    ru: 'Неверный email или пароль',
    tr: 'Geçersiz email veya şifre',
  },
  SESSION_EXPIRED: {
    en: 'Session expired. Please login again',
    uz: 'Sessiya muddati tugadi. Iltimos, qaytadan kiring',
    ru: 'Сессия истекла. Пожалуйста, войдите снова',
    tr: 'Oturum sona erdi. Lütfen tekrar giriş yapın',
  },
  SIGN_OUT_SUCCESS: {
    en: 'Sign out successful',
    uz: 'Tizimdan chiqish muvaffaqiyatli',
    ru: 'Вы успешно вышли',

    tr: 'Oturum sona erdi',
  },
  SIGN_OUT_FAILED: {
    en: 'Sign out failed',
    uz: 'Tizimdan chiqish muvaffaqiyatli',
    ru: 'Вы успешно вышли',
    tr: 'Oturum sona erdi',
  },
  NO_ACTIVE_SESSION: {
    en: 'No active session found',
    uz: 'Faol sessiya topilmadi',
    ru: 'Активная сессия не найдена',

    tr: 'Aktif oturum bulunamadı',
  },
  INVALID_TOKEN: {
    en: 'Invalid or expired token',
    uz: "Noto'g'ri yoki muddati o'tgan token",
    ru: 'Недействительный или истекший токен',
    tr: 'Geçersiz veya süresi dolmuş token',
  },
  EMAIL_ALREADY_EXISTS: {
    en: 'Email already exists',
    uz: 'Email allaqachon mavjud',
    ru: 'Email уже существует',

    tr: 'Email zaten mevcut',
  },
  WEAK_PASSWORD: {
    en: 'Password must be at least 8 characters',
    uz: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
    ru: 'Пароль должен содержать не менее 8 символов',
    tr: 'Şifre en az 8 karakter olmalı',
  },
  INVALID_EMAIL: {
    en: 'Invalid email format',
    uz: "Email formati noto'g'ri",
    ru: 'Неверный формат email',
    tr: 'Geçersiz email formatı',
  },
  REQUIRED_FIELD: {
    en: 'This field is required',
    uz: 'Bu maydon majburiy',
    ru: 'Это поле обязательно',
    tr: 'Bu alan zorunludur',
  },
  INVALID_INPUT: {
    en: 'Invalid input provided',
    uz: "Noto'g'ri ma'lumot kiritildi",
    ru: 'Предоставлены неверные данные',

    tr: 'Geçersiz giriş sağlandı',
  },
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: {
    en: 'User already exists. Use another email',
    uz: 'Foydalanuvchi allaqachon mavjud. Boshqa emaildan foydalaning',
    ru: 'Пользователь уже существует. Используйте другой email',

    tr: 'Kullanıcı zaten mevcut. Başka bir email kullanın',
  },
  FRIEND_REQUEST_SENT: {
    en: 'Friend request sent successfully',
    uz: "Do'stlik so'rovi muvaffaqiyatli yuborildi",
    ru: 'Запрос на добавление в друзья отправлен',
    tr: 'Arkadaşlık isteği gönderildi',
  },
  FRIEND_REQUEST_ACCEPTED: {
    en: 'Friend request accepted',
    uz: "Do'stlik so'rovi qabul qilindi",
    ru: 'Запрос на добавление в друзья принят',

    tr: 'Arkadaşlık isteği kabul edildi',
  },
  FRIEND_REQUEST_REJECTED: {
    en: 'Friend request rejected',
    uz: "Do'stlik so'rovi rad etildi",
    ru: 'Запрос на добавление в друзья отклонен',
    tr: 'Arkadaşlık isteği reddedildi',
  },
  FRIEND_REMOVED: {
    en: 'Friend removed successfully',
    uz: "Do'st muvaffaqiyatli o'chirildi",
    ru: 'Друг успешно удален',

    tr: 'Arkadaş başarıyla kaldırıldı',
  },
  FRIEND_REQUEST_ALREADY_EXISTS: {
    en: 'Friend request already exists',
    uz: "Do'stlik so'rovi allaqachon mavjud",
    ru: 'Запрос на добавление в друзья уже существует',

    tr: 'Arkadaşlık isteği zaten mevcut',
  },
  FRIEND_REQUEST_NOT_FOUND: {
    en: 'Friend request not found',
    uz: "Do'stlik so'rovi topilmadi",
    ru: 'Запрос на добавление в друзья не найден',

    tr: 'Arkadaşlık isteği bulunamadı',
  },
  CANNOT_SEND_REQUEST_TO_SELF: {
    en: 'You cannot send a friend request to yourself',
    uz: "O'zingizga do'stlik so'rovi yubora olmaysiz",
    ru: 'Вы не можете отправить запрос на добавление в друзья самому себе',
    tr: 'Kendinize arkadaşlık isteği gönderemezsiniz',
  },
  ALREADY_FRIENDS: {
    en: 'You are already friends',
    uz: "Siz allaqachon do'stsiz",
    ru: 'Вы уже друзья',
    tr: 'Zaten arkadaşsınız',
  },
  FRIEND_NOT_FOUND: {
    en: 'Friend not found',
    uz: "Do'st topilmadi",
    ru: 'Друг не найден',
    tr: 'Arkadaş bulunamadı',
  },
  GROUP_CREATED: {
    en: 'Group created successfully',
    uz: 'Guruh muvaffaqiyatli yaratildi',
    ru: 'Группа успешно создана',
    tr: 'Grup başarıyla oluşturuldu',
  },
  GROUP_UPDATED: {
    en: 'Group updated successfully',
    uz: 'Guruh muvaffaqiyatli yangilandi',
    ru: 'Группа успешно обновлена',
    tr: 'Grup başarıyla güncellendi',
  },
  GROUP_NOT_FOUND: {
    en: 'Group not found',
    uz: 'Guruh topilmadi',
    ru: 'Группа не найдена',
    tr: 'Grup bulunamadı',
  },
  GROUP_DELETED: {
    en: 'Group deleted successfully',
    uz: "Guruh muvaffaqiyatli o'chirildi",
    ru: 'Группа успешно удалена',

    tr: 'Grup başarıyla silindi',
  },
  MEMBER_ADDED: {
    en: 'Member added to group successfully',
    uz: "A'zo guruhga muvaffaqiyatli qo'shildi",
    ru: 'Участник успешно добавлен в группу',

    tr: 'Üye gruba başarıyla eklendi',
  },
  MEMBER_REMOVED: {
    en: 'Member removed from group successfully',
    uz: "A'zo guruhdan muvaffaqiyatli o'chirildi",
    ru: 'Участник успешно удален из группы',

    tr: 'Üye gruptan başarıyla çıkarıldı',
  },
  ONLY_FRIENDS_CAN_BE_ADDED: {
    en: 'You can only add friends to groups',
    uz: "Faqat do'stlarni guruhlarga qo'shishingiz mumkin",
    ru: 'В группы можно добавлять только друзей',
    tr: 'Gruplara sadece arkadaş ekleyebilirsiniz',
  },
  ALREADY_GROUP_MEMBER: {
    en: 'User is already a member of this group',
    uz: "Foydalanuvchi allaqachon ushbu guruh a'zosi",
    ru: 'Пользователь уже является участником этой группы',
    tr: 'Kullanıcı zaten bu grubun üyesi',
  },
};

export function getLocalizedMessage(
  key: ErrorKey,
  locale: Locale = 'en',
): string {
  const localized = ERROR_MESSAGES[key]?.[locale];

  if (localized) return localized;

  if (ERROR_MESSAGES[key]?.en) return ERROR_MESSAGES[key].en;
  if (ERROR_MESSAGES[key]?.ru) return ERROR_MESSAGES[key].ru;
  if (ERROR_MESSAGES[key]?.uz) return ERROR_MESSAGES[key].uz;

  return 'An error occurred';
}
