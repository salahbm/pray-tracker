import React, { Fragment, useMemo, memo, useCallback } from 'react';
import { View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { PressableBounce } from '@/components/shared/pressable-bounce';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';

// --- Types ---

const PRAYER_POINTS = {
  MISSED: 0,
  LATE: 1,
  ON_TIME: 2,
} as const;

type PrayerValue = (typeof PRAYER_POINTS)[keyof typeof PRAYER_POINTS];

type PrayCheckboxProps = {
  value: number;
  handlePrayerChange: (prayer: string, value: number) => void;
  prayer: string;
  disabled?: boolean;
  isLoading?: boolean;
  hideMissed?: boolean;
};

// --- Animation Config ---

const TIMING_CONFIG = { duration: 200 };
const PULSE_DURATION = 800;

// --- Sub-Component: Skeleton (Memoized) ---

const CheckboxSkeleton = memo(() => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: PULSE_DURATION }),
        withTiming(0.3, { duration: PULSE_DURATION })
      ),
      -1,
      true
    );
  }, [opacity]);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="mx-3 my-1.5 size-8 rounded-md border-[2.5px] border-border"
      style={rStyle}
    />
  );
});

CheckboxSkeleton.displayName = 'CheckboxSkeleton';

// --- Sub-Component: The Animated Checkbox (Memoized) ---

const BounceCheckbox = memo<{
  checked: boolean;
  onPress: () => void;
  activeColor: string;
  borderColor: string;
  disabled?: boolean;
}>(({ checked, onPress, activeColor, borderColor, disabled }) => {
  const checkProgress = useSharedValue(checked ? 1 : 0);

  React.useEffect(() => {
    checkProgress.value = withTiming(checked ? 1 : 0, TIMING_CONFIG);
  }, [checked, checkProgress]);

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      checkProgress.value,
      [0, 1],
      ['transparent', activeColor]
    );

    const animatedBorderColor = interpolateColor(
      checkProgress.value,
      [0, 1],
      [borderColor, activeColor]
    );

    return {
      backgroundColor,
      borderColor: animatedBorderColor,
    };
  }, [activeColor, borderColor]);

  const rInnerStyle = useAnimatedStyle(() => {
    const progressValue = checkProgress.value;
    return {
      opacity: progressValue,
      transform: [{ scale: Math.max(0, progressValue) }],
    };
  }, []);

  return (
    <PressableBounce
      onPress={onPress}
      className="mx-3 my-1.5"
      hitSlop={8}
      disabled={disabled}
      duration={150}
    >
      <Animated.View
        className={cn(
          'flex items-center justify-center h-8 w-8 aspect-square rounded-md',
          checked ? 'border-muted box-border border-[0.4px]' : 'border-border border-2'
        )}
        style={rContainerStyle}
      >
        <Animated.View style={rInnerStyle} className="size-3 bg-white rounded" />
      </Animated.View>
    </PressableBounce>
  );
});

BounceCheckbox.displayName = 'BounceCheckbox';

// --- Main Component ---

const PrayCheckbox: React.FC<PrayCheckboxProps> = ({
  value,
  handlePrayerChange,
  prayer,
  isLoading = false,
  disabled = false,
  hideMissed = false,
}) => {
  const { colors } = useThemeStore();

  const visibleOptions = useMemo(() => {
    const options = [PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME];

    return options.filter(optionVal => {
      if (prayer === 'nafl' && optionVal < 2) return false;
      if (hideMissed && optionVal === PRAYER_POINTS.MISSED) return false;
      return true;
    });
  }, [prayer, hideMissed]);

  const getColorForValue = useCallback(
    (val: number) => {
      if (val === PRAYER_POINTS.ON_TIME) return colors['--primary'] || '#10b981';
      if (val === PRAYER_POINTS.LATE) return colors['--secondary'] || '#f59e0b';
      return colors['--destructive'] || '#ef4444';
    },
    [colors]
  );

  const borderColor = useMemo(() => colors['--border'] || '#e5e7eb', [colors]);

  const handlePress = useCallback(
    (optionVal: number) => {
      // Call immediately - PressableBounce handles animation independently
      handlePrayerChange(prayer, optionVal);
    },
    [handlePrayerChange, prayer]
  );

  if (isLoading) {
    return (
      <View className="flex-row">
        <CheckboxSkeleton />
        <CheckboxSkeleton />
        <CheckboxSkeleton />
      </View>
    );
  }

  return (
    <Fragment>
      {visibleOptions.map(optionVal => (
        <BounceCheckbox
          key={optionVal}
          disabled={disabled}
          checked={value === optionVal}
          onPress={() => handlePress(optionVal)}
          activeColor={getColorForValue(optionVal)}
          borderColor={borderColor}
        />
      ))}
    </Fragment>
  );
};

export { PrayCheckbox };
