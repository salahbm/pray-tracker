import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { LineChart, type lineDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthLabel, getYearlyMonthlyTotals } from '@/utils/stats';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.85;
const LINE_SPACING = 30;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 12;
const DASH_ARRAY = [7, 7] as const;

const YearlyOverviewChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const yearlyData = useMemo(() => {
    const referenceDate = new Date();
    const totals = getYearlyMonthlyTotals(lineData ?? [], referenceDate);
    return totals.map((value, index) => ({
      value,
      text: getMonthLabel(referenceDate, index),
    }));
  }, [lineData]);

  const maxValue = useMemo(
    () => Math.max(...yearlyData.map(item => item.value), MAX_VALUE_FALLBACK),
    [yearlyData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.yearlyOverview')}</Text>
      <LineChart
        data={yearlyData as lineDataItem[]}
        initialSpacing={0}
        endSpacing={0}
        spacing={LINE_SPACING}
        thickness={3}
        hideRules
        showVerticalLines
        areaChart
        curved
        startFillColor={colors['--primary']}
        startOpacity={0.2}
        endFillColor={colors['--border']}
        endOpacity={0.1}
        verticalLinesStrokeDashArray={DASH_ARRAY}
        color={colors['--primary']}
        yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: AXIS_FONT_SIZE }}
        yAxisColor={colors['--border']}
        verticalLinesColor={colors['--muted-foreground']}
        xAxisColor={colors['--border']}
        adjustToWidth
        height={CHART_HEIGHT}
        parentWidth={chartWidth}
        width={chartWidth}
        maxValue={maxValue}
        dataPointsRadius={1}
        dataPointsColor={colors['--primary']}
      />
    </React.Fragment>
  );
};

export default YearlyOverviewChart;
