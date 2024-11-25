import { APP_THEME_COLOR } from "@/config/app"
import { MetadataSeo } from "@/libs/metadata"
import "@/styles/globals.scss"
import { Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import NextTopLoader from "nextjs-toploader"
import { Provider } from "./(components)/provider"
import { Wrapper } from "./(components)/wrapper"
import { fonts } from "./fonts"

export async function generateMetadata() {
  return MetadataSeo("Seo.Home")
}

export const viewport: Viewport = {
  themeColor: APP_THEME_COLOR
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} dir="ltr" suppressHydrationWarning={true}>
      <body className={fonts} suppressHydrationWarning={true}>
        <NextTopLoader
          color="var(--primary)"
          height={1}
          showSpinner={false}
          zIndex={9999999}
        />
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <Wrapper>{children}</Wrapper>
          </Provider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
