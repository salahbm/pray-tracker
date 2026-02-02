import React, { Fragment, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, type lineDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthLabel, getYearlyMonthlyTotals } from '@/utils/stats';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import PremiumLocked from '@/components/common/premium-locked';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.9;
const MAX_VALUE_FALLBACK = 1;

const YearlyOverviewChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { isPremium } = useRevenueCatCustomer();

  const now = useMemo(() => new Date(), []);
  const currentMonthIndex = now.getMonth();

  const yearlyData = useMemo((): lineDataItem[] => {
    const totals = getYearlyMonthlyTotals(lineData ?? [], now);

    return totals
      .map((value, index) => ({
        value,
        text: getMonthLabel(now, index),
        monthIndex: index,
      }))
      .filter(item => item.monthIndex <= currentMonthIndex)
      .map(({ value, text }) => ({
        value,
        text,
      }));
  }, [lineData, now, currentMonthIndex]);

  const maxValue = useMemo(
    () => Math.max(...yearlyData.map(item => item.value ?? 0), MAX_VALUE_FALLBACK),
    [yearlyData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.yearlyOverview')}</Text>
      <View className="relative">
        <LineChart
          data={yearlyData}
          height={CHART_HEIGHT}
          width={chartWidth}
          spacing={28}
          thickness={3}
          curved
          areaChart
          startFillColor={colors['--primary']}
          startOpacity={0.15}
          endFillColor={colors['--background']}
          endOpacity={0.05}
          color={colors['--primary']}
          hideRules
          yAxisColor={colors['--border']}
          xAxisColor={colors['--border']}
          yAxisTextStyle={{
            color: colors['--muted-foreground'],
            fontSize: 11,
          }}
          maxValue={maxValue}
          dataPointsRadius={4}
          dataPointsColor={colors['--primary']}
          isAnimated
          animationDuration={600}
          pointerConfig={{
            showPointerStrip: true,
            pointerStripColor: colors['--border'],
            pointerStripWidth: 1,
            pointerStripUptoDataPoint: true,
            radius: 6,
            pointerColor: colors['--primary'],
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: true,
            pointerLabelComponent: (points: any[]) => {
              const point = points[0] as { value: number; text: string };

              return (
                <View className="px-2 py-1 bg-background border border-border rounded-md">
                  <Text className="text-xs text-muted-foreground">{point.text}</Text>
                  <Text className="text-sm font-semibold">{point.value}</Text>
                </View>
              );
            },
          }}
        />
        {!isPremium && <PremiumLocked />}
      </View>
    </Fragment>
  );
};

export default YearlyOverviewChart;
