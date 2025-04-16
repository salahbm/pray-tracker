import { format } from 'date-fns';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { LogOut } from '@/components/shared/icons';
import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useDeleteUser } from '@/hooks/auth/useDeleteUser';
import { useLogout } from '@/hooks/auth/useLogOut';
import { useAuthStore } from '@/store/auth/auth-session';
import { triggerHaptic } from '@/utils/haptics';

const Account = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { logOut, isLoggingOut } = useLogout();
  console.log(' isLoggingOut:', isLoggingOut);
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const [modalVisible, setModalVisible] = useState(false);

  const handleWithdrawAccount = async () => {
    if (Platform.OS !== 'web') {
      await triggerHaptic();
    }
    await deleteUser({ id: user.id, supabaseId: user.supabaseId }).finally(
      () => {
        setModalVisible(false);
        router.replace('/(tabs)');
      },
    );
  };

  const handleLogOut = async () => {
    await triggerHaptic();
    logOut(undefined);
  };

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isDeleting || isLoggingOut} />
      <View className="main-area">
        <GoBack title={t('Profile.Account.Title')} />

        {user?.photo ? (
          <Image
            source={{ uri: user.photo }}
            accessibilityLabel="Profile Photo"
            className="w-[150px] h-[150px] max-w-[150px] max-h-[150px] rounded-full mx-auto border border-border mt-10"
          />
        ) : (
          <Image
            source={FRIENDS.guest}
            accessibilityLabel="Guest Profile"
            className="w-[150px] h-[150px] max-w-[150px] max-h-[150px] rounded-full mx-auto border border-border mt-10"
          />
        )}

        {/* Account Info */}
        <View className="mt-20">
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-base font-semibold">Email:</Text>
            <Text className="text-base font-semibold">
              {user?.email ? user.email : '-'}
            </Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-base font-semibold">Created:</Text>
            <Text className="text-base font-semibold">
              {user?.createdAt ? format(user.createdAt, 'PPpp') : '-'}
            </Text>
          </View>
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-base font-semibold">Last Updated:</Text>
            <Text className="text-base font-semibold">
              {user?.updatedAt ? format(user.updatedAt, 'PPpp') : '-'}
            </Text>
          </View>
        </View>
      </View>

      {/* Withdraw Account Button */}
      <Button
        className="mb-4"
        variant="link"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-muted-foreground underline font-thin">
          {t('Profile.Account.DeleteAccount')}
        </Text>
      </Button>

      {/* Logout Button */}
      <Button
        className="flex-row gap-4 mx-6 mb-10"
        variant="destructive"
        onPress={handleLogOut}
        disabled={isDeleting}
      >
        <Text className="text-destructive font-bold">
          {t('Profile.Account.LogoutButton')}
        </Text>
        <LogOut className="stroke-destructive" />
      </Button>

      {/* Withdraw Account Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View className="bg-popover rounded-lg p-6">
          <Text className="text-lg font-bold mb-4 text-center">
            {t('Profile.Account.DeleteConfirm')}
          </Text>
          <Text className="text-sm text-center text-popover-foreground mb-6">
            {t('Profile.Account.DeleteMessage')}
          </Text>
          <View className="flex-row justify-center gap-4">
            <Button variant="outline" onPress={() => setModalVisible(false)}>
              <Text>{t('Profile.Account.CancelButton')}</Text>
            </Button>
            <Button
              className="bg-destructive"
              onPress={handleWithdrawAccount}
              disabled={isDeleting}
            >
              <Text>{t('Profile.Account.DeleteButton')}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;
