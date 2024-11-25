"use client"

import { Button } from "@/components/button"
import { useBasketStore } from "@/stores/basket"
import clsx from "clsx"
import { toast } from "sonner"
import { removeBasket } from "./action"
import s from "./panel.module.scss"

export const Panel = () => {
  const { basket, authUrl, logout, setLoading } = useBasketStore()

  return (
    <div className={s.panel}>
      <Button className={s.item} icon="basket">
        Panier - 0€
      </Button>
      {basket && basket.username ? (
        <>
          <Button
            className={s.item}
            icon="logout"
            onClick={async () => {
              await removeBasket()
              await logout()
              toast.success("Vous êtes déconnecté")
            }}
          >
            {basket.username}
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
            Se connecter
          </Button>
        </a>
      )}
      <div className={s.bg}>
        <div className={clsx(s.section, s.left)}>
          <div className={s.back} />
        </div>
      </div>
    </div>
  )
}
