/**
 * Get the appropriate API base URL based on environment
 * For mobile development, use your computer's local IP address
 *
 * To find your local IP:
 * - Mac/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
 * - Windows: Run `ipconfig` and look for IPv4 Address
 *
 * Then set NEXT_PUBLIC_API_ENDPOINT in your .env file:
 * NEXT_PUBLIC_API_ENDPOINT=http://YOUR_LOCAL_IP:4000
 */
const getApiBaseUrl = (): string => {
  let url: string

  // Use environment variable if set
  if (process.env.NEXT_PUBLIC_API_ENDPOINT) {
    url = process.env.NEXT_PUBLIC_API_ENDPOINT
  } else {
    // Production default
    url = "https://api.noor.app"
  }

  console.warn(`🌐 [API Config] Using base URL: ${url}`)

  return url
}

export const appConfig = {
  // API Configuration
  api: {
    baseURL: getApiBaseUrl(),
    timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 30000, // 30 seconds
  },

  // App Information
  app: {
    name: "Noor",
    version: "1.0.0",
    email: "support@noor.app",
    phone: ["+1 (555) 418-0912"],
    address_ko: "",
    address_en: "Remote-first team serving communities worldwide",
    company_profile: "/pdf/Noor-Profile.pdf",
    social: {
      facebook: "https://www.facebook.com/noorapp",
      instagram: "https://www.instagram.com/noorapp",
      blog: "https://noor.app/blog",
    },
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enablePushNotifications: true,
  },
} as const
