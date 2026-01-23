import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { BarChart, type barDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthLabel, getYearlyMonthlyTotals } from '@/utils/stats';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.85;
const BAR_WIDTH = 18;
const BAR_SPACING = 12;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 12;
const X_AXIS_FONT_SIZE = 10;
const SECTION_COUNT = 4;

const MonthlyComparisonChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const barData = useMemo((): barDataItem[] => {
    const referenceDate = new Date();
    const totals = getYearlyMonthlyTotals(lineData ?? [], referenceDate);
    return totals.map((value, index) => ({
      value,
      label: getMonthLabel(referenceDate, index),
      frontColor: colors['--primary'],
    }));
  }, [colors, lineData]);

  const maxValue = useMemo(
    () => Math.max(...barData.map(item => item.value ?? 0), MAX_VALUE_FALLBACK),
    [barData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.monthlyComparison')}</Text>
      <BarChart
        data={barData}
        height={CHART_HEIGHT}
        barWidth={BAR_WIDTH}
        spacing={BAR_SPACING}
        initialSpacing={0}
        maxValue={maxValue}
        yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: AXIS_FONT_SIZE }}
        yAxisColor={colors['--border']}
        xAxisColor={colors['--border']}
        xAxisLabelTextStyle={{ color: colors['--muted-foreground'], fontSize: X_AXIS_FONT_SIZE }}
        noOfSections={SECTION_COUNT}
        adjustToWidth
        parentWidth={chartWidth}
        width={chartWidth}
        hideRules
      />
    </React.Fragment>
  );
};

export default MonthlyComparisonChart;
