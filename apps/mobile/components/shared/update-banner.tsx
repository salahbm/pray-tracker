import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import * as Updates from 'expo-updates';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';

import { Text } from '@/components/ui/text';
import { useThemeStore } from '@/store/defaults/theme';
import { useUpdateBannerStore } from '@/store/use-update-banner';
import { Download, X } from '@/components/shared/icons';
import { useTranslation } from 'react-i18next';

const UpdateBanner = () => {
  const { t } = useTranslation();
  const { colors } = useThemeStore();
  const { shouldCheck, shouldShow, setDismissed, setLastChecked } = useUpdateBannerStore();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    checkForOTAUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkForOTAUpdate = async () => {
    try {
      // Only check if enough time has passed
      if (!shouldCheck()) return;

      // Only show if not recently dismissed
      if (!shouldShow()) return;

      // Check for OTA updates via Expo Updates
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        setUpdateAvailable(true);
        setLastChecked();
      }
    } catch (error) {
      // Silently fail - don't show banner on error
      console.log('Failed to check for OTA updates:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true);

      // Fetch and apply the update
      await Updates.fetchUpdateAsync();

      // Reload the app to apply the update
      await Updates.reloadAsync();
    } catch (error) {
      console.error('Failed to apply OTA update:', error);
      setIsUpdating(false);
    }
  };

  const handleDismiss = () => {
    setUpdateAvailable(false);
    setDismissed();
  };

  if (!updateAvailable) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(200)}
      className="mt-2 mb-1 rounded-lg overflow-hidden"
      style={{
        backgroundColor: colors['--primary'],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}
    >
      <View className="flex-row items-center justify-between p-3">
        <View className="flex-1 flex-row items-center gap-3">
          <View className="rounded-full p-2 bg-primary-foreground/20">
            <Download size={20} color={colors['--primary-foreground']} />
          </View>

          <View className="flex-1">
            <Text
              className="font-semibold text-sm mb-0.5"
              style={{ color: colors['--primary-foreground'] }}
            >
              {t('common.updateBanner.title')}
            </Text>
            <Text
              className="text-xs opacity-90"
              style={{ color: colors['--primary-foreground'] }}
              numberOfLines={1}
            >
              {t('common.updateBanner.otaMessage')}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-2 ml-2">
          <TouchableOpacity
            onPress={handleUpdate}
            disabled={isUpdating}
            className="px-3 py-1.5 rounded-md"
            style={{ backgroundColor: colors['--primary-foreground'] }}
          >
            <Text className="text-xs font-semibold" style={{ color: colors['--primary'] }}>
              {isUpdating ? t('common.updateBanner.updating') : t('common.updateBanner.update')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDismiss} className="p-1">
            <X size={18} color={colors['--primary-foreground']} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default UpdateBanner;
