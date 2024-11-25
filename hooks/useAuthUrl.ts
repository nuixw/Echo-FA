"use client"

import { env } from "@/env"
import { getAuthUrl } from "@/services/tebex"
import { TebexBasket } from "@/types/Tebex"
import { useEffect, useState } from "react"

export const useAuthUrl = (basket: TebexBasket | undefined) => {
  const [authUrl, setAuthUrl] = useState<string | undefined>(undefined)
  const returnUrl =
    env.NEXT_PUBLIC_NODE_ENV == "development"
      ? "http://localhost:3000"
      : env.NEXT_PUBLIC_URL ?? "about:blank"

  useEffect(() => {
    if (basket && authUrl === undefined) {
      getAuthUrl(basket.ident, `${returnUrl}/boutique`).then((authUrls) => {
        if (authUrls[0]) {
          setAuthUrl(authUrls[0].url)
        }
      })
    }
  }, [basket])

  return authUrl
}
