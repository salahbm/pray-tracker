const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
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
  '@': path.resolve(projectRoot, 'src'),
  '@assets': path.resolve(projectRoot, 'assets'),
  '@components': path.resolve(projectRoot, 'src/components'),
  components: path.resolve(projectRoot, 'src/components'),
  '@constants': path.resolve(projectRoot, 'src/constants'),
  constants: path.resolve(projectRoot, 'src/constants'),
  '@hooks': path.resolve(projectRoot, 'src/hooks'),
  hooks: path.resolve(projectRoot, 'src/hooks'),
  '@lib': path.resolve(projectRoot, 'src/lib'),
  lib: path.resolve(projectRoot, 'src/lib'),
  '@locales': path.resolve(projectRoot, 'src/locales'),
  '@providers': path.resolve(projectRoot, 'src/providers'),
  providers: path.resolve(projectRoot, 'src/providers'),
  '@store': path.resolve(projectRoot, 'src/store'),
  store: path.resolve(projectRoot, 'src/store'),
  '@styles': path.resolve(projectRoot, 'src/styles'),
  styles: path.resolve(projectRoot, 'src/styles'),
  '@types': path.resolve(projectRoot, 'src/types'),
  '@utils': path.resolve(projectRoot, 'src/utils'),
  utils: path.resolve(projectRoot, 'src/utils'),
  '@prayer/shared': path.resolve(workspaceRoot, 'packages/shared/src'),
  '@prayer/db': path.resolve(workspaceRoot, 'packages/db/src'),
};

// First wrap it with NativeWind
const nativeWindConfig = withNativeWind(config, {
  input: './src/styles/global.css',
});

// Then wrap the result with Reanimated
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
