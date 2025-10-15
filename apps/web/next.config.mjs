import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@prayer/shared', '@prayer/db'],
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@prayer/shared'] = path.resolve(
      __dirname,
      '../../packages/shared/src',
    );
    config.resolve.alias['@prayer/db'] = path.resolve(
      __dirname,
      '../../packages/db/src',
    );
    return config;
  },
};

export default nextConfig;
