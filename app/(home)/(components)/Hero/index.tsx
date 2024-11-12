"use client"

import { Link } from "@/components/link"
import { LoginButton } from "@/components/login-button"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import { useLocale, useTranslations } from "next-intl"

type Props = {
  session: Session | null
}

export const Hero = ({ session }: Props) => {
  const t = useTranslations("Home")
  const locale = useLocale()

  function onLogoutClick() {
    signOut()
  }

  return (
    <>
      {session ? (
        <>
          <p>name: {session.user?.name}</p>
          <p>id: {session.user?.id}</p>
          <p>{/* <img src={session.user?.image} alt="" /> */}</p>
          <p>
            <Link href="test">Test</Link>
          </p>
          <button onClick={onLogoutClick} type="button">
            {t("logout")}
          </button>
        </>
      ) : (
        <>
          <p>{t("loggedOut")}</p>
          <LoginButton />
          <div id="test">test</div>
        </>
      )}
      <br />
      <br />
    </>
  )
}
