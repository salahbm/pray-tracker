import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { COLORS } from '@/constants/Colors';
import { cn } from '@/lib/utils';
import { IPrays } from '@/types/prays';

// const lineDataDummy: lineDataItem[] = [
//   { value: 0 },
//   { value: 20 },
//   { value: 18 },
//   { value: 40 },
//   { value: 36 },
//   { value: 60 },
//   { value: 54 },
//   { value: 85 },
//   { value: 240 },
//   { value: 60 },
//   { value: 280 },
//   { value: 300 },
//   { value: 320 },
//   { value: 100 },
//   { value: 0 },
//   { value: 10 },
//   { value: 20 },
//   { value: 30 },
//   { value: 40 },
//   { value: 50 },
//   { value: 60 },
//   { value: 70 },
//   { value: 80 },
//   { value: 90 },
//   { value: 100 },
//   { value: 110 },
//   { value: 120 },
//   { value: 130 },
//   { value: 140 },
//   { value: 150 },
//   { value: 160 },
//   { value: 170 },
//   { value: 180 },
//   { value: 190 },
// ];

const AreaChart = ({ lineData }: { lineData: IPrays[] }) => {
  const transformPraysToLineData = useMemo((): lineDataItem[] => {
    if (!lineData) return [];
    // Calculate daily prayer points
    const dailyPoints = lineData.map(
      (pray) =>
        pray.asr +
        pray.dhuhr +
        pray.fajr +
        pray.isha +
        pray.maghrib +
        pray.tahajjud,
    );

    // Convert daily points to cumulative sum
    return dailyPoints.reduce((acc: lineDataItem[], point, index) => {
      const cumulativeValue = (acc[index - 1]?.value || 0) + point;
      acc.push({ value: cumulativeValue });
      return acc;
    }, []);
  }, [lineData]);

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-6 mb-4')}>
        Prayer Stats
      </Text>
      <LineChart
        data={transformPraysToLineData}
        initialSpacing={0}
        endSpacing={0}
        spacing={30}
        thickness={3}
        hideDataPoints
        hideRules
        showVerticalLines
        areaChart
        curved
        isAnimated
        startFillColor={COLORS.dark.primary}
        startOpacity={0.5}
        endFillColor={COLORS.dark.primary}
        endOpacity={0.1}
        verticalLinesStrokeDashArray={[7, 7]}
        color={COLORS.dark.primary}
        yAxisTextStyle={{ color: COLORS.dark.muted_foreground, fontSize: 12 }}
        yAxisColor={COLORS.dark.border}
        verticalLinesColor={COLORS.dark.muted_foreground}
        xAxisColor={COLORS.dark.border}
        adjustToWidth
        height={220}
        parentWidth={Dimensions.get('window').width * 0.85}
        width={Dimensions.get('window').width * 0.85}
        maxValue={12}
      />
    </React.Fragment>
  );
};

export default AreaChart;
