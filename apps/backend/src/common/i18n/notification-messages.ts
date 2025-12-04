export type NotificationKey =
  | 'FRIEND_REQUEST_TITLE'
  | 'FRIEND_REQUEST_BODY'
  | 'FRIEND_REQUEST_ACCEPTED_TITLE'
  | 'FRIEND_REQUEST_ACCEPTED_BODY'
  | 'ADDED_TO_GROUP_TITLE'
  | 'ADDED_TO_GROUP_BODY';

type NotificationMessages = {
  [key in NotificationKey]: {
    en: string;
    ru: string;
    uz: string;
  };
};

export const NOTIFICATION_MESSAGES: NotificationMessages = {
  FRIEND_REQUEST_TITLE: {
    en: '🤝 New Friend Request',
    ru: '🤝 Новый запрос в друзья',
    uz: "🤝 Yangi do'stlik so'rovi",
  },
  FRIEND_REQUEST_BODY: {
    en: '{{senderName}} ({{senderEmail}}) sent you a friend request',
    ru: '{{senderName}} ({{senderEmail}}) отправил(а) вам запрос в друзья',
    uz: "{{senderName}} ({{senderEmail}}) sizga do'stlik so'rovi yubordi",
  },
  FRIEND_REQUEST_ACCEPTED_TITLE: {
    en: '✅ Friend Request Accepted',
    ru: '✅ Запрос в друзья принят',
    uz: "✅ Do'stlik so'rovi qabul qilindi",
  },
  FRIEND_REQUEST_ACCEPTED_BODY: {
    en: '{{accepterName}} accepted your friend request',
    ru: '{{accepterName}} принял(а) ваш запрос в друзья',
    uz: "{{accepterName}} do'stlik so'rovingizni qabul qildi",
  },
  ADDED_TO_GROUP_TITLE: {
    en: '👥 Added to Group',
    ru: '👥 Добавлен(а) в группу',
    uz: "👥 Guruhga qo'shildi",
  },
  ADDED_TO_GROUP_BODY: {
    en: '{{adderName}} added you to "{{groupName}}"',
    ru: '{{adderName}} добавил(а) вас в группу "{{groupName}}"',
    uz: '{{adderName}} sizni "{{groupName}}" guruhiga qo\'shdi',
  },
};

export type Locale = 'en' | 'ru' | 'uz';

/**
 * Localized notification resolver
 */
export const getLocalizedNotification = (
  key: NotificationKey,
  locale: Locale = 'en',
  params?: Record<string, string>,
): string => {
  let message =
    NOTIFICATION_MESSAGES[key][locale] || NOTIFICATION_MESSAGES[key].en;

  if (params) {
    Object.keys(params).forEach((param) => {
      message = message.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
    });
  }

  return message;
};
