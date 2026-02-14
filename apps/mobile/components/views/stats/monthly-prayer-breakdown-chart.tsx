import React, { Fragment, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthlyPrayerTotals, PRAYER_FIELDS } from '@/utils/stats';
import { ChartSkeleton } from './chart-skeleton';

const CHART_HEIGHT = 220;
const BAR_WIDTH = 28;
const BAR_SPACING = 20;
const AXIS_FONT_SIZE = 12;
const SECTION_COUNT = 4;
const CHART_WIDTH_FACTOR = 0.8;

const MonthlyPrayerBreakdownChart = ({
  lineData,
  isLoading,
}: {
  lineData?: IPrays[];
  isLoading?: boolean;
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const prayerColors = useMemo(
    () => ({
      fajr: colors['--primary-400'],
      dhuhr: colors['--warning'],
      asr: colors['--warning'],
      maghrib: colors['--warning'],
      isha: colors['--primary-600'],
      nafl: colors['--success'],
    }),
    [colors]
  );

  const barData = useMemo(() => {
    const totals = getMonthlyPrayerTotals(lineData ?? []);

    return PRAYER_FIELDS.map(field => ({
      value: totals[field] ?? 0,
      label: t(`common.salahs.${field}`),
      frontColor: prayerColors[field],
    }));
  }, [lineData, prayerColors, t]);

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <Fragment>
      <Text className={cn('text-xl font-semibold mb-4')}>{t('stats.monthlyBreakdown')}</Text>

      {isLoading ? (
        <ChartSkeleton type="bar" height={CHART_HEIGHT + 20} />
      ) : (
        <BarChart
          data={barData}
          height={CHART_HEIGHT}
          barWidth={BAR_WIDTH}
          spacing={BAR_SPACING}
          width={chartWidth}
          yAxisTextStyle={{
            color: colors['--muted-foreground'],
            fontSize: AXIS_FONT_SIZE,
          }}
          xAxisLabelTextStyle={{
            color: colors['--muted-foreground'],
            fontSize: AXIS_FONT_SIZE,
          }}
          yAxisColor={colors['--border']}
          xAxisColor={colors['--border']}
          noOfSections={SECTION_COUNT}
          hideRules
          showGradient
          isAnimated
        />
      )}
    </Fragment>
  );
};

export default MonthlyPrayerBreakdownChart;
