import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { COLORS } from '@/constants/Colors';
import { cn } from '@/lib/utils';
import { IPrays } from '@/types/prays';

// const lineDataDummy: lineDataItem[] = [
//   { value: 0 },
//   { value: 1 },
//   { value: 2 },
//   { value: 7 },
//   { value: 2 },
//   { value: 3 },
//   { value: 1 },
//   { value: 2 },
//   { value: 12 },
//   { value: 3 },
//   { value: 1 },
//   { value: 4 },
//   { value: 6 },
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
