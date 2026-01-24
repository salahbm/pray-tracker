import React, { forwardRef, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import type { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Check } from '@/components/shared/icons';
import { usePreferencesStore } from '@/store/use-preferences';
import { PRAYER_CALCULATION_METHODS } from '@/constants/prayer-methods';
import { triggerHaptic } from '@/utils';
import { cn } from '@/lib/utils';

interface CalculationMethodSelectorProps {
  onMethodChange?: (method: number) => void;
}

export const CalculationMethodSelector = forwardRef<BottomSheet, CalculationMethodSelectorProps>(
  (props, ref) => {
    const { t } = useTranslation();
    const { prayerCalculationMethod, setPrayerCalculationMethod } = usePreferencesStore();
    const snapPoints = useMemo(() => ['75%'], []);

    const handleMethodSelect = (methodId: number) => {
      triggerHaptic();
      setPrayerCalculationMethod(methodId);
      props.onMethodChange?.(methodId);
      (ref as React.RefObject<BottomSheet>)?.current?.close();
    };

    const renderBackdrop = (props: BottomSheetDefaultBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={0.5} />
    );

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{ backgroundColor: 'transparent' }}
      >
        <BottomSheetView className="flex-1 bg-background rounded-t-3xl px-4 pt-4">
          <View className="items-center mb-4">
            <View className="w-12 h-1 bg-muted rounded-full mb-4" />
            <Text className="font-header text-xl font-bold text-foreground">
              {t('qibla.prayerTimes.calculationMethod.title')}
            </Text>
            <Text className="font-body-2 text-sm text-muted-foreground text-center mt-1">
              {t('qibla.prayerTimes.calculationMethod.subtitle')}
            </Text>
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {PRAYER_CALCULATION_METHODS.map(method => {
              const isSelected = prayerCalculationMethod === method.id;

              return (
                <Button
                  key={method.id}
                  variant="ghost"
                  onPress={() => handleMethodSelect(method.id)}
                  className={cn(
                    'flex-row justify-between items-center p-4 mb-2 rounded-xl border',
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
                    >
                      {t(`qibla.prayerTimes.calculationMethod.methods.${method.translationKey}`)}
                    </Text>
                  </View>

                  {isSelected && (
                    <View className="w-6 h-6 items-center justify-center rounded-full bg-primary">
                      <Check size={16} className="text-primary-foreground" />
                    </View>
                  )}
                </Button>
              );
            })}
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

CalculationMethodSelector.displayName = 'CalculationMethodSelector';
