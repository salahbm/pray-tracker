import { useUser, useAuth } from '@clerk/clerk-expo';
import LottieView from 'lottie-react-native';
import { useRef, useState } from 'react';
import {
  View,
  Text,
  Switch,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeatMap from '@/components/shared/heat-map';
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

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const [prayerStatus, setPrayerStatus] = useState(
    prayers.reduce((acc, prayer) => ({ ...acc, [prayer.id]: false }), {}),
  );

  const data = {
    '2024-01-01': {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: false,
      tahajjud: true,
    },
    '2024-01-02': {
      fajr: false,
      dhuhr: true,
      asr: false,
      maghrib: true,
      isha: false,
      tahajjud: false,
    },
    '2024-02-15': {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      tahajjud: true,
    },
    '2025-02-15': {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      tahajjud: true,
    },
    '2026-02-15': {
      fajr: true,
      dhuhr: true,
      asr: true,
      maghrib: true,
      isha: true,
      tahajjud: true,
    },
  };

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
    <SafeAreaView className={cn('flex-1 bg-background p-4')}>
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
              'flex-row items-center justify-between bg-gray-100 p-2 rounded-md mb-2',
            )}
          >
            <View>
              <Text className={cn('text-base font-medium')}>{prayer.name}</Text>
              <Text className={cn('text-sm text-gray-500')}>
                {prayer.description}
              </Text>
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
        <Text className={cn('text-lg font-semibold mb-3')}>Prayer History</Text>
        <HeatMap
          data={data}
          onDayClick={(date, dayData) => {
            Alert.alert(
              'Prayer History',
              `Date: ${new Date(date).toLocaleDateString()}\n\n${Object.entries(
                dayData,
              )
                .filter(([_key, value]) => value)
                .map(([key, value]) => `${key}: ${value ? '✅' : '❌'}`)
                .join('\n')}`,
            );
          }}
          year={2024}
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
