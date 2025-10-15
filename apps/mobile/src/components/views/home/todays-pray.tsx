import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';

interface IPrayers {
  prayers: Record<string, number>;
  handlePrayerChange: (prayer: string, value: number) => void;
  isCreatingPray: boolean;
}

const TodaysPray = ({
  prayers,
  handlePrayerChange,
  isCreatingPray,
}: IPrayers) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const [clickedData, setClickedData] = useState<{
    prayer: string;
    value: PRAYER_POINTS;
  } | null>(null);

  return (
    <React.Fragment>
      <View className="flex-row items-center justify-between mt-6 mb-2">
        <Text className={cn('text-xl font-semibold')}>
          {t('Home.TodaysPrayers.Title')}
        </Text>
        <View className="flex-1 flex-row justify-end gap-3">
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('Home.TodaysPrayers.Missed')}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('Home.TodaysPrayers.Late')}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className={cn('text-sm font-bold text-center max-w-16')}
          >
            {t('Home.TodaysPrayers.OnTime')}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-muted-foreground mb-4">
        {t('Home.TodaysPrayers.SubTitle')}
      </Text>
      {Object.entries(prayers).map(([prayer, value]) => (
        <View key={prayer} className="flex-row items-center justify-between">
          <Text className={cn('capitalize font-semibold')}>
            {t(`Commons.Salahs.${prayer}`)}
          </Text>
          <View className="flex-1 flex-row justify-end">
            {[
              PRAYER_POINTS.MISSED,
              PRAYER_POINTS.LATE,
              PRAYER_POINTS.ON_TIME,
            ].map((val, index) => (
              <View className="relative mx-4 my-2" key={index}>
                <Checkbox
                  value={value === val}
                  onValueChange={() => {
                    handlePrayerChange(prayer, val);
                    setClickedData({ prayer, value: val });
                  }}
                  color={
                    value === val
                      ? val === PRAYER_POINTS.ON_TIME
                        ? colors['--primary']
                        : val === PRAYER_POINTS.LATE
                          ? colors['--secondary']
                          : colors['--destructive']
                      : undefined
                  }
                />
                {isCreatingPray &&
                  clickedData?.prayer === prayer &&
                  clickedData?.value === val && (
                    <ActivityIndicator className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-[0.7] text-primary size-10" />
                  )}
              </View>
            ))}
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

export default TodaysPray;
