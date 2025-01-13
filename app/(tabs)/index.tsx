import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useAuth } from '@clerk/clerk-react';
import { router } from 'expo-router';
import { LogIn, LogOut, User } from 'lucide-react-native';
import { TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemeSwitcher from 'components/shared/theme';
import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';

export default function HomeScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/sign-in');
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <SignedIn>
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaExtraBold">
            Welcome {user?.firstName}👋
          </Text>
          <TouchableOpacity
            onPress={handleSignOut}
            className="justify-center items-center w-10 h-10 rounded-full bg-white"
          >
            <LogOut className="w-4 h-4" />
          </TouchableOpacity>
        </View>
      </SignedIn>

      <SignedOut>
        <View className="flex flex-row items-center justify-between my-5">
          <Text className="text-2xl font-JakartaExtraBold">
            Welcome Guest👋
          </Text>
          <TouchableOpacity
            onPress={() => router.replace('/(auth)/sign-in')}
            className="justify-center items-center w-10 h-10 rounded-full bg-gray-300"
          >
            <User className="w-4 h-4" />
          </TouchableOpacity>
        </View>
      </SignedOut>

      <View>
        <Text>This is initial screen</Text>
        <Button>
          <Text>Default</Text>
        </Button>
        <ThemeSwitcher />
      </View>
    </SafeAreaView>
  );
}
