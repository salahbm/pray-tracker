module.exports = {
  root: true, // Ensure this is the root ESLint config
  extends: [
    'eslint:recommended', // Base recommended rules
    'plugin:react/recommended', // React-specific rules
    'plugin:react-hooks/recommended', // React hooks rules
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:prettier/recommended', // Prettier integration
    'plugin:import/errors', // Import rules
    'plugin:import/warnings',
    'plugin:import/typescript', // Import rules for TypeScript
    'plugin:jsx-a11y/recommended', // Accessibility rules
    'expo', // Expo-specific rules
  ],
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'import',
    'jsx-a11y',
  ],
  parser: '@typescript-eslint/parser', // Use TypeScript parser
  parserOptions: {
    ecmaVersion: 2021, // Latest ECMAScript version
    sourceType: 'module', // Allow imports
    ecmaFeatures: {
      jsx: true, // Enable JSX parsing
    },
  },
  rules: {
    // General rules
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: 'all' }],
    'no-console': 'warn', // Allow console logs with a warning
    'no-unused-vars': 'off', // Handled by TypeScript
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

    // React rules
    'react/prop-types': 'off', // Disable prop-types (use TypeScript instead)
    'react/react-in-jsx-scope': 'off', // React import not needed in newer versions
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }], // Allow JSX in these file types
    'react/no-unescaped-entities': 'off', // Turn off escaping warnings for JSX (e.g., `'`)

    // Import rules
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // Accessibility rules
    'jsx-a11y/anchor-is-valid': 'off', // Disable warnings for invalid anchor elements (handled by React Navigation)

    // TypeScript rules
    '@typescript-eslint/explicit-function-return-type': 'off', // Not always necessary
    '@typescript-eslint/no-explicit-any': 'warn', // Avoid using `any` type
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for modules
    '@typescript-eslint/no-require-imports': 'warn', // Turn off the rule for require() imports

    // Hooks rules
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Turn off missing dependency warnings in useEffect
  },
  env: {
    browser: true, // Browser global variables
    node: true, // Node.js global variables
    es2021: true, // ES2021 features
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect React version
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  ignorePatterns: [
    'node_modules/',
    'android/',
    'ios/',
    '.expo/',
    'web-build/',
    'dist/',
    'build/',
  ],
};
