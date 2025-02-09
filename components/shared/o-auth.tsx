import { Image, View } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { IMAGES } from '@/constants/images';
import { useOAuth } from '@/hooks/auth/useOAuth';

const OAuth = () => {
  const { mutateAsync: startOAuthFlow } = useOAuth();

  const handleGoogleSignIn = async () => {
    await startOAuthFlow();
  };

  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4 gap-x-3">
        <View className="flex-1 h-[1px] bg-border" />
        <Text className="text-lg my-4">Or</Text>
        <View className="flex-1 h-[1px] bg-border" />
      </View>

      <Button
        onPress={handleGoogleSignIn}
        variant="outline"
        className="flex-row justify-center items-center gap-2 bg-popover"
      >
        <Image
          source={IMAGES.google}
          resizeMode="contain"
          className="size-5 mx-2"
        />
        <Text>Continue with Google</Text>
      </Button>
    </View>
  );
};

export default OAuth;
