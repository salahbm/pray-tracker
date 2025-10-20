import { IPrays } from '@/types/prays';
import React from 'react';
import { View } from 'react-native';
import { useAuthStore } from '@/store/auth/auth-session';
import { useUpdateOldPray } from '@/hooks/prays';
import { format } from 'date-fns';
import { Text } from '@/components/ui/text';
import Modal from '@/components/shared/modal';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { PRAYER_POINTS } from '@/constants/enums';
import { Button } from '@/components/ui/button';
import Checkbox from 'expo-checkbox';
import { triggerHaptic } from '@/utils/haptics';

interface IPrevPayUpdateModalProps {
  selected: string;
  setSelected: (selected: string) => void;
  prays: IPrays[];
  colors: Record<string, string>;
}

const PrevPayUpdateModal: React.FC<IPrevPayUpdateModalProps> = ({
  selected,
  setSelected,
  prays,
  colors,
}) => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { mutateAsync: updateOldPray } = useUpdateOldPray();
  return (
    <Modal visible={!!selected} onRequestClose={() => setSelected('')}>
      <View className={cn('p-4 bg-muted rounded-md')}>
        <View className="w-full flex-row items-center justify-between mb-4">
          <Text className={cn('text-md text-muted-foreground')}>
            {t('Home.PrayerHistory.Date')}: {selected}
          </Text>
          <Button variant="outline" size="sm" onPress={() => setSelected('')}>
            <Text>{t('Home.PrayerHistory.Close')}</Text>
          </Button>
        </View>

        {(() => {
          const selectedPray = prays?.find(
            p => format(new Date(p.date), 'yyyy-MM-dd') === selected
          );

          if (!selectedPray)
            return <Text className="text-muted-foreground">{t('Home.PrayerHistory.NoData')}</Text>;

          // iterate through prayer keys
          const prayerKeys: (keyof IPrays)[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha', 'nafl'];

          const normalizePrayerValue = (val: number | null | undefined) =>
            typeof val === 'number' ? val : undefined;

          return prayerKeys.map(prayer => {
            const value = selectedPray[prayer];

            return (
              <View key={prayer} className="flex-row items-center justify-between mt-2">
                <Text className="capitalize font-semibold">{t(`Commons.Salahs.${prayer}`)}</Text>

                <View className="flex-row gap-6">
                  {[PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME].map(val => (
                    <View
                      key={val}
                      className={cn('relative py-2', prayer === 'nafl' && val < 2 && 'hidden')}
                    >
                      <Checkbox
                        value={value === val}
                        onValueChange={async () => {
                          await triggerHaptic();
                          await updateOldPray({
                            id: user?.id!,
                            date: new Date(selected),
                            fajr: prayer === 'fajr' ? val : normalizePrayerValue(selectedPray.fajr),
                            dhuhr:
                              prayer === 'dhuhr' ? val : normalizePrayerValue(selectedPray.dhuhr),
                            asr: prayer === 'asr' ? val : normalizePrayerValue(selectedPray.asr),
                            maghrib:
                              prayer === 'maghrib'
                                ? val
                                : normalizePrayerValue(selectedPray.maghrib),
                            isha: prayer === 'isha' ? val : normalizePrayerValue(selectedPray.isha),
                            nafl: prayer === 'nafl' ? val : normalizePrayerValue(selectedPray.nafl),
                          });
                        }}
                        color={
                          value === val
                            ? val === PRAYER_POINTS.ON_TIME
                              ? colors['--primary']
                              : val === PRAYER_POINTS.LATE
                                ? colors['--secondary']
                                : colors['--destructive']
                            : undefined
                        }
                      />
                    </View>
                  ))}
                </View>
              </View>
            );
          });
        })()}
      </View>
    </Modal>
  );
};

export default PrevPayUpdateModal;
