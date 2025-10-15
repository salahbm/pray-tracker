const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

// Create the default Metro config
const config = getDefaultConfig(projectRoot);

config.watchFolders = [...(config.watchFolders ?? []), workspaceRoot];
config.resolver = config.resolver || {};
config.resolver.nodeModulesPaths = [
  ...(config.resolver.nodeModulesPaths ?? []),
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];
config.resolver.disableHierarchicalLookup = true;
config.resolver.extraNodeModules = {
  ...(config.resolver.extraNodeModules ?? {}),
  '@prayer/shared': path.resolve(workspaceRoot, 'packages/shared/src'),
  '@prayer/db': path.resolve(workspaceRoot, 'packages/db/src'),
};

// First wrap it with NativeWind
const nativeWindConfig = withNativeWind(config, {
  input: './styles/global.css',
});

// Then wrap the result with Reanimated
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
