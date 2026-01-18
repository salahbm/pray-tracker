import { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import { Footer } from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import { RequestBanner } from "@/components/shared/request-banner"
import { COOKIE_KEYS } from "@/constants/cookies"
import RootProvider from "@/providers/root"
import { menuService } from "@/services/menu.service"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#fff",
  colorScheme: "light",
}

export const metadata: Metadata = {
  title: "Momenti",
  description: "Momenti",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const language = cookieStore.get(COOKIE_KEYS.LANGUAGE)?.value || "ko"

  // Fetch menu for initial data
  const menuData = await menuService.getMenu()
  return (
    <RootProvider locale={language}>
      <Header initialMenuData={menuData} />
      {children}
      <RequestBanner />
      <Footer />
    </RootProvider>
  )
}
