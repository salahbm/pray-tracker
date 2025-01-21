import { useUser, useAuth } from '@clerk/clerk-expo';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import { View, Switch, Alert, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeatMap from '@/components/shared/heat-map';
import YearPicker from '@/components/shared/year-picker';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import confetti from 'assets/gif/confetti.json';

const prayers = [
  { id: 'fajr', name: 'Fajr', description: 'Dawn Prayer' },
  { id: 'dhuhr', name: 'Dhuhr', description: 'Noon Prayer' },
  { id: 'asr', name: 'Asr', description: 'Afternoon Prayer' },
  { id: 'maghrib', name: 'Maghrib', description: 'Sunset Prayer' },
  { id: 'isha', name: 'Isha', description: 'Night Prayer' },
  { id: 'tahajjud', name: 'Tahajjud', description: 'Optional Night Prayer' },
];

const data = {
  '2024-01-01': {
    fajr: 1,
    dhuhr: 2,
    asr: 0,
    maghrib: 1,
    isha: 2,
    tahajjud: 0,
  },
  '2025-11-01': {
    fajr: 1,
    dhuhr: 2,
    asr: 2,
    maghrib: 1,
    isha: 2,
    tahajjud: 0,
  },
  '2025-01-21': {
    fajr: 1,
    dhuhr: 2,
    asr: 2,
    maghrib: 1,
    isha: 2,
    tahajjud: 2,
  },
  '2025-01-22': {
    fajr: 1,
    dhuhr: 2,
    asr: 2,
    maghrib: 1,
    isha: 2,
    tahajjud: 2,
  },
  '2025-01-25': {
    fajr: 1,
    dhuhr: 0,
    asr: 2,
    maghrib: 1,
    isha: 2,
    tahajjud: 0,
  },
  '2025-01-24': {
    fajr: 1,
    dhuhr: 0,
    asr: 0,
    maghrib: 1,
    isha: 0,
    tahajjud: 0,
  },
  '2025-01-01': {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 2,
    isha: 0,
    tahajjud: 0,
  },
};

export default function HomeScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const { user } = useUser();
  const { signOut } = useAuth();
  const [prayerStatus, setPrayerStatus] = useState(
    prayers.reduce((acc, prayer) => ({ ...acc, [prayer.id]: false }), {}),
  );

  const togglePrayer = (id) => {
    Alert.alert(
      'Confirm Action',
      `Are you sure you want to ${prayerStatus[id] ? 'turn off' : 'turn on'} ${id}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            setPrayerStatus((prev) => ({ ...prev, [id]: !prev[id] }));
            triggerConfetti();
          },
        },
      ],
    );
  };

  const handleSignOut = () => {
    signOut();
  };

  const confettiRef = useRef<LottieView>(null);

  function triggerConfetti() {
    confettiRef.current?.play(0);
  }

  return (
    <SafeAreaView className="main-area">
      {/* Header Section */}
      <View className={cn('flex-row items-center justify-between mb-4')}>
        <View>
          <Text className={cn('text-xl font-bold')}>
            {user ? `Welcome, ${user.firstName} 👋` : 'Welcome, Guest 👋'}
          </Text>
          <Text className={cn('text-gray-500')}>
            {new Date().toDateString()}
          </Text>
        </View>
        <TouchableOpacity
          onPress={user ? handleSignOut : null}
          className={cn('items-center w-10 h-10')}
        >
          <Image
            source={{ uri: user?.imageUrl || 'https://via.placeholder.com/40' }}
            className={cn('w-10 h-10 rounded-full')}
          />
        </TouchableOpacity>
      </View>

      {/* Prayer Switches */}
      <View className={cn('mb-6')}>
        <Text className={cn('text-lg font-semibold mb-3')}>
          Today&apos;s Prayers
        </Text>
        {prayers.map((prayer) => (
          <View
            key={prayer.id}
            className={cn(
              'flex-row items-center justify-between bg-card p-2 rounded-md mb-2',
            )}
          >
            <View>
              <Text className={cn('text-base font-medium')}>{prayer.name}</Text>
              <Text className={cn('text-sm ')}>{prayer.description}</Text>
            </View>
            <Switch
              value={prayerStatus[prayer.id]}
              onValueChange={() => togglePrayer(prayer.id)}
              thumbColor={prayerStatus[prayer.id] ? '#b9f900' : '#ccc'}
              trackColor={{ false: '#e5e5e5', true: '#d4f799' }}
            />
          </View>
        ))}
      </View>

      {/* Prayer History (Heatmap) */}
      <View>
        <View className="flex flex-row justify-between items-center mb-6">
          <Text className={cn('text-lg font-semibold ')}>Prayer History</Text>
          <Button
            variant="outline"
            size="sm"
            onPress={() => setPickerVisible(true)}
          >
            <Text>{year}</Text>
          </Button>
        </View>
        <YearPicker
          value={year}
          onChangeValue={setYear}
          isVisible={isPickerVisible}
          onBackdropPress={() => setPickerVisible(false)}
        />
        <HeatMap
          data={data}
          year={year}
          onDayClick={(date, { data }) =>
            console.log('Day clicked!', date, data)
          }
        />
      </View>

      {/* Confetti Animation */}
      <LottieView
        ref={confettiRef}
        source={confetti}
        autoPlay={false}
        loop={false}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 100,
          pointerEvents: 'none',
        }}
      />
    </SafeAreaView>
  );
}
