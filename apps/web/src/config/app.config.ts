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
    url = "https://www.momenti.biz/api"
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
    name: "Momenti",
    version: "1.0.0",
    email: "hi@momenti.co.kr",
    phone: ["02-565-1847", "070-8882-5579"],
    address_ko: "서울시 강남구 논현로 105길 11-3",
    address_en: "11-3, Nonhyeon-ro 105-gil, Gangnam-gu, Seoul, Republic of Korea",
    company_profile: "/pdf/Momenti-Profile.pdf",
    social: {
      facebook: "https://www.facebook.com/momenti",
      instagram: "https://www.instagram.com/momenti",
      blog: "https://blog.naver.com/momenti",
    },
  },

  // Feature Flags
  features: {
    enableAnalytics: true,
    enablePushNotifications: true,
  },
} as const
