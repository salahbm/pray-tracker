module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            components: './src/components',
            '@constants': './src/constants',
            constants: './src/constants',
            '@hooks': './src/hooks',
            hooks: './src/hooks',
            '@lib': './src/lib',
            lib: './src/lib',
            '@locales': './src/locales',
            '@providers': './src/providers',
            providers: './src/providers',
            '@store': './src/store',
            store: './src/store',
            '@styles': './src/styles',
            styles: './src/styles',
            '@types': './src/types',
            '@utils': './src/utils',
            utils: './src/utils',
            '@prayer/shared': '../../packages/shared/src',
            '@prayer/db': '../../packages/db/src',
          },
        },
      ],
      'react-native-worklets/plugin',
    ],
  };
};
