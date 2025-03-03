import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';

import { Text } from '../ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';
import { cn } from '@/lib/utils';

export const FLAGS = {
  en: '🇺🇸',
  ru: '🇷🇺',
  uz: '🇺🇿',
  ko: '🇰🇷',
} as const;

export function Language() {
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  // Fetch languages object
  const languages = t('Commons.Locales.languages', { returnObjects: true });
  const locales = Object.keys(languages);
  return (
    <ScrollView contentContainerClassName="flex-1 flex  justify-between items-start gap-4 w-full pt-4">
      <Text className="text-xl font-bold ">{t('Commons.Locales.choose')}</Text>
      {locales.map((lang) => (
        <TouchableOpacity
          key={lang}
          onPress={() => changeLanguage(lang)}
          className={cn('flex-row items-center gap-2 w-full justify-between')}
        >
          <Text
            className={currentLanguage === lang && 'font-bold text-primary'}
          >
            {t(`Commons.Locales.languages.${lang}`)}
          </Text>
          <Text>{FLAGS[lang as keyof typeof FLAGS]}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
