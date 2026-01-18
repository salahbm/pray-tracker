const defaultLocale = "ko"
const locales = ["ko", "en"]

type Locale = (typeof locales)[number]

export { defaultLocale, locales, type Locale }
