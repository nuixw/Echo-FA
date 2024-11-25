"use client"

import { getBasket, getBasketId } from "@/services/tebex"
import { TebexBasket } from "@/types/Tebex"
import { useCallback, useEffect, useState } from "react"

export const useBasket = (): TebexBasket | undefined => {
  const [basket, setBasket] = useState<TebexBasket | undefined>(undefined)

  const fetchBasket = useCallback(() => {
    getBasketId().then((basketId) => {
      if (basketId) {
        getBasket(basketId).then((newBasket) => setBasket(newBasket))
      } else {
        fetch("/api/createNewBasket", {
          body: undefined,
          headers: {
            "Content-Type": "application/json; charset=UTF8"
          },
          method: "POST",
          cache: "no-store"
        })
          .then((resp) => resp.json())
          .then((basketId: { basketId: string }) => {
            if (basketId && "basketId" in basketId) {
              getBasket(basketId.basketId).then((newBasket) =>
                setBasket(newBasket)
              )
            }
          })
      }
    })
  }, [])

  useEffect(() => {
    fetchBasket()
  }, [fetchBasket])

  return basket
}
