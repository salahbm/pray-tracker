import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { useTransition } from "react"

import { Locale } from "@/i18n/config"
import { setUserLocale } from "@/i18n/locale"
import { usePathname, useRouter } from "@/i18n/navigation"

const useLanguage = () => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()

  function onChangeLanguage(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
      queryClient.resetQueries()
      router.replace(
        // @ts-expect-error next-intl types
        { pathname, params },
        { locale }
      )
    })
  }

  return { onChangeLanguage, isPending }
}

export default useLanguage
