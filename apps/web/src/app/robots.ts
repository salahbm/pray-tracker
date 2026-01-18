import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*", // Applies to all crawlers
      allow: "/", // Allow indexing of the whole site
    },
    sitemap: "https://noor.app/sitemap.xml",
  }
}
