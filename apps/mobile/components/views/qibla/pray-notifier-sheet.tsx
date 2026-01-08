import { Bell, Minus, Plus } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceEventEmitter, View } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import CustomBottomSheet from '@/components/shared/bottom-sheet';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { fireToast } from '@/providers/toaster';
import { usePrayNotifierBottomSheetStore } from '@/store/bottom-sheets/pray-notifier.sheet';
import { useNotificationStore } from '@/store/defaults/notification';
import { useThemeStore } from '@/store/defaults/theme';

const PrayerNotifierSheet: React.FC = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { prayerNotifications, setMinutesBefore } = useNotificationStore();

  const [minutes, setMinutes] = useState(prayerNotifications.minutesBefore);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const { sheetRef, close } = usePrayNotifierBottomSheetStore();

  // Sync local state with store when sheet opens
  useEffect(() => {
    setMinutes(prayerNotifications.minutesBefore);
  }, [prayerNotifications.minutesBefore]);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
  }, [opacity]);

  const counterScale = useSharedValue(1);
  const counterStyle = useAnimatedStyle(() => ({
    transform: [{ scale: counterScale.value }],
  }));

  const handleMinus = () => {
    if (minutes > 0) {
      setMinutes(prev => prev - 1);
      counterScale.value = withSpring(1.15, { duration: 5 }, () => {
        counterScale.value = withTiming(1);
      });
    }
  };

  const handlePlus = () => {
    if (minutes < 120) {
      setMinutes(prev => prev + 1);
      counterScale.value = withSpring(1.15, { duration: 5 }, () => {
        counterScale.value = withTiming(1);
      });
    }
  };

  const handleSave = async () => {
    try {
      // Save settings to store
      setMinutesBefore(minutes);

      // Trigger notification rescheduling via React Native event emitter
      DeviceEventEmitter.emit('prayer-notifications-updated', {
        minutesBefore: minutes,
      });

      // Show success toast
      fireToast.success(t('qibla.prayerTimes.notifier.success.message', { minutes }));

      close();
    } catch (error) {
      console.error('Error saving prayer notification settings:', error);
      fireToast.error(t('qibla.prayerTimes.notifier.error.message'));
    }
  };

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: withTiming(opacity.value ? 1 : 0.9) }],
  }));

  const saveButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <CustomBottomSheet sheetRef={sheetRef} snapPoints={['45%']}>
      <Animated.View style={fadeInStyle} className="gap-5 pb-8">
        <View className="items-center mb-3">
          <Animated.View
            entering={FadeInRight.delay(100).springify()}
            className="bg-primary/10 p-4 rounded-full mb-3"
          >
            <Bell size={36} color={colors['--primary']} />
          </Animated.View>

          <Text className="text-2xl font-bold text-center">
            {t('qibla.prayerTimes.notifier.title')}
          </Text>
          <Text className="text-sm text-muted-foreground text-center mt-2 px-4">
            {t('qibla.prayerTimes.notifier.description')}
          </Text>
        </View>

        <View className="flex-row justify-center items-center gap-6 mt-4">
          <Animated.View entering={FadeInLeft.delay(100)}>
            <Button
              variant="outline"
              className="size-12 rounded-full border-border bg-background/80 backdrop-blur-md"
              onPress={handleMinus}
            >
              <Minus size={20} color={colors['--foreground']} />
            </Button>
          </Animated.View>

          <Animated.View style={counterStyle}>
            <Text className="text-4xl font-extrabold text-foreground min-w-[70px] text-center">
              {minutes}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInRight.delay(100)}>
            <Button
              variant="outline"
              className="size-12 rounded-full border-border backdrop-blur-md"
              onPress={handlePlus}
            >
              <Plus size={20} color={colors['--foreground']} />
            </Button>
          </Animated.View>
        </View>

        <Text className="text-center text-muted-foreground mt-2">
          {t('qibla.prayerTimes.notifier.minutesBefore', { minutes })}
        </Text>

        <View className="flex-row gap-3 mt-6">
          <Animated.View entering={FadeInDown.delay(200)} className="flex-1">
            <Button variant="outline" onPress={close} className="flex-1">
              <Text>{t('common.actions.cancel')}</Text>
            </Button>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.delay(250)}
            style={saveButtonStyle}
            className="flex-1"
          >
            <Button variant="default" onPress={handleSave} className="flex-1">
              <Text>{t('common.actions.save')}</Text>
            </Button>
          </Animated.View>
        </View>
      </Animated.View>
    </CustomBottomSheet>
  );
};

export default PrayerNotifierSheet;
