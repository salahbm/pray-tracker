import { NextIntlClientProvider } from "next-intl"
import { FC, PropsWithChildren } from "react"
import CursorFollow from "@/components/shared/cursor"
import { Toaster } from "@/components/ui/sonner"
import { TailwindIndicator } from "./breakpoint-indicator"
import { QueryProvider } from "./query"
import { ZodLocaleProvider } from "./zod-provider"

const RootProvider: FC<PropsWithChildren & { locale: string }> = ({ children, locale }) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>{children}</QueryProvider>
      <Toaster />
      <CursorFollow />
      <TailwindIndicator />
      <ZodLocaleProvider locale={locale} />
    </NextIntlClientProvider>
  )
}

export default RootProvider
