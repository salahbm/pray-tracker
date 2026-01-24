import React, { forwardRef, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { Check } from '@/components/shared/icons';
import { usePreferencesStore } from '@/store/use-preferences';
import { PRAYER_CALCULATION_METHODS } from '@/constants/prayer-methods';
import { triggerHaptic } from '@/utils';
import { cn } from '@/lib/utils';
import ScrollBottomSheet from '../../shared/bottom-sheet/scroll-sheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface CalculationMethodSelectorProps {
  onMethodChange?: (method: number) => void;
}

export const CalculationMethodSelector = forwardRef<
  BottomSheetModal,
  CalculationMethodSelectorProps
>((props, ref) => {
  const { t } = useTranslation();
  const { prayerCalculationMethod, setPrayerCalculationMethod } = usePreferencesStore();
  const snapPoints = useMemo(() => ['75%', '99%'], []);

  const handleMethodSelect = (methodId: number) => {
    triggerHaptic();
    setPrayerCalculationMethod(methodId);
    props.onMethodChange?.(methodId);

    // Close the bottom sheet after selection
    if (ref && typeof ref !== 'function' && ref.current) {
      ref.current.close();
    }
  };

  return (
    <ScrollBottomSheet ref={ref} snapPoints={snapPoints}>
      <View className="items-center mb-4">
        <View className="w-12 h-1 bg-muted rounded-full mb-4" />
        <Text className="font-header text-xl font-bold text-foreground">
          {t('qibla.prayerTimes.calculationMethod.title')}
        </Text>
        <Text className="font-body-2 text-sm text-muted-foreground text-center mt-1">
          {t('qibla.prayerTimes.calculationMethod.subtitle')}
        </Text>
      </View>

      <View className="flex-1 pb-10">
        {PRAYER_CALCULATION_METHODS.map(method => {
          const isSelected = prayerCalculationMethod === method.id;

          return (
            <Pressable
              key={method.id}
              onPress={() => handleMethodSelect(method.id)}
              className={cn(
                'flex-row justify-between items-center h-14 py-6 p-4 mb-2 rounded-xl border',
                {
                  'bg-primary/10 border-primary': isSelected,
                  'bg-background border-border': !isSelected,
                }
              )}
            >
              <View className="flex-1 pr-3">
                <Text
                  className={cn('font-body-1 text-sm font-medium', {
                    'text-primary': isSelected,
                    'text-foreground': !isSelected,
                  })}
                  numberOfLines={2}
                >
                  {t(`qibla.prayerTimes.calculationMethod.methods.${method.translationKey}`)}
                </Text>
              </View>

              {isSelected && (
                <View className="w-6 h-6 items-center justify-center rounded-full bg-primary">
                  <Check size={16} className="text-primary-foreground" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollBottomSheet>
  );
});

CalculationMethodSelector.displayName = 'CalculationMethodSelector';
