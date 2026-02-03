import React, { Fragment, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthlyConsistencyCounts } from '@/utils/stats';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import PremiumLocked from '@/components/common/premium-locked';
import { ChartSkeleton } from './chart-skeleton';

const CHART_WIDTH_FACTOR = 0.85;
const DONUT_RADIUS = 90;
const INNER_RADIUS = 60;
const STROKE_WIDTH = 2;

const MonthlyConsistencyChart = ({
  lineData,
  isLoading,
}: {
  lineData?: IPrays[];
  isLoading?: boolean;
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { isPremium } = useRevenueCatCustomer();

  const consistencyData = useMemo(() => getMonthlyConsistencyCounts(lineData ?? []), [lineData]);

  const totalDays = consistencyData.full + consistencyData.partial + consistencyData.missed;

  /**
   * IMPORTANT:
   * PieChart breaks if all values are 0.
   * Provide a safe fallback slice.
   */
  const pieData = useMemo((): pieDataItem[] => {
    if (totalDays === 0) {
      return [
        {
          value: 1,
          color: colors['--muted'],
        },
      ];
    }

    return [
      {
        value: consistencyData.full,
        color: colors['--success'],
      },
      {
        value: consistencyData.partial,
        color: colors['--warning'],
      },
      {
        value: consistencyData.missed,
        color: colors['--destructive'],
      },
    ];
  }, [consistencyData, colors, totalDays]);

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>
        {t('stats.monthlyConsistency')}
      </Text>
      {isLoading ? (
        <ChartSkeleton type="pie" height={260} />
      ) : (
        <View className="relative">
          <View className="items-center my-5">
            <PieChart
              data={pieData}
              donut
              radius={DONUT_RADIUS}
              innerRadius={INNER_RADIUS}
              strokeWidth={STROKE_WIDTH}
              strokeColor={colors['--background']}
              focusOnPress={totalDays > 0}
              centerLabelComponent={() => (
                <View className="items-center">
                  <Text className="text-lg font-semibold">{totalDays}</Text>
                  <Text className="text-xs text-muted-foreground">{t('stats.days')}</Text>
                </View>
              )}
            />
          </View>

          {/* Legend */}
          <View className="flex-row flex-wrap justify-center mt-4" style={{ width: chartWidth }}>
            <LegendItem color={colors['--success']} label={t('stats.consistency.full')} />
            <LegendItem color={colors['--warning']} label={t('stats.consistency.partial')} />
            <LegendItem color={colors['--destructive']} label={t('stats.consistency.missed')} />
          </View>
          {!isPremium && <PremiumLocked />}
        </View>
      )}
    </Fragment>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <View className="flex-row items-center justify-center mr-4 mx-auto mb-2">
    <View className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
    <Text className="ml-2 text-xs text-muted-foreground">{label}</Text>
  </View>
);

export default MonthlyConsistencyChart;
