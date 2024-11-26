"use client"

import { Button } from "@/components/button"
import { useBasketStore } from "@/stores/basket"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { CartModal } from "../cart/modal"
import { removeBasket } from "./action"
import s from "./panel.module.scss"

export const Panel = () => {
  const t = useTranslations("Shop.Panel")
  const { logged, basket, authUrl, logout, setLoading } = useBasketStore()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={s.panel}>
      <Button
        className={s.item}
        icon="basket"
        strong={`${logged ? basket?.total_price : 0}€`}
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
