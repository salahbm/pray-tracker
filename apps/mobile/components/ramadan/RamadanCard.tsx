import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { MotiView } from 'moti';
import { addDays, addMonths, differenceInCalendarDays, format, parse, startOfDay } from 'date-fns';

import RamadanCountdown from '@/components/ramadan/RamadanCountdown';
import RamadanStatusBadge from '@/components/ramadan/RamadanStatusBadge';
import { Text } from '@/components/ui/text';
import { useGetOnboardingPreferences } from '@/hooks/onboarding/useGetOnboardingPreferences';
import { useRamadanCalendar } from '@/hooks/ramadan/useRamadanCalendar';
import { getRamadanCountdown } from '@/utils/ramadanCountdown';

const formatTiming = (timing: string) => timing.split(' ')[0];

const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());

const RamadanCard = () => {
  const [now, setNow] = useState(() => new Date());
  const { data: onboarding } = useGetOnboardingPreferences();

  const city = onboarding?.locationCity ?? 'Mecca';
  const country = 'Saudi Arabia';

  const today = now;
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const nextMonthDate = addMonths(today, 1);
  const nextMonth = nextMonthDate.getMonth() + 1;
  const nextMonthYear = nextMonthDate.getFullYear();

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

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const calendarDays = useMemo(
    () => [...currentMonthDays, ...nextMonthDays],
    [currentMonthDays, nextMonthDays]
  );

  const todayEntry = useMemo(() => {
    const key = format(today, 'dd-MM-yyyy');
    return calendarDays.find(day => day.gregorianDate === key);
  }, [calendarDays, today]);

  const tomorrowEntry = useMemo(() => {
    const tomorrowKey = format(addDays(today, 1), 'dd-MM-yyyy');
    return calendarDays.find(day => day.gregorianDate === tomorrowKey);
  }, [calendarDays, today]);

  const countdown = useMemo(() => {
    if (!todayEntry || !tomorrowEntry) return null;
    return getRamadanCountdown({ now, today: todayEntry, tomorrow: tomorrowEntry });
  }, [now, todayEntry, tomorrowEntry]);

  const isRamadan = todayEntry?.hijriMonth === 9;

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
      <View className="rounded-2xl border border-border bg-card p-4">
        {isRamadan && countdown ? (
          <View>
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-lg font-semibold">Ramadan</Text>
                <Text className="text-xs text-muted-foreground">
                  {`${todayEntry.hijriDay} ${todayEntry.hijriMonthName} ${todayEntry.hijriYear} AH`}
                </Text>
              </View>
              <RamadanStatusBadge status={countdown.status} />
            </View>

            <Text className="mt-2 text-2xl font-semibold">Ramadan {todayEntry.hijriDay}</Text>

            <View className="mt-3 flex-row justify-between">
              <View>
                <Text className="text-xs text-muted-foreground">Suhoor ends</Text>
                <Text className="text-base font-semibold">{formatTiming(todayEntry.fajr)}</Text>
              </View>
              <View>
                <Text className="text-xs text-muted-foreground">Iftar</Text>
                <Text className="text-base font-semibold">{formatTiming(todayEntry.maghrib)}</Text>
              </View>
            </View>

            <RamadanCountdown countdown={countdown} />
          </View>
        ) : (
          <View className="py-1">
            <Text className="text-sm font-semibold">Ramadan</Text>
            <Text className="text-sm text-muted-foreground">
              {ramadanStartInfo
                ? `Ramadan starts in ${ramadanStartInfo.daysUntil} days`
                : 'Ramadan tracking is coming soon.'}
            </Text>
          </View>
        )}
      </View>
    </MotiView>
  );
};

export default RamadanCard;
