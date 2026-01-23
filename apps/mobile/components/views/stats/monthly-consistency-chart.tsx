import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { PieChart, type pieDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { getMonthlyConsistencyCounts } from '@/utils/stats';

const CHART_WIDTH_FACTOR = 0.85;
const DONUT_RADIUS = 90;
const INNER_RADIUS = 60;
const STROKE_WIDTH = 2;

const MonthlyConsistencyChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const consistencyData = useMemo(() => getMonthlyConsistencyCounts(lineData ?? []), [lineData]);

  const pieData = useMemo(
    (): pieDataItem[] => [
      { value: consistencyData.full, color: colors['--success'] },
      { value: consistencyData.partial, color: colors['--warning'] },
      { value: consistencyData.missed, color: colors['--destructive'] },
    ],
    [consistencyData, colors]
  );

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;
  const totalDays =
    consistencyData.full + consistencyData.partial + consistencyData.missed || 0;

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>
        {t('stats.monthlyConsistency')}
      </Text>
      <View className="items-center">
        <PieChart
          data={pieData}
          donut
          radius={DONUT_RADIUS}
          innerRadius={INNER_RADIUS}
          centerLabelComponent={() => (
            <View className="items-center">
              <Text className="text-lg font-semibold">{totalDays}</Text>
              <Text className="text-xs text-muted-foreground">{t('stats.days')}</Text>
            </View>
          )}
          focusOnPress
          strokeWidth={STROKE_WIDTH}
          strokeColor={colors['--background']}
        />
      </View>
      <View className="flex-row flex-wrap justify-center mt-4" style={{ width: chartWidth }}>
        <View className="flex-row items-center mr-4 mb-2">
          <View className="h-2 w-2 rounded-full" style={{ backgroundColor: colors['--success'] }} />
          <Text className="ml-2 text-xs text-muted-foreground">{t('stats.consistency.full')}</Text>
        </View>
        <View className="flex-row items-center mr-4 mb-2">
          <View className="h-2 w-2 rounded-full" style={{ backgroundColor: colors['--warning'] }} />
          <Text className="ml-2 text-xs text-muted-foreground">
            {t('stats.consistency.partial')}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <View
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: colors['--destructive'] }}
          />
          <Text className="ml-2 text-xs text-muted-foreground">{t('stats.consistency.missed')}</Text>
        </View>
      </View>
    </React.Fragment>
  );
};

export default MonthlyConsistencyChart;
