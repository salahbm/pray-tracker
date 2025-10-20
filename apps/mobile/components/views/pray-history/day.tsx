import { defaultColorMap } from '@/components/shared/heat-map/constant';
import { getOpacityByNumber } from '@/components/shared/heat-map/helpers';
import { Text } from '@/components/ui/text';
import { format } from 'date-fns';
import React from 'react';
import { Pressable } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

interface IDayComponentProps {
  date?: DateData;
  prayerCountByDate: Record<string, number>;
  onDayPress: (date: DateData) => void;
  colors: Record<string, string>;
}

const DayComponent: React.FC<IDayComponentProps> = ({
  date,
  prayerCountByDate,
  onDayPress,
  colors,
}) => {
  if (!date) return null;

  // fallback to 0 if user not logged in or no data
  const count = prayerCountByDate[date.dateString] ?? 0;

  // background opacity, but keep text fully visible
  const backgroundOpacity = getOpacityByNumber(defaultColorMap.opacity, count);
  const bgColor =
    count > 0
      ? `${colors['--primary']}${Math.round(backgroundOpacity * 255)
          .toString(16)
          .padStart(2, '0')}`
      : colors['--background'];

  return (
    <Pressable
      style={{
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 99,
        backgroundColor: bgColor,
      }}
      onPress={() => onDayPress(date)}
      disabled={date.dateString === format(new Date(), 'yyyy-MM-dd')}
    >
      <Text
        style={{
          color: count > 0 ? colors['--primary-foreground'] : colors['--foreground'],
          opacity: 1,
        }}
      >
        {date.day}
      </Text>
    </Pressable>
  );
};

export default DayComponent;
