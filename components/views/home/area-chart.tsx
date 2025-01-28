import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';

const AreaChart = ({ lineData }: { lineData: IPrays[] }) => {
  const { colors } = useThemeStore();
  const transformPraysToLineData = useMemo((): lineDataItem[] => {
    if (!lineData) return [];

    return lineData.map((pray) => ({
      value:
        pray.asr +
        pray.dhuhr +
        pray.fajr +
        pray.isha +
        pray.maghrib +
        pray.tahajjud,
    }));
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
        startFillColor={colors['--primary']}
        startOpacity={0.2}
        endFillColor={colors['--border']}
        endOpacity={0.1}
        verticalLinesStrokeDashArray={[7, 7]}
        color={colors['--primary']}
        yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: 12 }}
        yAxisColor={colors['--border']}
        verticalLinesColor={colors['--muted-foreground']}
        xAxisColor={colors['--border']}
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
