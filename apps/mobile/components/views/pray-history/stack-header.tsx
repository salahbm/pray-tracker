import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { addDays, format, subDays } from 'date-fns';
import * as allLocales from 'date-fns/locale';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';

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

  if (!options.title || !options.headerBackTitle)
    return (
      <View className="bg-background border-b border-border">
        <SafeAreaView edges={['top']} className="px-6 pt-2">
          <View className="flex-row justify-between items-center">
            <View>
              <View className="h-3 w-12 bg-muted rounded-md animate-pulse" /> {/* year */}
              <View className="h-6 w-24 bg-muted rounded-md mt-1 animate-pulse" /> {/* title */}
            </View>
            <Button size="sm" disabled>
              <Text className="text-primary-foreground font-medium">{t('common.today')}</Text>
            </Button>
          </View>
        </SafeAreaView>

        <View className="flex-row justify-between py-2 px-8 gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <View key={i} className="h-4 w-7 bg-muted rounded-md animate-pulse" />
          ))}
        </View>
      </View>
    );

  const calendarRef = options?.calendarRef;
  const currentDate = new Date();

  // Dynamic map from app language codes to date-fns locales (expand with supported languages)
  // Assumes currentLanguage is a two-letter code like 'en', 'fr'; adjust keys/mappings as needed
  const localeMap: { [key: string]: any } = {
    en: allLocales.enUS,
    uz: allLocales.uz,
    ru: allLocales.ru,
    id: allLocales.id,
    ms: allLocales.ms,
    tr: allLocales.tr,
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

  // Use locale for title is name of the month in english and year too
  const monthIndex = LocaleConfig.locales['en']?.monthNames?.indexOf(options.title) || 0;
  const year = Number(options.headerBackTitle);
  const date = new Date(year, monthIndex, 1);
  const title = format(date, 'MMMM', { locale: selectedLocale });

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
            <Text className="text-primary-foreground font-medium">{t('common.today')}</Text>
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
