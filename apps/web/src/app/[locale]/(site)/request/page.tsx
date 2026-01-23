import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"
import { requestService } from "@/services/request.service"
import { RequestView } from "@/views/request"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()
  const keywords = t.raw("meta.request.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/request",
    title: t("meta.request.title"),
    description: t("meta.request.description"),
    keywords,
    image: "/images/request-og.jpg",
  })
}

export default async function RequestPage(): Promise<React.JSX.Element> {
  try {
    // Fetch initial filter data for SSR
    const initialFilters = await requestService.getFilters()

    return <RequestView initialFilters={initialFilters} />
  } catch {
    return <RequestView />
  }
}
