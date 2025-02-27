import { User } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { userKeys } from '@/constants/query-keys';
import { useResetPwd } from '@/hooks/auth/useForgotPwd';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { supabase } from '@/lib/supabase';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';
import { ApiError } from '@/utils/error';
import { MessageCodes, StatusCode } from '@/utils/status';

export default function ForgotPasswordScreen({
  onNavigate,
  onSuccess,
}: {
  onNavigate: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { colors } = useThemeStore();
  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { verifyRequest, sendRequest, isRequestPending, isVerifyPending } =
    useResetPwd();
  const { refetch } = useGetUser(supabaseUser?.id);

  const onResetPassword = useCallback(async () => {
    await sendRequest.mutateAsync(email);
    setShowOtpModal(true);
  }, [email, sendRequest]);

  const fetchUserData = useCallback(async () => {
    if (!supabaseUser?.id) return;

    const { data } = await refetch();
    if (!data) {
      throw new ApiError({
        message: 'User not found',
        status: StatusCode.NOT_FOUND,
        code: MessageCodes.USER_NOT_FOUND,
      });
    }
    setShowOtpModal(false);
    setTimeout(() => {
      setSuccessModal(true);
    }, 150);
    setUser(data);
    queryClient.invalidateQueries(userKeys);
    setEmail('');
    setToken('');
  }, [refetch, setUser, queryClient, supabaseUser]);

  useEffect(() => {
    if (supabaseUser) {
      fetchUserData();
    }
  }, [supabaseUser, fetchUserData]);

  const handlePressVerify = useCallback(async () => {
    try {
      const { session, user } = await verifyRequest.mutateAsync({
        email,
        token,
      });
      if (!session || !user) throw new Error('Failed to verify OTP.');

      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });

      setSupabaseUser(user);
    } catch (error) {
      fireToast.error(error.message);
    }
  }, [email, token, verifyRequest]);

  return (
    <React.Fragment>
      <View className="w-full max-w-md mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          Reset Password
        </Text>
        <Input
          label="Email"
          autoCapitalize="none"
          className="mb-4 p-3"
          value={email}
          placeholder="Enter your email"
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCorrect={false}
          textContentType="emailAddress"
          spellCheck={false}
        />
        <Button
          className="mb-4"
          onPress={onResetPassword}
          disabled={isRequestPending || isVerifyPending}
        >
          <Loader visible={isRequestPending} size="small" />
          <Text className="font-bold">Send Verification</Text>
        </Button>
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          Remembered your password?
        </Text>
        <Button
          variant="link"
          onPress={onNavigate}
          disabled={isRequestPending || isVerifyPending}
        >
          <Text className="font-primary">Sign In</Text>
        </Button>
      </View>

      {/* VERIFICATION MODAL */}
      <Modal isVisible={showOtpModal}>
        <View className="bg-muted px-7 py-14 rounded-2xl relative border border-border">
          <Button
            className="absolute top-2 right-0"
            variant="ghost"
            disabled={isRequestPending || isVerifyPending}
            onPress={() => setShowOtpModal(false)}
          >
            <X size={24} color={colors['--muted-foreground']} />
          </Button>
          <Text className="text-2xl font-bold mb-2">Verification</Text>
          <Text className=" mb-5">
            We&apos;ve sent a verification code to {email}.
          </Text>
          <Input
            placeholder="Enter Code"
            value={token}
            keyboardType="numeric"
            onChangeText={setToken}
          />

          <Button
            onPress={handlePressVerify}
            className="mt-5"
            disabled={isRequestPending || isVerifyPending}
          >
            <Loader visible={isVerifyPending} size="small" />
            <Text>Verify Email</Text>
          </Button>
        </View>
      </Modal>

      {/* PWD RESET SUCCESS MODAL */}
      <Modal isVisible={successModal}>
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={IMAGES.check}
            className="w-[80px] h-[80px] mx-auto my-5"
          />
          <Text className="text-3xl font-bold text-center">Verified</Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            You have successfully verified your account.
          </Text>
          <Button
            onPress={() => {
              setSuccessModal(false);
              onSuccess();
              router.push('/(screens)/profile/edit-pwd');
            }}
            className="mt-5"
          >
            <Text>Update Password</Text>
          </Button>
        </View>
      </Modal>
    </React.Fragment>
  );
}
