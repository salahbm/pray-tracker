import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ThemeSwitcher from 'components/shared/theme';
import { Button } from 'components/ui/button';
import { Text } from 'components/ui/text';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
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
