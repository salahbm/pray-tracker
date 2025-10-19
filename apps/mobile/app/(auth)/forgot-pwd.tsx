import { useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { X } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { userKeys } from '@/constants/query-keys';
import { useResetPwd } from '@/hooks/auth/useForgotPwd';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { useThemeStore } from '@/store/defaults/theme';

export default function ForgotPasswordScreen({
  onNavigate,
  onSuccess,
}: {
  onNavigate: () => void;
  onSuccess: () => void;
}) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const { colors } = useThemeStore();
  const queryClient = useQueryClient();
  const { setUser, setSession } = useAuthStore();
  const { verifyRequest, sendRequest, isRequestPending, isVerifyPending } = useResetPwd();

  const onResetPassword = useCallback(async () => {
    await sendRequest.mutateAsync(email);
    setShowOtpModal(true);
  }, [email, sendRequest]);

  const handlePressVerify = useCallback(async () => {
 
  }, []);

  return (
    <React.Fragment>
      <View className="w-full mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          {t('Auth.ForgotPassword.Title')}
        </Text>
        <Input
          label={t('Auth.Email.Label')}
          autoCapitalize="none"
          className="mb-4 p-3"
          value={email}
          placeholder={t('Auth.Email.Placeholder')}
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
          <Text className="font-bold">{t('Auth.ForgotPassword.Button')}</Text>
        </Button>
      </View>

      <View className="mt-8 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('Auth.ForgotPassword.RememberedPassword')}
        </Text>
        <Button variant="link" onPress={onNavigate} disabled={isRequestPending || isVerifyPending}>
          <Text className="font-primary">{t('Auth.ForgotPassword.SignInLink')}</Text>
        </Button>
      </View>

      {/* VERIFICATION MODAL */}
      {/* <Modal isVisible={showOtpModal}>
        <View className="bg-muted px-7 py-14 rounded-2xl relative border border-border">
          <Button
            className="absolute top-2 right-0"
            variant="ghost"
            disabled={isRequestPending || isVerifyPending}
            onPress={() => setShowOtpModal(false)}
          >
            <X size={24} color={colors['--muted-foreground']} />
          </Button>
          <Text className="text-2xl font-bold mb-2">
            {t('Auth.ForgotPassword.Verification.Title')}
          </Text>
          <Text className=" mb-5">{t('Auth.ForgotPassword.Verification.Message', { email })}</Text>
          <Input
            placeholder={t('Auth.ForgotPassword.Verification.Placeholder')}
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
            <Text>{t('Auth.ForgotPassword.Verification.Button')}</Text>
          </Button>
        </View>
      </Modal> */}

      {/* PWD RESET SUCCESS MODAL */}
      {/* <Modal isVisible={successModal}>
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image source={IMAGES.check} className="w-20 h-20 mx-auto my-5 max-w-20 max-h-20" />
          <Text className="text-3xl font-bold text-center">
            {t('Auth.ForgotPassword.Success.Title')}
          </Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            {t('Auth.ForgotPassword.Success.Message')}
          </Text>
          <Button
            onPress={() => {
              setSuccessModal(false);
              onSuccess();
              router.push('/(screens)/profile/edit-pwd');
            }}
            className="mt-5"
          >
            <Text>{t('Auth.ForgotPassword.Success.Button')}</Text>
          </Button>
        </View>
      </Modal> */}
    </React.Fragment>
  );
}
