import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthlyPrayerTotals, PRAYER_FIELDS } from '@/utils/stats';

const CHART_HEIGHT = 220;
const BAR_WIDTH = 28;
const BAR_SPACING = 20;
const AXIS_FONT_SIZE = 12;
const SECTION_COUNT = 4;
const CHART_WIDTH_FACTOR = 0.9;

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
    <>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.monthlyBreakdown')}</Text>

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
    </>
  );
};

export default MonthlyPrayerBreakdownChart;
