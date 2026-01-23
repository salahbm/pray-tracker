import type { Metadata } from "next"
import { NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Locale } from "@/i18n/config"
import { meta } from "@/lib/seo"
import { AboutView } from "@/views/about"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations()
  const keywords = t.raw("meta.about.keywords") as string[]

  return meta({
    locale: locale as Locale,
    pathname: "/about",
    title: t("meta.about.title"),
    description: t("meta.about.description"),
    keywords,
    image: "/images/about-og.jpg",
  })
}

const About: NextPage<{ params: Promise<{ locale: string }> }> = () => <AboutView />

export default About
