import React, { Fragment, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { cn } from '@/lib/utils'; // Your existing utility
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
  isLoading?: boolean;
  hideMissed?: boolean;
};

// --- Animation Config ---

const SPRING_CONFIG = {
  stiffness: 500,
  damping: 15, // Low damping = more bouncy
  mass: 1,
};

// --- Sub-Component: Skeleton ---

const CheckboxSkeleton = () => {
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    // Infinite pulse animation
    opacity.value = withRepeat(
      withSequence(withTiming(0.7, { duration: 800 }), withTiming(0.3, { duration: 800 })),
      -1, // Infinite
      true // Reverse
    );
  }, []);

  const rStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="mx-3 my-1.5 size-8 rounded-md bg-secondary border-2 border-border"
      style={rStyle}
    />
  );
};

// --- Sub-Component: The Animated Checkbox ---

const BounceCheckbox: React.FC<{
  checked: boolean;
  onPress: () => void;
  activeColor: string;
}> = ({ checked, onPress, activeColor }) => {
  // Shared Values
  const scale = useSharedValue(1);
  const { colors } = useThemeStore();
  const checkProgress = useSharedValue(checked ? 1 : 0);

  // Sync prop changes to shared value
  React.useEffect(() => {
    checkProgress.value = withTiming(checked ? 1 : 0, { duration: 200 });
  }, [checked]);

  // Gesture Handlers
  const handlePressIn = () => {
    scale.value = withSpring(0.85, SPRING_CONFIG);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SPRING_CONFIG);
  };

  // 1. Container Animation (Scale + Border Color + BG Color)
  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      checkProgress.value,
      [0, 1],
      ['transparent', activeColor]
    );

    // Optional: Animate border color opacity based on checked state
    const borderColor = interpolateColor(
      checkProgress.value,
      [0, 1],
      [colors['--border'], activeColor]
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    };
  });

  // 2. Inner Dot/Icon Animation (Scale + Opacity)
  const rInnerStyle = useAnimatedStyle(() => {
    return {
      opacity: checkProgress.value,
      transform: [{ scale: Math.max(0, checkProgress.value) }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className="mx-3 my-1.5"
      hitSlop={20}
    >
      <Animated.View
        className={cn(
          'flex items-center justify-center h-8 w-8 aspect-square rounded-md ',
          checked ? 'border-muted box-border border-[0.4px]' : 'border-border border-2'
        )}
        style={rContainerStyle}
      >
        {/* Render the inner white indicator */}
        <Animated.View style={rInnerStyle} className="size-3 bg-white rounded" />
      </Animated.View>
    </Pressable>
  );
};

// --- Main Component ---

const PrayCheckbox: React.FC<PrayCheckboxProps> = ({
  value,
  handlePrayerChange,
  prayer,
  isLoading = false,
  hideMissed = false,
}) => {
  const { colors } = useThemeStore();

  // Memoize the visible options to prevent re-calculations during renders
  const visibleOptions = useMemo(() => {
    const options = [PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME];

    return options.filter(optionVal => {
      // Logic 1: Original Nafl logic
      if (prayer === 'nafl' && optionVal < 2) return false;

      // Logic 2: New hideMissed prop
      if (hideMissed && optionVal === PRAYER_POINTS.MISSED) return false;

      return true;
    });
  }, [prayer, hideMissed]);

  if (isLoading) {
    // Show 3 skeletons if loading
    return (
      <View className="flex-row">
        {[1, 2, 3].map(i => (
          <CheckboxSkeleton key={i} />
        ))}
      </View>
    );
  }

  const getColorForValue = (val: number) => {
    if (val === PRAYER_POINTS.ON_TIME) return colors['--primary'] || '#10b981'; // Green fallback
    if (val === PRAYER_POINTS.LATE) return colors['--secondary'] || '#f59e0b'; // Orange fallback
    return colors['--destructive'] || '#ef4444'; // Red fallback
  };

  return (
    <Fragment>
      {visibleOptions.map(optionVal => (
        <BounceCheckbox
          key={optionVal}
          checked={value === optionVal}
          onPress={() => handlePrayerChange(prayer, optionVal)}
          activeColor={getColorForValue(optionVal)}
        />
      ))}
    </Fragment>
  );
};

export { PrayCheckbox };
