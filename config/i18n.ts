import { getRequestConfig } from "next-intl/server"

export type Locale = (typeof locales)[number]

export const locales = ["fr"] as const
export const defaultLocale: Locale = "fr"

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = defaultLocale

  return {
    locale,
    messages: (await import(`../locales/${locale}.json`)).default
  }
})
