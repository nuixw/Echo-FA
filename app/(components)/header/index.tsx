"use client"

import { Logo } from "@/components/logo"
import { Sprite } from "@/components/sprite"
import useScroll from "@/hooks/useScroll"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { Nav } from "../nav"
import s from "./header.module.scss"

export const Header = () => {
  const { y } = useScroll()
  const pathname = usePathname()

  return (
    <header className={clsx(s.header, (y > 50 || pathname !== "/") && s.fix)}>
      <div className={s.wrapper}>
        <Nav />
        <div className={clsx(s.section, s.left)}>
          <div className={s.back} />
        </div>
        <div className={clsx(s.section, s.right)}>
          <div className={s.back} />
        </div>
        <div className={s.middle}>
          <Logo className={s.logo} />
          <Sprite id="fr" viewBox="0 0 38 28" className={s.fr} />
          <Sprite
            id="corner-bottom-right"
            viewBox="0 0 53 27"
            className={clsx(s.corner, s.br)}
          />
          <Sprite
            id="corner-bottom-left"
            viewBox="0 0 53 27"
            className={clsx(s.corner, s.bl)}
          />
          <Sprite
            id="corner-top-right"
            viewBox="0 0 53 27"
            className={clsx(s.corner, s.tr)}
          />
          <Sprite
            id="corner-top-left"
            viewBox="0 0 53 27"
            className={clsx(s.corner, s.tl)}
          />
          <div className={s.bottom} />
        </div>
      </div>
      <div className={s.shadow} />
    </header>
  )
}
