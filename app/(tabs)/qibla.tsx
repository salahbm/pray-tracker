import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/text';
import QiblaCompass from '@/components/views/qibla/qibla-compass';
import { cn } from '@/lib/utils';
type PrayerTime = {
  name: string;
  time: string;
};

type PrayersTimeResponse = {
  data: {
    timings: Record<string, string>;
  };
};
const QiblaScreen = () => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nextPrayer, setNextPrayer] = useState('');
  const [data, setData] = useState<PrayersTimeResponse | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    })();
  }, []);

  const getPrayerTimes = async () => {
    if (!coords) return null;
    const res = await fetch(
      `https://api.aladhan.com/v1/timings?latitude=${coords.latitude}&longitude=${coords.longitude}&method=2`,
    );
    return res.json() as Promise<PrayersTimeResponse>;
  };

  useEffect(() => {
    if (!coords) return;
    getPrayerTimes().then((json) => {
      if (json) setData(json);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coords?.latitude, coords?.longitude, coords]);

  useEffect(() => {
    if (!data) return;
    const now = new Date();
    const times = data.data.timings;
    const sorted = Object.entries(times).map(([name, t]) => ({
      name,
      time: t,
    }));
    const found = sorted.find(({ time }) => {
      const [h, m] = time.split(':').map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(h, m, 0, 0);
      return prayerDate > now;
    });
    if (found) {
      setNextPrayer(`${found.name} (${found.time})`);
    } else {
      const [h, m] = times.Fajr.split(':').map(Number);
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(h, m, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setNextPrayer(`Fajr in ${hours}h ${mins}m`);
    }
  }, [data]);

  const prayerTimes: PrayerTime[] = data
    ? [
        { name: 'Fajr', time: data.data.timings.Fajr },
        { name: 'Sunrise', time: data.data.timings.Sunrise },
        { name: 'Dhuhr', time: data.data.timings.Dhuhr },
        { name: 'Asr', time: data.data.timings.Asr },
        { name: 'Maghrib', time: data.data.timings.Maghrib },
        { name: 'Isha', time: data.data.timings.Isha },
      ]
    : [];
  return (
    <SafeAreaView className="main-area">
      <View className="flex items-center justify-center border-b border-muted-foreground py-4 pb-12">
        <View className="flex items-center flex-row mb-4 gap-2">
          <Text className={cn('text-xl font-semibold ')}>Next Prayer:</Text>
          <Text className="font-bold text-primary text-xl">{nextPrayer}</Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={prayerTimes}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View className="flex-row items-center justify-between w-full my-2">
              <Text className="font-semibold">{item.name}</Text>
              <Text className="font-bold">{item.time}</Text>
            </View>
          )}
        />
      </View>
      <QiblaCompass />
    </SafeAreaView>
  );
};

export default QiblaScreen;
