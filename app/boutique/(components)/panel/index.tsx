"use client"

import { Button } from "@/components/button"
import { removeSearchParams } from "@/libs/utils"
import { useBasketStore } from "@/stores/basket"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { toast } from "sonner"
import { CartModal } from "../cart/modal"
import { removeBasket } from "./action"
import s from "./panel.module.scss"

const PanelContent = () => {
  const t = useTranslations("Shop.Panel")
  const { complete, logged, basket, authUrl, logout, setLoading, totalPrice } =
    useBasketStore()
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get("cancel") && !complete) {
      setIsOpen(true)
      removeSearchParams(searchParams)
      setTimeout(() => toast.error("Vous avez annulé le paiement."), 100)
    }
  }, [searchParams, complete])

  return (
    <div className={s.panel}>
      <Button
        className={s.item}
        icon="basket"
        strong={`${logged ? totalPrice.toFixed(2) : 0}€`}
        onClick={() => setIsOpen(true)}
      >
        {t("basket")}
      </Button>
      {logged ? (
        <>
          <Button
            className={clsx(s.item, s.logout)}
            icon="logout"
            onClick={async () => {
              await removeBasket()
              await logout()
              toast.success(t("logout"))
            }}
          >
            {basket?.username}
          </Button>
        </>
      ) : (
        <a
          href={authUrl}
          onClick={() => {
            setLoading(true)
          }}
        >
          <Button className={s.item} icon="fivem">
            {t("login")}
          </Button>
        </a>
      )}
      <div className={s.bg}>
        <div className={clsx(s.section, s.left)}>
          <div className={s.back} />
        </div>
      </div>
      {isOpen && <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  )
}

export const Panel = () => {
  return (
    <Suspense>
      <PanelContent />
    </Suspense>
  )
}
