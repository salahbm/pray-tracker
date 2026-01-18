import { type NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const config: NextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2hrn0ujm7w1zq.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "momenti-renew.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },

  rewrites: async () => [
    { source: "/healthz", destination: "/api/health" },
    { source: "/api/healthz", destination: "/api/health" },
    { source: "/health", destination: "/api/health" },
    { source: "/ping", destination: "/api/health" },
  ],
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(config)
