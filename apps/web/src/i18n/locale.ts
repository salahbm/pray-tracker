"use server"

import { defaultLocale, Locale } from "./config"

async function getUserLocale() {
  return defaultLocale
}

async function setUserLocale(_: Locale) {
  return
}

export { getUserLocale, setUserLocale }
