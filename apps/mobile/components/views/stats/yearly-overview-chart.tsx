import React, { Fragment, useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart, type lineDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getRolling12MonthTotals } from '@/utils/stats';
import PremiumLocked from '@/components/common/premium-locked';
import { ChartSkeleton } from './chart-skeleton';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.8;
const MAX_VALUE_FALLBACK = 1;

const YearlyOverviewChart = ({
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

  const yearlyData = useMemo((): lineDataItem[] => {
    const rolling = getRolling12MonthTotals(lineData ?? [], now);

    return rolling.map(entry => ({
      value: entry.total,
      text: entry.label,
    }));
  }, [lineData, now]);

  const maxValue = useMemo(
    () => Math.max(...yearlyData.map(item => item.value ?? 0), MAX_VALUE_FALLBACK),
    [yearlyData]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>{t('stats.yearlyOverview')}</Text>
      {isLoading ? (
        <ChartSkeleton type="line" height={CHART_HEIGHT + 20} />
      ) : (
        <View className="relative">
          <LineChart
            data={yearlyData}
            height={CHART_HEIGHT}
            width={chartWidth}
            spacing={28}
            thickness={3}
            curved
            areaChart
            scrollToEnd
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
                  <View className="px-2 py-1 bg-background border border-border rounded-md min-w-24 z-50 flex flex-row items-center justify-between">
                    <Text className="text-xs text-muted-foreground">{point.text}</Text>
                    <Text className="text-sm font-semibold">{point.value}</Text>
                  </View>
                );
              },
            }}
          />
          {!isPremium && <PremiumLocked />}
        </View>
      )}
    </Fragment>
  );
};

export default YearlyOverviewChart;
