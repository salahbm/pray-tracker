import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { BarChart, type stackDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthlyPrayerTotals, PRAYER_FIELDS } from '@/utils/stats';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.85;
const STACK_BAR_WIDTH = 50;
const STACK_BAR_SPACING = 24;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 12;
const SECTION_COUNT = 4;

const MonthlyPrayerBreakdownChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const prayerColors = useMemo(
    () => ({
      fajr: colors['--primary'],
      dhuhr: colors['--primary-400'],
      asr: colors['--primary-600'],
      maghrib: colors['--warning'],
      isha: colors['--destructive'],
      nafl: colors['--success'],
    }),
    [colors]
  );

  const stackData = useMemo((): stackDataItem[] => {
    const totals = getMonthlyPrayerTotals(lineData ?? []);
    const monthLabel = format(new Date(), 'MMM');

    return [
      {
        label: monthLabel,
        stacks: PRAYER_FIELDS.map(field => ({
          value: totals[field],
          color: prayerColors[field],
        })),
      },
    ];
  }, [lineData, prayerColors]);

  const totalValue = useMemo(
    () =>
      stackData.reduce(
        (sum, item) => sum + item.stacks.reduce((stackSum, stack) => stackSum + stack.value, 0),
        0
      ),
    [stackData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;
  const maxValue = Math.max(totalValue, MAX_VALUE_FALLBACK);

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>
        {t('stats.monthlyBreakdown')}
      </Text>
      <BarChart
        stackData={stackData}
        height={CHART_HEIGHT}
        barWidth={STACK_BAR_WIDTH}
        spacing={STACK_BAR_SPACING}
        initialSpacing={0}
        maxValue={maxValue}
        yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: AXIS_FONT_SIZE }}
        yAxisColor={colors['--border']}
        xAxisColor={colors['--border']}
        xAxisLabelTextStyle={{ color: colors['--muted-foreground'], fontSize: AXIS_FONT_SIZE }}
        noOfSections={SECTION_COUNT}
        adjustToWidth
        parentWidth={chartWidth}
        width={chartWidth}
        hideRules
      />
    </React.Fragment>
  );
};

export default MonthlyPrayerBreakdownChart;
