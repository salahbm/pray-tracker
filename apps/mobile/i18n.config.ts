import enLocalization from '@locales/en.json';
import koLocalization from '@locales/ko.json';
import ruLocalization from '@locales/ru.json';
import uzLocalization from '@locales/uz.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { Platform } from 'react-native';

const resources = {
  en: { translation: enLocalization },
  ko: { translation: koLocalization },
  uz: { translation: uzLocalization },
  ru: { translation: ruLocalization },
};

const initI18n = async () => {
  let savedLanguage = 'en'; // default fallback

  try {
    if (Platform.OS !== 'web') {
      const stored = await AsyncStorage.getItem('language');
      if (stored) {
        savedLanguage = stored;
      } else {
        savedLanguage = Localization.getLocales()[0]?.languageCode || 'en';
      }
    } else {
      // On web: try navigator.languages or Localization fallback
      savedLanguage = Localization.getLocales()[0]?.languageCode || 'en';
    }
  } catch (error) {
    console.info('Failed to get saved language:', error);
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: 'v4',
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
};

initI18n();

export default i18n;
