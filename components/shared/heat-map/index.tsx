import React, { useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import { defaultColorMap } from './constant';
import { HeatMapProps } from './heat';
import { arrToMatrix, getDaysInMonth, getOpacityByNumber } from './helpers';
import { cn } from '@/lib/utils';

const HeatMap: React.FC<HeatMapProps> = ({
  data = null,
  color = defaultColorMap,
  year = new Date().getFullYear(),
  onDayClick,
}) => {
  const processedData = useMemo(() => {
    const yearData: { [month: string]: { scores: number[]; dates: string[] } } =
      {};
    for (let month = 0; month < 12; month++) {
      const daysInMonth = getDaysInMonth(month, year);
      yearData[
        new Date(year, month).toLocaleString('default', { month: 'long' })
      ] = {
        scores: Array(daysInMonth).fill(0),
        dates: Array.from(
          { length: daysInMonth },
          (_, i) => `${year}-${month + 1}-${i + 1}`,
        ),
      };
    }

    if (data) {
      Object.entries(data).forEach(([date, prayerData]) => {
        const dateObj = new Date(date);
        if (dateObj.getFullYear() !== year) return;

        const month = dateObj.toLocaleString('default', { month: 'long' });
        const dayIndex = dateObj.getDate() - 1;
        const score = Object.values(prayerData).filter(Boolean).length;

        if (yearData[month]) yearData[month].scores[dayIndex] = score;
      });
    }

    return yearData;
  }, [data, year]);

  const renderMonth = (
    month: string,
    monthData: { scores: number[]; dates: string[] },
  ) => {
    const grid = arrToMatrix(monthData.scores);
    const dates = monthData.dates.map((date) =>
      Number(new Date(date).getTime()),
    );
    const datesGrid = arrToMatrix(dates);

    return (
      <View key={month} className="mr-4">
        <Text className="text-lg font-bold mb-2">{month}</Text>
        <View className={cn('grid grid-cols-7 gap-1')}>
          {grid.map((row, rowIndex) => (
            <View
              key={`${month}-row-${rowIndex}`}
              className="flex flex-row gap-2"
            >
              {row.map((dayScore, dayIndex) => (
                <TouchableOpacity
                  key={`${month}-cell-${rowIndex}-${dayIndex}`}
                  className={cn(
                    'size-5 shrink-0 rounded',
                    dayScore === 0 ? 'bg-gray-500' : 'bg-green-500',
                  )}
                  style={{
                    opacity: getOpacityByNumber(color.opacity, dayScore),
                  }}
                  onPress={() =>
                    onDayClick &&
                    onDayClick(
                      datesGrid[rowIndex.toString()][dayIndex],
                      data?.[datesGrid[rowIndex][dayIndex]] || {},
                    )
                  }
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {Object.entries(processedData).map(([month, monthData]) =>
        renderMonth(month, monthData),
      )}
    </ScrollView>
  );
};

export default HeatMap;
