import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { useRouter } from 'expo-router';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useResetPwd } from '@/hooks/auth/useForgotPwd';
import { fireToast } from '@/providers/toaster';
import { useAuthBottomSheetStore } from '@/store/bottom-sheets';

export default function ForgotPasswordScreen({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const {forgotPwdRef}=useAuthBottomSheetStore()

  const { mutateAsync, isPending } = useResetPwd();

  const onResetPassword = useCallback(async () => {
    await mutateAsync(email).then(() => {
      fireToast.success(t('auth.forgotPassword.message', { email }));
      setEmail('');
      Keyboard.dismiss()
      forgotPwdRef.current?.close()
    });
  }, [email, mutateAsync]);

  return (
    <React.Fragment>
      <View className="w-full mt-8">
        <Text className="text-3xl font-bold text-primary mb-6 text-center">
          {t('auth.forgotPassword.title')}
        </Text>
        <Input
          label={t('auth.email.label')}
          autoCapitalize="none"
          className="mb-10 p-3"
          value={email}
          placeholder={t('auth.email.placeholder')}
          keyboardType="email-address"
          onChangeText={setEmail}
          autoCorrect={false}
          textContentType="emailAddress"
          spellCheck={false}
        />
        <Button onPress={onResetPassword} disabled={isPending}>
          <Loader visible={isPending} size="small" />
          <Text className="font-bold">{t('auth.forgotPassword.button')}</Text>
        </Button>
      </View>

      <View className="mt-2 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('auth.forgotPassword.rememberedPassword')}
        </Text>
        <Button variant="link" onPress={onNavigate} disabled={isPending}>
          <Text className="font-primary">{t('auth.forgotPassword.signInLink')}</Text>
        </Button>
      </View>

      {/* Test button - Remove in production */}
      {__DEV__ && (
        <Button
          variant="outline"
          onPress={() => router.push('/reset-pwd?token=test-token-123')}
          className="mt-4"
        >
          <Text className="text-xs">🧪 Test Reset Screen</Text>
        </Button>
      )}
    </React.Fragment>
  );
}
