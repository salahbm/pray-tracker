import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, Pressable, View } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';
import { ChevronRight } from '@components/shared/icons';
import { router } from 'expo-router';
import { getUtcDateKey, parseLocalDateKey } from '@/utils/date';

const AreaChart = ({
  lineData,
  year,
  user,
}: {
  lineData?: IPrays[];
  year: number;
  user: boolean;
}) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const transformPraysToLineData = useMemo((): lineDataItem[] => {
    if (!lineData) return [];

    const now = new Date();
    const currentMonth = now.getMonth(); // 0–11
    const currentYear = now.getFullYear();

    return [...lineData]
      .map(pray => {
        const dateKey = getUtcDateKey(pray.date);
        return { pray, date: parseLocalDateKey(dateKey) };
      })
      .filter(({ date }) => date.getMonth() === currentMonth && date.getFullYear() === currentYear)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .map(pray => ({
        value:
          (pray.pray.asr ?? 0) +
          (pray.pray.dhuhr ?? 0) +
          (pray.pray.fajr ?? 0) +
          (pray.pray.isha ?? 0) +
          (pray.pray.maghrib ?? 0) +
          (pray.pray.nafl ?? 0),
        text: format(pray.date, 'dd.MM.yy'),
      }));
  }, [lineData]);

  return (
    <React.Fragment>
      <View className="flex-row items-center justify-between mt-10 mb-4">
        <Text className={cn('text-xl font-semibold')}>{t('home.charts.title')}</Text>
        <Pressable
          hitSlop={10}
          onPress={() => router.push('/(screens)/stats')}
          className="flex-row items-center gap-1"
        >
          <Text className="text-muted-foreground">{t('home.charts.all')}</Text>
          <ChevronRight className="text-muted-foreground" size={16} />
        </Pressable>
      </View>
      {year === new Date().getFullYear() && user && (
        <LineChart
          data={transformPraysToLineData}
          initialSpacing={0}
          endSpacing={0}
          spacing={30}
          thickness={3}
          hideRules
          showVerticalLines
          areaChart
          curved
          startFillColor={colors['--primary']}
          startOpacity={0.2}
          endFillColor={colors['--border']}
          endOpacity={0.1}
          verticalLinesStrokeDashArray={[7, 7]}
          color={colors['--primary']}
          yAxisTextStyle={{ color: colors['--muted-foreground'], fontSize: 12 }}
          yAxisColor={colors['--border']}
          verticalLinesColor={colors['--muted-foreground']}
          xAxisColor={colors['--border']}
          adjustToWidth
          height={220}
          parentWidth={Dimensions.get('window').width * 0.85}
          width={Dimensions.get('window').width * 0.85}
          maxValue={13}
          dataPointsRadius={1}
          dataPointsColor={colors['--primary']}
          pointerConfig={{
            showPointerStrip: true,
            pointerStripWidth: 2,
            pointerStripHeight: 220,
            pointerStripColor: colors['--border'],
            pointerStripUptoDataPoint: true,
            pointerColor: 'transparent',
            radius: 6,
            pointerLabelWidth: 120,
            pointerLabelHeight: 30,
            activatePointersDelay: 200,
            autoAdjustPointerLabelPosition: true,
            activatePointersOnLongPress: true,
            pointerLabelComponent: (
              point: {
                value:
                  | string
                  | number
                  | bigint
                  | boolean
                  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                  | Iterable<React.ReactNode>
                  | React.ReactPortal
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactPortal
                      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }[]
            ) => (
              <View className="flex-col items-start justify-center px-2 py-1 bg-background border border-border rounded-md">
                <Text className="text-sm">
                  {t('home.prayerHistory.date')}: {(point[0] as unknown as { text: string }).text}
                </Text>
              </View>
            ),
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AreaChart;
