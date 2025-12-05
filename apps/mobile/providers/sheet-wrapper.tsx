import React, { Fragment, useCallback } from 'react';
import CustomBottomSheet from '@/components/shared/bottom-sheet';
import ProfilePage from '@/app/(screens)/profile';
import {
  useAuthBottomSheetStore,
  usePaywallBottomSheetStore,
  useProfileBottomSheetStore,
} from '@/store/bottom-sheets';
import { useFriendsBottomSheetStore } from '@/store/bottom-sheets/friends.store';
import SignInScreen from '@/app/(auth)/sign-in';
import SignUpScreen from '@/app/(auth)/sign-up';
import ForgotPasswordScreen from '@/app/(auth)/forgot-pwd';
import { triggerHaptic } from '@/utils/haptics';
import CreateGroupSheet from '@/components/views/friends/groups/create-group-sheet';
import EditGroupSheet from '@/components/views/friends/groups/edit-group-sheet';
import DeleteGroupSheet from '@/components/views/friends/groups/delete-group-sheet';
import PrayerNotifierSheet from '@/components/views/qibla/pray-notifier-sheet';
import PaywallScreen from '@/app/(screens)/subscription/paywall';
import { useOnboarding } from '@/store/defaults/onboarding';

interface ISheetWrapperProps {}

const SheetWrapper: React.FC<ISheetWrapperProps> = props => {
  const { profileSheetRef } = useProfileBottomSheetStore();
  const {visited}=useOnboarding()
  const { signInSheetRef, signUpSheetRef, forgotPwdRef } = useAuthBottomSheetStore();
  const { createSheetRef, editSheetRef, deleteSheetRef } = useFriendsBottomSheetStore();
  const { paywallSheetRef } = usePaywallBottomSheetStore();

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
        <ForgotPasswordScreen onNavigate={handlePresentSignIn} />
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

      {/* PAYWALL SHEET */}
{visited &&      <CustomBottomSheet sheetRef={paywallSheetRef} index={0} snapPoints={['90%', '100%']}>
        <PaywallScreen />
      </CustomBottomSheet>}
    </Fragment>
  );
};

export default SheetWrapper;
