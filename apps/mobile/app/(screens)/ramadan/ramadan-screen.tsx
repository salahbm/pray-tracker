import BottomSheet from '@gorhom/bottom-sheet';
import { format, getDay, parse } from 'date-fns';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useGetOnboardingPreferences } from '@/hooks/onboarding/useGetOnboardingPreferences';
import { useRamadanCalendar } from '@/hooks/ramadan/useRamadanCalendar';
import { cn } from '@/lib/utils';
import { RamadanCalendarDay } from '@/types/ramadan';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const parseGregorianDate = (dateValue: string) => parse(dateValue, 'dd-MM-yyyy', new Date());

const buildCalendarGrid = (days: RamadanCalendarDay[]) => {
  if (!days.length) return [];
  const firstDate = parseGregorianDate(days[0].gregorianDate);
  const leadingDays = getDay(firstDate);
  const placeholders = Array.from({ length: leadingDays }, () => null);
  return [...placeholders, ...days];
};

const RamadanScreen = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const { data: onboarding } = useGetOnboardingPreferences();
  const [city, setCity] = useState(onboarding?.locationCity ?? 'Mecca');
  const [country, setCountry] = useState('Saudi Arabia');
  const [draftCity, setDraftCity] = useState(city);
  const [draftCountry, setDraftCountry] = useState(country);

  useEffect(() => {
    if (onboarding?.locationCity) {
      setCity(onboarding.locationCity);
      setDraftCity(onboarding.locationCity);
    }
  }, [onboarding?.locationCity]);

  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  const { data: monthDays = [], isLoading } = useRamadanCalendar({
    city,
    country,
    month: currentMonth,
    year: currentYear,
  });

  const gridDays = useMemo(() => buildCalendarGrid(monthDays), [monthDays]);

  const monthLabel = useMemo(() => {
    if (!monthDays.length) return format(today, 'MMMM yyyy');
    const entry = monthDays[0];
    const gregorianDate = parseGregorianDate(entry.gregorianDate);
    return `${format(gregorianDate, 'MMMM yyyy')} • ${entry.hijriMonthName} ${entry.hijriYear}`;
  }, [monthDays, today]);

  const handleOpenSheet = () => sheetRef.current?.snapToIndex(0);

  const handleApplyLocation = () => {
    const nextCity = draftCity.trim();
    const nextCountry = draftCountry.trim();
    if (nextCity) setCity(nextCity);
    if (nextCountry) setCountry(nextCountry);
    sheetRef.current?.close();
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} className="px-5">
        <View className="mt-6 rounded-3xl border border-border bg-card p-5">
          <Text className="text-xs text-muted-foreground">Ramadan Calendar</Text>
          <Text className="mt-1 text-2xl font-semibold">{monthLabel}</Text>
          <View className="mt-4 flex-row items-center justify-between">
            <View>
              <Text className="text-xs text-muted-foreground">Location</Text>
              <Text className="text-sm font-semibold">{`${city}, ${country}`}</Text>
            </View>
            <Button size="sm" variant="secondary" onPress={handleOpenSheet}>
              Change
            </Button>
          </View>
        </View>

        <View className="mt-6 rounded-3xl border border-border bg-card p-4">
          <View className="flex-row justify-between px-1 pb-3">
            {WEEKDAYS.map(day => (
              <Text key={day} className="text-xs font-semibold text-muted-foreground">
                {day}
              </Text>
            ))}
          </View>

          <View className="flex-row flex-wrap">
            {gridDays.map((entry, index) => {
              if (!entry) {
                return <View key={`empty-${index}`} className="w-[14.285%] pb-4" />;
              }

              const gregorianDate = parseGregorianDate(entry.gregorianDate);
              const isToday = format(gregorianDate, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd');

              return (
                <View key={entry.gregorianDate} className="w-[14.285%] pb-4">
                  <View
                    className={cn(
                      'mx-1 rounded-2xl border border-border bg-muted/40 px-2 py-3',
                      isToday && 'border-primary/40 bg-primary/10'
                    )}
                  >
                    <Text className="text-xs font-semibold text-foreground">
                      {format(gregorianDate, 'd')}
                    </Text>
                    <Text className="text-xs text-muted-foreground">{entry.hijriDay}</Text>
                    <View className="mt-2">
                      <Text className="text-[10px] text-muted-foreground">Fajr</Text>
                      <Text className="text-[11px] font-semibold">{entry.fajr.split(' ')[0]}</Text>
                    </View>
                    <View className="mt-1">
                      <Text className="text-[10px] text-muted-foreground">Maghrib</Text>
                      <Text className="text-[11px] font-semibold">{entry.maghrib.split(' ')[0]}</Text>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {!isLoading && !monthDays.length && (
            <Text className="text-sm text-muted-foreground">No calendar data available.</Text>
          )}
        </View>
      </ScrollView>

      <CustomBottomSheet
        sheetRef={sheetRef}
        snapPoints={['45%']}
        detached
        containerStyle={{ paddingHorizontal: 16 }}
        scrollClassName="bg-card"
      >
        <View className="py-6">
          <Text className="text-lg font-semibold">Change location</Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Update the city and country to refresh the Ramadan calendar.
          </Text>

          <View className="mt-4 gap-4">
            <Input label="City" value={draftCity} onChangeText={setDraftCity} />
            <Input label="Country" value={draftCountry} onChangeText={setDraftCountry} />
          </View>

          <View className="mt-6 flex-row gap-3">
            <Button className="flex-1" onPress={handleApplyLocation}>
              Save
            </Button>
            <Pressable
              onPress={() => sheetRef.current?.close()}
              className="flex-1 rounded-md border border-border px-4 py-3"
            >
              <Text className="text-center font-semibold">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </CustomBottomSheet>
    </View>
  );
};

export default RamadanScreen;
