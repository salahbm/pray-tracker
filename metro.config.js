const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  resolveRequest: (context, realModuleName, platform, moduleName) => {
    if (realModuleName.startsWith('#')) {
      const newModuleName = realModuleName.replace(
        '#main-entry-point',
        path.resolve(__dirname, 'node_modules/.prisma/client/index.js'),
      );
      return context.resolveRequest(
        { ...context, originModulePath: newModuleName },
        newModuleName,
        platform,
      );
    }
    return context.resolveRequest(context, realModuleName, platform);
  },
};

module.exports = withNativeWind(config, { input: './styles/global.css' });
