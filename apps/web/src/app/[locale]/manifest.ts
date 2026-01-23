import { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const t = await getTranslations("manifest")

  return {
    name: t("name"),
    short_name: t("short_name"),
    description: t("description"),
    start_url: "/en",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#101E33",
    lang: "en",
    icons: [
      {
        src: "/logo/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/logo/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
