import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PremiumLocked from '@/components/common/premium-locked';
import AreaChart from '@/components/views/home/area-chart';
import CompletionQualityChart from '@/components/views/stats/completion-quality-chart';
import MonthlyComparisonChart from '@/components/views/stats/monthly-comparison-chart';
import MonthlyConsistencyChart from '@/components/views/stats/monthly-consistency-chart';
import MonthlyPrayerBreakdownChart from '@/components/views/stats/monthly-prayer-breakdown-chart';
import YearlyOverviewChart from '@/components/views/stats/yearly-overview-chart';
import YearlyPrayerPerformanceChart from '@/components/views/stats/yearly-prayer-performance-chart';
import { useDateSync } from '@/hooks/common/useDateSync';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { useAuthStore } from '@/store/auth/auth-session';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

const BOTTOM_PADDING = 80;

const StatsScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const { isPremium } = useRevenueCatCustomer();

  const [year, setYear] = useState(new Date().getFullYear());

  useFocusEffect(
    useCallback(() => {
      setYear(new Date().getFullYear());
    }, [])
  );

  useDateSync(
    useCallback(() => {
      setYear(new Date().getFullYear());
    }, [])
  );

  const { data: prays } = useGetPrays(user?.id!, year);

  return (
    <ScrollView
      className="main-area"
      contentContainerStyle={{ paddingBottom: insets.bottom + BOTTOM_PADDING }}
      showsVerticalScrollIndicator={false}
    >
      <Text className={cn('text-2xl font-semibold mb-2')}>{t('stats.title')}</Text>
      <AreaChart lineData={prays} />
      <MonthlyPrayerBreakdownChart lineData={prays} />
      <MonthlyConsistencyChart lineData={prays} />

      <View className="my-8 h-px bg-border" />

      <Text className={cn('text-xl font-semibold mb-2')}>{t('stats.premiumSectionTitle')}</Text>
      {isPremium ? (
        <React.Fragment>
          <YearlyOverviewChart lineData={prays} />
          <MonthlyComparisonChart lineData={prays} />
          <YearlyPrayerPerformanceChart lineData={prays} />
          <CompletionQualityChart lineData={prays} />
        </React.Fragment>
      ) : (
        <PremiumLocked />
      )}
    </ScrollView>
  );
};

export default StatsScreen;
