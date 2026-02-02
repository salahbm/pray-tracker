import { format, startOfDay, subDays, Locale } from 'date-fns';
import { Fragment, useMemo } from 'react';
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
import { enUS, ru, tr, uz } from 'date-fns/locale';

const CHART_WIDTH = Dimensions.get('window').width * 0.85;

const DATE_LOCALES: Record<string, Locale> = {
  en: enUS,
  uz: uz,
  ru: ru,
  tr: tr,
};

const AreaChart = ({
  lineData,
  year,
  user,
}: {
  lineData?: IPrays[];
  year: number;
  user: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const { colors } = useThemeStore();
  const locale = DATE_LOCALES[i18n.language as keyof typeof DATE_LOCALES];

  const chartData = useMemo<lineDataItem[]>(() => {
    if (!lineData?.length) return [];

    const valueByDay = new Map<string, number>();

    const DAYS = 30;
    const today = startOfDay(new Date());

    for (const pray of lineData) {
      const date = parseLocalDateKey(getUtcDateKey(pray.date));
      const key = format(date, 'yyyy-MM-dd');

      valueByDay.set(
        key,
        (pray.asr ?? 0) +
          (pray.dhuhr ?? 0) +
          (pray.fajr ?? 0) +
          (pray.isha ?? 0) +
          (pray.maghrib ?? 0) +
          (pray.nafl ?? 0)
      );
    }

    return Array.from({ length: DAYS }).map((_, index) => {
      const date = subDays(today, DAYS - 1 - index);

      return {
        value: valueByDay.get(format(date, 'yyyy-MM-dd', { locale })) ?? 0,
        label: index === 0 || index === DAYS - 1 ? format(date, 'MMM dd', { locale }) : '',
        text: format(date, 'dd.MM.yy'),
      };
    });
  }, [lineData, locale]);

  const xLabels = useMemo(() => chartData.map(item => item.label ?? ''), [chartData]);

  return (
    <Fragment>
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
          data={chartData}
          scrollToEnd
          initialSpacing={10}
          endSpacing={20}
          spacing={30}
          thickness={3}
          hideRules
          showVerticalLines
          areaChart
          curved
          adjustToWidth
          height={220}
          width={CHART_WIDTH}
          parentWidth={CHART_WIDTH}
          maxValue={13}
          mostNegativeValue={0}
          dataPointsRadius={1}
          dataPointsColor={colors['--primary']}
          color={colors['--primary']}
          startFillColor={colors['--primary']}
          startOpacity={0.2}
          endFillColor={colors['--border']}
          endOpacity={0.1}
          verticalLinesStrokeDashArray={[7, 7]}
          yAxisColor={colors['--border']}
          verticalLinesColor={colors['--muted-foreground']}
          xAxisColor={colors['--border']}
          xAxisLabelTexts={xLabels}
          xAxisLabelTextStyle={{
            color: colors['--muted-foreground'],
            fontSize: 12,
            minWidth: 50,
            textTransform: 'capitalize',
          }}
          yAxisTextStyle={{
            color: colors['--muted-foreground'],
            fontSize: 12,
          }}
        />
      )}
    </Fragment>
  );
};

export default AreaChart;
