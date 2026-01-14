import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { addDays, addMonths, differenceInCalendarDays, format, parse, startOfDay } from 'date-fns';
import { useTranslation } from 'react-i18next';

import RamadanCountdown from '@/components/ramadan/ramadan-countdown';
import RamadanStatusBadge from '@/components/ramadan/ramadan-badge';
import { Text } from '@/components/ui/text';

import { useRamadanCalendar } from '@/hooks/ramadan/use-ramadan';
import { getRamadanCountdown } from '@/utils/ramadanCountdown';
import { PressableBounce } from '../shared/pressable-bounce';
import { router } from 'expo-router';

// Debug date to simulate Ramadan UI (set to null to use real date)
const DEBUG_SIMULATED_DATE = '15-03-2026';

const formatTiming = (timing: string) => timing.split(' ')[0];
const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());

const RamadanCard = () => {
  /**
   * "now" drives all date logic and countdown.
   * It can be simulated for UI preview or real-time in production.
   */
  const [now, setNow] = useState(() => {
    if (DEBUG_SIMULATED_DATE) {
      return parse(DEBUG_SIMULATED_DATE, 'dd-MM-yyyy', new Date());
    }
    return new Date();
  });
  const { t } = useTranslation();

  const city = 'Seoul';
  const country = 'Saudi Arabia';

  const today = now;
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const nextMonthDate = addMonths(today, 1);
  const nextMonth = nextMonthDate.getMonth() + 1;
  const nextMonthYear = nextMonthDate.getFullYear();

  // Fetch Ramadan calendar for this month and next month (Ramadan can span two)
  const { data: currentMonthDays = [], isLoading } = useRamadanCalendar({
    city,
    country,
    month: currentMonth,
    year: currentYear,
  });

  const { data: nextMonthDays = [] } = useRamadanCalendar({
    city,
    country,
    month: nextMonth,
    year: nextMonthYear,
  });

  /**
   * Live ticking every second (disabled when simulating)
   */
  useEffect(() => {
    if (DEBUG_SIMULATED_DATE) return;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Merge months into a single continuous list
  const calendarDays = useMemo(
    () => [...currentMonthDays, ...nextMonthDays],
    [currentMonthDays, nextMonthDays]
  );

  // Find today's calendar entry
  const todayEntry = useMemo(() => {
    const key = format(today, 'dd-MM-yyyy');
    return calendarDays.find(day => day.gregorianDate === key);
  }, [calendarDays, today]);

  // Find tomorrow's entry (for post-Maghrib countdown)
  const tomorrowEntry = useMemo(() => {
    const tomorrowKey = format(addDays(today, 1), 'dd-MM-yyyy');
    return calendarDays.find(day => day.gregorianDate === tomorrowKey);
  }, [calendarDays, today]);

  // Determine countdown + fasting state
  const countdown = useMemo(() => {
    if (!todayEntry || !tomorrowEntry) return null;
    return getRamadanCountdown({ now, today: todayEntry, tomorrow: tomorrowEntry });
  }, [now, todayEntry, tomorrowEntry]);

  const isRamadan = todayEntry?.hijriMonth === 9;

  /**
   * When not Ramadan, find how many days remain until next Ramadan
   */
  const ramadanStartInfo = useMemo(() => {
    if (isRamadan) return null;

    const startDate = startOfDay(today);
    const nextRamadanDay = calendarDays.find(day => {
      if (day.hijriMonth !== 9) return false;
      return parseGregorianDate(day.gregorianDate) >= startDate;
    });

    if (!nextRamadanDay) return null;

    const nextGregorian = parseGregorianDate(nextRamadanDay.gregorianDate);
    const daysUntil = differenceInCalendarDays(nextGregorian, startDate);

    return { daysUntil };
  }, [calendarDays, isRamadan, today]);

  if (isLoading || !todayEntry || !tomorrowEntry) return null;

  return (
    <MotiView
      from={{ opacity: 0, translateY: 12 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 500 }}
      className="mt-6"
    >
      <PressableBounce
        onPress={() => router.push('/(screens)/ramadan/ramadan-screen')}
        className="rounded-2xl border border-border bg-card/90 p-4 backdrop-blur-md"
      >
        {isRamadan && countdown ? (
          <View>
            {/* Header */}
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-xs uppercase tracking-widest text-muted-foreground">
                  {t('ramadan.card.dayLabel', { day: todayEntry.hijriDay })}
                </Text>
                <Text className="text-lg font-semibold">
                  {todayEntry.hijriDay} {todayEntry.hijriMonthName} {todayEntry.hijriYear} AH
                </Text>
              </View>
              <RamadanStatusBadge status={countdown.status} />
            </View>

            {/* Time range */}
            <View className="mt-4 flex-row gap-3">
              <View className="flex-1 rounded-xl bg-muted px-3 py-2">
                <Text className="text-xs text-muted-foreground">
                  {t('ramadan.card.suhoorEnds')}
                </Text>
                <Text className="text-lg font-semibold">{formatTiming(todayEntry.fajr)}</Text>
              </View>
              <View className="flex-1 rounded-xl bg-muted px-3 py-2">
                <Text className="text-xs text-muted-foreground">{t('ramadan.card.iftar')}</Text>
                <Text className="text-lg font-semibold">{formatTiming(todayEntry.maghrib)}</Text>
              </View>
            </View>

            {/* Countdown context */}
            <Text className="mt-4 text-xs text-muted-foreground">
              {countdown.status === 'Suhoor Time' && t('ramadan.card.countdownUntilIftar')}
              {countdown.status === 'Fasting' && t('ramadan.card.countdownUntilSuhoorEnds')}
              {countdown.status === 'Iftar Time' && t('ramadan.card.countdownIftarTime')}
            </Text>

            <RamadanCountdown countdown={countdown} />
          </View>
        ) : (
          <View className="items-center py-4">
            <Text className="text-base font-semibold">{t('ramadan.card.title')}</Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              {ramadanStartInfo
                ? t('ramadan.card.beginsIn', { days: ramadanStartInfo.daysUntil })
                : t('ramadan.card.trackingSoon')}
            </Text>
          </View>
        )}
      </PressableBounce>
    </MotiView>
  );
};

export default RamadanCard;
