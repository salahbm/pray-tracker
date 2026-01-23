import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"
import { COOKIE_KEYS } from "@/constants/cookies"
import { defaultLocale } from "./config"

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get(COOKIE_KEYS.LANGUAGE)?.value || defaultLocale

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  }
})
