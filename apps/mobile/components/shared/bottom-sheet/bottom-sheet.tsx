import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';
import { BottomSheetViewConfig, DEFAULT_SHEET_CONFIG } from './sheet.types';

interface CBottomSheetProps extends Omit<BottomSheetModalProps, 'children'> {
  backdropConfig?: {
    pressBehavior?: 'none' | 'close' | 'collapse' | number;
    appearsOnIndex?: number;
    disappearsOnIndex?: number;
    enableTouchThrough?: boolean;
  };
  bottomSheetViewConfig?: BottomSheetViewConfig;
  children: React.ReactNode;
}

const CBottomSheet = forwardRef<BottomSheetModal, CBottomSheetProps>(
  ({ backdropConfig, bottomSheetViewConfig, children, ...config }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        {...DEFAULT_SHEET_CONFIG}
        {...config}
        backdropComponent={backdropProps => (
          <BottomSheetBackdrop
            {...backdropProps}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            enableTouchThrough={false}
            {...backdropConfig}
          />
        )}
        backgroundStyle={{
          backgroundColor: 'transparent',
        }}
        handleComponent={() => null}
      >
        <BottomSheetView
          {...bottomSheetViewConfig}
          className={cn('bg-card backdrop-blur-xl px-6 flex-1', bottomSheetViewConfig?.className)}
        >
          <View className="bg-card backdrop-blur-xl flex justify-center rounded-t-3xl py-4 border-t border-border/10">
            <View className="h-1.5 w-[60px] rounded-full bg-muted-foreground/30 self-center" />
          </View>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

CBottomSheet.displayName = 'CBottomSheet';

export default CBottomSheet;
