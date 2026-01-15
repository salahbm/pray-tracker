import { Text } from '@/components/ui/text';
import { useAlertStore } from '@/store/defaults/use-alert-store';
import { BlurView } from 'expo-blur';
import { AlertCircle } from '@/components/shared/icons';
import React from 'react';
import { Modal, Platform, Pressable, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn, ZoomOut } from 'react-native-reanimated';

export function GlobalAlert() {
  const { visible, options, hideAlert } = useAlertStore();

  if (!visible || !options) return null;

  const handleConfirm = async () => {
    if (!options.onConfirm) {
      hideAlert();
      return;
    }

    const result = options.onConfirm();

    if (result instanceof Promise) {
      await result;
    }

    hideAlert();
  };

  const handleCancel = () => {
    options.onCancel?.();
    hideAlert();
  };

  return (
    <Modal transparent visible={visible} animationType="none" statusBarTranslucent>
      <View className="flex-1 justify-center items-center px-10">
        {/* Simple fade for the backdrop */}
        <Animated.View
          entering={FadeIn.duration(120)}
          exiting={FadeOut.duration(150)}
          className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
        />

        {/* Modal content with linear-style Zoom for a "system" feel */}
        <Animated.View
          entering={ZoomIn.duration(250)}
          exiting={ZoomOut.duration(200)}
          className="w-full max-w-sm overflow-hidden rounded-2xl border border-border shadow-2xl"
        >
          <BlurView
            intensity={Platform.OS === 'ios' ? 45 : 80}
            tint="light"
            className="p-7 bg-white"
          >
            <View className="items-center py-4 px-2">
              {/* Creative Icon Housing */}
              <View className="w-14 h-14 bg-primary/70 rounded-full items-center justify-center mb-5 aspect-square">
                {options.icon || (
                  <AlertCircle className="size-12 text-primary-foreground stroke-2" />
                )}
              </View>

              <Text className="text-xl font-semibold text-foreground text-center mb-2 mt-5 tracking-tight">
                {options.title}
              </Text>

              {options.subtitle && (
                <Text className="text-[15px] text-muted-foreground text-center leading-5 px-1 mb-8">
                  {options.subtitle}
                </Text>
              )}
            </View>

            {/* Actions: Clean hierarchy */}
            <View className="flex-row gap-3 pb-5">
              {options.cancelLabel !== null && (
                <Pressable
                  onPress={handleCancel}
                  className="flex-1 h-12 items-center justify-center rounded-2xl  active:bg-black/10"
                >
                  <Text className="font-caption text-primary">
                    {options.cancelLabel || 'Cancel'}
                  </Text>
                </Pressable>
              )}

              <Pressable
                onPress={handleConfirm}
                className="flex-1 h-12 items-center justify-center rounded-lg bg-primary active:bg-primary shadow-sm"
              >
                <Text className="text-sm font-semibold text-primary-foreground">
                  {options.confirmLabel || 'Confirm'}
                </Text>
              </Pressable>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </Modal>
  );
}
