import { NextIntlClientProvider } from "next-intl"
import { FC, PropsWithChildren } from "react"
import CursorFollow from "@/components/shared/cursor"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "./breakpoint-indicator"
import { QueryProvider } from "./query"
import { RouteOverlay } from "./transition"

const RootProvider: FC<PropsWithChildren & { locale: string }> = ({ children, locale }) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>{children}</QueryProvider>
      <RouteOverlay />
      <TailwindIndicator />
      <CursorFollow />
      <Toaster />
    </NextIntlClientProvider>
  )
}

export default RootProvider
