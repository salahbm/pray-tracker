import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { PrayCheckbox } from '@/components/shared/pray-checkbox';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface IPrayers {
  isLoading: boolean;
  prayers: Record<string, number>;
  handlePrayerChange: (prayer: string, value: number) => void;
}

const TodaysPray = memo(({ isLoading, prayers, handlePrayerChange }: IPrayers) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <View className="flex-row items-center justify-between mt-6 mb-2">
        <Text className={cn('text-xl font-semibold')}>{t('home.todaysPrayers.title')}</Text>
        <View className="flex-1 flex-row justify-end gap-3">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('home.todaysPrayers.missed')}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('home.todaysPrayers.late')}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('home.todaysPrayers.onTime')}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-muted-foreground mb-4">{t('home.todaysPrayers.subTitle')}</Text>
      {Object.entries(prayers).map(([prayer, value]) => (
        <View key={prayer} className="flex-row items-center justify-between">
          <Text className={cn('capitalize font-semibold')}>{t(`common.salahs.${prayer}`)}</Text>
          <View className="flex-1 flex-row justify-end">
            <PrayCheckbox
              value={value}
              handlePrayerChange={handlePrayerChange}
              prayer={prayer}
              isLoading={isLoading}
            />
          </View>
        </View>
      ))}
    </React.Fragment>
  );
});

TodaysPray.displayName = 'TodaysPray';

export default TodaysPray;
