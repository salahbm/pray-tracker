import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { format } from 'date-fns';
import * as allLocales from 'date-fns/locale';

import MonthlyComparisonChart from '@/components/views/stats/monthly-comparison-chart';
import MonthlyConsistencyChart from '@/components/views/stats/monthly-consistency-chart';
import MonthlyPrayerBreakdownChart from '@/components/views/stats/monthly-prayer-breakdown-chart';
import YearlyOverviewChart from '@/components/views/stats/yearly-overview-chart';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useAuthStore } from '@/store/auth/auth-session';
import { Text } from '@/components/ui/text';
import MonthPicker from '@/components/shared/modals/month-picker';
import { triggerHaptic } from '@/utils';
import { useLanguage } from '@/hooks/common/useTranslation';
import { ChevronLeft } from '@/components/shared/icons';
import { router } from 'expo-router';
import { RefreshControl } from 'react-native-gesture-handler';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';

const localeMap: { [key: string]: any } = {
  en: allLocales.enUS,
  uz: allLocales.uz,
  ru: allLocales.ru,
  tr: allLocales.tr,
};

const BOTTOM_PADDING = 80;

const StatsScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const insets = useSafeAreaInsets();
  const { currentLanguage } = useLanguage();
  const { isPremium } = useRevenueCatCustomer();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerVisible, setIsMonthPickerVisible] = useState(false);
  const [isMapping, setIsMapping] = useState<boolean>(false);

  const togglePicker = async () => {
    await triggerHaptic();
    setIsMonthPickerVisible(true);
  };

  const handleMonthConfirm = (date: Date) => {
    setSelectedMonth(date);
    setIsMonthPickerVisible(false);
  };

  const handleMonthCancel = () => {
    setIsMonthPickerVisible(false);
  };

  const year = selectedMonth.getFullYear();
  const prevYear = year - 1;
  const { data: allPrays, isLoading: isLoadingPrays, refetch } = useGetPrays(user?.id, year);
  const { data: prevYearPrays, isLoading: isLoadingPrevYear, refetch: refetchPrev } = useGetPrays(user?.id, prevYear);

  // Merge current + previous year data for rolling 12-month charts
  const mergedPrays = useMemo(() => {
    return [...(prevYearPrays ?? []), ...(allPrays ?? [])];
  }, [allPrays, prevYearPrays]);

  // Filter prayers for the selected month
  const prays = useMemo(() => {
    if (!allPrays) return [];
    setIsMapping(true);
    const month = selectedMonth.getMonth();
    const prays = allPrays.filter(pray => {
      // Parse UTC date from backend
      const prayDate = new Date(pray.date);
      const prayYear = prayDate.getUTCFullYear();
      const prayMonth = prayDate.getUTCMonth();
      return prayMonth === month && prayYear === year;
    });
    setIsMapping(false);
    return prays;
  }, [allPrays, selectedMonth, year]);

  // Format month/year for display
  const displayText = useMemo(() => {
    const selectedLocale = localeMap[currentLanguage] || allLocales.enUS;
    return format(selectedMonth, 'MMM yyyy', { locale: selectedLocale });
  }, [selectedMonth, currentLanguage]);

  const onRefresh = useCallback(() => {
    refetch();
    refetchPrev();
  }, [refetch, refetchPrev]);

  const isLoading = isLoadingPrays || isLoadingPrevYear || isMapping;

  return (
    <SafeAreaView className="safe-area">
      <View className="flex-row items-center justify-between px-4 pt-4">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 justify-center items-center active:opacity-70 active:bg-black/10 rounded-full"
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <ChevronLeft className="text-foreground size-6" />
        </Pressable>
        <Text className="font-semibold text-lg ml-6">{t('stats.title')}</Text>

        <Pressable onPress={togglePicker} className="border border-border rounded-md px-2 py-1">
          <Text className="capitalize">{displayText}</Text>
        </Pressable>
      </View>

      <ScrollView
        className="main-area"
        contentContainerStyle={{
          paddingBottom: insets.bottom + BOTTOM_PADDING,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      >
        <MonthlyPrayerBreakdownChart lineData={prays} isLoading={isLoading} />

        {/* Premium locked */}
        <MonthlyConsistencyChart lineData={prays} isLoading={isLoading} isPremium={isPremium} />
        <YearlyOverviewChart lineData={mergedPrays} isLoading={isLoading} isPremium={isPremium} />
        <MonthlyComparisonChart lineData={mergedPrays} isLoading={isLoading} isPremium={isPremium} />
      </ScrollView>
      <MonthPicker
        visible={isMonthPickerVisible}
        value={selectedMonth}
        minYear={1980}
        onConfirm={handleMonthConfirm}
        onCancel={handleMonthCancel}
      />
    </SafeAreaView>
  );
};

export default StatsScreen;
