import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguage() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language?.split('-')[0] ?? 'en'; // normalize

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
  };

  return {
    currentLanguage,
    changeLanguage,
  };
}
