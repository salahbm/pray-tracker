import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { useLogout } from '@/hooks/auth/useLogOut';
import { useUpdatePassword } from '@/hooks/auth/usePwdUpdate';
import { fireToast } from '@/providers/toaster';
import { useAuthStore } from '@/store/auth/auth-session';
import { alert } from '@/store/defaults/use-alert-store';
import { router } from 'expo-router';

const EditPwd = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { mutateAsync: updatePassword, isPending } = useUpdatePassword();

  //   States
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const newPwdRef = useRef<TextInput | null>(null);
  const confirmPwdRef = useRef<TextInput | null>(null);

  const validatePasswords = () => {
    if (!currentPassword) {
      fireToast.error(t('profile.editPassword.errors.currentPasswordRequired'));
      return false;
    }
    if (newPassword.length < 8) {
      fireToast.error(t('profile.editPassword.errors.minPasswordLength'));
      return false;
    }
    if (newPassword !== confirmPassword) {
      fireToast.error(t('profile.editPassword.errors.passwordMismatch'));
      return false;
    }
    return true;
  };

  const handleUpdate = async () => {
    if (!validatePasswords()) return;

    await updatePassword({
      currentPassword,
      newPassword,
    })
      .then(() => {
        alert({
          title: t('profile.editPassword.success'),
          cancelLabel: t('common.actions.goBack'),
          onCancel: () => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
            router.back();
          },
          confirmLabel: t('common.actions.ok'),
          onConfirm: () => {
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
          },
        });
      })
      .catch(error => {
        fireToast.error((error as Error)?.message || t('profile.editPassword.errors.updateFailed'));
      });
  };

  return (
    <SafeAreaView className="main-area">
      <Loader visible={isPending} />
      <GoBack title={t('profile.editPassword.title')} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <Image
          source={user?.image}
          className="w-[150px] h-[150px] rounded-full mx-auto border border-border max-w-[150px] max-h-[150px] my-10"
        />

        <View className="flex-1 gap-6">
          <Input
            label={t('profile.editPassword.fields.currentPassword.label')}
            placeholder={t('profile.editPassword.fields.currentPassword.placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="next"
            value={currentPassword}
            onSubmitEditing={() => newPwdRef.current?.focus()}
            onChangeText={setCurrentPassword}
          />
          <Input
            ref={newPwdRef}
            label={t('profile.editPassword.fields.newPassword.label')}
            placeholder={t('profile.editPassword.fields.newPassword.placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => confirmPwdRef.current?.focus()}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <Input
            ref={confirmPwdRef}
            onSubmitEditing={handleUpdate}
            label={t('profile.editPassword.fields.confirmPassword.label')}
            placeholder={t('profile.editPassword.fields.confirmPassword.placeholder')}
            autoCapitalize="none"
            secureTextEntry
            returnKeyType="done"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
      </ScrollView>
      <View className="pb-4">
        <Button onPress={handleUpdate} disabled={isPending}>
          <Text>{t('profile.editPassword.saveButton')}</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditPwd;
