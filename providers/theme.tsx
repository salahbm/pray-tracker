import clsx from 'clsx';
import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, createContext, useContext } from 'react';
import { View, ViewProps } from 'react-native';

import { useThemeStore } from '@/store/defaults/theme';
import {
  StatusBarTheme,
  Themes,
  THEMES,
  ThemesVariant,
} from '@/styles/theme.config';

type ThemeContextValues = {
  theme: ThemesVariant;
};

const ThemeProviderValues = createContext<ThemeContextValues>({
  theme: THEMES.light,
});

export function useThemeContextValues() {
  return useContext(ThemeProviderValues);
}

type ThemeContextActions = {
  handleThemeSwitch: (newTheme: ThemesVariant) => void;
};

const ThemeProviderActions = createContext<ThemeContextActions>(
  {} as ThemeContextActions,
);

export function useThemeContextActions() {
  return useContext(ThemeProviderActions);
}

type ThemeProps = ViewProps;

export function ThemeProvider(props: ThemeProps) {
  const { currentTheme, changeTheme } = useThemeStore();
  const [theme, setTheme] = useState<ThemesVariant>(currentTheme);

  if (theme !== currentTheme) {
    setTheme(currentTheme);
  }

  const handleThemeSwitch = useCallback(
    (newTheme: ThemesVariant) => {
      changeTheme(newTheme);
    },
    [changeTheme],
  );

  return (
    <View style={Themes[theme]} className={clsx('flex-1', props.className)}>
      <ThemeProviderValues.Provider value={{ theme }}>
        <ThemeProviderActions.Provider value={{ handleThemeSwitch }}>
          <StatusBar
            style={StatusBarTheme[theme].style}
            backgroundColor={StatusBarTheme[theme].background}
          />
          {props.children}
        </ThemeProviderActions.Provider>
      </ThemeProviderValues.Provider>
    </View>
  );
}
