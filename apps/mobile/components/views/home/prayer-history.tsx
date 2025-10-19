import { format } from 'date-fns';
import Checkbox from 'expo-checkbox';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import HeatMap from '@/components/shared/heat-map';
import { MAX_DISPLAY_POINTS } from '@/components/shared/heat-map/constant';
import { DayData } from '@/components/shared/heat-map/heat';
import YearPicker from '@/components/shared/year-picker';
import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { useLanguage } from '@/hooks/common/useTranslation';
import { TransformedPrays } from '@/hooks/prays/useGetPrays';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { ClickedData } from '@/types/global';
import { IPrays } from '@/types/prays';
import { triggerHaptic } from '@/utils/haptics';

interface PrayerHistoryProps {
  year: number;
  setYear: (year: number) => void;
  clickedData: ClickedData;
  accordion: string;
  handleDayClick: (date: string, details: { data: DayData | null | undefined }) => void;
  data?: IPrays[];
  handleUpdateClickedDay: (date: string, details: { data: DayData }) => void;
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
      const date = format(new Date(pray.date), 'yyyy-MM-dd');
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
  }, [data, year]);

  return (
    <React.Fragment>
    

      <View className="mt-6">
        <View className="flex flex-row justify-between items-center mb-4">
          <Text className={cn('text-xl font-semibold')}>{t('Home.PrayerHistory.Title')}</Text>
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
          data={transformedData ?? null}
          year={year}
          locale={currentLanguage}
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
          {clickedData && clickedData.details && (
            <AccordionContent className="mt-5">
              <View className={cn('p-4 bg-muted rounded-md')}>
                <View className="w-full flex flex-row items-center justify-between">
                  <Text className={cn('text-md text-muted-foreground')}>
                    {t('Home.PrayerHistory.Date')}: {clickedData.date}
                  </Text>
                  <Button variant="outline" size="sm" onPress={() => setAccordionState()}>
                    <Text>{t('Home.PrayerHistory.Close')}</Text>
                  </Button>
                </View>
                {Object.entries(clickedData.details.data).map(([prayer, value]) => (
                  <View key={prayer} className="flex-row items-center justify-between mt-2">
                    <Text className={cn('capitalize font-semibold')}>
                      {t(`Commons.Salahs.${prayer}`)}
                    </Text>

                    <View className="flex-row gap-8">
                      {[PRAYER_POINTS.MISSED, PRAYER_POINTS.LATE, PRAYER_POINTS.ON_TIME].map(
                        (val, index) => (
                          <View className="relative" key={index}>
                            <Checkbox
                              key={val}
                              value={value === val}
                              onValueChange={() => {
                                handleUpdateClickedDay(clickedData.date, {
                                  data: {
                                    ...clickedData.details.data,
                                    [prayer]: val,
                                  },
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
                        )
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
};

export default PrayerHistory;
