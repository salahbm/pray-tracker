import { Metadata, Viewport } from "next"
import { Footer } from "@/components/shared/footer"
import { SiteHeader } from "@/components/shared/site-header"
import RootProvider from "@/providers/root"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#f9fbfb",
  colorScheme: "light",
}

export const metadata: Metadata = {
  title: "Noor · Shared Prayer Companion",
  description: "Noor brings prayer circles together with shared requests, reminders, and answered stories.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider>
      <SiteHeader />
      {children}
      <Footer />
    </RootProvider>
  )
}
