import { Locale } from '../utils';

export type EmailKey =
  | 'EMAIL_PASSWORD_RESET_TITLE'
  | 'EMAIL_PASSWORD_RESET_BODY';

type EmailMessages = {
  [key in EmailKey]: {
    en: string;
    ru: string;
    uz: string;
    id: string;
    ms: string;
    tr: string;
  };
};

export const EMAIL_MESSAGES: EmailMessages = {
  EMAIL_PASSWORD_RESET_TITLE: {
    en: 'Reset Your Password - Noor App',
    ru: 'Сбросить пароль - Noor App',
    uz: 'Parolni tiklash - Noor App',
    id: 'Reset Kata Sandi - Noor App',
    ms: 'Tetapkan Semula Kata Laluan - Noor App',
    tr: 'Parol Sıfırla - Noor App',
  },

  EMAIL_PASSWORD_RESET_BODY: {
    en: 'Hello,\n\nWe received a request to reset your password for Noor App.\n\nClick the button below to reset your password:',
    ru: 'Здравствуйте,\n\nМы получили запрос на сброс пароля для Noor App.\n\nНажмите кнопку ниже, чтобы сбросить свой пароль:',
    uz: 'Salom,\n\nNoor App uchun parolni tiklash so"rovingizni qabul qildik.\n\nQuyidagi tugmani bosing, parolni tiklash uchun:',
    id: 'Halo,\n\nKami menerima permintaan untuk mereset password Anda untuk Noor App.\n\nKlik tombol di bawah untuk mereset password Anda:',
    ms: 'Halo,\n\nKami menerima permintaan untuk mereset password Anda untuk Noor App.\n\nKlik butang di bawah untuk mereset password Anda:',
    tr: 'Merhaba,\n\nNoor App için parolunuzu sıfırlamak için bir istekte bulunduğumuzu aldık.\n\nAşağıdaki butona tıklayarak parolunuzu sıfırlayabilirsiniz:',
  },
};

export const getLocalizedMessage = (key: EmailKey, locale: Locale) => {
  return EMAIL_MESSAGES[key][locale];
};
