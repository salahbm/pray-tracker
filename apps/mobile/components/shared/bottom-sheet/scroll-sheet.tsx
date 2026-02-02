import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';

import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { cn } from '@/lib/utils';
import { DEFAULT_SHEET_CONFIG, ScrollBottomSheetProps } from './sheet.types';

const ScrollBottomSheet = forwardRef<BottomSheetModal, ScrollBottomSheetProps>(
  ({ backdropConfig, scrollConfig, children, ...config }, ref) => {
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
        <BottomSheetScrollView
          {...scrollConfig}
          className={cn('bg-muted backdrop-blur-xl px-6 flex-1', scrollConfig?.className)}
        >
          <View className="bg-muted backdrop-blur-xl flex justify-center rounded-t-3xl py-4 border-t border-border/10">
            <View className="h-1.5 w-[60px] rounded-full bg-muted-foreground/30 self-center" />
          </View>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

ScrollBottomSheet.displayName = 'ScrollBottomSheet';

export default ScrollBottomSheet;
