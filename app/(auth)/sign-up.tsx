import { User } from '@supabase/supabase-js';
import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';

import { X } from '@/components/shared/icons';
import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { usePostUser } from '@/hooks/auth/usePostUser';
import { useThemeStore } from '@/store/defaults/theme';
import { Button } from 'components/ui/button';
import { Input } from 'components/ui/input';
import { Text } from 'components/ui/text';
import { IMAGES } from 'constants/images';

interface ISignUp {
  onSuccess: () => void;
  onNavigate: () => void;
}

export default function SignUpScreen({ onSuccess, onNavigate }: ISignUp) {
  const { t } = useTranslation();
  const {
    supabaseSignUp,
    onPressVerify,
    postUser,
    isPostUserSuccess,
    isPendingSupabaseSignUp,
    isPendingOnPressVerify,
    isPendingPostUser,
  } = usePostUser();
  const { colors } = useThemeStore();
  const [form, setForm] = React.useState({
    email: '',
    username: '',
    password: '',
    token: '',
  });
  const [data, setData] = React.useState<User | null>(null);
  const [showSuccessModal, setShowSuccessModal] =
    React.useState(isPostUserSuccess);
  const [showOtpModal, setShowOtpModal] = React.useState(false);

  // Handle sign-up process
  const onSignUpPress = async () => {
    await supabaseSignUp(form);
    setShowOtpModal(true);
  };

  const handlePostUser = useCallback(async () => {
    const payload = {
      email: form.email,
      password: form.password,
      username: form.username,
      supabaseId: data.id,
    };

    await postUser(payload);

    setShowOtpModal(false);
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 150);

    // Clear input fields
    setData(null);
    setForm({
      email: '',
      username: '',
      password: '',
      token: '',
    });
  }, [data, form, postUser, setShowOtpModal, setShowSuccessModal]);

  // Handle email verification
  const handlePressVerify = async () => {
    const res = await onPressVerify(form);

    if (res) {
      setData(res.user);
    }
  };

  useEffect(() => {
    if (data) {
      handlePostUser();
    }
  }, [data, handlePostUser]);

  return (
    <React.Fragment>
      <View className="w-full max-w-md mt-8">
        <Text className="text-3xl font-bold text-primary mb-2 text-center">
          {t('Auth.SignUp.Title')}
        </Text>
        <Text className="text-sm text-muted-foreground text-center mb-6">
          {t('Auth.SignUp.Subtitle')}
        </Text>

        <Input
          label={t('Auth.Email.Label')}
          value={form.email}
          onChangeText={(email) => setForm({ ...form, email })}
          autoCapitalize="none"
          className="mb-4 p-3"
          placeholder={t('Auth.Email.Placeholder')}
          keyboardType="email-address"
          autoCorrect={false}
          spellCheck={false}
        />

        <Input
          label={t('Auth.Username.Label')}
          className="mb-4"
          value={form.username}
          placeholder={t('Auth.Username.Placeholder')}
          onChangeText={(username) => setForm({ ...form, username })}
        />

        <Input
          label={t('Auth.Password.Label')}
          className="mb-10"
          value={form.password}
          placeholder={t('Auth.Password.Placeholder')}
          secureTextEntry
          onChangeText={(password) => setForm({ ...form, password })}
        />

        <Button onPress={onSignUpPress} disabled={isPendingSupabaseSignUp}>
          <Loader visible={isPendingSupabaseSignUp} size="small" />
          <Text>{t('Auth.SignUp.Button')}</Text>
        </Button>
      </View>

      <View className="mt-8 flex flex-row justify-center items-center gap-4">
        <Text className="text-sm text-muted-foreground text-center">
          {t('Auth.SignUp.HasAccount')}
        </Text>
        <Button variant="link" onPress={onNavigate}>
          <Text>{t('Auth.SignUp.SignInLink')}</Text>
        </Button>
      </View>

      {/* VERIFICATION MODAL */}
      <Modal isVisible={showOtpModal}>
        <View className="bg-muted px-7 py-14 rounded-2xl relative border border-border">
          <Button
            className="absolute top-2 right-0"
            variant="ghost"
            disabled={isPendingPostUser || isPendingOnPressVerify}
          >
            <X
              size={24}
              onPress={() => setShowOtpModal(false)}
              color={colors['--primary']}
            />
          </Button>
          <Text className="text-2xl font-bold mb-2">
            {t('Auth.SignUp.Verification.Title')}
          </Text>
          <Text className="text-gray-600 mb-5">
            {t('Auth.SignUp.Verification.Message', { email: form.email })}
          </Text>
          <Input
            placeholder={t('Auth.SignUp.Verification.Placeholder')}
            className="p-3 rounded-lg bg-surface border border-border"
            value={form.token}
            keyboardType="numeric"
            onChangeText={(token) => setForm({ ...form, token })}
          />
          <Button
            onPress={handlePressVerify}
            className="mt-5"
            disabled={isPendingOnPressVerify || isPendingPostUser}
          >
            <Loader visible={isPendingOnPressVerify || isPendingPostUser} />
            <Text>{t('Auth.SignUp.Verification.Button')}</Text>
          </Button>
        </View>
      </Modal>

      {/* SUCCESS MODAL */}
      <Modal isVisible={showSuccessModal}>
        <View className="bg-muted px-7 py-9 rounded-2xl min-h-[300px]">
          <Image
            source={IMAGES.check}
            className="w-20 h-20 mx-auto my-5 max-w-20 max-h-20"
          />
          <Text className="text-3xl font-bold text-center">
            {t('Auth.SignUp.Success.Title')}
          </Text>
          <Text className="text-base text-muted-foreground text-center mt-2">
            {t('Auth.SignUp.Success.Message')}
          </Text>
          <Button
            onPress={() => {
              onSuccess();
              setShowSuccessModal(false);
            }}
            className="mt-5"
          >
            <Text>{t('Auth.SignUp.Success.Button')}</Text>
          </Button>
        </View>
      </Modal>
    </React.Fragment>
  );
}
