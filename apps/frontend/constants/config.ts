import Constants from 'expo-constants';

const ORIGIN = Constants.expoConfig?.extra?.baseUrl;
console.log(` ORIGIN:`, ORIGIN);
const APP_VARIANT = Constants.expoConfig?.extra?.appVariant;
console.log(` APP_VARIANT:`, APP_VARIANT);

export { ORIGIN, APP_VARIANT };
