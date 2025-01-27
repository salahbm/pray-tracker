import { router } from 'expo-router';
import { Alert, Image, View } from 'react-native';

import { Button } from '../ui/button';
import { Text } from '../ui/text';
import { IMAGES } from '@/constants/images';
import { googleOAuth } from '@/lib/auth';

const OAuth = () => {
  const { startOAuthFlow } = { startOAuthFlow: { strategy: 'oauth_google' } };

  const handleGoogleSignIn = async () => {
    const result = await googleOAuth(startOAuthFlow);

    if (result.code === 'session_exists') {
      Alert.alert('Success', 'Session exists. Redirecting to home screen.');
      router.replace('/(tabs)');
    }

    Alert.alert(result.success ? 'Success' : 'Error', result.message);
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
