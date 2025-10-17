import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import onlyWarn from 'eslint-plugin-only-warn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

/**
 * Shared ESLint config for the monorepo
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier, // Disable formatting rules that conflict with Prettier

  {
    plugins: {
      prettier: prettierPlugin,
      turbo: turboPlugin,
      onlyWarn,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      // ✅ Prettier integration
      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleQuote: true,
          trailingComma: 'es5',
          semi: true,
          printWidth: 100,
          tabWidth: 2,
          bracketSpacing: true,
          arrowParens: 'avoid',
        },
      ],

      // ✅ Code-quality rules
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // ✅ Import sorting
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // ✅ Turbo env
      'turbo/no-undeclared-env-vars': 'warn',
    },
  },

  {
    ignores: [
      'dist/**',
      '.turbo/**',
      '.expo/**',
      'web-build/**',
      'ios/**',
      'android/**',
      'node_modules/**',
    ],
  },
];
