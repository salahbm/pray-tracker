import React, { Fragment, useMemo, useCallback, memo } from 'react';
import { View } from 'react-native';

import { PressableBounce } from '@/components/shared/pressable-bounce';
import { cn } from '@/lib/utils';

// --- Types ---

const PRAYER_POINTS = {
  MISSED: 0,
  LATE: 1,
  ON_TIME: 2,
} as const;

type PrayCheckboxProps = {
  value: number;
  handlePrayerChange: (prayer: string, value: number) => void;
  prayer: string;
  disabled?: boolean;
  isLoading?: boolean;
  hideMissed?: boolean;
};

// --- Main Component ---

const PrayCheckbox = memo(
  ({
    value,
    handlePrayerChange,
    prayer,
    isLoading = false,
    disabled = false,
    hideMissed = false,
  }: PrayCheckboxProps) => {
    const visibleOptions = useMemo(() => {
      const options = [PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME];

      return options.filter(optionVal => {
        if (prayer === 'nafl' && optionVal !== PRAYER_POINTS.ON_TIME) return false;
        if (hideMissed && optionVal === PRAYER_POINTS.MISSED) return false;
        return true;
      });
    }, [prayer, hideMissed]);

    const handlePress = useCallback(
      (optionVal: number) => {
        handlePrayerChange(prayer, optionVal);
      },
      [handlePrayerChange, prayer]
    );

    if (isLoading) {
      return (
        <View className="flex-row">
          <View className="mx-3 my-1.5 size-8 rounded-md border-[2.5px] border-border animate-pulse" />
          <View className="mx-3 my-1.5 size-8 rounded-md border-[2.5px] border-border animate-pulse" />
          <View className="mx-3 my-1.5 size-8 rounded-md border-[2.5px] border-border animate-pulse" />
        </View>
      );
    }

    return (
      <Fragment>
        {visibleOptions.map(val => {
          const isActive = val === value;

          return (
            <PressableBounce
              key={val}
              hitSlop={8}
              duration={150}
              disabled={disabled}
              className="mx-3 my-1.5"
              onPress={() => handlePress(val)}
            >
              <View
                className={cn(
                  'flex-center h-8 w-8 aspect-square rounded-md border-2 transition-colors',
                  {
                    // Active state
                    'bg-primary border-primary': isActive && val === PRAYER_POINTS.ON_TIME,
                    'bg-primary-300/80 border-primary-300': isActive && val === PRAYER_POINTS.LATE,
                    'bg-destructive/80 border-destructive/80':
                      isActive && val === PRAYER_POINTS.MISSED,

                    // Inactive state
                    'bg-transparent border-border': !isActive,
                  }
                )}
              >
                <View
                  className={cn('size-3 rounded transition-colors', {
                    'bg-primary-foreground': isActive && val === PRAYER_POINTS.ON_TIME,
                    'bg-primary-foreground/50': isActive && val === PRAYER_POINTS.LATE,
                    'bg-background/50': isActive && val === PRAYER_POINTS.MISSED,
                    'bg-transparent': !isActive,
                  })}
                />
              </View>
            </PressableBounce>
          );
        })}
      </Fragment>
    );
  }
);

PrayCheckbox.displayName = 'PrayCheckbox';

export { PrayCheckbox };
