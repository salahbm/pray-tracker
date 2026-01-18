import "@styles/tailwind.css"
import { Metadata, Viewport } from "next"
import { cn } from "@/lib/utils"
import { popinsBold, popinsMedium, popinsRegular, popinsSemibold } from "./font"

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(popinsBold.variable, popinsMedium.variable, popinsRegular.variable, popinsSemibold.variable)}>
        {children}
      </body>
    </html>
  )
}
