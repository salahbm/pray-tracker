import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';
import { Language } from '@/i18n.config';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { format, addDays, subDays } from 'date-fns';
import * as allLocales from 'date-fns/locale'; // Renamed for clarity
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface CalendarRef {
  current: {
    scrollToDay?: (date: string) => void;
  };
}

interface CustomNavigationOptions extends NativeStackNavigationOptions {
  calendarRef?: CalendarRef;
}

interface IStackHeaderProps {
  options: CustomNavigationOptions;
}

export const StackHeader: React.FC<IStackHeaderProps> = ({ options }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage(); // Get current language (e.g., 'en', 'fr')
  const calendarRef = options?.calendarRef;
  const currentDate = new Date();

  // Dynamic map from app language codes to date-fns locales (expand with supported languages)
  // Assumes currentLanguage is a two-letter code like 'en', 'fr'; adjust keys/mappings as needed
  const localeMap: { [key: string]: any } = {
    en: allLocales.enUS,
    ko: allLocales.ko,
    uz: allLocales.uz,
    ru: allLocales.ru,
    // Add more mappings here based on your app's supported languages, e.g., 'pt': allLocales.ptBR
  };

  const selectedLocale = localeMap[currentLanguage] || allLocales.enUS; // Fallback to enUS

  // Get locale-aware week start (0=Sun, 1=Mon, etc.)
  const weekStartsOn = selectedLocale.options?.weekStartsOn ?? 0;

  // Calculate the first day of the week based on locale
  const dayShift = (currentDate.getDay() - weekStartsOn + 7) % 7;
  const firstDayOfWeek = subDays(currentDate, dayShift);

  // Generate localized short weekday names starting from locale's week start (e.g., ['Lun', 'Mar', ...] in French)
  const weekdays = Array.from({ length: 7 }).map(
    (_, index) => format(addDays(firstDayOfWeek, index), 'eee', { locale: selectedLocale }) // 'eee' for short names
  );

  // Use locale for title and year too
  const title = options?.title ?? format(currentDate, 'MMMM', { locale: selectedLocale });
  const year = options?.headerBackTitle ?? format(currentDate, 'yyyy', { locale: selectedLocale });

  return (
    <View className="bg-background border-b border-border">
      <SafeAreaView edges={['top']} className="px-6 pt-2">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-caption text-xs text-muted-foreground">{year}</Text>
            <Text className="text-primary font-heading text-2xl capitalize">{title}</Text>
          </View>
          <Button
            size="sm"
            onPress={() => calendarRef?.current?.scrollToDay?.(format(new Date(), 'yyyy-MM-dd'))}
          >
            <Text className="text-primary-foreground font-medium">{t('Commons.today')}</Text>
          </Button>
        </View>
      </SafeAreaView>

      <View className="flex-row justify-between py-2 px-8 gap-1">
        {weekdays.map(day => (
          <Text key={day} className="text-xs font-medium capitalize">
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
};
