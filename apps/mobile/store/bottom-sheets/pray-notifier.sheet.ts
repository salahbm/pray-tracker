import { create } from 'zustand';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';

type PrayNotifierBottomSheetState = {
  sheetRef: React.RefObject<BottomSheet | null>;
  open: () => void;
  close: () => void;
};

export const usePrayNotifierBottomSheetStore = create<PrayNotifierBottomSheetState>(() => {
  const ref = React.createRef<BottomSheet | null>();

  return {
    sheetRef: ref,
    open: () => ref.current?.snapToIndex(0),
    close: () => ref.current?.close(),
  };
});
