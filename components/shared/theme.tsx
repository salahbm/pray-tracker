import { MoonStar, SunIcon } from 'lucide-react-native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';

import { useColorScheme } from '~/hooks/useColorScheme';

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme, isDarkColorScheme } =
    useColorScheme();

  return (
    <View
      className={`flex flex-row items-center p-4 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}
    >
      <Text
        className={`text-lg ${colorScheme === 'dark' ? 'text-white' : 'text-black'} mr-4`}
      >
        {isDarkColorScheme ? 'Dark Mode' : 'Light Mode'}
      </Text>
      <Pressable
        onPress={toggleColorScheme}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
      >
        {isDarkColorScheme ? (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        ) : (
          <MoonStar className="w-6 h-6 text-gray-700" />
        )}
      </Pressable>
    </View>
  );
};

export default ThemeSwitcher;
