import "@styles/tailwind.css"
import { Metadata, Viewport } from "next"
import { cookies } from "next/headers"
import { COOKIE_KEYS } from "@/constants/cookies"
import { cn } from "@/lib/utils"
import { popinsBold, popinsMedium, popinsRegular, popinsSemibold } from "./font"

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
  return (
    <html lang={language} suppressHydrationWarning>
      <body className={cn(popinsBold.variable, popinsMedium.variable, popinsRegular.variable, popinsSemibold.variable)}>
        {children}
      </body>
    </html>
  )
}
