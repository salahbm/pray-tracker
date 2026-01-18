import { cookies } from "next/headers"
import { getRequestConfig } from "next-intl/server"
import { COOKIE_KEYS } from "@/constants/cookies"

export default getRequestConfig(async () => {
  const store = await cookies()
  const locale = store.get(COOKIE_KEYS.LANGUAGE)?.value || "en"

  return {
    locale,
    messages: (await import(`../../locales/${locale}.json`)).default,
  }
})
