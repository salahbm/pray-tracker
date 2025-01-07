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

// USA RUSSIA UZBEKISTAN SOUTH KOREA
const flags = [
  { component: '🇺🇸', lang: 'en', name: 'USA' },
  { component: '🇷🇺', lang: 'ru', name: 'Russia' },
  { component: '🇺🇿', lang: 'uz', name: 'Uzbekistan' },
  { component: '🇰🇷', lang: 'ko', name: 'South Korea' },
];

export function Language() {
  const { currentLanguage, changeLanguage } = useLanguage();
  const { t } = useTranslation('Defaults.Locales');

  return (
    <View style={styles.container}>
      <ThemedText style={styles.text}>{t('chooseLanguage')}</ThemedText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Text>{Flag}</Text>
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
