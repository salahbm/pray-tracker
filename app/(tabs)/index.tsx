import { useAuth, useUser } from '@clerk/clerk-expo';
import Checkbox from 'expo-checkbox';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState, useRef } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeatMap from '@/components/shared/heat-map';
import { DayData } from '@/components/shared/heat-map/heat';
import YearPicker from '@/components/shared/year-picker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { COLORS } from '@/constants/Colors';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { cn } from '@/lib/utils';
import confetti from 'assets/gif/confetti.json';

type ClickedData = {
  date: string;
  details: { data: DayData };
};

export default function HomeScreen() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedData, setClickedData] = useState<ClickedData | null>(null);
  const [accordion, setAccordion] = useState<string>('');
  const [prayers, setPrayers] = useState<Record<string, number>>({
    [SALAHS.FAJR]: 3,
    [SALAHS.DHUHR]: 3,
    [SALAHS.ASR]: 3,
    [SALAHS.MAGHRIB]: 3,
    [SALAHS.ISHA]: 3,
    [SALAHS.TAHAJJUD]: 3,
  });

  const { user } = useUser();
  const { signOut } = useAuth();
  const confettiRef = useRef<LottieView>(null);

  const handlePrayerChange = (prayer: string, value: number) => {
    if (value === PRAYER_POINTS.MISSED) {
      setSelectedPrayer(prayer);
      setShowModal(true);
      return;
    }
    setPrayers((prev) => ({ ...prev, [prayer]: value }));
    if (value === PRAYER_POINTS.ON_TIME) confettiRef.current?.play(0);
  };

  const confirmTurnOff = () => {
    if (selectedPrayer) {
      setPrayers((prev) => ({
        ...prev,
        [selectedPrayer]: PRAYER_POINTS.MISSED,
      }));
    }
    setSelectedPrayer(null);
    setShowModal(false);
  };

  const handleSignInOrOut = () => {
    if (user) signOut();
    router.push('/(auth)/sign-in');
  };

  const handleDayClick = (date: string, details: { data: DayData }) => {
    if (!details || !details.data) return;
    setClickedData({ date, details: details });
    setAccordion('item-1');
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView contentContainerStyle={{ padding: 16 }}>
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
            onPress={handleSignInOrOut}
            className={cn('items-center w-10 h-10')}
          >
            <Image
              source={{
                uri: user?.imageUrl || 'https://via.placeholder.com/40',
              }}
              className={cn('w-10 h-10 rounded-full bg-white')}
            />
          </TouchableOpacity>
        </View>

        <View className={cn('mb-6')}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className={cn('text-lg font-semibold')}>
              Today&apos;s Prayers
            </Text>
            <View className="flex-1 flex-row justify-end gap-2">
              <Text className={cn('text-sm font-bold text-center')}>
                Missed
              </Text>
              <Text className={cn('text-sm font-bold text-center')}>Late</Text>
              <Text className={cn('text-sm font-bold text-center')}>
                On Time
              </Text>
            </View>
          </View>
          {Object.entries(prayers).map(([prayer, value]) => (
            <View
              key={prayer}
              className="flex-row items-center justify-between mb-2"
            >
              <Text className={cn('capitalize font-semibold')}>{prayer}</Text>
              <View className="flex-1 flex-row justify-end gap-10">
                {[
                  PRAYER_POINTS.MISSED,
                  PRAYER_POINTS.LATE,
                  PRAYER_POINTS.ON_TIME,
                ].map((val) => (
                  <Checkbox
                    key={val}
                    value={value === val}
                    onValueChange={() => handlePrayerChange(prayer, val)}
                    color={
                      value === val
                        ? val === PRAYER_POINTS.ON_TIME
                          ? COLORS.dark.primary
                          : val === PRAYER_POINTS.LATE
                            ? COLORS.dark.border
                            : COLORS.dark.destructive
                        : undefined
                    }
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        <View>
          <View className="flex flex-row justify-between items-center mb-6">
            <Text className={cn('text-lg font-semibold')}>Prayer History</Text>
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
          <HeatMap data={null} year={year} onDayClick={handleDayClick} />
        </View>

        <Accordion type="single" value={accordion} onValueChange={setAccordion}>
          <AccordionItem value="item-1">
            {clickedData && clickedData.details && (
              <AccordionContent>
                <View className={cn('p-4 bg-muted rounded-md mt-4')}>
                  <View className="w-full flex flex-row items-center justify-between">
                    <Text className={cn('text-md text-muted-foreground')}>
                      {clickedData.date}
                    </Text>
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => setAccordion('')}
                    >
                      <Text>Close</Text>
                    </Button>
                  </View>
                  {Object.entries(clickedData.details.data).map(
                    ([prayer, value]) => (
                      <View
                        key={prayer}
                        className="flex-row items-center justify-between mb-2 mt-4"
                      >
                        <Text className={cn('capitalize font-semibold')}>
                          {prayer}
                        </Text>
                        <View className="flex-row gap-8">
                          {[
                            PRAYER_POINTS.MISSED,
                            PRAYER_POINTS.LATE,
                            PRAYER_POINTS.ON_TIME,
                          ].map((val) => (
                            <Checkbox
                              key={val}
                              value={value === val}
                              onValueChange={() => {
                                setClickedData((prev) =>
                                  prev
                                    ? {
                                        ...prev,
                                        prayers: {
                                          ...prev.details,
                                          [prayer]: val,
                                        },
                                      }
                                    : null,
                                );
                              }}
                              color={
                                value === val
                                  ? val === PRAYER_POINTS.ON_TIME
                                    ? COLORS.dark.primary
                                    : val === PRAYER_POINTS.LATE
                                      ? COLORS.dark.border
                                      : COLORS.dark.destructive
                                  : undefined
                              }
                            />
                          ))}
                        </View>
                      </View>
                    ),
                  )}
                </View>
              </AccordionContent>
            )}
          </AccordionItem>
        </Accordion>

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

        <Modal
          isVisible={showModal}
          animationIn="zoomIn"
          animationOut="zoomOut"
          onBackdropPress={() => setShowModal(false)}
        >
          <View className="bg-muted p-6 rounded-md h-[220px]">
            <Text className="text-lg font-semibold mb-4 text-center flex-1">
              Are you sure you want to mark {selectedPrayer} as Missed?
            </Text>
            <View className="flex-row justify-between">
              <Button
                onPress={() => setShowModal(false)}
                width="full"
                variant="ghost"
              >
                <Text>No</Text>
              </Button>
              <Button
                onPress={confirmTurnOff}
                width="full"
                variant="destructive"
              >
                <Text>Yes</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
