import { useTranslation } from 'react-i18next';
import { ScrollView, TouchableOpacity } from 'react-native';

import { useLanguage } from '@/hooks/common/useTranslation';
import { usePutUser } from '@/hooks/user/usePutUser';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';

import { Text } from '../ui/text';

export const FLAGS = {
  en: '🇺🇸',
  ru: '🇷🇺',
  uz: '🇺🇿',
  ko: '🇰🇷',
} as const;

export function Language() {
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { mutateAsync: updateUser } = usePutUser();

  const handleUpdateLocale = async (locale: string) => {
    changeLanguage(locale); // update UI instantly

    if (user) {
      updateUser({
        ...user,
        locale,
        toast: false,
      });
    }
  };
  // Fetch languages object
  const languages = t('Commons.Locales.languages', { returnObjects: true });
  const locales = Object.keys(languages);
  return (
    <ScrollView contentContainerClassName="flex-1 flex  justify-between items-start gap-4 w-full pt-4">
      <Text className="text-xl font-bold ">{t('Commons.Locales.choose')}</Text>
      {locales.map(lang => (
        <TouchableOpacity
          key={lang}
          onPress={() => handleUpdateLocale(lang)}
          className={cn('flex-row items-center gap-2 w-full justify-between')}
        >
          <Text className={currentLanguage === lang && 'font-bold text-primary'}>
            {t(`Commons.Locales.languages.${lang}`)}
          </Text>
          <Text>{FLAGS[lang as keyof typeof FLAGS]}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
