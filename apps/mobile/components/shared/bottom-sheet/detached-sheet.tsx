import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetViewConfig, DEFAULT_SHEET_CONFIG } from './sheet.types';

interface DetachedSheetProps extends Omit<BottomSheetModalProps, 'children'> {
  backdropConfig?: {
    pressBehavior?: 'none' | 'close' | 'collapse' | number;
    appearsOnIndex?: number;
    disappearsOnIndex?: number;
    enableTouchThrough?: boolean;
  };
  bottomSheetViewConfig?: BottomSheetViewConfig;
  contentClassName?: string;
  children: React.ReactNode;
  grabbable?: boolean;
}

const DetachedSheet = forwardRef<BottomSheetModal, DetachedSheetProps>(
  (
    {
      backdropConfig,
      bottomSheetViewConfig,
      children,
      grabbable = false,
      contentClassName,
      ...config
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    return (
      <BottomSheetModal
        ref={ref}
        bottomInset={insets.bottom}
        {...DEFAULT_SHEET_CONFIG}
        {...config}
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={false}
            pressBehavior="close"
            {...backdropConfig}
          />
        )}
        handleComponent={null}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        style={{
          marginHorizontal: 16,
        }}
      >
        <BottomSheetView
          {...bottomSheetViewConfig}
          className={cn(
            'bg-background rounded-3xl border-2 border-border',
            bottomSheetViewConfig?.className
          )}
        >
          {grabbable && (
            <View className="flex justify-center py-4">
              <View className="h-1.5 w-16 rounded-full bg-muted-foreground/30 self-center" />
            </View>
          )}
          <View className={cn('px-6 pb-6 flex-1 flex-col flex min-h-[350px]', contentClassName)}>
            {children}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

DetachedSheet.displayName = 'DetachedSheet';

export default DetachedSheet;
