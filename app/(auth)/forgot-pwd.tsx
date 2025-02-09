import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { X } from 'lucide-react-native';
import { useState, useCallback, useEffect } from 'react';
import { Image, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { userKeys } from '@/constants/query-keys';
import { useResetPwd } from '@/hooks/auth/useForgotPwd';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth/auth-session';

export default function ForgotPasswordScreen({
  onNavigate,
}: {
  onNavigate: () => void;
}) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [supabaseUser, setSupabaseUser] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const queryClient = useQueryClient();
  const { setUser } = useAuthStore();
  const { verifyRequest, sendRequest, isRequestPending, isVerifyPending } =
    useResetPwd();
  const { data, refetch } = useGetUser(supabaseUser?.id);

  useEffect(() => {
    if (supabaseUser?.id) {
      refetch();
    }
  }, [supabaseUser?.id, refetch]);

  const onResetPassword = useCallback(async () => {
    await sendRequest.mutateAsync(email);
    setShowOtpModal(true);
  }, [email, sendRequest]);

  const handlePressVerify = useCallback(async () => {
    const { session, user } = await verifyRequest.mutateAsync({ email, token });
    if (!session || !user) return;

    await SecureStore.setItemAsync('access_token', session.access_token);
    await SecureStore.setItemAsync('refresh_token', session.refresh_token);

    await supabase.auth.setSession({
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    });

    setSupabaseUser(user);

    setUser(data);
    queryClient.invalidateQueries(userKeys);

    setShowSuccessModal(true);
    setEmail('');
    setToken('');
    setShowOtpModal(false);
  }, [email, token, verifyRequest, queryClient, setUser, data]);

  return (
    <>
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
      <ReactNativeModal
        isVisible={showOtpModal}
        backdropOpacity={0.4}
        avoidKeyboard
      >
        <View className="bg-muted px-7 py-14 rounded-2xl relative border border-border">
          <Button
            className="absolute top-2 right-0"
            variant="ghost"
            disabled={isRequestPending || isVerifyPending}
            onPress={() => setShowOtpModal(false)}
          >
            <X size={24} className="fill-white" />
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
            <Text>Verify Email</Text>
          </Button>
        </View>
      </ReactNativeModal>

      {/* SUCCESS MODAL */}
      <ReactNativeModal
        isVisible={showSuccessModal}
        onBackdropPress={() => {
          setShowSuccessModal(false);
          router.push('/(screens)/profile/edit-pwd');
        }}
      >
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={IMAGES.check}
            className="w-[110px] h-[110px] mx-auto my-5"
          />
          <Text className="text-3xl font-bold text-center">Verified</Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            You have successfully verified your account.
          </Text>
          <Button
            onPress={() => {
              setShowSuccessModal(false);
              router.push('/(screens)/profile/edit-pwd');
            }}
            className="mt-5"
          >
            <Text>Update Password</Text>
          </Button>
        </View>
      </ReactNativeModal>
    </>
  );
}
