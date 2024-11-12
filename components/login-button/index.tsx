"use client"

import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"

export const LoginButton = () => {
  const t = useTranslations("All")

  return <button onClick={async () => await signIn()}>{t("login")}</button>
}
