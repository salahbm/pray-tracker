import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import HeatMap from '@/components/shared/heat-map';
import { MAX_DISPLAY_POINTS } from '@/components/shared/heat-map/constant';
import { DayData } from '@/components/shared/heat-map/heat';
import YearPicker from '@/components/shared/modals/year-picker';
import { PrayCheckbox } from '@/components/shared/pray-checkbox';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';
import { TransformedPrays } from '@/hooks/prays/useGetPrays';
import { PrayerField } from '@/hooks/prays/usePatchPray';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { ClickedData } from '@/types/global';
import { IPrays } from '@/types/prays';
import { triggerHaptic } from '@/utils/haptics';
import { getUtcDateKey } from '@/utils/date';

interface PrayerHistoryProps {
  year: number;
  isLoading?: boolean;
  setYear: (year: number) => void;
  clickedData: ClickedData;
  accordion: string;
  handleDayClick: (date: string, details: { data: DayData | null | undefined }) => void;
  data?: IPrays[];
  handleUpdateClickedDay: (date: string, field: PrayerField, value: 0 | 1 | 2) => void;
  dispatch: React.Dispatch<{ type: string; payload?: unknown }>;
}

const PrayerHistory: React.FC<PrayerHistoryProps> = params => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const {
    year,
    setYear,
    clickedData,
    accordion,
    handleDayClick,
    data,
    handleUpdateClickedDay,
    dispatch,
    isLoading,
  } = params;
  const { colors } = useThemeStore();

  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);

  const togglePicker = async () => {
    await triggerHaptic();
    setIsYearPickerVisible(true);
  };

  const handleYearConfirm = (selectedYear: number) => {
    setYear(selectedYear);
    setIsYearPickerVisible(false);
  };

  const handleYearCancel = () => {
    setIsYearPickerVisible(false);
  };

  const setAccordionState = (newAccordion?: string) => {
    dispatch({ type: 'SET_ACCORDION', payload: newAccordion });
  };

  const transformedData = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc: TransformedPrays, pray: IPrays) => {
      const date = getUtcDateKey(pray.date);
      acc[date] = {
        fajr: pray.fajr ?? 0,
        dhuhr: pray.dhuhr ?? 0,
        asr: pray.asr ?? 0,
        maghrib: pray.maghrib ?? 0,
        isha: pray.isha ?? 0,
        nafl: pray.nafl ?? 0,
      };
      return acc;
    }, {});
  }, [data]);

  return (
    <React.Fragment>
      <View className="mt-10">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className={cn('text-xl font-semibold')}>{t('home.prayerHistory.title')}</Text>
          <Button variant="outline" size="sm" onPress={togglePicker}>
            <Text>{year}</Text>
          </Button>
        </View>

        <YearPicker
          visible={isYearPickerVisible}
          value={year}
          minYear={1980}
          onConfirm={handleYearConfirm}
          onCancel={handleYearCancel}
        />

        <HeatMap
          year={year}
          isLoading={isLoading}
          locale={currentLanguage}
          data={transformedData ?? null}
          onDayClick={handleDayClick}
          color={{
            theme: colors['--primary'],
            opacity: [
              { opacity: 0, limit: 0 },
              { opacity: 0.1, limit: 1 },
              { opacity: 0.2, limit: 2 },
              { opacity: 0.4, limit: 4 },
              { opacity: 0.6, limit: 6 },
              { opacity: 0.8, limit: 8 },
              { opacity: 1, limit: MAX_DISPLAY_POINTS },
            ],
          }}
        />
      </View>

      {/* Past Prayer History */}
      <Accordion type="single" value={accordion} onValueChange={setAccordionState}>
        <AccordionItem value="item-1">
          {clickedData &&
            clickedData.details &&
            (() => {
              // Get live data from prays array instead of stale clickedData
              const livePrayer = data?.find(p => getUtcDateKey(p.date) === clickedData.date);
              const liveData = livePrayer
                ? {
                    fajr: livePrayer.fajr,
                    dhuhr: livePrayer.dhuhr,
                    asr: livePrayer.asr,
                    maghrib: livePrayer.maghrib,
                    isha: livePrayer.isha,
                    nafl: livePrayer.nafl,
                  }
                : clickedData.details.data;

              return (
                <AccordionContent className="mt-5">
                  <View className={cn('p-4 bg-muted rounded-md')}>
                    <View className="w-full flex flex-row items-center justify-between">
                      <Text className={cn('text-md text-muted-foreground')}>
                        {t('home.prayerHistory.date')}: {clickedData.date}
                      </Text>
                      <Button variant="outline" size="sm" onPress={() => setAccordionState()}>
                        <Text>{t('home.prayerHistory.close')}</Text>
                      </Button>
                    </View>
                    {Object.entries(liveData).map(([prayer, value]) => (
                      <View key={prayer} className="flex-row items-center justify-between mt-2">
                        <Text className={cn('capitalize font-semibold')}>
                          {t(`common.salahs.${prayer}`)}
                        </Text>

                        <View className="flex-row items-center justify-end">
                          <PrayCheckbox
                            value={value as 0 | 1 | 2}
                            prayer={prayer}
                            handlePrayerChange={(prayerName, newValue) => {
                              handleUpdateClickedDay(
                                clickedData.date,
                                prayerName as PrayerField,
                                newValue as 0 | 1 | 2
                              );
                            }}
                            isLoading={false}
                          />
                        </View>
                      </View>
                    ))}
                  </View>
                </AccordionContent>
              );
            })()}
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
};

export default PrayerHistory;
