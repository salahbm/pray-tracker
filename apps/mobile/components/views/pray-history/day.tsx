import { format } from 'date-fns';
import React from 'react';
import { Pressable } from 'react-native';
import { DateData } from 'react-native-calendars/src/types';

import { defaultColorMap } from '@/components/shared/heat-map/constant';
import { getOpacityByNumber } from '@/components/shared/heat-map/helpers';
import { Text } from '@/components/ui/text';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { PressableBounce } from '@/components/shared/pressable-bounce';
import { useThemeStore } from '@/store/defaults/theme';
import { cn } from '@/lib/utils';
import { triggerHaptic } from '@/utils';

interface IDayComponentProps {
  date?: DateData;
  prayerCountByDate: Record<string, number>;
  onDayPress: (date: DateData) => void;
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

const DayComponent: React.FC<IDayComponentProps> = ({ date, prayerCountByDate, onDayPress }) => {
  if (!date) return null;

  const { isPremium } = useRevenueCatCustomer();
  const count = prayerCountByDate[date.dateString] ?? 0;
  const bgClass = isPremium ? getBgClassByCount(count) : 'bg-muted';

  return (
    <Pressable
      onPress={() => {
        triggerHaptic();
        onDayPress(date);
      }}
      disabled={date.dateString === format(new Date(), 'yyyy-MM-dd')}
      className={cn('flex-center h-12 w-12 rounded-full transition-colors', bgClass)}
    >
      <Text className={cn('text-foreground')}>{date.day}</Text>
    </Pressable>
  );
};

export default DayComponent;
