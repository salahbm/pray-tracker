import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import MonthlyComparisonChart from '@/components/views/stats/monthly-comparison-chart';
import MonthlyConsistencyChart from '@/components/views/stats/monthly-consistency-chart';
import MonthlyPrayerBreakdownChart from '@/components/views/stats/monthly-prayer-breakdown-chart';
import YearlyOverviewChart from '@/components/views/stats/yearly-overview-chart';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useAuthStore } from '@/store/auth/auth-session';
import { Text } from '@/components/ui/text';
import GoBack from '@/components/shared/go-back';
import YearPicker from '@/components/shared/modals/year-picker';
import { triggerHaptic } from '@/utils';

const BOTTOM_PADDING = 80;

const StatsScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { user } = useAuthStore();
  const [year, setYear] = useState(new Date().getFullYear());
  const [isYearPickerVisible, setIsYearPickerVisible] = useState(false);

  const togglePicker = async () => {
    await triggerHaptic();
    setIsYearPickerVisible(true);
  };

  const handleYearConfirm = (selectedYear: number) => {
    setYear(selectedYear);
    setIsYearPickerVisible(false);
  };

  const handleYearCancel = () => {
    setIsYearPickerVisible(false);
  };

  const { data: prays } = useGetPrays(user?.id, year);

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('stats.title')} onRightPress={togglePicker}>
        <Text className="border border-border rounded-md px-2 py-1 mr-2">{year}</Text>
      </GoBack>

      <ScrollView
        className="main-area"
        contentContainerStyle={{
          paddingBottom: insets.bottom + BOTTOM_PADDING,
        }}
        showsVerticalScrollIndicator={false}
      >
        <MonthlyPrayerBreakdownChart lineData={prays} />

        {/* Premium locked */}
        <MonthlyConsistencyChart lineData={prays} />
        <YearlyOverviewChart lineData={prays} />
        <MonthlyComparisonChart lineData={prays} />
      </ScrollView>
      <YearPicker
        visible={isYearPickerVisible}
        value={year}
        minYear={1980}
        onConfirm={handleYearConfirm}
        onCancel={handleYearCancel}
      />
    </SafeAreaView>
  );
};

export default StatsScreen;
