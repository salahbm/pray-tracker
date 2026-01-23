import React, { useMemo } from 'react';
import { Dimensions } from 'react-native';
import { BarChart, type barDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getYearlyPrayerTotals, PRAYER_FIELDS } from '@/utils/stats';

const CHART_HEIGHT = 260;
const CHART_WIDTH_FACTOR = 0.85;
const BAR_HEIGHT = 12;
const BAR_SPACING = 18;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 12;
const SECTION_COUNT = 4;

const YearlyPrayerPerformanceChart = ({ lineData }: { lineData?: IPrays[] }) => {
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

  const barData = useMemo((): barDataItem[] => {
    const totals = getYearlyPrayerTotals(lineData ?? []);
    return PRAYER_FIELDS.map(field => ({
      value: totals[field],
      label: t(`common.salahs.${field}`),
      frontColor: prayerColors[field],
    }));
  }, [lineData, prayerColors, t]);

  const maxValue = useMemo(
    () => Math.max(...barData.map(item => item.value ?? 0), MAX_VALUE_FALLBACK),
    [barData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>
        {t('stats.yearlyPrayerPerformance')}
      </Text>
      <BarChart
        data={barData}
        height={CHART_HEIGHT}
        barWidth={BAR_HEIGHT}
        spacing={BAR_SPACING}
        initialSpacing={0}
        maxValue={maxValue}
        horizontal
        yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: AXIS_FONT_SIZE }}
        xAxisColor={colors['--border']}
        yAxisColor={colors['--border']}
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

export default YearlyPrayerPerformanceChart;
