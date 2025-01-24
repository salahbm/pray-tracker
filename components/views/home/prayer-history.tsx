import { format } from 'date-fns';
import Checkbox from 'expo-checkbox';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import HeatMap from '@/components/shared/heat-map';
import { MAX_DISPLAY_POINTS } from '@/components/shared/heat-map/constant';
import { DayData } from '@/components/shared/heat-map/heat';
import YearPicker from '@/components/shared/year-picker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { PRAYER_POINTS } from '@/constants/enums';
import { TransformedPrays } from '@/hooks/prays/useGetPrays';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { ClickedData } from '@/types/global';
import { IPrays } from '@/types/prays';

interface PrayerHistoryProps {
  isPickerVisible: boolean;
  year: number;
  minYear?: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  clickedData: ClickedData;
  accordion: string;
  handleDayClick: (date: string, details: { data: DayData }) => void;
  data: IPrays[];
  handleUpdateClickedDay: (date: string, details: { data: DayData }) => void;
  dispatch: React.Dispatch<{ type: string; payload?: unknown }>;
}

const PrayerHistory: React.FC<PrayerHistoryProps> = (params) => {
  const {
    isPickerVisible,
    year,
    setYear,
    clickedData,
    accordion,
    handleDayClick,
    data,
    handleUpdateClickedDay,
    dispatch,
    minYear = 2000,
  } = params;
  const { colors } = useThemeStore();
  // Example of toggling picker visibility
  const togglePicker = () => {
    dispatch({ type: 'TOGGLE_PICKER' });
  };

  // Example of setting accordion state
  const setAccordionState = (newAccordion) => {
    dispatch({ type: 'SET_ACCORDION', payload: newAccordion });
  };

  const transformedData = useMemo(() => {
    if (!data) return {};
    return data.reduce((acc: TransformedPrays, pray: IPrays) => {
      const date = format(new Date(pray.date), 'yyyy-MM-dd');
      acc[date] = {
        fajr: pray.fajr,
        dhuhr: pray.dhuhr,
        asr: pray.asr,
        maghrib: pray.maghrib,
        isha: pray.isha,
        tahajjud: pray.tahajjud,
      };
      return acc;
    }, {});
  }, [data]);
  return (
    <React.Fragment>
      <View className="mt-6">
        <View className="flex flex-row justify-between items-center  mb-4">
          <Text className={cn('text-xl font-semibold')}>Prayer History</Text>
          <Button variant="outline" size="sm" onPress={togglePicker}>
            <Text>{year}</Text>
          </Button>
        </View>
        <YearPicker
          value={year}
          minYear={minYear}
          onChangeValue={setYear}
          isVisible={isPickerVisible}
          onBackdropPress={togglePicker}
        />
        {/* HEAT MAP */}
        <HeatMap
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
          data={transformedData ?? null}
          year={year}
          onDayClick={handleDayClick}
        />
      </View>

      <Accordion
        type="single"
        value={accordion}
        onValueChange={setAccordionState}
      >
        <AccordionItem value="item-1">
          {clickedData && clickedData.details && (
            <AccordionContent className="mt-5">
              <View className={cn('p-4 bg-muted rounded-md')}>
                <View className="w-full flex flex-row items-center justify-between">
                  <Text className={cn('text-md text-muted-foreground')}>
                    {clickedData.date}
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    onPress={setAccordionState}
                  >
                    <Text>Close</Text>
                  </Button>
                </View>
                {Object.entries(clickedData.details.data).map(
                  ([prayer, value]) => (
                    <View
                      key={prayer}
                      className="flex-row items-center justify-between mt-2"
                    >
                      <Text className={cn('capitalize font-semibold')}>
                        {prayer}
                      </Text>
                      <View className="flex-row gap-8">
                        {[
                          PRAYER_POINTS.MISSED,
                          PRAYER_POINTS.LATE,
                          PRAYER_POINTS.ON_TIME,
                        ].map((val) => (
                          <Checkbox
                            key={val}
                            value={value === val}
                            onValueChange={() =>
                              handleUpdateClickedDay(clickedData.date, {
                                data: {
                                  ...clickedData.details.data,
                                  [prayer]: val,
                                },
                              })
                            }
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
                        ))}
                      </View>
                    </View>
                  ),
                )}
              </View>
            </AccordionContent>
          )}
        </AccordionItem>
      </Accordion>
    </React.Fragment>
  );
};

export default PrayerHistory;
