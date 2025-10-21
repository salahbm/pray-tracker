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

export const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
  uz: 'O`zbekcha',
  ko: '한국어',
} as const;

export function Language({onClose}: {onClose: () => void}) {
  const { changeLanguage, currentLanguage } = useLanguage();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { mutateAsync: updateUser } = usePutUser();

  const handleUpdateLocale = async (locale: string) => {
    changeLanguage(locale);
    onClose();
    if (user) {
      updateUser({
        ...user,
        locale,
        toast: false,
      });
    }
  };
  // Fetch languages object
  const languages = LANGUAGES;
  const locales = Object.keys(languages);

  return (
    <ScrollView contentContainerClassName="flex-1 flex  justify-between items-start gap-4 w-full pt-4">
      <Text className="text-xl font-bold ">{t('Commons.choose')}</Text>
      {locales.map(lang => (
        <TouchableOpacity
          key={lang}
          onPress={() => handleUpdateLocale(lang)}
          className={cn('flex-row items-center gap-2 w-full justify-between')}
        >
          <Text className={cn('text-md text-foreground', currentLanguage === lang && 'font-bold')}>
            {LANGUAGES[lang as keyof typeof LANGUAGES]}
          </Text>
          <Text>{FLAGS[lang as keyof typeof FLAGS]}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
