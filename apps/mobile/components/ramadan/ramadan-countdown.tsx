import React, { useMemo } from 'react';
import { View } from 'react-native';
import { AnimatePresence, MotiView } from 'moti';

import { Text } from '@/components/ui/text';
import { RamadanCountdownState } from '@/types/ramadan';

interface RamadanCountdownProps {
  countdown: RamadanCountdownState;
}

const formatRemaining = (remainingMs: number) => {
  const totalSeconds = Math.max(0, Math.floor(remainingMs / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');
};

const RamadanCountdown = ({ countdown }: RamadanCountdownProps) => {
  const label = useMemo(() => {
    return countdown.nextEvent === 'suhoor' ? 'Suhoor ends in' : 'Iftar in';
  }, [countdown.nextEvent]);

  const pulseTransition = countdown.isSoon
    ? { type: 'timing', duration: 700, loop: true, repeatReverse: true }
    : { type: 'timing', duration: 200 };

  return (
    <View className="mt-1.5 rounded-xl border border-border bg-background/80 px-3 py-2">
      <AnimatePresence exitBeforeEnter>
        <MotiView
          key={countdown.nextEvent}
          from={{ opacity: 0, translateX: 16 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: -16 }}
          transition={{ type: 'timing', duration: 250 }}
        >
          <Text className="text-sm text-muted-foreground">{label}</Text>
          <MotiView animate={{ scale: countdown.isSoon ? 1.04 : 1 }} transition={pulseTransition}>
            <Text className="text-foreground text-5xl font-black mt-2">
              {formatRemaining(countdown.remainingMs)}
            </Text>
          </MotiView>
        </MotiView>
      </AnimatePresence>
    </View>
  );
};

export default RamadanCountdown;
