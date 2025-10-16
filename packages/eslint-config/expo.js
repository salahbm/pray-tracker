import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReact from 'eslint-plugin-react';
import globals from 'globals';
import pluginReactNative from 'eslint-plugin-react-native';
import { config as baseConfig } from './base.js';

/**
 * A custom ESLint configuration for libraries that use Expo / React Native.
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const expoConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,

  // ✅ React plugin setup
  {
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.es2021,
        ...globals['react-native'], // adds RN globals like __DEV__
      },
    },
  },

  // ✅ React Hooks plugin setup
  {
    plugins: {
      'react-hooks': pluginReactHooks,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // not needed in React 17+
    },
  },

  // ✅ React Native plugin setup
  {
    plugins: {
      'react-native': pluginReactNative,
    },
    rules: {
      ...pluginReactNative.configs.all.rules,
      'react-native/no-inline-styles': 'warn',
      'react-native/split-platform-components': 'off',
      'react-native/no-raw-text': 'off',
      'react-native/no-color-literals': 'off',
    },
  },
];
