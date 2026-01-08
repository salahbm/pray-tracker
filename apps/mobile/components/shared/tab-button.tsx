import { TabTriggerSlotProps } from 'expo-router/ui';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils';
import { useThemeColors } from '@/hooks/common/useThemeColors';
import { LucideIcon, LucideProps } from 'lucide-react-native';
import { triggerHaptic } from '@/utils';
import { useThemeStore } from '@/store/defaults/theme';

type Props = TabTriggerSlotProps & {
  icon: LucideIcon;
};

export function TabButton({ isFocused, icon: Icon, children, ...props }: Props) {
  const { colors } = useThemeStore();

  const containerAnim = useAnimatedStyle(() => {
    'worklet';
    return {
      paddingHorizontal: withTiming(isFocused ? 6 : 0, {
        duration: 400,
      }),
      paddingVertical: 10,
      borderRadius: 999,
    };
  });

  const iconAnim = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withDelay(
          130,
          isFocused
            ? withSequence(
                withTiming(1.2, { duration: 150 }),
                withTiming(0.9, { duration: 150 }),
                withTiming(1.1, { duration: 150 }),
                withTiming(1, { duration: 100 })
              )
            : withTiming(1, { duration: 0 })
        ),
      },
    ],
  }));

  const handlePressIn = useCallback(async () => {
    await triggerHaptic();
  }, []);

  return (
    <Animated.View
      style={[containerAnim, { backgroundColor: isFocused ? colors['--primary'] : 'transparent' }]}
    >
      <Pressable {...props} className="flex-center px-4" onPressIn={handlePressIn} hitSlop={12}>
        <Animated.View style={iconAnim}>
          <Icon
            className={cn(
              'w-4 h-4 shrink-0',
              isFocused ? 'text-primary-foreground stroke-2' : 'text-muted-foreground stroke-1'
            )}
          />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
