// lib/seo.ts
import type { Metadata } from "next"
import type { Locale } from "@/i18n/config"

const SITE_URL = "https://noorapp.uz"

/**
 * Hreflang values (ISO-correct)
 */
const HREFLANG: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  uz: "uz-UZ",
  tr: "tr-TR",
}

/**
 * App name per locale
 */
const APP_NAME: Record<Locale, string> = {
  en: "Noor Pray Tracker",
  ru: "Noor – Намаз и Азан",
  uz: "Noor – Namoz va Azon",
  tr: "Noor – Namaz Vakitleri",
}

/**
 * Default SEO descriptions
 */
const DEFAULT_DESCRIPTION: Record<Locale, string> = {
  en: "Noor Pray Tracker is an Islamic app for accurate prayer times, Qibla direction, Azan reminders, and daily worship support.",
  ru: "Noor — исламское приложение для точного времени намаза, направления киблы и напоминаний азана.",
  uz: "Noor — namoz vaqtlari, qibla yo‘nalishi va azon eslatmalari uchun islomiy ilova.",
  tr: "Noor, namaz vakitleri, kıble yönü ve ezan hatırlatmaları sunan bir İslami uygulamadır.",
}

/**
 * SEO keywords
 */
const DEFAULT_KEYWORDS: Record<Locale, string[]> = {
  en: ["pray tracker", "islamic app", "prayer times", "azan", "qibla", "quran", "muslim app", "noor app"],
  ru: ["намаз", "азан", "молитва", "исламское приложение", "время намаза"],
  uz: ["namoz vaqti", "azon", "islomiy ilova", "qibla", "musulmonlar uchun"],
  tr: ["namaz vakitleri", "ezan", "kıble", "islami uygulama"],
}

const AUTHOR = "Noor Team"
const ORGANIZATION_NAME = "Noor Pray Tracker"
const ORGANIZATION_LOGO = `${SITE_URL}/logo/logo_header_momenti_black_mobile.png`
const TWITTER_HANDLE = "@noorapp"

function abs(path: string) {
  return `${SITE_URL}${path}`
}

/**
 * Main metadata generator
 */
export function meta(opts: {
  locale: Locale
  pathname: string
  title: string
  description?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
  canonicalOverride?: string
  type?: "website" | "article"
  publishedTime?: string
  modifiedTime?: string
}): Metadata {
  const {
    locale,
    pathname,
    title,
    description,
    image,
    keywords,
    noIndex,
    canonicalOverride,
    type = "website",
    publishedTime,
    modifiedTime,
  } = opts

  const canonicalPath = canonicalOverride ?? `/${locale}${pathname}`
  const fullTitle = `${title} | ${APP_NAME[locale]}`
  const desc = description ?? DEFAULT_DESCRIPTION[locale]
  const allKeywords = [...DEFAULT_KEYWORDS[locale], ...(keywords ?? [])]

  const ogImage = image ? (image.startsWith("http") ? image : abs(image)) : abs("/og-image.png")

  return {
    metadataBase: new URL(SITE_URL),

    title: fullTitle,
    description: desc,
    keywords: allKeywords,

    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },

    alternates: {
      canonical: canonicalPath,
      languages: Object.fromEntries(
        (Object.keys(HREFLANG) as Locale[]).map((l) => [HREFLANG[l], abs(`/${l}${pathname}`)])
      ),
    },

    openGraph: {
      type,
      title: fullTitle,
      description: desc,
      siteName: APP_NAME[locale],
      url: abs(canonicalPath),
      locale: HREFLANG[locale],
      images: [{ url: ogImage, width: 1200, height: 630 }],
      ...(type === "article" && publishedTime
        ? {
            publishedTime,
            modifiedTime: modifiedTime ?? publishedTime,
          }
        : {}),
    },

    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      title: fullTitle,
      description: desc,
      images: [ogImage],
    },

    authors: [{ name: AUTHOR }],
    publisher: ORGANIZATION_NAME,
  }
}

/**
 * Organization schema (Islamic app)
 */
export function generateOrganizationSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORGANIZATION_NAME,
    url: SITE_URL,
    logo: ORGANIZATION_LOGO,
    description: DEFAULT_DESCRIPTION[locale],
    sameAs: [],
  }
}

/**
 * Website schema
 */
export function generateWebsiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: APP_NAME[locale],
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION[locale],
    inLanguage: HREFLANG[locale],
  }
}
