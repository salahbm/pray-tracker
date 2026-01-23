import React, { useEffect, useMemo, useState } from 'react';
import { View, Pressable } from 'react-native';
import { MotiView } from 'moti';
import { addDays, addMonths, differenceInCalendarDays, format, parse, startOfDay } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

// Icons & UI
import { MoonStar, Sun, ChevronRight, Sparkles } from '@/components/shared/icons';
import { Text } from '@/components/ui/text';
import RamadanCountdown from '@/components/ramadan/ramadan-countdown';
import RamadanStatusBadge from '@/components/ramadan/ramadan-badge';
import { cn } from '@/lib/utils';

// Logic
import { useRamadanCalendar } from '@/hooks/ramadan/use-ramadan';
import { getRamadanCountdown } from '@/utils/ramadanCountdown';
import { useLocationStore } from '@/store/use-location';

const formatTiming = (timing: string) => timing.split(' ')[0];
const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());

const RamadanCard = () => {
  const { t } = useTranslation();
  const { city, country } = useLocationStore();

  // -- Date & Logic Setup --
  const [now, setNow] = useState(() => new Date());
  const today = now;

  // Fetch logic...
  const { data: currentMonthDays = [], isLoading } = useRamadanCalendar({
    city,
    country,
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const { data: nextMonthDays = [] } = useRamadanCalendar({
    city,
    country,
    month: addMonths(today, 1).getMonth() + 1,
    year: addMonths(today, 1).getFullYear(),
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
    const nextRamadanDay = calendarDays.find(
      day => day.hijriMonth === 9 && parseGregorianDate(day.gregorianDate) >= startDate
    );

    if (!nextRamadanDay) return null;
    const daysUntil = differenceInCalendarDays(
      parseGregorianDate(nextRamadanDay.gregorianDate),
      startDate
    );
    return { daysUntil };
  }, [calendarDays, isRamadan, today]);

  if (isLoading || (!todayEntry && !ramadanStartInfo)) return null;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 420 }}
      className="mt-8"
    >
      <View
        className={cn(
          'relative rounded-xl p-6 overflow-hidden',
          isRamadan
            ? 'bg-background border border-border/60'
            : 'bg-background/95 border border-border'
        )}
      >
        {/* Soft Glow */}
        <View
          className={cn(
            'absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-15',
            isRamadan ? 'bg-primary' : 'bg-primary'
          )}
        />

        {isRamadan && countdown ? (
          <View className="gap-6">
            {/* Header */}
            <View className="flex-row items-start justify-between">
              <View className="gap-1">
                <Text className="text-foreground/60 text-xs font-semibold uppercase tracking-widest">
                  {todayEntry?.hijriMonthName}
                </Text>
                <Text className="text-foreground text-2xl font-bold tracking-tight">
                  Day {todayEntry?.hijriDay}
                </Text>
              </View>
              <RamadanStatusBadge status={countdown.status} />
            </View>

            {/* Countdown */}
            <View className="items-center gap-1">
              <RamadanCountdown countdown={countdown} />
              <Text className="text-foreground/70 text-xs font-medium">
                {countdown.status === 'Fasting'
                  ? t('ramadan.card.untilIftar')
                  : t('ramadan.card.untilSuhoor')}
              </Text>
            </View>

            {/* Timings */}
            <View className="flex-row gap-4">
              {[
                {
                  label: t('ramadan.card.suhoor'),
                  time: formatTiming(todayEntry.fajr),
                  icon: MoonStar,
                },
                {
                  label: t('ramadan.card.iftar'),
                  time: formatTiming(todayEntry.maghrib),
                  icon: Sun,
                },
              ].map((item, i) => (
                <View
                  key={i}
                  className="flex-1 rounded-2xl p-4 bg-primary-400/20 border border-border/40 flex-row items-center justify-between"
                >
                  <View className="gap-0.5">
                    <Text className="text-foreground/50 text-[10px] uppercase font-semibold tracking-widest">
                      {item.label}
                    </Text>
                    <Text className="text-foreground font-bold text-lg">{item.time}</Text>
                  </View>
                  <item.icon size={18} className="text-foreground/40" />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <View className="flex-row items-center justify-between">
            <View className="gap-2">
              <View className="flex-row items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <Text className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {t('ramadan.card.comingSoon')}
                </Text>
              </View>

              <View className="flex-row items-end gap-2">
                <Text className="text-4xl font-bold text-foreground">
                  {ramadanStartInfo ? ramadanStartInfo.daysUntil : '--'}
                </Text>
                <Text className="text-lg text-muted-foreground mb-1">{t('common.days')}</Text>
              </View>

              <Text className="text-xs text-muted-foreground max-w-[220px]">
                {t('ramadan.card.prepareText')}
              </Text>
            </View>

            <Pressable
              onPress={() => router.push('/(screens)/ramadan/ramadan-screen')}
              className="h-14 w-14 rounded-full bg-primary/10 items-center justify-center"
            >
              <ChevronRight size={26} className="text-primary" />
            </Pressable>
          </View>
        )}
      </View>
    </MotiView>
  );
};

export default RamadanCard;
