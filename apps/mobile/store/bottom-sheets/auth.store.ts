import { create } from 'zustand';
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';

type AuthBottomSheetState = {
  signInSheetRef: React.RefObject<BottomSheet | null>;
  signUpSheetRef: React.RefObject<BottomSheet | null>;
  forgotPwdRef: React.RefObject<BottomSheet | null>;
};

export const useAuthBottomSheetStore = create<AuthBottomSheetState>(() => {
  const signInSheetRef = React.createRef<BottomSheet | null>();
  const signUpSheetRef = React.createRef<BottomSheet | null>();
  const forgotPwdRef = React.createRef<BottomSheet | null>();

  return {
    signInSheetRef,
    signUpSheetRef,
    forgotPwdRef,
  };
});
