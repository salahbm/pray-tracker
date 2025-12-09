import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import FriendsGroups from '@/components/views/friends/groups/groups';
import { useAuthStore } from '@/store/auth/auth-session';
import PaywallScreen from '../(screens)/subscription/paywall';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { gifs } from '@/constants/images';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  const { isPremium, loading, refetch } = useRevenueCatCustomer();

  // Refetch premium status when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center min-h-screen">
        <LottieView
          source={gifs.clock_sand}
          autoPlay
          loop
          style={{ height: 240, width: '100%' }}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <SafeAreaView className="main-area">
      {user && isPremium ? <FriendsGroups /> : <PaywallScreen />}
    </SafeAreaView>
  );
};

export default FriendsScreen;
