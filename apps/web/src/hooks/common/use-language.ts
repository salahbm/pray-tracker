import { useTransition } from "react"

import { Locale } from "@/i18n/config"
import { setUserLocale } from "@/i18n/locale"

const useLanguage = () => {
  const [isPending, startTransition] = useTransition()

  function onChangeLanguage(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return { onChangeLanguage, isPending }
}

export default useLanguage
