import { APP_NAME } from "@/config/app"
import { env } from "@/env"
import { getLocale, getTranslations } from "next-intl/server"
import { headers } from "next/headers"

export async function MetadataSeo(translate: string) {
  const locale = await getLocale()
  const t = await getTranslations(translate)
  const title = `${APP_NAME} — ${t("title")}`
  const description = t("description")
  const host = headers().get("host")
  const protocol = env.NEXT_PUBLIC_NODE_ENV === "development" ? "http" : "https"
  const baseUrl = `${protocol}://${host}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: APP_NAME,
      locale,
      images: [
        {
          url: `${baseUrl}/img/thumbnail.jpg`,
          alt: description
        }
      ]
    }
  }
}
