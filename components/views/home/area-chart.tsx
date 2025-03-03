import { format } from 'date-fns';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';

import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { useThemeStore } from '@/store/defaults/theme';
import { IPrays } from '@/types/prays';

const AreaChart = ({ lineData }: { lineData: IPrays[] }) => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();

  const transformPraysToLineData = useMemo((): lineDataItem[] => {
    if (!lineData) return [];

    return [...lineData]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((pray) => ({
        value:
          pray.asr +
          pray.dhuhr +
          pray.fajr +
          pray.isha +
          pray.maghrib +
          pray.nafl,
        text: format(new Date(pray.date), 'dd.MM.yy'),
      }));
  }, [lineData]);
  
  return (
    <React.Fragment>
      <Text className={cn('text-xl font-semibold mt-6 mb-4')}>
        {t('Home.Charts.Title')}
      </Text>
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
        maxValue={12}
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
          pointerLabelComponent: (point) => (
            <View className="flex-col items-start justify-center px-2 py-1 bg-background border border-border rounded-md">
              <Text className="text-sm">
                {t('Home.PrayerHistory.Date')}: {point[0].text}
              </Text>
              <Text className="text-sm">
                {t('Home.Charts.YAxis')}: {point[0].value}
              </Text>
            </View>
          ),
        }}
      />
    </React.Fragment>
  );
};

export default AreaChart;
