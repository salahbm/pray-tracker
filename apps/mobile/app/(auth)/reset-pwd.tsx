import React, { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useResetPassword } from '@/hooks/auth/useResetPassword';
import { fireToast } from '@/providers/toaster';
import { useAuthBottomSheetStore } from '@/store/bottom-sheets';

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState<string>('');
  const { signInSheetRef } = useAuthBottomSheetStore();

  const { mutateAsync, isPending } = useResetPassword();

  useEffect(() => {
    const checkToken = async () => {
      if (params.token && typeof params.token === 'string') {
        // Check if this token has already been visited
        const visitedTokenData = await AsyncStorage.getItem(`reset_token_visited_${params.token}`);

        if (visitedTokenData) {
          try {
            const parsed = JSON.parse(visitedTokenData);
            const hoursSinceVisited = (Date.now() - parsed.timestamp) / (1000 * 60 * 60);

            // If token was visited less than 24 hours ago, redirect to home
            if (hoursSinceVisited < 24) {
              router.replace('/(tabs)');
              return;
            } else {
              // Clean up old token data
              await AsyncStorage.removeItem(`reset_token_visited_${params.token}`);
            }
          } catch {
            // If parsing fails, assume token is visited
            router.replace('/(tabs)');
            return;
          }
        }

        // Mark this token as visited immediately to prevent re-navigation
        const visitedData = JSON.stringify({
          visited: true,
          timestamp: Date.now(),
        });
        await AsyncStorage.setItem(`reset_token_visited_${params.token}`, visitedData);

        setToken(params.token);
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

      // Clear the token to prevent re-navigation
      setToken('');

      // Navigate to tabs and open sign-in sheet after a short delay
      setTimeout(() => {
        router.replace('/(tabs)');
        setTimeout(() => {
          signInSheetRef.current?.snapToIndex(1);
        }, 300);
      }, 1000);
    } catch (error) {
      fireToast.error(t('auth.resetPassword.errors.failed'));
    }
  }, [token, newPassword, confirmPassword, mutateAsync, t, router, signInSheetRef]);

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

        {!token && (
          <Text className="text-sm text-destructive mt-4 text-center">
            {t('auth.resetPassword.errors.invalidToken')}
          </Text>
        )}
      </View>

      <View className="mt-6 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('auth.resetPassword.rememberedPassword')}
        </Text>
        <Button
          variant="link"
          onPress={() => {
            setToken('');
            router.replace('/(tabs)');
            setTimeout(() => {
              signInSheetRef.current?.snapToIndex(1);
            }, 300);
          }}
          disabled={isPending}
        >
          <Text className="font-primary">{t('auth.resetPassword.signInLink')}</Text>
        </Button>
      </View>

      <Button
        variant="link"
        onPress={() => {
          setToken('');
          router.replace('/(tabs)');
        }}
        disabled={isPending}
      >
        <Text className="font-primary">{t('auth.resetPassword.goBackHome')}</Text>
      </Button>
    </View>
  );
}
