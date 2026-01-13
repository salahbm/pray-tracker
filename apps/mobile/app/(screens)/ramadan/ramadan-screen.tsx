import React, { useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { MotiView } from 'moti';
import { addMonths, format, parse } from 'date-fns';

import { Text } from '@/components/ui/text';
import { useRamadanCalendar } from '@/hooks/ramadan/use-ramadan';

const formatTiming = (t: string) => t.split(' ')[0];

const parseGregorianDate = (date: string) => parse(date, 'dd-MM-yyyy', new Date());

const RamadanMonthScreen = () => {
  const city = 'Seoul';
  const country = 'Saudi Arabia';
  const todayKey = format(new Date(), 'dd-MM-yyyy');

  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const prevMonthDate = addMonths(now, -1);
  const nextMonthDate = addMonths(now, 1);

  const { data: prevMonthDays = [] } = useRamadanCalendar({
    city,
    country,
    month: prevMonthDate.getMonth() + 1,
    year: prevMonthDate.getFullYear(),
  });

  const { data: currentMonthDays = [] } = useRamadanCalendar({
    city,
    country,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  const { data: nextMonthDays = [] } = useRamadanCalendar({
    city,
    country,
    month: nextMonthDate.getMonth() + 1,
    year: nextMonthDate.getFullYear(),
  });
  /**
   * Merge and filter Ramadan days only (Hijri month = 9)
   */
  const ramadanDays = useMemo(() => {
    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays].filter(
      day => day.hijriMonth === 9
    );
  }, [prevMonthDays, currentMonthDays, nextMonthDays]);

  return (
    <ScrollView className="flex-1 bg-background px-4 pt-6">
      <Text className="mb-4 text-xl font-semibold">Ramadan Calendar</Text>

      <View className="flex-row flex-wrap justify-between gap-y-3">
        {ramadanDays.map((day, index) => {
          const isToday = day.gregorianDate === todayKey;
          const isPast = parseGregorianDate(day.gregorianDate) < new Date();

          return (
            <MotiView
              key={day.gregorianDate}
              from={{ opacity: 0, translateY: 8 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ delay: index * 30 }}
              className={`w-[31%] rounded-xl border p-3 ${
                isToday ? 'border-primary bg-primary/10' : 'border-border bg-card'
              }`}
            >
              <Text
                className={`text-center text-sm font-semibold ${isToday ? 'text-primary' : ''}`}
              >
                Day {day.hijriDay}
              </Text>

              <Text className="mt-1 text-center text-xs text-muted-foreground">
                {day.gregorianDate}
              </Text>

              <View className="mt-2 items-center">
                <Text className="text-xs text-muted-foreground">Fajr</Text>
                <Text className="text-xs font-medium">{formatTiming(day.fajr)}</Text>
              </View>

              <View className="mt-1 items-center">
                <Text className="text-xs text-muted-foreground">Iftar</Text>
                <Text className="text-xs font-medium">{formatTiming(day.maghrib)}</Text>
              </View>

              {isPast && !isToday && (
                <Text className="mt-2 text-center text-[10px] text-muted-foreground">
                  Completed
                </Text>
              )}

              {isToday && <Text className="mt-2 text-center text-[10px] text-primary">Today</Text>}
            </MotiView>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default RamadanMonthScreen;
