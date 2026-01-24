import { format } from 'date-fns';
import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { LogOut } from '@/components/shared/icons';
import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modals/modal';
import { Button } from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Text } from '@/components/ui/text';
import { useDeleteUser } from '@/hooks/auth/useDeleteUser';
import { useLogout } from '@/hooks/auth/useLogOut';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { useAuthStore } from '@/store/auth/auth-session';
import { triggerHaptic } from '@/utils/haptics';

const Account = () => {
  const { user } = useAuthStore();
  const { t } = useTranslation();
  const { logOut, isLoggingOut } = useLogout();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const [modalVisible, setModalVisible] = useState(false);
  const { isPremium, customerInfo } = useRevenueCatCustomer();

  const premiumInfo = Object.values(customerInfo?.entitlements.active || {})[0];

  const purchaseDate = premiumInfo?.latestPurchaseDate;
  const expirationDate = premiumInfo?.expirationDate;

  const handleWithdrawAccount = async () => {
    if (!user?.id) {
      return;
    }
    if (Platform.OS !== 'web') {
      await triggerHaptic();
    }
    await deleteUser(user?.id).finally(() => {
      setModalVisible(false);
      router.replace('/(tabs)');
    });
  };

  const handleLogOut = async () => {
    await triggerHaptic();
    logOut(undefined);
  };

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isDeleting || isLoggingOut} />
      <GoBack title={t('profile.account.title')} />
      <View className="main-area">
        <Image source={user?.image} className="mt-10 size-[150px] mx-auto" />

        {/* Account Info */}
        <View className="mt-20">
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-base font-semibold">{t('profile.account.email')}:</Text>
            <Text className="text-base font-semibold">{user?.email ? user.email : '-'}</Text>
          </View>
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-base font-semibold">{t('profile.account.created')}:</Text>
            <Text className="text-base font-semibold">
              {user?.createdAt ? format(user.createdAt, 'yyyy/MM/dd') : '-'}
            </Text>
          </View>
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-base font-semibold">{t('profile.account.lastUpdated')}:</Text>
            <Text className="text-base font-semibold">
              {user?.updatedAt ? format(user.updatedAt, 'yyyy/MM/dd') : '-'}
            </Text>
          </View>
        </View>
        {isPremium ? (
          <View className="mt-10">
            <View className="flex-row justify-between items-center w-full mb-4">
              <Text className="text-base font-semibold">{t('profile.account.purchased')}</Text>
              <Text className="text-base font-semibold">
                {purchaseDate ? format(new Date(purchaseDate), 'yyyy/MM/dd') : '-'}
              </Text>
            </View>

            <View className="flex-row justify-between items-center w-full">
              <Text className="text-base font-semibold">{t('profile.account.expires')}</Text>
              <Text className="text-base font-semibold">
                {expirationDate ? format(new Date(expirationDate), 'yyyy/MM/dd') : 'Lifetime'}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      {/* Withdraw Account Button */}
      <Button className="mb-4" variant="link" onPress={() => setModalVisible(true)}>
        <Text className="text-muted-foreground underline font-thin">
          {t('profile.account.deleteAccount')}
        </Text>
      </Button>

      {/* Logout Button */}
      <Button
        className="flex-row gap-4 mx-6 mb-10"
        variant="destructive"
        onPress={handleLogOut}
        disabled={isDeleting}
      >
        <Text className="text-destructive font-bold">{t('profile.account.logoutButton')}</Text>
        <LogOut className="stroke-destructive" />
      </Button>

      {/* Withdraw Account Modal */}
      <Modal visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View className="bg-background/80 rounded-lg p-6">
          <Text className="text-lg font-bold mb-4 text-center">
            {t('profile.account.deleteConfirm')}
          </Text>
          <Text className="text-sm text-center text-foreground mb-6">
            {t('profile.account.deleteMessage')}
          </Text>
          <View className="flex-row justify-center gap-4">
            <Button variant="outline" onPress={() => setModalVisible(false)}>
              <Text>{t('profile.account.cancelButton')}</Text>
            </Button>
            <Button
              className="bg-destructive"
              onPress={handleWithdrawAccount}
              disabled={isDeleting}
            >
              <Text>{t('profile.account.deleteButton')}</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;
