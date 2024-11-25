"use client"

import { useBasketStore } from "@/stores/basket"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

interface ProviderProps {
  children: React.ReactNode
}

export const Provider = ({ children }: ProviderProps) => {
  const { fetchBasketId, fetchBasket, fetchAuthUrl } = useBasketStore()
  // const { fetchWebstoreData } = useWebstoreStore()
  const searchParams = useSearchParams()

  useEffect(() => {
    fetchBasketId().then(() => {
      fetchBasket()
      fetchAuthUrl()
    })
  }, [fetchBasketId, fetchBasket, fetchAuthUrl])

  // useEffect(() => {
  //   fetchWebstoreData()
  // }, [fetchWebstoreData])

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Vous êtes connecté")
      const url = new URL(window.location.href)
      url.searchParams.delete("success")
      window.history.replaceState({}, "", url)
    }
  }, [searchParams])

  return children
}
