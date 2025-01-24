import { View, ActivityIndicator } from 'react-native';

const Loader = ({ visible }: { visible: boolean }) => {
  if (!visible) return null;
  return (
    <View className="flex flex-1 items-center justify-center absolute top-0 left-0 right-0 bottom-0 z-50 bg-[rgba(0,0,0,0.5)] backdrop:blur-md">
      <ActivityIndicator size="large" className="text-primary" />
    </View>
  );
};

export default Loader;
