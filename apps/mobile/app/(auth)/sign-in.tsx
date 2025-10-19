import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity, View } from 'react-native';

import Loader from '@/components/shared/loader';
import { Text } from '@/components/ui/text';
import { useLoginUser } from '@/hooks/auth/useSignIn';
import { signInSchema, TSignInSchema } from '@/app/(auth)/schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormField from '@/components/shared/form-field';

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
    async (data: TSignInSchema) =>
      await signIn(data).then(() => {
        onSuccess();
      }),
    [signIn, onSuccess]
  );

  return (
    <React.Fragment>
      <View className="w-full mt-16">
        <Text className="text-3xl font-bold text-primary mb-12 text-center">
          {t('Auth.SignIn.Title')}
        </Text>
        <FormField
          control={form.control}
          name="email"
          required
          label={t('Auth.Email.Label')}
          className="mb-4"
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder={t('Auth.Email.Placeholder')}
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
          label={t('Auth.Password.Label')}
          className="mb-10"
          render={({ field }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder={t('Auth.Password.Placeholder')}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(onSignInPress)}
            />
          )}
        />
        <Button
          className="mb-4 mt-8"
          disabled={isPending}
          onPress={form.handleSubmit(onSignInPress)}
        >
          <Loader visible={isPending} size="small" />
          <Text className="font-bold">{t('Auth.SignIn.Button')}</Text>
        </Button>
        {/* OAuth */}
        {/* <OAuth onSuccess={onSuccess} /> */}
      </View>

      <View className="flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('Auth.SignIn.NoAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text className="font-primary">{t('Auth.SignIn.SignUpLink')}</Text>
        </Button>
      </View>

      <View className="justify-center items-center">
        <TouchableOpacity onPress={onForgotPassword}>
          <Text className="font-primary underline text-sm">{t('Auth.SignIn.ForgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
