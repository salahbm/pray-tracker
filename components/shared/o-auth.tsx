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
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg my-4">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <Button
        onPress={handleGoogleSignIn}
        variant="outline"
        className="flex flex-row justify-center items-center gap-2"
      >
        <Image
          source={IMAGES.google}
          resizeMode="contain"
          className="w-5 h-5 mx-2"
        />
        <Text>Continue with Google</Text>
      </Button>
    </View>
  );
};

export default OAuth;
