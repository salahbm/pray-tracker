import BottomSheet from '@gorhom/bottom-sheet';
import { Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, TouchableOpacity, View } from 'react-native';
import { DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CustomBottomSheet } from '@/components/shared/bottom-sheet';
import GoBack from '@/components/shared/go-back';
import { FLAGS, Language, LANGUAGES } from '@/components/shared/language';
import ThemeSwitcher from '@/components/shared/theme-switcher';
import { Text } from '@/components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';
import { cancelAllPrayerNotifications } from '@/lib/notification.permission';
import { useNotificationStore } from '@/store/defaults/notification';
import { useThemeStore } from '@/store/defaults/theme';
import { useOnboardingStore } from '@/store/defaults/onboarding';
import { router } from 'expo-router';
import { useLocationStore } from '@/store/use-location';
import { Button } from '@/components/ui/button';

const Preferences = () => {
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();
  const { visited, setVisited } = useOnboardingStore();
  const { resetLocation } = useLocationStore();
  const { resetTheme } = useThemeStore();
  const { prayerNotifications, toggleEnabled } = useNotificationStore();

  const handleToggleNotifications = async (enabled: boolean) => {
    toggleEnabled();

    if (enabled) {
      // Trigger rescheduling when enabled
      DeviceEventEmitter.emit('prayer-notifications-updated', {
        minutesBefore: prayerNotifications.minutesBefore,
      });
    } else {
      // Cancel all notifications when disabled
      await cancelAllPrayerNotifications();
    }
  };

  return (
    <SafeAreaView className="safe-area">
      <View className="main-area">
        <GoBack title={t('profile.settings.title')} />
        <TouchableOpacity
          className="touchable mt-10"
          onPress={() => themeRef.current?.snapToIndex(1)}
        >
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.settings.theme')}
          </Text>
          <View className="flex-row items-center justify-center w-[100px] h-7 overflow-hidden rounded-lg">
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--primary'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--muted'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--primary-300'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--destructive'],
              }}
            />
            <View
              style={{
                width: 20,
                height: 20,
                backgroundColor: colors['--foreground'],
              }}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="touchable" onPress={() => langRef.current?.snapToIndex(1)}>
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.settings.language')}
          </Text>

          <Text className="text-base text-muted-foreground ml-2">
            {FLAGS[currentLanguage as keyof typeof FLAGS]}{' '}
            {LANGUAGES[currentLanguage as keyof typeof LANGUAGES]}
          </Text>
        </TouchableOpacity>

        <View className="touchable">
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.settings.notifications')}
          </Text>

          <Switch
            trackColor={{
              false: colors['--muted'],
              true: colors['--primary'],
            }}
            thumbColor={
              prayerNotifications.isEnabled ? colors['--background'] : colors['--muted-foreground']
            }
            value={prayerNotifications.isEnabled}
            onValueChange={handleToggleNotifications}
          />
        </View>
        {__DEV__ && (
          <Fragment>
            <View className="touchable">
              <Text className="text-base text-muted-foreground ml-2">Go onboarding</Text>

              <Switch
                trackColor={{
                  false: colors['--muted'],
                  true: colors['--primary'],
                }}
                thumbColor={
                  prayerNotifications.isEnabled
                    ? colors['--background']
                    : colors['--muted-foreground']
                }
                value={visited}
                onValueChange={() => {
                  setVisited(false);
                  router.replace('/(onboarding)/onboarding');
                }}
              />
            </View>
            <View className="touchable">
              <Text className="text-base text-muted-foreground ml-2">Clear Local Storage </Text>

              <Button
                onPress={() => {
                  resetLocation();
                }}
              >
                <Text className="text-base text-muted-foreground ml-2">Reset Location</Text>
              </Button>
            </View>
            <View className="touchable">
              <Text className="text-base text-muted-foreground ml-2">Theme Storage </Text>

              <Button
                onPress={() => {
                  resetTheme();
                }}
              >
                <Text className="text-base text-muted-foreground ml-2">Reset Theme</Text>
              </Button>
            </View>
          </Fragment>
        )}
      </View>

      <CustomBottomSheet sheetRef={themeRef} snapPoints={['80%']}>
        <ThemeSwitcher onClose={() => themeRef.current?.close()} />
      </CustomBottomSheet>
      <CustomBottomSheet sheetRef={langRef} snapPoints={['80%']}>
        <Language onClose={() => langRef.current?.close()} />
      </CustomBottomSheet>
    </SafeAreaView>
  );
};

export default Preferences;
