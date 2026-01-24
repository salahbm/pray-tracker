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
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePreferencesStore } from '@/store/use-preferences';
import { fireToast } from '@/providers/toaster';
import { Alert } from 'react-native';

const Preferences = () => {
  const themeRef = useRef<BottomSheet>(null);
  const langRef = useRef<BottomSheet>(null);
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { currentLanguage } = useLanguage();
  const { visited, setVisited, clearPreferences } = useOnboardingStore();
  const { resetLocation, city, country, initialized } = useLocationStore();
  const { resetTheme } = useThemeStore();
  const { prayerNotifications, toggleEnabled } = useNotificationStore();
  const { showHistoryDay, setShowHistoryDay } = usePreferencesStore();

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

  const handleToggleShowHistoryDay = (enabled: boolean) => {
    setShowHistoryDay(enabled);
  };

  return (
    <SafeAreaView className="safe-area">
      <GoBack title={t('profile.settings.title')} />
      <View className="main-area">
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

        <View className="touchable">
          <Text className="text-base text-muted-foreground ml-2">
            {t('profile.settings.show_history_day')}
          </Text>

          <Switch
            trackColor={{
              false: colors['--muted'],
              true: colors['--primary'],
            }}
            thumbColor={showHistoryDay ? colors['--background'] : colors['--muted-foreground']}
            value={showHistoryDay}
            onValueChange={handleToggleShowHistoryDay}
          />
        </View>
        {__DEV__ && (
          <Fragment>
            <Text className="text-lg font-bold text-foreground mt-6 mb-2 ml-2">🛠️ Debug Tools</Text>

            {/* Onboarding Controls */}
            <View className="touchable">
              <Text className="text-base text-muted-foreground ml-2">
                Onboarding Visited: {visited ? '✅' : '❌'}
              </Text>
              <Switch
                trackColor={{
                  false: colors['--muted'],
                  true: colors['--primary'],
                }}
                thumbColor={visited ? colors['--background'] : colors['--muted-foreground']}
                value={visited}
                onValueChange={() => {
                  setVisited(!visited);
                  fireToast.success(`Onboarding ${!visited ? 'completed' : 'reset'}`);
                }}
              />
            </View>

            {/* Location State */}
            <View className="bg-muted/30 p-4 rounded-xl mx-2 my-2">
              <Text className="text-sm font-bold text-foreground mb-2">📍 Location State</Text>
              <Text className="text-xs text-muted-foreground">City: {city || 'Not set'}</Text>
              <Text className="text-xs text-muted-foreground">Country: {country || 'Not set'}</Text>
              <Text className="text-xs text-muted-foreground">
                Initialized: {initialized ? '✅' : '❌'}
              </Text>
            </View>

            {/* Permission Checks */}
            <Button
              variant="outline"
              className="mx-2 my-1"
              onPress={async () => {
                const locationPerm = await Location.getForegroundPermissionsAsync();
                const notificationPerm = await Notifications.getPermissionsAsync();

                Alert.alert(
                  'Permission Status',
                  `Location: ${locationPerm.status}\n` +
                    `Location Granted: ${locationPerm.granted ? '✅' : '❌'}\n\n` +
                    `Notifications: ${notificationPerm.status}\n` +
                    `Notifications Granted: ${notificationPerm.granted ? '✅' : '❌'}`,
                  [{ text: 'OK' }]
                );
              }}
            >
              <Text className="text-foreground">Check Permissions</Text>
            </Button>

            {/* Reset Location */}
            <Button
              variant="outline"
              className="mx-2 my-1"
              onPress={() => {
                resetLocation();
                fireToast.success('Location store reset');
              }}
            >
              <Text className="text-foreground">Reset Location Store</Text>
            </Button>

            {/* Reset Theme */}
            <Button
              variant="outline"
              className="mx-2 my-1"
              onPress={() => {
                resetTheme();
                fireToast.success('Theme reset to default');
              }}
            >
              <Text className="text-foreground">Reset Theme</Text>
            </Button>

            {/* Clear Onboarding Preferences */}
            <Button
              variant="outline"
              className="mx-2 my-1"
              onPress={() => {
                clearPreferences();
                fireToast.success('Onboarding preferences cleared');
              }}
            >
              <Text className="text-foreground">Clear Onboarding Prefs</Text>
            </Button>

            {/* Clear All AsyncStorage */}
            <Button
              variant="destructive"
              className="mx-2 my-1"
              onPress={async () => {
                Alert.alert(
                  'Clear All Storage?',
                  'This will clear ALL app data including auth tokens. You will be logged out.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Clear All',
                      style: 'destructive',
                      onPress: async () => {
                        await AsyncStorage.clear();
                        fireToast.success('All storage cleared');
                        setTimeout(() => {
                          router.replace('/(onboarding)/onboarding');
                        }, 500);
                      },
                    },
                  ]
                );
              }}
            >
              <Text className="text-destructive-foreground">⚠️ Clear All Storage</Text>
            </Button>

            {/* Go to Onboarding */}
            <Button
              className="mx-2 my-1"
              onPress={() => {
                setVisited(false);
                router.replace('/(onboarding)/onboarding');
              }}
            >
              <Text className="text-primary-foreground">Go to Onboarding</Text>
            </Button>
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
