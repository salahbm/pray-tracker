import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';

import FriendsGroups from '@/components/views/friends/groups/groups';
import { gifs } from '@/constants/images';
import { useRevenueCatCustomer } from '@/hooks/subscriptions/useRevenueCat';
import { useAuthStore } from '@/store/auth/auth-session';

import PaywallScreen from '../(screens)/subscription/paywall';

const FriendsScreen = () => {
  const { user } = useAuthStore();
  const { isPremium, loading } = useRevenueCatCustomer();

  // Premium status is now cached in store and only refetches if stale (5 minutes)
  // No need for manual refetch on focus

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center min-h-screen bg-background">
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
    <View className="main-area">{user && !isPremium ? <FriendsGroups /> : <PaywallScreen />}</View>
  );
};

export default FriendsScreen;
