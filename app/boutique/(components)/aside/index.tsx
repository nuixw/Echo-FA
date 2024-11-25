"use client"

import { Icon } from "@/components/icon"
import { Sprite } from "@/components/sprite"
import { useBasketStore } from "@/stores/basket"
import clsx from "clsx"
import { Nav } from "../nav"
import { Panel } from "../panel"
import s from "./aside.module.scss"

export const Aside = () => {
  const { isLoading } = useBasketStore()

  return (
    <aside className={clsx(s.aside, isLoading && s.loading)}>
      <Nav />
      <Sprite id="triangle" className={s.triangle} viewBox="0 0 118 71" />
      <Panel />
      <Icon icon="loader" className={s.loader} />
      <div className={s.bg}>
        <div className={clsx(s.section, s.left)}>
          <div className={s.back} />
        </div>
        <div className={clsx(s.section, s.right)}>
          <div className={s.back} />
        </div>
      </div>
    </aside>
  )
}
