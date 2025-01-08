import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function SampleScreen() {
  return (
    <SafeAreaView>
      <View className="bg-red-500">
        <Text className="text-white text-lg">Test Tailwind</Text>
      </View>
    </SafeAreaView>
  );
}

export default SampleScreen;
