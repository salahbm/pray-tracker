import { Image } from 'expo-image';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';

export default function TabTwoScreen() {
  return (
    <View>
      <Text>Explore</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    bottom: -90,
    color: '#808080',
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
