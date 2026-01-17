import { create } from 'zustand';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React from 'react';

type PrayNotifierBottomSheetState = {
  ref: React.RefObject<BottomSheetModal | null>;
  open: () => void;
  close: () => void;
};

export const usePrayNotifierBottomSheetStore = create<PrayNotifierBottomSheetState>(() => {
  const ref = React.createRef<BottomSheetModal | null>();

  return {
    ref,
    open: () => ref.current?.present(),
    close: () => ref.current?.dismiss(),
  };
});
