import { MetadataRoute } from "next"
import { getTranslations } from "next-intl/server"

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  // Use a specific namespace or fallback to default
  const t = await getTranslations("manifest")

  return {
    name: t("name"),
    short_name: t("short_name"), // Displayed on the home screen
    description: t("description"), // For SEO and app discovery
    start_url: "/",
    display: "standalone", // Makes it look like a native app (no address bar)
    background_color: "#ffffff", // Splash screen background
    theme_color: "#101E33", // Color of the browser toolbar/task switcher
    icons: [
      {
        src: "/logo/logo_header_momenti_black_mobile.png", // !TODO need to change into correct resolution
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable", // Critical for Android to avoid white borders
      },
      {
        src: "/logo/logo_header_momenti_black_mobile.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
