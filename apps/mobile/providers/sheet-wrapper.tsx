import React, { Fragment, useCallback, useState } from 'react';
import { View } from 'react-native';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import ProfilePage from '@/app/(screens)/profile';
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { useAuthBottomSheetStore, useProfileBottomSheetStore } from '@/store/bottom-sheets';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import SignInScreen from '@/app/(auth)/sign-in';
import SignUpScreen from '@/app/(auth)/sign-up';
import ForgotPasswordScreen from '@/app/(auth)/forgot-pwd';
import { triggerHaptic } from '@/utils/haptics';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { FolderPlus, Edit2, Trash2 } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import { useThemeStore } from '@/store/defaults/theme';
import { useCreateGroup } from '@/hooks/friends/group/useCreateGroup';
import { useUpdateGroup } from '@/hooks/friends/group/useUpdateGroup';
import { useDeleteGroup } from '@/hooks/friends/group/useDeleteGroup';
import { useAuthStore } from '@/store/auth/auth-session';
import { cn } from '@/lib/utils';
import CreateGroupSheet from '@/components/views/friends/groups/create-group-sheet';
import EditGroupSheet from '@/components/views/friends/groups/edit-group-sheet';
import DeleteGroupSheet from '@/components/views/friends/groups/delete-group-sheet';
import PrayerNotifierSheet from '@/components/views/qibla/pray-notifier-sheet';

interface ISheetWrapperProps {}

const SheetWrapper: React.FC<ISheetWrapperProps> = props => {
  const { profileSheetRef } = useProfileBottomSheetStore();
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();
  const { createSheetRef, editSheetRef, deleteSheetRef } = useFriendsBottomSheetStore();

  // Callbacks to present each sheet
  const handlePresentSignIn = useCallback(async () => {
    await triggerHaptic();
    forgotPwdRef.current?.close();
    signUpSheetRef.current?.close();
    signInSheetRef.current?.snapToIndex(1);
  }, []);

  const handlePresentSignUp = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    signUpSheetRef.current?.snapToIndex(1);
  }, []);

  const handlePresentForgotPwd = useCallback(async () => {
    await triggerHaptic();
    signInSheetRef.current?.close();
    forgotPwdRef.current?.snapToIndex(1);
  }, []);

  return (
    <Fragment>
      {/* BOTTOM SHEET */}
      <CustomBottomSheet sheetRef={signInSheetRef}>
        <SignInScreen
          onSuccess={() => signInSheetRef.current?.close()}
          onNavigate={handlePresentSignUp}
          onForgotPassword={handlePresentForgotPwd}
        />
      </CustomBottomSheet>
      {/* SIGN UP SHEET */}
      <CustomBottomSheet sheetRef={signUpSheetRef}>
        <SignUpScreen
          onSuccess={() => signUpSheetRef.current?.close()}
          onNavigate={handlePresentSignIn}
        />
      </CustomBottomSheet>
      {/* FORGOT  PASSWORD  SHEET */}
      <CustomBottomSheet sheetRef={forgotPwdRef}>
        <ForgotPasswordScreen
          onNavigate={handlePresentSignIn}
          onSuccess={() => forgotPwdRef.current?.close()}
        />
      </CustomBottomSheet>
      {/* PROFILE */}
      <CustomBottomSheet sheetRef={profileSheetRef}>
        <ProfilePage />
      </CustomBottomSheet>

      {/* GROUPS */}
      <CreateGroupSheet sheetRef={createSheetRef} />
      <EditGroupSheet sheetRef={editSheetRef} />
      <DeleteGroupSheet sheetRef={deleteSheetRef} />

      {/* PRAY NOTIFIER */}
      <PrayerNotifierSheet />
    </Fragment>
  );
};

export default SheetWrapper;
