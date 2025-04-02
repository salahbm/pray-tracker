import React, { useCallback, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { defaultColorMap, MAX_DISPLAY_POINTS } from './constant';
import { DateMap, HeatMapProps, ProcessedData, YearData } from './heat';
import { arrToMatrix, getDaysInMonth, getOpacityByNumber } from './helpers';
import { PRAYER_POINTS } from '@/constants/enums';
import { cn } from '@/lib/utils';

const HeatMap: React.FC<HeatMapProps> = (props) => {
  const {
    data = null,
    color = defaultColorMap,
    defaultBackgroundColor = '#858682',
    year = new Date().getFullYear(),
    onDayClick,
    locale = 'en',
  } = props;

  // Process data
  const processedData: ProcessedData = useMemo(() => {
    const yearData: YearData = {};
    const dateMap: DateMap = {}; // Map for quick data lookup

    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(month, year);
      const monthName = new Date(year, month).toLocaleString(locale, {
        month: 'short',
      });

      yearData[monthName] = {
        scores: Array(daysInMonth).fill(0),
        dates: Array.from(
          { length: daysInMonth },
          (_, i) =>
            `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
        ),
      };

      yearData[monthName].dates.forEach((date, index) => {
        dateMap[date] = { score: 0, index, month: monthName };
      });
    }

    if (data) {
      Object.entries(data).forEach(([date, dayData]) => {
        const dateObj = new Date(date);
        if (dateObj.getFullYear() !== year) return;

        const rawScore = Object.values(dayData).reduce(
          (sum, value) => sum + value,
          0,
        );

        const cappedScore = Math.min(rawScore, MAX_DISPLAY_POINTS);
        if (dateMap[date]) {
          const { month, index } = dateMap[date];
          yearData[month].scores[index] = cappedScore;
          dateMap[date].score = cappedScore;
          dateMap[date].data = dayData; // Attach original data for easy retrieval
        }
      });
    }

    return { yearData, dateMap };
  }, [data, year, locale]);

  const { yearData, dateMap } = processedData;

  const renderMonth = useCallback(
    (month: string, monthData: { scores: number[]; dates: string[] }) => {
      const grid = arrToMatrix(monthData.scores);

      return (
        <View key={month} className="mr-4">
          <Text className="text-sm font-semibold text-foreground mb-2 capitalize">
            {month}
          </Text>
          <View className={cn('grid grid-cols-7 gap-1')}>
            {grid.map((row, rowIndex) => (
              <View key={`${month}-row-${rowIndex}`} className="flex flex-row">
                {row.map((dayScore, dayIndex) => {
                  const selectedDate =
                    monthData.dates[rowIndex * 7 + dayIndex] || '';

                  return (
                    <TouchableOpacity
                      key={`${month}-cell-${rowIndex}-${dayIndex}`}
                      className={cn('size-6 shrink-0 rounded m-1')}
                      style={{
                        opacity:
                          dayScore > 0
                            ? getOpacityByNumber(color.opacity, dayScore)
                            : 1,
                        backgroundColor:
                          dayScore > 0 ? color.theme : defaultBackgroundColor,
                      }}
                      onPress={() => {
                        if (onDayClick) {
                          const detailedData = dateMap[selectedDate]?.data || {
                            fajr: PRAYER_POINTS.NOT_TOUCHED,
                            dhuhr: PRAYER_POINTS.NOT_TOUCHED,
                            asr: PRAYER_POINTS.NOT_TOUCHED,
                            maghrib: PRAYER_POINTS.NOT_TOUCHED,
                            isha: PRAYER_POINTS.NOT_TOUCHED,
                            nafl: PRAYER_POINTS.NOT_TOUCHED,
                          };
                          onDayClick(selectedDate, { data: detailedData });
                        }
                      }}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      );
    },
    [color, defaultBackgroundColor, dateMap, onDayClick],
  );

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Object.entries(yearData).map(([month, monthData]) =>
        renderMonth(month, monthData),
      )}
    </ScrollView>
  );
};

export default HeatMap;
