import { MetadataRoute } from "next"

// 1. Define your base URL
const baseUrl = "https://momenti.biz"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 2. Fetch your dynamic "works" data
  // Replace this with your actual database call or API fetch
  //   const worksData = await fetch("api.momenti.biz").then((res) => res.json())

  // 3. Map your works to the sitemap format
  //   const workUrls = worksData.map((work: { id: string; updatedAt: string }) => ({
  //     url: `${baseUrl}/works/${work.id}`,
  //     lastModified: new Date(work.updatedAt),
  //     changeFrequency: "monthly" as const,
  //     priority: 0.6,
  //   }))

  // 4. Return combined static and dynamic routes
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/request`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
