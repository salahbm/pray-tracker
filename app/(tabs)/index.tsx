import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import BottomSheet from '@gorhom/bottom-sheet';
import Checkbox from 'expo-checkbox';
import LottieView from 'lottie-react-native';
import { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { LineChart, lineDataItem } from 'react-native-gifted-charts';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';
import ProfilePage from '../(screens)/profile';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
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
import { FRIENDS } from '@/constants/images';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useCreatePray } from '@/hooks/prays/usePostPray';
import { cn } from '@/lib/utils';
import { ClickedData } from '@/types/global';
import confetti from 'assets/gif/confetti.json';

const lineData: lineDataItem[] = [
  { value: 0, dataPointText: '0' },
  { value: 20, dataPointText: '20' },
  { value: 18, dataPointText: '18' },
  { value: 40, dataPointText: '40' },
  { value: 36, dataPointText: '36' },
  { value: 60, dataPointText: '60' },
  { value: 54, dataPointText: '54' },
  { value: 85, dataPointText: '85' },
  { value: 240, dataPointText: '240' },
  { value: 60, dataPointText: '60' },
  { value: 280, dataPointText: '280' },
  { value: 300, dataPointText: '300' },
  { value: 320, dataPointText: '320' },
  { value: 100, dataPointText: '100' },
];

export default function HomeScreen() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [clickedData, setClickedData] = useState<ClickedData | null>(null);
  const [accordion, setAccordion] = useState<string>('');
  const [prayers, setPrayers] = useState<Record<string, number>>({
    [SALAHS.FAJR]: 3, // 0:missed, 1:late, 2: on time, 3 not touched
    [SALAHS.DHUHR]: 3,
    [SALAHS.ASR]: 3,
    [SALAHS.MAGHRIB]: 3,
    [SALAHS.ISHA]: 3,
    [SALAHS.TAHAJJUD]: 3,
  });

  const { user } = useUser();
  const { data: userData } = useGetUser(user?.id);
  console.log('userData:', userData);
  const { data: prays } = useGetPrays(userData?.id, year);
  const { mutateAsync: createPray, isPending } = useCreatePray();
  console.log('prays:', prays);

  // BOTTOM SHEETS REFERENCES
  const signInSheetRef = useRef<BottomSheet>(null);
  const signUpSheetRef = useRef<BottomSheet>(null);
  const profileSheetRef = useRef<BottomSheet>(null);
  // Confetti animation ref
  const confettiRef = useRef<LottieView>(null);

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(() => {
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(2);
  }, []);

  const handlePresentSignUp = useCallback(() => {
    signInSheetRef.current?.close();
    signUpSheetRef.current?.snapToIndex(2);
  }, []);

  const handlePrayerChange = useCallback(
    async (prayer: string, value: number) => {
      if (
        value === PRAYER_POINTS.MISSED &&
        prayers[prayer] !== PRAYER_POINTS.NOT_TOUCHED
      ) {
        return setShowModal(true);
      }
      setPrayers((prev) => ({ ...prev, [prayer]: value }));

      const payload = {
        id: user?.id,
        ...prayers,
        date: today,
      };
      await createPray(payload);
      if (value === PRAYER_POINTS.ON_TIME) confettiRef.current?.play(0);
    },
    [prayers, createPray, user?.id, today],
  );

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

  const handleDayClick = (date: string, details: { data: DayData }) => {
    if (!details || !details.data) return;
    setClickedData({ date, details: details });
    setAccordion('item-1');
  };

  return (
    <SafeAreaView className="main-area pt-6 pb-12">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          className={cn(
            'flex-row items-center justify-between border-b border-border pb-5',
          )}
        >
          <View>
            <Text
              numberOfLines={1}
              className={cn('text-xl font-bold max-w-[250px] truncate')}
            >
              {user ? `Welcome, ${user.username} 👋` : 'Welcome, Guest 👋'}
            </Text>
            <Text className={cn('text-muted-foreground')}>
              {today.toDateString()}
            </Text>
          </View>
          <SignedIn>
            <TouchableOpacity
              onPress={() => profileSheetRef.current?.snapToIndex(2)}
            >
              <Image
                source={{
                  uri: user?.imageUrl,
                }}
                className={cn('size-14 rounded-full')}
              />
            </TouchableOpacity>
          </SignedIn>
          <SignedOut>
            <View className="flex-row justify-end gap-5 items-center">
              <Image
                source={FRIENDS.guest}
                className={cn('size-14 rounded-full bg-foreground')}
              />
              <Button size="sm" onPress={handlePresentSignIn}>
                <Text>Sign In</Text>
              </Button>
            </View>
          </SignedOut>
        </View>

        {/* Today's Prayers */}
        <View className="flex-row items-center justify-between mt-6 mb-2">
          <Text className={cn('text-xl font-semibold')}>
            Today&apos;s Prayers
          </Text>
          <View className="flex-1 flex-row justify-end gap-2">
            <Text className={cn('text-sm font-bold text-center')}>Missed</Text>
            <Text className={cn('text-sm font-bold text-center')}>Late</Text>
            <Text className={cn('text-sm font-bold text-center')}>On Time</Text>
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

        {/* PRAYER HISTORY */}
        <View className="mt-6">
          <View className="flex flex-row justify-between items-center  mb-4">
            <Text className={cn('text-xl font-semibold')}>Prayer History</Text>
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
              <AccordionContent className="mt-5">
                <View className={cn('p-4 bg-muted rounded-md')}>
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

        {/* CHARTS */}
        <Text className={cn('text-xl font-semibold mt-6 mb-4')}>
          Prayer Stats
        </Text>
        <LineChart
          data={lineData}
          initialSpacing={0}
          endSpacing={-10}
          spacing={30}
          thickness={3}
          hideDataPoints
          hideRules
          showVerticalLines
          areaChart
          curved
          isAnimated
          startFillColor={COLORS.dark.primary}
          startOpacity={0.5}
          endFillColor={COLORS.dark.primary}
          endOpacity={0.1}
          verticalLinesStrokeDashArray={[7, 7]}
          color={COLORS.dark.primary}
          yAxisTextStyle={{ color: COLORS.dark.muted_foreground, fontSize: 12 }}
          yAxisColor={COLORS.dark.border}
          verticalLinesColor={COLORS.dark.muted_foreground}
          xAxisColor={COLORS.dark.border}
        />

        {/* LOTTIE CONFETTI */}
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
      </ScrollView>

      {/* MISSED MODAL */}
      <Modal
        isVisible={showModal}
        animationIn="zoomIn"
        animationOut="zoomOut"
        onBackdropPress={() => setShowModal(false)}
      >
        <View className="bg-muted p-6 rounded-md h-[220px]">
          <Text className="text-xl font-semibold mb-4 text-center flex-1">
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
            <Button onPress={confirmTurnOff} width="full" variant="destructive">
              <Text>Yes</Text>
            </Button>
          </View>
        </View>
      </Modal>

      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={signInSheetRef}>
        <SignInScreen
          onSuccess={() => signInSheetRef.current?.close()}
          onNavigate={handlePresentSignUp}
        />
      </CustomBottomSheet>

      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage onNavigate={() => profileSheetRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
