const defaultLocale = "en"
const locales = ["en"]

type Locale = (typeof locales)[number]

export { defaultLocale, locales, type Locale }
