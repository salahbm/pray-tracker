import React from 'react';
import { View } from 'react-native';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { RamadanStatus } from '@/types/ramadan';

const statusStyles: Record<RamadanStatus, { container: string; text: string }> = {
  Fasting: {
    container: 'bg-primary/10',
    text: 'text-primary',
  },
  'Iftar Time': {
    container: 'bg-emerald-500/10',
    text: 'text-emerald-600',
  },
  'Suhoor Time': {
    container: 'bg-amber-500/10',
    text: 'text-amber-600',
  },
};

interface RamadanStatusBadgeProps {
  status: RamadanStatus;
}

const RamadanStatusBadge = ({ status }: RamadanStatusBadgeProps) => {
  const styles = statusStyles[status];

  return (
    <View className={cn('self-start rounded-full px-3 py-1', styles.container)}>
      <Text className={cn('text-xs font-semibold', styles.text)}>{status}</Text>
    </View>
  );
};

export default RamadanStatusBadge;
