import { BlurView } from 'expo-blur';
import * as Network from 'expo-network';
import { WifiOff, X } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Platform, Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';

import { useThemeStore } from '@/store/defaults/theme';

import { Text } from '../../ui/text';

export function OfflineModal() {
  const { t } = useTranslation();
  // const { colors } = useThemeStore();

  const [isOffline, setIsOffline] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const offlineTimeout = useRef<number | null>(null);

  useEffect(() => {
    const subscription = Network.addNetworkStateListener(state => {
      const disconnected = !state.isConnected;

      // Clear pending timer
      if (offlineTimeout.current !== null) {
        clearTimeout(offlineTimeout.current);
        offlineTimeout.current = null;
      }

      if (disconnected) {
        offlineTimeout.current = setTimeout(() => {
          setIsOffline(true);
          setIsVisible(true);
        }, 2000);
      } else {
        setIsOffline(false);
        setIsVisible(false);
      }
    });

    return () => {
      subscription.remove();
      if (offlineTimeout.current !== null) {
        clearTimeout(offlineTimeout.current);
      }
    };
  }, []);

  if (!isOffline || !isVisible) return null;

  return (
    <Modal transparent visible={isVisible} animationType="none" statusBarTranslucent>
      {/* Darkened backdrop for better glass contrast */}
      <Animated.View
        entering={FadeIn.duration(400)}
        exiting={FadeOut.duration(300)}
        className="flex-1 bg-black/10 justify-center items-center px-6"
      >
        <Animated.View
          // Reduced bounce: using standard duration instead of high-damping spring
          entering={SlideInDown.duration(600)}
          exiting={SlideOutDown.duration(400)}
          className="w-full max-w-sm overflow-hidden rounded-[32px] border border-muted shadow-2xl"
        >
          <BlurView
            intensity={Platform.OS === 'ios' ? 60 : 100}
            tint="light"
            className="p-8 bg-background/60"
          >
            {/* Close Button */}
            <Pressable
              onPress={() => setIsVisible(false)}
              className="absolute right-4 top-4 z-10 p-2 rounded-full bg-primary-500/10"
              hitSlop={20}
            >
              <X size={18} color="white" />
            </Pressable>

            <View className="items-center">
              {/* Soft Purple Icon Glow */}
              <View className="bg-primary-100 rounded-full p-6 mb-6 shadow-inner">
                <WifiOff size={36} strokeWidth={1.5} />
              </View>

              <View className="items-center mb-6">
                <Text className="text-2xl font-semibold text-foreground text-center mb-2">
                  {t('common.permissions.offline.title', 'Resting Offline')}
                </Text>
                <Text className="text-[15px] leading-5 text-muted-foreground text-center px-2">
                  {t(
                    'common.permissions.offline.message',
                    "The connection is taking a break. We'll refresh once you're back online."
                  )}
                </Text>
              </View>

              {/* Status Indicator */}
              <View className="flex-row items-center bg-white/40 border border-border/50 px-4 py-2 rounded-2xl">
                <View className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" />
                <Text className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
                  {t('common.permissions.offline.waiting', 'Searching for Network')}
                </Text>
              </View>
            </View>
          </BlurView>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}
