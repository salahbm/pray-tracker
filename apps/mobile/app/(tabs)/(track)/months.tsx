import { differenceInCalendarDays, format, parseISO, subDays } from 'date-fns';
import { useColorScheme } from 'nativewind';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { CalendarList, DateData, LocaleConfig } from 'react-native-calendars';

import DayComponent from '@/components/views/pray-history/day';
import { RenderHeader } from '@/components/views/pray-history/month-header';
import { useHeaderMonthControls } from '@/hooks/common/useCalendarHeader';
import { useLanguage } from '@/hooks/common/useTranslation';
import { useGetPrays } from '@/hooks/prays';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { Language } from '@/i18n.config';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { usePaywallBottomSheetStore } from '@/store/bottom-sheets';
import { useThemeStore } from '@/store/defaults/theme';
import { getMonthTheme } from '@/styles/calendar.theme';
import { getLocalDateKey, getUtcDateKey, parseLocalDateKey } from '@/utils/date';
import { setCalendarLocale } from '@/utils/month-names';
import { RefreshControl } from 'react-native-gesture-handler';
import { BottomSheetModal, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import DetachedSheet from '@/components/shared/bottom-sheet/detached-sheet';
import PrevDay from '@/components/views/pray-history/prev-days';

type MarkedDateProps = {
  marked: boolean;
  dotColor: string;
  selected: boolean;
  selectedTextColor: string;
  disableTouchEvent?: boolean;
  selectedColor?: string;
};

const MonthScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { colors } = useThemeStore();
  const { colorScheme } = useColorScheme();
  const { currentLanguage } = useLanguage();

  const calendarRef = useRef<any>(null);
  const dayRef = useRef<BottomSheetModal>(null);

  const [year, setYear] = useState(2025);
  const [atTop, setAtTop] = useState(false);
  const [selected, setSelected] = useState('');
  const [visibleMonths, setVisibleMonths] = useState(2);
  const [renderVersion, setRenderVersion] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const lastVisibleMonthRef = useRef<Date>(new Date());
  const initialMonthRef = useRef<string>(getLocalDateKey());

  // Compute these once, outside of render cycles
  const todayKey = useMemo(() => getLocalDateKey(), []);
  const weekAgoTimestamp = useMemo(() => {
    const weekAgo = subDays(new Date(), 6); // 7 days including today
    weekAgo.setHours(0, 0, 0, 0);
    return weekAgo.getTime();
  }, []);

  const { isPremium, refetch } = useRevenueCatCustomer();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

  const { data: prays, isLoading: isLoadingPrays } = useGetPrays(user?.id, year);

  // Theme only depends on colors, not colorScheme
  const theme = useMemo(() => getMonthTheme(colors), [colors]);
  const monthControlsCallback = useHeaderMonthControls(calendarRef);

  const animtion = useBottomSheetTimingConfigs({
    duration: 100,
  });

  // Handler for visible months change
  const handleVisibleMonthsChange = useCallback(
    (months: any[]) => {
      if (months?.[0]?.dateString) {
        const visibleDate = parseLocalDateKey(months[0].dateString);
        lastVisibleMonthRef.current = visibleDate;
        setYear(visibleDate.getFullYear());
      }
      monthControlsCallback(months);
    },
    [monthControlsCallback]
  );

  // Initialize header on mount to prevent loading state
  useEffect(() => {
    const today = new Date();
    monthControlsCallback([
      {
        dateString: getLocalDateKey(),
        day: today.getDate(),
        month: today.getMonth() + 1,
        timestamp: today.getTime(),
        year: today.getFullYear(),
      },
    ]);
  }, [monthControlsCallback]);

  // Locale and theme updates - combined into one effect
  useEffect(() => {
    setCalendarLocale(currentLanguage as Language);
    LocaleConfig.defaultLocale = currentLanguage;
    setRenderVersion(prev => prev + 1);
  }, [currentLanguage, colorScheme]);

  // Force refresh when theme changes
  useEffect(() => {
    setRenderVersion(prev => prev + 1);
  }, [colorScheme, colors]);

  const prayerCountByDate = useMemo(() => {
    if (!prays?.length) return {};
    const counts: Record<string, number> = {};
    for (const pray of prays) {
      const date = getUtcDateKey(pray.date);
      counts[date] =
        (pray.fajr ? 1 : 0) +
        (pray.dhuhr ? 1 : 0) +
        (pray.asr ? 1 : 0) +
        (pray.maghrib ? 1 : 0) +
        (pray.isha ? 1 : 0) +
        (pray.nafl ? 1 : 0);
    }
    return counts;
  }, [prays]);

  const onDayPress = useCallback(
    (day: DateData) => {
      if (!user) {
        fireToast.info(t('common.errors.unauthorized'));
        return;
      }

      // Prevent selecting future dates
      const selectedDate = parseLocalDateKey(day.dateString);
      const today = new Date();
      const dayDate = parseISO(day.dateString);

      const daysDiff = differenceInCalendarDays(today, dayDate);

      // Non-premium users can only see last 7 days (including today)
      const isAccessible = isPremium || (daysDiff >= 0 && daysDiff <= 6);

      if (!isAccessible) {
        paywallSheetRef.current?.snapToIndex(0);
        return;
      }

      if (selectedDate > today) {
        fireToast.info(t('common.errors.futureDate'));
        return;
      }

      setSelected(day.dateString);
      dayRef.current?.present();
    },
    [t, user, isPremium, paywallSheetRef]
  );

  // Simplify marked dates - only update when selection changes
  const marked = useMemo(() => {
    const entries: Record<string, MarkedDateProps> = {
      [todayKey]: {
        marked: true,
        dotColor: colors['--primary'],
        selected: selected === todayKey,
        selectedTextColor: colors['--primary-foreground'],
      },
    };

    if (selected && selected !== todayKey) {
      entries[selected] = {
        selected: true,
        disableTouchEvent: true,
        selectedColor: colors['--primary'],
        selectedTextColor: colors['--primary-foreground'],
        marked: false,
        dotColor: '',
      };
    }

    return entries;
  }, [selected, todayKey, colors]);

  // Add more months and scroll back to last visible month (e.g., 2024-10)
  const handleAddMonths = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);

    const targetMonth = lastVisibleMonthRef.current;
    const targetMonthString = format(targetMonth, 'yyyy-MM-dd');

    // Update the initial month ref to prevent jumping back to today
    initialMonthRef.current = targetMonthString;

    setTimeout(() => {
      setVisibleMonths(prev => prev + 6);
      setLoadingMore(false);

      // Wait for new months to render, then scroll to previous visible month
      setTimeout(() => {
        if (calendarRef.current?.scrollToMonth) {
          calendarRef.current.scrollToMonth(targetMonth, false);
        }
      }, 300);
    }, 400);
  }, [loadingMore]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;
    setAtTop(contentOffset.y <= 10);
  }, []);

  const calendarKey = useMemo(
    () => `${currentLanguage}-${colorScheme}-${renderVersion}`,
    [currentLanguage, colorScheme, renderVersion]
  );

  const calendar = useMemo(
    () => (
      <CalendarList
        key={calendarKey}
        ref={calendarRef}
        style={{ backgroundColor: colors['--background'] }}
        current={initialMonthRef.current}
        pastScrollRange={visibleMonths}
        futureScrollRange={1}
        firstDay={1}
        onVisibleMonthsChange={handleVisibleMonthsChange}
        theme={theme}
        renderHeader={date => <RenderHeader date={date} locale={currentLanguage} />}
        refreshControl={<RefreshControl refreshing={isLoadingPrays} onRefresh={refetch} />}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={32}
        scrollsToTop={false}
        hideDayNames
        bounces={false}
        alwaysBounceVertical={false}
        calendarHeight={260}
        markedDates={marked}
        extraData={selected}
        removeClippedSubviews
        dayComponent={({ date }) => (
          <DayComponent
            date={date}
            isPremium={isPremium}
            onDayPress={onDayPress}
            prayerCountByDate={prayerCountByDate}
            todayKey={todayKey}
            weekAgoTimestamp={weekAgoTimestamp}
          />
        )}
      />
    ),
    [
      calendarKey,
      visibleMonths,
      handleVisibleMonthsChange,
      theme,
      marked,
      selected,
      prayerCountByDate,
      onDayPress,
      colors,
      handleScrollEnd,
      isPremium,
      currentLanguage,
      isLoadingPrays,
      refetch,
      todayKey,
      weekAgoTimestamp,
    ]
  );

  return (
    <View className="safe-area flex-1" style={{ backgroundColor: colors['--background'] }}>
      {calendar}

      {atTop && (
        <TouchableOpacity
          onPress={handleAddMonths}
          disabled={loadingMore}
          style={{
            position: 'absolute',
            top: 20,
            alignSelf: 'center',
            backgroundColor: colors['--primary'],
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {loadingMore || isLoadingPrays ? (
            <ActivityIndicator color={colors['--primary-foreground']} />
          ) : (
            <Text
              style={{
                color: colors['--primary-foreground'],
                fontWeight: 'bold',
              }}
            >
              {t('common.loadMoreMonths')}
            </Text>
          )}
        </TouchableOpacity>
      )}

      <DetachedSheet ref={dayRef} snapPoints={['50%', '55%']} animationConfigs={animtion}>
        <PrevDay ref={dayRef} prays={prays!} selected={selected} setSelected={setSelected} />
      </DetachedSheet>
    </View>
  );
};

export default MonthScreen;
