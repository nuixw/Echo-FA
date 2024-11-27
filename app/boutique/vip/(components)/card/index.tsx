"use client"

import { AddToCart } from "@/app/boutique/(components)/cart/add-to-cart"
import { DeleteToCart } from "@/app/boutique/(components)/cart/delete-to-cart"
import { Icon } from "@/components/icon"
import { Wrapper } from "@/components/kit"
import { Loader } from "@/components/loader"
import { Sprite } from "@/components/sprite"
import { useBasketStore } from "@/stores/basket"
import { TebexPackage } from "@/types/Tebex"
import clsx from "clsx"
import Image from "next/image"
import s from "./card.module.scss"

interface CardProps {
  pkg: TebexPackage | undefined
}

export const Card = ({ pkg }: CardProps) => {
  const { isLoading, vipInBasket } = useBasketStore()

  if (!pkg) return

  return (
    <Wrapper>
      <div className={s.card}>
        <Image
          src="/img/echo-vip.png"
          width={1470}
          height={1291}
          alt="Echo VIP"
          priority
          className={s.crown}
          draggable={false}
        />
        <h2 className={s.title}>
          Devenez VIP pour
          <strong>
            {pkg.base_price.toFixed(2)}€ <small>/mois</small>
          </strong>
          <Sprite id="blur" className={s.blur} viewBox="0 0 467 467" />
        </h2>
        {vipInBasket ? (
          <div className={clsx(s.bottom, isLoading && s.loading)}>
            <Loader className={s.loader} />
            <DeleteToCart packageId={pkg.id} className={s.delete}>
              <span>Retirer du panier</span>
              <Icon icon="trash" />
            </DeleteToCart>
          </div>
        ) : (
          <AddToCart item={pkg} />
        )}
        <div className={s.back} />
        <div className={clsx(s.corner, s.tl)} />
      </div>
    </Wrapper>
  )
}
