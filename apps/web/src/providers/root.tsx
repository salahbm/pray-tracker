import { TailwindIndicator } from "./breakpoint-indicator"
import { QueryProvider } from "./query"
import { NextIntlClientProvider } from "next-intl"

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <QueryProvider>{children}</QueryProvider>
      <TailwindIndicator />
    </NextIntlClientProvider>
  )
}
