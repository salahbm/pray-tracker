import { Text } from '@/components/ui/text';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background max-w-screen-md mx-auto w-full">
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    bottom: 0,
    height: 178,
    left: 0,
    position: 'absolute',
    width: 290,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
});
