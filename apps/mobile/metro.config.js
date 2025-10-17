// apps/mobile/metro.config.cjs

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// Watch shared packages if needed (optional)
config.watchFolders = [monorepoRoot];

// Fixes Metro resolution in monorepos
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, 'node_modules'),
  path.join(monorepoRoot, 'node_modules'),
];

config.resolver.disableHierarchicalLookup = true;

// ✅ Apply NativeWind last
module.exports = withNativeWind(config, { input: './styles/global.css' });
