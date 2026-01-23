import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { BarChart, type stackDataItem } from 'react-native-gifted-charts';
import { useTranslation } from 'react-i18next';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import {
  getCompletionQualityByMonth,
  getMonthLabel,
  hasCompletionQualityData,
} from '@/utils/stats';

const CHART_HEIGHT = 220;
const CHART_WIDTH_FACTOR = 0.85;
const STACK_BAR_WIDTH = 16;
const STACK_BAR_SPACING = 10;
const MAX_VALUE_FALLBACK = 1;
const AXIS_FONT_SIZE = 12;
const X_AXIS_FONT_SIZE = 10;
const SECTION_COUNT = 4;

const CompletionQualityChart = ({ lineData }: { lineData?: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const qualityData = useMemo(() => {
    const referenceDate = new Date();
    return getCompletionQualityByMonth(lineData ?? [], referenceDate).map((item, index) => ({
      monthLabel: getMonthLabel(referenceDate, index),
      ...item,
    }));
  }, [lineData]);

  const stackData = useMemo(
    (): stackDataItem[] =>
      qualityData.map(item => ({
        label: item.monthLabel,
        stacks: [
          { value: item.onTime, color: colors['--success'] },
          { value: item.late, color: colors['--warning'] },
          { value: item.missed, color: colors['--destructive'] },
        ],
      })),
    [colors, qualityData]
  );

  const hasData = useMemo(() => hasCompletionQualityData(qualityData), [qualityData]);

  const maxValue = useMemo(() => {
    const values = stackData.map(item =>
      item.stacks.reduce((sum, stack) => sum + stack.value, 0)
    );
    return Math.max(...values, MAX_VALUE_FALLBACK);
  }, [stackData]);

  const chartWidth = Dimensions.get('window').width * CHART_WIDTH_FACTOR;

  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-10 mb-4')}>
        {t('stats.completionQuality')}
      </Text>
      {hasData ? (
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
          xAxisLabelTextStyle={{ color: colors['--muted-foreground'], fontSize: X_AXIS_FONT_SIZE }}
          noOfSections={SECTION_COUNT}
          adjustToWidth
          parentWidth={chartWidth}
          width={chartWidth}
          hideRules
        />
      ) : (
        <View className="rounded-2xl border border-border bg-muted/40 px-4 py-6">
          <Text className="text-sm text-muted-foreground text-center">
            {t('stats.completionQualityUnavailable')}
          </Text>
        </View>
      )}
    </React.Fragment>
  );
};

export default CompletionQualityChart;
