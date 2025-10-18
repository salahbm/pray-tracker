import { create } from 'zustand';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';

type ProfileBottomSheetState = {
  profileSheetRef: React.RefObject<BottomSheet | null>;
  open: () => void;
  close: () => void;
};

export const useProfileBottomSheetStore = create<ProfileBottomSheetState>(set => {
  const ref = React.createRef<BottomSheet | null>(null);

  return {
    profileSheetRef: ref,
    open: () => ref.current?.expand(),
    close: () => ref.current?.close(),
  };
});
