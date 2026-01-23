import { Metadata, Viewport } from "next"
import { notFound } from "next/navigation"
import { hasLocale } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { routing } from "@/i18n/routing"
import { generateOrganizationSchema, generateWebsiteSchema, meta } from "@/lib/seo"
import RootProvider from "@/providers/root"
import { PropsWithChildren } from "@/types/global.types"
import { pretendard } from "../font"

import "@styles/tailwind.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "var(--white)",
  colorScheme: "light",
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()
  const keywords = t.raw("meta.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/",
    title: t("meta.title"),
    description: t("meta.description"),
    keywords,
  })
}

export default async function RootLayout({ children, params }: PropsWithChildren) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Generate organization schema
  const organizationSchema = generateOrganizationSchema(locale as Locale)
  // Generate website schema
  const websiteSchema = generateWebsiteSchema(locale as Locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      </head>
      <body className={pretendard.variable}>
        <RootProvider locale={locale}>{children}</RootProvider>
      </body>
    </html>
  )
}
