import { MetadataRoute } from "next"
import { locales } from "@/i18n/config"

const baseUrl = "https://noorapp.uz"

type Route = {
  path: string
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"
  priority: number
}

/**
 * Static routes configuration
 */
const staticRoutes: Route[] = [
  {
    path: "",
    changeFrequency: "weekly",
    priority: 1.0,
  },
  {
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/privacy",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/terms",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/request",
    changeFrequency: "monthly",
    priority: 0.8,
  },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date()

  // Generate URLs for all static routes in both languages
  const staticUrls: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of staticRoutes) {
      staticUrls.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route.path}`,
            ru: `${baseUrl}/ru${route.path}`,
            uz: `${baseUrl}/uz${route.path}`,
            tr: `${baseUrl}/tr${route.path}`,
          },
        },
      })
    }
  }

  // Fetch dynamic works data
  // let workUrls: MetadataRoute.Sitemap = []
  // try {
  //   const worksResponse = await workService.getWorks()

  //   workUrls = worksResponse.list.flatMap((work) =>
  //     locales.map((locale) => ({
  //       url: `${baseUrl}/${locale}/work/${work.workNo}`,
  //       lastModified: new Date(work.updateAt),
  //       changeFrequency: "monthly" as const,
  //       priority: 0.7,
  //       alternates: {
  //         languages: {
  //           ko: `${baseUrl}/ko/work/${work.workNo}`,
  //           en: `${baseUrl}/en/work/${work.workNo}`,
  //         },
  //       },
  //     }))
  //   )
  // } catch (error) {
  //   console.error("Error fetching works for sitemap:", error)
  // }

  return [...staticUrls]
}
