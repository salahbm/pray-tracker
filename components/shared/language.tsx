import { useTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';

import { useLanguage } from '@/hooks/common/useTranslation';

const FLAGS = {
  en: '🇺🇸',
  ru: '🇷🇺',
  uz: '🇺🇿',
  ko: '🇰🇷',
} as const;

export function Language() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  // Fetch languages object
  const languages = t('Defaults.Locales.languages', { returnObjects: true });
  const locales = Object.keys(languages);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      alwaysBounceHorizontal
      contentContainerClassName="flex-1 flex flex-row justify-end items-center gap-4 w-full"
    >
      {locales.map((lang) => (
        <TouchableOpacity
          key={lang}
          onPress={() => changeLanguage(lang)}
          style={
            currentLanguage === lang ? styles.activeFlag : styles.inactiveFlag
          }
        >
          <Text>{FLAGS[lang as keyof typeof FLAGS]}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  activeFlag: {
    transform: [{ scale: 1.5 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
});
