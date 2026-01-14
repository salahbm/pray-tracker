import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';
import { MapPin, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linking, Modal, Platform, Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useThemeStore } from '@/store/defaults/theme';

import { Button } from '../../ui/button';
import { Text } from '../../ui/text';

export function LocationPermissionModal() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== 'granted') {
        setIsVisible(true);
      }
    };
    checkPermissions();
  }, []);

  const handleOpenSettings = () => {
    Linking.openSettings();
    setIsVisible(false);
  };

  const handleRequestPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      setIsVisible(false);
    }
    if (status === 'denied') {
      handleOpenSettings();
    }
  };

  if (!isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none" statusBarTranslucent>
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(300)}
        className="flex-1 bg-black/20 justify-center items-center px-6"
      >
        <Animated.View
          entering={SlideInDown.duration(600)}
          exiting={SlideOutDown.duration(400)}
          className="w-full max-w-sm overflow-hidden rounded-[32px] border border-muted shadow-2xl"
        >
          <BlurView
            intensity={Platform.OS === 'ios' ? 60 : 100}
            tint="light"
            className="p-8 bg-background/60"
          >
            <Pressable
              onPress={() => setIsVisible(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-primary-500/10"
              hitSlop={20}
            >
              <X size={18} color="white" />
            </Pressable>

            <View className="items-center">
              <View className="bg-primary-100 rounded-full p-6 mb-6 shadow-inner">
                <MapPin size={36} strokeWidth={1.5} />
              </View>

              <View className="items-center mb-6">
                <Text className="text-2xl font-semibold text-foreground text-center mb-2">
                  {t('common.permissions.location.title', 'Enable Location Access')}
                </Text>
                <Text className="text-[15px] leading-5 text-muted-foreground text-center px-2">
                  {t(
                    'common.permissions.location.message',
                    'We need your location to calculate accurate prayer times and Qibla direction for your area.'
                  )}
                </Text>
              </View>

              <View className="w-full gap-3">
                <Button onPress={handleRequestPermission} className="w-full">
                  <Text className="text-primary-foreground font-semibold">
                    {t('common.permissions.location.allow', 'Allow Location')}
                  </Text>
                </Button>
                <Button variant="outline" onPress={handleOpenSettings} className="w-full">
                  <Text className="font-medium">
                    {t('common.permissions.location.settings', 'Open Settings')}
                  </Text>
                </Button>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
