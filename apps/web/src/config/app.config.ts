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
    url = "https://www.noorapp.uz/api"
  }

  return url
}

export const appConfig = {
  // API Configuration
  api: {
    baseURL: getApiBaseUrl(),
    timeout: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 30000, // 30 seconds
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY: process.env.NEXT_PUBLIC_CHANNEL_TALK_PLUGIN_KEY,
  },

  // App Information
  app: {
    name: "Noor",
    version: "1.0.0",
    email: "hi@noor.co.kr",
    phone: ["02-565-1847", "070-8882-5579"],
    address_ko: "서울시 강남구 논현로 105길 11-3",
    address_en: "11-3, Nonhyeon-ro 105-gil, Gangnam-gu, Seoul, Republic of Korea",
    company_profile: "/pdf/Noor-Profile.pdf",
    social: {
      facebook: "https://www.facebook.com/noor",
      instagram: "https://www.instagram.com/noor",
      blog: "https://blog.naver.com/noor",
    },
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enablePushNotifications: true,
  },
} as const
