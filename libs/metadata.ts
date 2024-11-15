import { APP_NAME } from "@/config/app"
import { env } from "@/env"
import { getLocale, getTranslations } from "next-intl/server"

export async function MetadataSeo(translate: string) {
  const locale = await getLocale()
  const t = await getTranslations(translate)
  const title = `${APP_NAME} — ${t("title")}`
  const description = t("description")

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
          url: env.NEXT_PUBLIC_BASE_URL + "/img/thumbnail.jpg",
          alt: description
        }
      ]
    }
  }
}
