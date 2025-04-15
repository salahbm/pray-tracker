const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

// Create the default Metro config
const config = getDefaultConfig(__dirname);

// First wrap it with NativeWind
const nativeWindConfig = withNativeWind(config, {
  input: './styles/global.css',
});

// Then wrap the result with Reanimated
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
