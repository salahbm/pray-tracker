import React, { memo } from 'react';
import { Pressable } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { triggerHaptic } from '@/utils';

interface IDayComponentProps {
  date?: DateData;
  prayerCountByDate: Record<string, number>;
  onDayPress: (date: DateData) => void;
  isPremium: boolean;
  todayKey: string;
  weekAgoTimestamp: number;
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
  ({
    date,
    prayerCountByDate,
    onDayPress,
    isPremium,
    todayKey,
    weekAgoTimestamp,
  }: IDayComponentProps) => {
    if (!date) return null;

    // Fast timestamp comparison instead of date parsing
    const dayTimestamp = date.timestamp;
    const isAccessible = isPremium || dayTimestamp >= weekAgoTimestamp;

    const count = isAccessible ? (prayerCountByDate[date.dateString] ?? 0) : 0;
    const bgClass = isAccessible ? getBgClassByCount(count) : 'bg-muted';
    const isToday = date.dateString === todayKey;

    return (
      <Pressable
        onPress={() => {
          triggerHaptic();
          onDayPress(date);
        }}
        hitSlop={10}
        disabled={isToday}
        className={cn('flex-center h-12 w-12 rounded-full transition-colors', bgClass)}
      >
        <Text className={cn('text-foreground')}>{date.day}</Text>
      </Pressable>
    );
  },
  (prev, next) => {
    // Custom comparison for better memoization
    return (
      prev.date?.dateString === next.date?.dateString &&
      prev.prayerCountByDate[prev.date?.dateString || ''] ===
        next.prayerCountByDate[next.date?.dateString || ''] &&
      prev.isPremium === next.isPremium &&
      prev.todayKey === next.todayKey
    );
  }
);

DayComponent.displayName = 'DayComponent';

export default DayComponent;
