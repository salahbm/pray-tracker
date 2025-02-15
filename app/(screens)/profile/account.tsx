import { format } from 'date-fns';
import { router } from 'expo-router';
import { useState } from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { LogOut } from '@/components/shared/icons';
import Loader from '@/components/shared/loader';
import Modal from '@/components/shared/modal';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useDeleteUser } from '@/hooks/auth/useDeleteUser';
import { useLogoutUser } from '@/hooks/auth/useLogOut';
import { useAuthStore } from '@/store/auth/auth-session';

const Account = () => {
  const { user } = useAuthStore();
  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogoutUser();
  const [modalVisible, setModalVisible] = useState(false);

  const handleWithdrawAccount = async () => {
    await deleteUser({ id: user.id, supabaseId: user.supabaseId }).finally(
      () => {
        setModalVisible(false);
        router.replace('/(tabs)');
      },
    );
  };

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isDeleting || isLoggingOut} />
      <View className="main-area">
        <GoBack title="Account" />

        <Image
          source={{
            uri: user?.photo || FRIENDS.guest,
          }}
          accessibilityLabel="Profile Photo"
          className="w-[150px] h-[150px] rounded-full mx-auto border border-border mt-10"
        />

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
          Withdraw Account
        </Text>
      </Button>

      {/* Logout Button */}
      <Button
        className="flex-row gap-4 mx-6 mb-10"
        variant="destructive"
        onPress={async () => await logout()}
      >
        <Text className="text-destructive font-bold">Logout</Text>
        <LogOut className="stroke-destructive" />
      </Button>

      {/* Withdraw Account Modal */}
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View className="bg-popover rounded-lg p-6">
          <Text className="text-lg font-bold mb-4 text-center">
            Are you sure you want to withdraw your account?
          </Text>
          <Text className="text-sm text-center text-popover-foreground mb-6">
            This action is irreversible, and we will be sad to see you go. All
            your data will be permanently deleted.
          </Text>
          <View className="flex-row justify-center gap-4">
            <Button variant="outline" onPress={() => setModalVisible(false)}>
              <Text>Cancel</Text>
            </Button>
            <Button
              className="bg-destructive"
              onPress={handleWithdrawAccount}
              disabled={isDeleting}
            >
              <Text>Yes, Withdraw</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Account;
