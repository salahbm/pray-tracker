import React from 'react';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { COLORS } from '@/constants/Colors';
import { cn } from '@/lib/utils';

const AreaChart = ({ lineData }: { lineData: lineDataItem[] }) => {
  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-6 mb-4')}>
        Prayer Stats
      </Text>
      <LineChart
        data={lineData}
        initialSpacing={0}
        endSpacing={-10}
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
      />
    </React.Fragment>
  );
};

export default AreaChart;
