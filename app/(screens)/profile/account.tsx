import { useAuth, useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';
import { useState } from 'react';
import { View, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBack from '@/components/shared/go-back';
import { LogOut } from '@/components/shared/icons';
import Loader from '@/components/shared/loader';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { FRIENDS } from '@/constants/images';
import { useGetUser } from '@/hooks/auth/useGetUser';
import { fireToast } from '@/providers/toaster';

const Account = () => {
  const { user, isLoaded } = useUser();
  const { data: userData, isLoading } = useGetUser(user?.id);
  const { signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  const handleWithdrawAccount = () => {
    // Add logic for withdrawing the account (e.g., calling an API to delete the user)
    setModalVisible(false);
    fireToast.success('Account withdrawal initiated.');
    // Optionally redirect or show a confirmation message
  };

  return (
    <SafeAreaView className="safe-area">
      <Loader visible={isLoading || !isLoaded} />
      <GoBack title="Account" />
      <View className="main-area">
        <Image
          source={{
            uri: user?.imageUrl || FRIENDS.guest,
          }}
          accessibilityLabel="Profile Photo"
          className="w-[150px] h-[150px] rounded-full mx-auto"
        />
        {/* Account Info */}
        <View className="mt-12">
          <View className="flex-row justify-between items-center w-full mb-4">
            <Text className="text-base font-semibold">Created:</Text>
            <Text className="text-base font-semibold">
              {userData?.createdAt ? format(userData.createdAt, 'PPpp') : 'N/A'}
            </Text>
          </View>
          <View className="flex-row justify-between items-center w-full">
            <Text className="text-base font-semibold">Last Updated:</Text>
            <Text className="text-base font-semibold">
              {userData?.updatedAt ? format(userData.updatedAt, 'PPpp') : 'N/A'}
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
        onPress={async () => await signOut()}
      >
        <Text className="text-destructive font-bold">Logout</Text>
        <LogOut className="stroke-destructive" />
      </Button>

      {/* Withdraw Account Modal */}
      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
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
            <Button className="bg-destructive" onPress={handleWithdrawAccount}>
              <Text>Yes, Withdraw</Text>
            </Button>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default Account;
