import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { addDays, format, subDays } from 'date-fns';
import * as allLocales from 'date-fns/locale';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';
import { getLocalDateKey } from '@/utils/date';

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

// Locale map - defined outside component to avoid recreation
const localeMap: { [key: string]: any } = {
  en: allLocales.enUS,
  uz: allLocales.uz,
  ru: allLocales.ru,
  tr: allLocales.tr,
};

export const StackHeader: React.FC<IStackHeaderProps> = ({ options }) => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  // Memoize expensive computations
  const { weekdays, title, year } = useMemo(() => {
    if (!options.title || !options.headerBackTitle) {
      return { weekdays: [], title: '', year: 0 };
    }

    const selectedLocale = localeMap[currentLanguage] || allLocales.enUS;
    const weekStartsOn = selectedLocale.options?.weekStartsOn ?? 0;
    const currentDate = new Date();
    const dayShift = (currentDate.getDay() - weekStartsOn + 7) % 7;
    const firstDayOfWeek = subDays(currentDate, dayShift);

    // Generate weekday names
    const weekdayNames = Array.from({ length: 7 }).map((_, index) =>
      format(addDays(firstDayOfWeek, index), 'eee', { locale: selectedLocale })
    );

    // Get month title
    const monthIndex = LocaleConfig.locales['en']?.monthNames?.indexOf(options.title) || 0;
    const yearNum = Number(options.headerBackTitle);
    const date = new Date(yearNum, monthIndex, 1);
    const monthTitle = format(date, 'MMMM', { locale: selectedLocale });

    return { weekdays: weekdayNames, title: monthTitle, year: yearNum };
  }, [options.title, options.headerBackTitle, currentLanguage]);

  if (!options.title || !options.headerBackTitle) {
    return (
      <View className="bg-background border-b border-border">
        <SafeAreaView edges={['top']} className="px-6 pt-2">
          <View className="flex-row justify-between items-center">
            <View>
              <View className="h-3 w-12 bg-muted rounded-md animate-pulse" />
              <View className="h-6 w-24 bg-muted rounded-md mt-1 animate-pulse" />
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
  }

  const calendarRef = options?.calendarRef;

  return (
    <View className="bg-background border-b border-border">
      <SafeAreaView edges={['top']} className="px-6 pt-2">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-caption text-xs text-muted-foreground">{year}</Text>
            <Text className="text-primary font-heading text-2xl capitalize">{title}</Text>
          </View>
          <Button size="sm" onPress={() => calendarRef?.current?.scrollToDay?.(getLocalDateKey())}>
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
