import { APP_COLOR_PRIMARY, APP_COLOR_SECONDARY, APP_NAME } from "@/config/app"
import { useTranslations } from "next-intl"

export default function manifest() {
  const t = useTranslations("Seo.Default")

  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: t("description"),
    start_url: "/",
    display: "standalone",
    background_color: APP_COLOR_PRIMARY,
    theme_color: APP_COLOR_SECONDARY,
    icons: [
      {
        src: "/icon",
        sizes: "any",
        type: "image/png"
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "/apple-icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any"
      }
    ]
  }
}
