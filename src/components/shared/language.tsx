import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useLanguage } from '@/hooks/useTranslation';
import { useTranslation } from 'react-i18next';

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
    <View style={styles.container}>
      <ThemedText style={styles.text}>
        {t('Defaults.Locales.choose')}
      </ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {locales.map((lang) => (
          <TouchableOpacity
            key={lang}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang
                ? styles.activeFlag
                : styles.inactiveFlag,
            ]}
          >
            <Text>{FLAGS[lang as keyof typeof FLAGS]}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  flagsContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  flag: {
    paddingHorizontal: 10,
  },
  activeFlag: {
    transform: [{ scale: 1.2 }],
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: -6,
  },
});
