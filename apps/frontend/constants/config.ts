import Constants from 'expo-constants';

const ORIGIN = Constants.expoConfig?.extra?.baseUrl;
const NODE_ENV = Constants.expoConfig?.extra?.NODE_ENV;

export { ORIGIN, NODE_ENV };
