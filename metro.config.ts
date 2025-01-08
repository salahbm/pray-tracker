/* eslint-env node */
import { getDefaultConfig } from 'expo/metro-config';
import { withNativeWind } from 'nativewind/metro';

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname, { isCSSEnabled: true });

module.exports = withNativeWind(config, { input: 'styles/global.css' });
