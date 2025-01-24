import Checkbox from 'expo-checkbox';
import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { useCurrentThemeColors } from '@/hooks/common/useCurrentTheme';
import { cn } from '@/lib/utils';

interface IPrayers {
  prayers: Record<string, number>;
  handlePrayerChange: (prayer: string, value: number) => void;
}

const TodaysPray = ({ prayers, handlePrayerChange }: IPrayers) => {
  const colors = useCurrentThemeColors();
  return (
    <React.Fragment>
      <View className="flex-row items-center justify-between mt-6 mb-2">
        <Text className={cn('text-xl font-semibold')}>
          Today&apos;s Prayers
        </Text>
        <View className="flex-1 flex-row justify-end gap-2">
          <Text className={cn('text-sm font-bold text-center')}>Missed</Text>
          <Text className={cn('text-sm font-bold text-center')}>Late</Text>
          <Text className={cn('text-sm font-bold text-center')}>On Time</Text>
        </View>
      </View>
      {Object.entries(prayers).map(([prayer, value]) => (
        <View
          key={prayer}
          className="flex-row items-center justify-between mb-2"
        >
          <Text className={cn('capitalize font-semibold')}>{prayer}</Text>
          <View className="flex-1 flex-row justify-end gap-10">
            {[
              PRAYER_POINTS.MISSED,
              PRAYER_POINTS.LATE,
              PRAYER_POINTS.ON_TIME,
            ].map((val) => (
              <Checkbox
                key={val}
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
            ))}
          </View>
        </View>
      ))}
    </React.Fragment>
  );
};

export default TodaysPray;
