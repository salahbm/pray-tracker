import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Loader from '@/components/shared/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Text } from '@/components/ui/text';
import QiblaCompass from '@/components/views/qibla/qibla-compass';
import { usePrayerTimes } from '@/hooks/prays/useGetPayingTimes';

const QiblaScreen = () => {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [nextPrayer, setNextPrayer] = useState('');
  const [value, setValue] = useState('qibla');
  const { data, isLoading } = usePrayerTimes(coords);
  // console.log('data:', JSON.stringify(data, null, 2));

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

  // Timezone-aware next prayer calculation
  useEffect(() => {
    if (!data) return;

    const now = new Date();
    const times = Object.entries(data.timings).map(([name, t]) => {
      const [hours, minutes] = t.split(':').map(Number);
      const timeDate = new Date();
      timeDate.setHours(hours, minutes, 0, 0);
      return { name, timeDate };
    });

    const next = times.find(({ timeDate }) => timeDate > now) || times[0];
    const diff = next.timeDate.getTime() - now.getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);

    setNextPrayer(
      `${next.name} (${next.timeDate.toLocaleTimeString()}) in ${hours}h ${minutes}m`,
    );
  }, [data]);

  const prayerTimes = data
    ? Object.entries(data.timings).map(([name, time]) => ({ name, time }))
    : [];
  return (
    <SafeAreaView className="main-area">
      <Loader visible={!coords || isLoading || prayerTimes.length === 0} />
      <View>
        <Tabs
          value={value}
          onValueChange={setValue}
          className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
        >
          <TabsList className="flex-row w-full">
            <TabsTrigger value="qibla" className="flex-1">
              <Text>Qibla</Text>
            </TabsTrigger>
            <TabsTrigger value="salahs" className="flex-1">
              <Text>Times</Text>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="qibla">
            {/* QIBLA */}
            <QiblaCompass />
          </TabsContent>
          <TabsContent value="salahs">
            {/* TIME AND LOCATION */}
            <View className="flex items-center justify-center py-4 pb-12">
              <Text className="text-xl font-semibold">Next Prayer:</Text>
              <Text className="font-bold text-primary text-xl">
                {nextPrayer}
              </Text>
              <Text className="text-xl font-semibold">Location:</Text>
              <Text className="font-bold text-primary text-xl">
                {coords?.latitude}, {coords?.longitude}
              </Text>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={prayerTimes}
                keyExtractor={(item) => item.name}
                ListHeaderComponent={() => (
                  <View className="flex-row items-center justify-between w-full my-2">
                    <Text className="font-semibold">Prayers</Text>
                    <Text className="font-bold">Time</Text>
                  </View>
                )}
                renderItem={({ item }) => (
                  <View className="flex-row items-center justify-between w-full my-2">
                    <Text className="font-semibold">{item.name}</Text>
                    <Text className="font-bold">{item.time}</Text>
                  </View>
                )}
              />
            </View>
          </TabsContent>
        </Tabs>
      </View>
    </SafeAreaView>
  );
};

export default QiblaScreen;
