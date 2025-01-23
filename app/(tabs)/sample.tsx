import React from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';

import { Text } from 'components/ui/text';
import { useLanguage } from '@/hooks/common/useTranslation';

// Localization Example
const LocalizationExample = () => {
  const { currentLanguage } = useLanguage();
  return (
    <View className="p-4">
      <Text className="text-md ">Current Locale: {currentLanguage}</Text>
    </View>
  );
};

const SampleScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="p-4">
        <Text className="text-2xl font-bold text-center ">
          Project Documentation
        </Text>

        {/* NativeWind Example */}
        <View className="mt-4">
          <Text className="text-xl font-semibold text-gray-700">
            NativeWind Example
          </Text>
        </View>

        {/* Localization Example */}
        <View className="mt-4">
          <Text className="text-xl font-semibold text-gray-700">
            Localization Example
          </Text>
          <LocalizationExample />
        </View>

        {/* Tools Information */}
        <View className="mt-4 p-4 bg-gray-200 rounded-lg gap-4">
          <Text className="text-lg font-semibold ">Project Tools</Text>
          <Text className="mt-2 text-gray-700">
            - <Text className="font-bold">NativeWind:</Text> Utility-first
            styling for React Native.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">CZ (Commitizen):</Text> Standardized
            commit messages.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">Husky:</Text> Git hooks for running
            Prettier and ESLint.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">ESLint & Prettier:</Text> Code
            formatting and linting.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">Versioning:</Text> Automated semantic
            versioning.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">Changelog:</Text> Generated using
            standard-version.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">Zustand:</Text> State management for
            React Native.
          </Text>
          <Text className="text-gray-700">
            - <Text className="font-bold">Expo-Localization:</Text> Detect
            locale settings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SampleScreen;
