export const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8081',
  'http://127.0.0.1:8081',
  'http://192.168.0.141:8081', // Expo DevTools
  // Allow anything from same LAN subnet (for easier mobile dev)
  /^http:\/\/192\.168\.\d+\.\d+(:\d+)?$/,
] as string[];
