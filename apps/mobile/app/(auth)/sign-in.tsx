import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Keyboard, TouchableOpacity, View } from 'react-native';

import FormField from '@/components/shared/form-field';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useLoginUser } from '@/hooks/auth/useSignIn';
import { signInSchema, TSignInSchema } from '@/lib/validation/auth';

interface ISignIn {
  onSuccess: () => void;
  onNavigate: () => void;
  onForgotPassword: () => void;
}

export default function SignInScreen({ onSuccess, onNavigate, onForgotPassword }: ISignIn) {
  const { t } = useTranslation();
  // HOOKS and STATES
  const { mutateAsync: signIn, isPending } = useLoginUser();

  const form = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSignInPress = useCallback(
    async (data: TSignInSchema) => {
      Keyboard.dismiss();
      await signIn(data).then(() => {
        onSuccess();
      });
    },
    [signIn, onSuccess]
  );

  return (
    <React.Fragment>
      <View className="w-full mt-16">
        <Text className="text-3xl font-bold text-primary mb-12 text-center">
          {t('auth.signIn.title')}
        </Text>
        <FormField
          control={form.control}
          name="email"
          required
          label={t('auth.email.label')}
          className="mb-4"
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder={t('auth.email.placeholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              spellCheck={false}
              returnKeyType="next"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          required
          label={t('auth.password.label')}
          className="mb-10"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={t('auth.password.placeholder')}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(onSignInPress)}
            />
          )}
        />
        <Button className="mb-4" disabled={isPending} onPress={form.handleSubmit(onSignInPress)}>
          <Loader visible={isPending} size="small" />
          <Text className="font-bold">{t('auth.signIn.button')}</Text>
        </Button>
        {/* OAuth */}
        {/* <OAuth onSuccess={onSuccess} /> */}
      </View>

      <View className="flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('auth.signIn.noAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text className="font-primary">{t('auth.signIn.signUpLink')}</Text>
        </Button>
      </View>

      <View className="justify-center items-center">
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="font-primary underline text-sm">{t('auth.signIn.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
