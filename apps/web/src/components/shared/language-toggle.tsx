"use client"
import { useLocale } from "next-intl"
import React from "react"

import useLanguage from "@/hooks/common/use-language"
import { cn } from "@/lib/utils"

const locales = [
  { id: "ko", name: "KOR" },
  { id: "en", name: "ENG" },
]

const LanguageToggle: React.FC = () => {
  const locale = useLocale()
  const { onChangeLanguage } = useLanguage()
  return (
    <div className="flex items-center justify-center gap-8" aria-label="Language">
      {locales.map((cur) => (
        <button
          key={cur.id}
          onClick={() => onChangeLanguage(cur.id)}
          className={cn(
            "text-body-1 cursor-pointer text-gray-500 underline-offset-4 hover:underline",
            locale === cur.id && "text-black"
          )}
        >
          {cur.name}
        </button>
      ))}
    </div>
  )
}

export { LanguageToggle }
