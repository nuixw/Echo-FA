"use client"

import { removeSearchParams } from "@/libs/utils"
import { useBasketStore } from "@/stores/basket"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import { toast } from "sonner"

interface ProviderProps {
  children: React.ReactNode
}

const ProviderContent = () => {
  const t = useTranslations("Shop.Panel")
  const { logged, complete, fetchBasketId, fetchBasket, fetchAuthUrl } =
    useBasketStore()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchBasketId().then(() => {
      fetchBasket()
      fetchAuthUrl()
    })
  }, [fetchBasketId, fetchBasket, fetchAuthUrl])

  useEffect(() => {
    if (complete) {
      fetchBasketId().then(() => {
        fetchBasket()
        fetchAuthUrl()
      })
    }
  }, [complete, fetchBasketId, fetchBasket, fetchAuthUrl])

  useEffect(() => {
    if (searchParams.get("success") && !logged) {
      toast.success(t("logged"))
      removeSearchParams(searchParams)
    }
  }, [searchParams, logged, t])

  return null
}

export const Provider = ({ children }: ProviderProps) => {
  return (
    <Suspense>
      <ProviderContent />
      {children}
    </Suspense>
  )
}
