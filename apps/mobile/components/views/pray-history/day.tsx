import { differenceInCalendarDays, parseISO } from 'date-fns';
import React from 'react';
import { Pressable } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { triggerHaptic } from '@/utils';
import { memo } from 'react';
import { getLocalDateKey } from '@/utils/date';

interface IDayComponentProps {
  date?: DateData;
  prayerCountByDate: Record<string, number>;
  onDayPress: (date: DateData) => void;
  isPremium: boolean;
}

const opacitySteps = [
  'bg-primary/0',
  'bg-primary/10',
  'bg-primary/20',
  'bg-primary/30',
  'bg-primary/40',
  'bg-primary/50',
  'bg-primary/60',
  'bg-primary/70',
  'bg-primary/80',
  'bg-primary/90',
  'bg-primary',
];

const getBgClassByCount = (count: number) => {
  if (count <= 0) return 'bg-muted';
  const idx = Math.min(opacitySteps.length - 1, Math.ceil((count / 12) * opacitySteps.length));
  return opacitySteps[idx];
};

const DayComponent = memo(
  ({ date, prayerCountByDate, onDayPress, isPremium }: IDayComponentProps) => {
    if (!date) return null;

    const today = new Date();
    const dayDate = parseISO(date.dateString);

    const daysDiff = differenceInCalendarDays(today, dayDate);

    // Non-premium users can only see last 7 days (including today)
    const isAccessible = isPremium || (daysDiff >= 0 && daysDiff <= 6);

    const count = isAccessible ? (prayerCountByDate[date.dateString] ?? 0) : 0;

    const bgClass = isAccessible ? getBgClassByCount(count) : 'bg-muted';

    return (
      <Pressable
        onPress={() => {
          triggerHaptic();
          onDayPress(date);
        }}
        disabled={date.dateString === getLocalDateKey()}
        className={cn('flex-center h-12 w-12 rounded-full transition-colors', bgClass)}
      >
        <Text className={cn('text-foreground')}>{date.day}</Text>
      </Pressable>
    );
  }
);

DayComponent.displayName = 'DayComponent';

export default DayComponent;
