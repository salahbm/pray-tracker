import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View } from 'react-native';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <StatusBar style="light" />
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-3xl font-semibold text-white">Prayer Tracker</Text>
        <Text className="mt-4 text-center text-base text-slate-300">
          Welcome to the new mobile experience. Start building your features in the src directory
          and style them with NativeWind.
        </Text>
      </View>
    </SafeAreaView>
  );
}
