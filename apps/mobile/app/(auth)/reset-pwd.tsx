import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { fireToast } from '@/providers/toaster';
import { useAuthBottomSheetStore } from '@/store/bottom-sheets';
import { isTokenVisited, markTokenAsVisited } from '@/utils/deep-link-token';

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const [isValidating, setIsValidating] = useState(true);
  const { signInSheetRef } = useAuthBottomSheetStore();

  const { mutateAsync, isPending } = useResetPassword();

  useEffect(() => {
    const checkToken = async () => {
      try {
        if (!params.token || typeof params.token !== 'string') {
          // No token provided, redirect immediately
          router.replace('/(tabs)');
          return;
        }

        const tokenParam = params.token;

        // Check if this token has already been visited
        const visited = await isTokenVisited(tokenParam);

        if (visited) {
          // Token already used, redirect to home
          router.replace('/(tabs)');
          return;
        }

        // Mark this token as visited immediately to prevent re-navigation
        await markTokenAsVisited(tokenParam);

        // Token is valid and fresh, set it
        setToken(tokenParam);
        setIsValidating(false);
      } catch (error) {
        // On any error, redirect to home
        router.replace('/(tabs)');
      }
    };

    checkToken();
  }, [params.token, router]);

  const onResetPassword = useCallback(async () => {
    // Validation
    if (!token) {
      fireToast.error(t('auth.resetPassword.errors.invalidToken'));
      return;
    }

    if (newPassword.length < 8) {
      fireToast.error(t('auth.resetPassword.errors.minPasswordLength'));
      return;
    }

    if (newPassword !== confirmPassword) {
      fireToast.error(t('auth.resetPassword.errors.passwordMismatch'));
      return;
    }

    try {
      await mutateAsync({ token, newPassword });

      fireToast.success(t('auth.resetPassword.success'));
      setNewPassword('');
      setConfirmPassword('');
      Keyboard.dismiss();

      // Clear navigation history and navigate to home
      if (router.canGoBack()) {
        router.dismissAll();
      }
      router.replace('/(tabs)');

      // Open sign-in sheet after navigation
      setTimeout(() => {
        signInSheetRef.current?.snapToIndex(1);
      }, 500);
    } catch (error) {
      fireToast.error(t('auth.resetPassword.errors.failed'));
    }
  }, [token, newPassword, confirmPassword, mutateAsync, t, router, signInSheetRef]);

  // Show loader while validating token
  if (isValidating) {
    return (
      <View className="flex-1 bg-background justify-center items-center">
        <Loader visible={true} size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background p-6 justify-center">
      <View className="w-full">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          {t('auth.resetPassword.title')}
        </Text>
        <Text className="text-sm text-muted-foreground mb-6 text-center">
          {t('auth.resetPassword.subtitle')}
        </Text>

        <Input
          label={t('auth.resetPassword.fields.newPassword.label')}
          autoCapitalize="none"
          className="mb-4 p-3"
          value={newPassword}
          placeholder={t('auth.resetPassword.fields.newPassword.placeholder')}
          onChangeText={setNewPassword}
          secureTextEntry
          autoCorrect={false}
          textContentType="newPassword"
        />

        <Input
          label={t('auth.resetPassword.fields.confirmPassword.label')}
          autoCapitalize="none"
          className="mb-6 p-3"
          value={confirmPassword}
          placeholder={t('auth.resetPassword.fields.confirmPassword.placeholder')}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCorrect={false}
          textContentType="newPassword"
        />

        <Button onPress={onResetPassword} disabled={isPending || !token}>
          <Loader visible={isPending} size="small" />
          <Text className="font-bold">{t('auth.resetPassword.button')}</Text>
        </Button>
      </View>

      <View className="mt-6 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('auth.resetPassword.rememberedPassword')}
        </Text>
        <Button
          variant="link"
          onPress={() => {
            if (router.canGoBack()) {
              router.dismissAll();
            }
            router.replace('/(tabs)');
            setTimeout(() => {
              signInSheetRef.current?.snapToIndex(1);
            }, 500);
          }}
          disabled={isPending}
        >
          <Text className="font-primary">{t('auth.resetPassword.signInLink')}</Text>
        </Button>
      </View>

      <Button
        variant="link"
        onPress={() => {
          if (router.canGoBack()) {
            router.dismissAll();
          }
          router.replace('/(tabs)');
        }}
        disabled={isPending}
      >
        <Text className="font-primary">{t('auth.resetPassword.goBackHome')}</Text>
      </Button>
    </View>
  );
}
