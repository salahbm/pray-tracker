import Checkbox from 'expo-checkbox';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';

interface IPrayers {
  prayers: Record<string, number>;
  handlePrayerChange: (prayer: string, value: number) => void;
}

const TodaysPray = ({ prayers, handlePrayerChange }: IPrayers) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

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
          <Text className={cn('capitalize font-semibold')}>{prayer}</Text>
          <View className="flex-1 flex-row justify-end">
            {[
              PRAYER_POINTS.MISSED,
              PRAYER_POINTS.LATE,
              PRAYER_POINTS.ON_TIME,
            ].map((val) => (
              <TouchableOpacity
                key={val}
                onPress={() => handlePrayerChange(prayer, val)}
                activeOpacity={0.7}
                className="px-4 py-2"
              >
                <Checkbox
                  value={value === val}
                  onValueChange={() => handlePrayerChange(prayer, val)}
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
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

export default TodaysPray;
