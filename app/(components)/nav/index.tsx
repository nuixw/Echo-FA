"use client"

import { Button } from "@/components/button"
import { NAV_LINKS } from "@/config/nav"
import { SOCIALS } from "@/config/socials"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { List, NavItemProps } from "./list"
import s from "./nav.module.scss"

export const Nav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const list: NavItemProps[] = [
    {
      ...NAV_LINKS.home,
      left: true
    },
    {
      ...NAV_LINKS.rejoindre,
      left: true
    },
    {
      ...NAV_LINKS.serveur,
      left: true,
      sub: true,
      list: [NAV_LINKS.reglement, NAV_LINKS.penal, NAV_LINKS.faq]
    },
    {
      ...NAV_LINKS.boutique,
      right: true,
      sub: true,
      list: [
        {
          ...NAV_LINKS.vip,
          icon: undefined
        },
        {
          ...NAV_LINKS.coins,
          icon: undefined
        }
      ]
    },
    {
      ...NAV_LINKS.socials,
      right: true,
      sub: true,
      list: SOCIALS
    },
    {
      ...NAV_LINKS.voter,
      right: true
    }
  ]

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <nav className={clsx(s.nav, open && s.open)} data-lenis-prevent>
        <ul itemScope itemType="http://www.schema.org/SiteNavigationElement">
          <List list={list} side="left" />
          <li className={s.separator} />
          <List list={list} side="right" />
        </ul>
      </nav>
      <div className={s.bnav}>
        <Button
          className={s.button}
          icon={open ? "x" : "menu"}
          reverse
          onClick={() => setOpen(!open)}
        />
      </div>
    </>
  )
}
