import { defineRouting } from "next-intl/routing"
import { COOKIE_KEYS } from "@/constants/cookies"
import { defaultLocale, locales } from "./config"

export const routing = defineRouting({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale,

  localePrefix: "always",

  localeDetection: false,

  localeCookie: {
    name: COOKIE_KEYS.LANGUAGE,
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
    sameSite: "lax",
    secure: true,
  },
})
