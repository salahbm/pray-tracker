const defaultLocale = "en"
const locales = ["en", "ru", "uz"]

type Locale = (typeof locales)[number]

export { defaultLocale, locales, type Locale }
