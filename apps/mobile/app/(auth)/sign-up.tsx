import { zodResolver } from '@hookform/resolvers/zod';
import React, { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Image, Modal, TouchableOpacity, View } from 'react-native';

import FormField from '@/components/shared/form-field';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { IMAGES } from '@/constants/images';
import { useSignUp } from '@/hooks/auth/useSignUp';
import { signUpSchema, TSignUpSchema } from '@/lib/validation/auth';

interface ISignUp {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUp) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSignUp();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
    },
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /** Handles sign-up with Better Auth */
  const onSignUpPress = async () => {
    await mutateAsync(form.getValues()).then(() => {
      onSuccess();
      setShowSuccessModal(true);
      form.reset();
    });
  };

  return (
    <Fragment>
      <View className="w-full mt-16">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          {t('auth.signUp.title')}
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          {t('auth.signUp.subtitle')}
        </Text>

        <FormField
          control={form.control}
          name="name"
          required
          label={t('auth.username.label')}
          className="mb-4"
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder={t('auth.username.placeholder')}
              onSubmitEditing={() => form.setFocus('email')}
              returnKeyType="next"
            />
          )}
        />

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
              onSubmitEditing={() => form.setFocus('password')}
            />
          )}
        />

        <FormField
          control={form.control}
          name="password"
          required
          label={t('auth.password.label')}
          className="mb-10"
          render={({ field, fieldState }) => (
            <Input
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.error?.message}
              placeholder={t('auth.password.placeholder')}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={form.handleSubmit(onSignUpPress)}
            />
          )}
        />

        <Button onPress={form.handleSubmit(onSignUpPress)} disabled={isPending}>
          <Loader visible={isPending} size="small" />
          <Text>{t('auth.signUp.button')}</Text>
        </Button>
      </View>

      <View className="mt-2 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('auth.signUp.hasAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>{t('auth.signUp.signInLink')}</Text>
        </Button>

        {/* ✅ SUCCESS MODAL */}
        <Modal
          visible={showSuccessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowSuccessModal(false)}
          onDismiss={() => setShowSuccessModal(false)}
          statusBarTranslucent
        >
          <View className="    flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
            <TouchableOpacity
              className="absolute top-0 left-0 right-0 bottom-0 z-1 "
              activeOpacity={1}
              onPress={() => setShowSuccessModal(false)}
            />
            <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px] max-h-screen-safe w-[95%] mx-auto">
              <Image source={IMAGES.check} className="w-20 h-20 mx-auto my-5" />
              <Text className="text-3xl font-bold text-center">
                {t('auth.signUp.success.title')}
              </Text>
              <Text className="text-base text-muted-foreground text-center mt-2">
                {t('auth.signUp.success.message')}
              </Text>
              <Button onPress={() => setShowSuccessModal(false)} className="mt-5">
                <Text>{t('auth.signUp.success.button')}</Text>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    </Fragment>
  );
}
