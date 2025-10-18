import React, { Fragment, useState } from 'react';
import { Image, View, Modal } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import Loader from '@/components/shared/loader';
import { IMAGES } from '@/constants/images';
import { useSignUp } from '@/hooks/auth/useSignUp';

interface ISignUp {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUp) {
  const { t } = useTranslation();
  const { mutateAsync, isPending } = useSignUp();

  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  /** Handles sign-up with Better Auth */
  const onSignUpPress = async () =>
    await mutateAsync({
      email: form.email.trim(),
      password: form.password.trim(),
      name: form.name.trim(),
    }).then(() => setShowSuccessModal(true));

  return (
    <Fragment>
      <View className="w-full mt-16">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          {t('Auth.SignUp.Title')}
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          {t('Auth.SignUp.Subtitle')}
        </Text>

        <Input
          label={t('Auth.Username.Label')}
          className="mb-4"
          value={form.name}
          placeholder={t('Auth.Username.Placeholder')}
          onChangeText={name => setForm({ ...form, name })}
        />

        <Input
          label={t('Auth.Email.Label')}
          value={form.email}
          onChangeText={email => setForm({ ...form, email })}
          autoCapitalize="none"
          className="mb-4 p-3"
          placeholder={t('Auth.Email.Placeholder')}
          keyboardType="email-address"
          autoCorrect={false}
          spellCheck={false}
        />

        <Input
          label={t('Auth.Password.Label')}
          className="mb-10"
          value={form.password}
          placeholder={t('Auth.Password.Placeholder')}
          secureTextEntry
          onChangeText={password => setForm({ ...form, password })}
        />

        <Button onPress={onSignUpPress} disabled={isPending}>
          <Loader visible={isPending} size="small" />
          <Text>{t('Auth.SignUp.Button')}</Text>
        </Button>
      </View>

      <View className="mt-2 flex flex-row justify-center items-center">
        <Text className="text-sm text-muted-foreground text-center">
          {t('Auth.SignUp.HasAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>{t('Auth.SignUp.SignInLink')}</Text>
        </Button>
      </View>

      {/* ✅ SUCCESS MODAL */}
      <Modal visible={showSuccessModal} onDismiss={() => setShowSuccessModal(false)}>
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image source={IMAGES.check} className="w-20 h-20 mx-auto my-5" />
          <Text className="text-3xl font-bold text-center">{t('Auth.SignUp.Success.Title')}</Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            {t('Auth.SignUp.Success.Message')}
          </Text>
          <Button
            onPress={() => {
              setShowSuccessModal(false);
              onSuccess();
            }}
            className="mt-5"
          >
            <Text>{t('Auth.SignUp.Success.Button')}</Text>
          </Button>
        </View>
      </Modal>
    </Fragment>
  );
}
