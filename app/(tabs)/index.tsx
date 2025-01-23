import { useUser } from '@clerk/clerk-expo';
import BottomSheet from '@gorhom/bottom-sheet';
import LottieView from 'lottie-react-native';
import { useState, useRef, useCallback, useMemo } from 'react';
import { View, ScrollView } from 'react-native';
import { lineDataItem } from 'react-native-gifted-charts';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import SignInScreen from '../(auth)/sign-in';
import SignUpScreen from '../(auth)/sign-up';
import ProfilePage from '../(screens)/profile';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { DayData } from '@/components/shared/heat-map/heat';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import AreaChart from '@/components/views/home/area-chart';
import HomeHeader from '@/components/views/home/header';
import PrayerHistory from '@/components/views/home/prayer-history';
import TodaysPray from '@/components/views/home/todays-pray';
import { PRAYER_POINTS, SALAHS } from '@/constants/enums';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { useGetPrays } from '@/hooks/prays/useGetPrays';
import { useCreatePray } from '@/hooks/prays/usePostPray';
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
  const today = useMemo(() => new Date(), []);
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
  const { data: _prays } = useGetPrays(userData?.id, year);
  const { mutateAsync: createPray } = useCreatePray();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prayers, createPray, user?.id],
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
        {/* HEADER */}
        <HomeHeader
          today={today}
          user={user}
          handlePresentSignIn={handlePresentSignIn}
          ref={profileSheetRef}
        />

        {/* Today's Prayers */}
        <TodaysPray prayers={prayers} handlePrayerChange={handlePrayerChange} />

        {/* PRAYER HISTORY */}
        <PrayerHistory
          setPickerVisible={setPickerVisible}
          isPickerVisible={isPickerVisible}
          year={year}
          setYear={setYear}
          clickedData={clickedData}
          setAccordion={setAccordion}
          accordion={accordion}
          handleDayClick={handleDayClick}
          setClickedData={setClickedData}
        />

        {/* CHARTS */}
        <AreaChart lineData={lineData} />

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
        <View className="bg-muted p-6  py-12 rounded-lg h-auto">
          <Text className="text-lg font-bold text-center mb-6">
            Are you sure you want to mark as Missed?
          </Text>
          <View className="flex-row justify-between gap-2">
            <Button
              onPress={() => setShowModal(false)}
              className="flex-1 bg-muted-foreground p-3 rounded-md"
            >
              <Text className="text-center text-muted font-medium">No</Text>
            </Button>
            <Button onPress={confirmTurnOff} className="flex-1  p-3 rounded-md">
              <Text className="font-medium">Yes</Text>
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

      {/* SIGN UP SHEET */}
      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />

        {/* PROFILE */}
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage onNavigate={() => profileSheetRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
}
