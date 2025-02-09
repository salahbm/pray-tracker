import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Button } from '@/components/ui/button';
import { fireToast } from '@/providers/toaster';

const CallToAction = () => {
  return (
    <React.Fragment>
      {/* Header Section */}
      <Text className="text-primary text-lg font-bold mt-6 text-center">
        Join Prayer Tracker+ and help us make a difference.{'\n'}Be part of a
        mission that inspires hearts.
      </Text>

      {/* Subscription Benefit Section */}
      <View className="bg-popover rounded-2xl mt-6 w-full p-6 shadow-md">
        <Text className="text-popover-foreground text-lg font-semibold text-center">
          Assalamu alaykum! 👋
        </Text>
        <Text className="text-card-foreground text-center mt-3 text-base font-medium">
          Your support for Prayer Tracker+ fuels our mission to spread goodness
          and help Muslims worldwide stay connected to their prayers and
          spirituality.
        </Text>
      </View>

      {/* Bonus Features Section */}
      <View className="bg-accent rounded-2xl mt-6 w-full p-6 shadow-2xl">
        <Text className="text-accent-foreground text-lg font-semibold text-center">
          Unlock Exclusive Benefits 🎁
        </Text>
        <Text className="text-card-foreground text-center mt-3 text-base font-medium">
          As a Prayer Tracker+ member, you’ll get access to exclusive features
          that enhance your spiritual journey.
        </Text>
        <View className="mt-3 justify-center items-center">
          <Text className="text-card-foreground text-sm mt-1">
            More exciting features to come
          </Text>
        </View>
      </View>

      {/* Team Section */}
      <View className="bg-ring rounded-2xl mt-6 w-full p-6 shadow-lg">
        <Text className="text-foreground text-lg font-semibold text-center">
          Meet the Team 👥
        </Text>
        <Text className="text-card-foreground text-center mt-3 text-base font-medium">
          This project is lovingly built and maintained by a passionate
          developer. With faith, care, and constant inspiration, we work hard to
          bring meaningful features for your spiritual growth every single day.
        </Text>
      </View>

      {/* Subscription Button */}
      <Button
        className="bg-accent rounded-full py-4 px-8 mt-12 shadow-sm"
        onPress={() => fireToast.info('Please, upgrade to a premium plan.')}
      >
        <Text className="text-accent-foreground font-bold text-center text-lg">
          Yes, I want to support ❤️
        </Text>
      </Button>

      {/* Restore Subscription Link */}
      <TouchableOpacity className="mt-6">
        <Text className="text-muted-foreground underline text-center font-medium text-base">
          Restore my subscription
        </Text>
      </TouchableOpacity>
    </React.Fragment>
  );
};

export default CallToAction;
