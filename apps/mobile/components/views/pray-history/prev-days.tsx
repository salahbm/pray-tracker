import { format } from 'date-fns';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Modal from '@/components/shared/modals/modal';
import { PrayCheckbox } from '@/components/shared/pray-checkbox';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PrayerField, usePatchPray } from '@/hooks/prays/usePatchPray';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth/auth-session';
import { IPrays } from '@/types/prays';
import { triggerHaptic } from '@/utils/haptics';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

interface PrevDayProps {
  ref: React.RefObject<BottomSheetModal | null>;
  selected: string;
  setSelected: (selected: string) => void;
  prays: IPrays[];
}

const PrevDay: React.FC<PrevDayProps> = ({ ref, selected, setSelected, prays }) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { mutateAsync: patchPray } = usePatchPray();

  // Memoize the prayer change handler
  const handlePrayerChange = useCallback(
    async (prayerName: string, newValue: number) => {
      if (!user?.id) return;
      await triggerHaptic();
      await patchPray({
        userId: user.id,
        date: new Date(selected),
        field: prayerName as PrayerField,
        value: newValue as 0 | 1 | 2,
      });
    },
    [user?.id, selected, patchPray]
  );

  return (
    <View className="pt-5 pb-2">
      <View className="w-full flex-row items-center justify-between mb-4">
        <Text className={cn('text-md text-muted-foreground')}>
          {t('home.prayerHistory.date')}: {selected}
        </Text>
        <Button
          variant="outline"
          size="sm"
          onPress={() => {
            ref.current?.dismiss();
            setSelected('');
          }}
        >
          <Text>{t('home.prayerHistory.close')}</Text>
        </Button>
      </View>

      {(() => {
        const selectedPray = prays?.find(p => format(new Date(p.date), 'yyyy-MM-dd') === selected);

        // iterate through prayer keys
        const prayerKeys: (keyof IPrays)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'nafl'];
        return prayerKeys.map(prayer => {
          const value = selectedPray?.[prayer];

          return (
            <View key={prayer} className="flex-row items-center justify-between mt-2">
              <Text className="capitalize font-semibold">{t(`common.salahs.${prayer}`)}</Text>
              <View className="flex-row items-center justify-between">
                <PrayCheckbox
                  value={value as number}
                  prayer={prayer}
                  handlePrayerChange={handlePrayerChange}
                  isLoading={false}
                />
              </View>
            </View>
          );
        });
      })()}
    </View>
  );
};

export default PrevDay;
