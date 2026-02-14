import React, { Fragment, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart, type barDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getRolling12MonthTotals } from '@/utils/stats';
import { ChartSkeleton } from './chart-skeleton';
import PremiumLocked from '@/components/common/premium-locked';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.8;
const BAR_WIDTH = 22;
const BAR_SPACING = 10;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 11;
const X_AXIS_FONT_SIZE = 9;
const SECTION_COUNT = 3;

const MonthlyComparisonChart = ({
  lineData,
  isLoading,
  isPremium,
}: {
  lineData?: IPrays[];
  isLoading?: boolean;
  isPremium?: boolean;
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const now = useMemo(() => new Date(), []);

  const barData = useMemo((): barDataItem[] => {
    const rolling = getRolling12MonthTotals(lineData ?? [], now);

    return rolling.map(entry => ({
      value: entry.total,
      label: entry.label,
      frontColor: colors['--primary'],
      gradientColor: colors['--primary-400'],
    }));
  }, [colors, lineData, now]);

  const maxValue = useMemo(
    () => Math.max(...barData.map(item => item.value ?? 0), MAX_VALUE_FALLBACK),
    [barData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.monthlyComparison')}</Text>
      {isLoading ? (
        <ChartSkeleton type="bar" height={CHART_HEIGHT + 20} />
      ) : (
        <View>
          <BarChart
            data={barData}
            height={CHART_HEIGHT}
            barWidth={BAR_WIDTH}
            spacing={BAR_SPACING}
            maxValue={maxValue}
            width={chartWidth}
            noOfSections={SECTION_COUNT}
            showGradient
            scrollToEnd
            isAnimated
            animationDuration={600}
            yAxisTextStyle={{
              color: colors['--muted-foreground'],
              fontSize: AXIS_FONT_SIZE,
            }}
            xAxisLabelTextStyle={{
              color: colors['--muted-foreground'],
              fontSize: X_AXIS_FONT_SIZE,
            }}
            yAxisColor={colors['--border']}
            xAxisColor={colors['--border']}
            hideRules
          />
          {!isPremium && <PremiumLocked />}
        </View>
      )}
    </Fragment>
  );
};

export default MonthlyComparisonChart;
