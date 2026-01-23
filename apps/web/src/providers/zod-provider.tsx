// providers/zod-locale-provider.tsx
"use client"

import { useEffect } from "react"
import { z } from "zod"
import { Locale } from "@/i18n/config"
import { enErrorMap, koErrorMap } from "@/lib/validations/request.schema"

function applyZodLocale(locale: Locale) {
  const errorMap = locale === "ko" ? koErrorMap : enErrorMap

  try {
    z.setErrorMap(errorMap)
  } catch {}
}

export function ZodLocaleProvider({ locale }: { locale: string }) {
  useEffect(() => {
    const base = locale.split("-")[0] as Locale
    applyZodLocale(base)
  }, [locale])

  return null
}
