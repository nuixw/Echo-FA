"use client"

import { Button } from "@/components/button"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import s from "./nav.module.scss"

interface ListProps {
  list: NavItem[]
  side: "left" | "right"
}

const List = ({ list, side }: ListProps) => {
  const pathname = usePathname()
  return list.map(
    (item) =>
      item[side] && (
        <li>
          <Button
            href={item.href}
            reverse={side === "right"}
            className={clsx(
              s.item,
              (item.href === "/"
                ? pathname === "/"
                : pathname.includes(item.href)) && s.active
            )}
          >
            {item.label}
          </Button>
        </li>
      )
  )
}

interface NavItem {
  label: string
  href: string
  left?: boolean
  right?: boolean
}

export const Nav = () => {
  const list: NavItem[] = [
    {
      label: "Accueil",
      href: "/",
      left: true
    },
    {
      label: "Serveur",
      href: "/serveur",
      left: true
    },
    {
      label: "Boutique",
      href: "/boutique",
      left: true
    },
    {
      label: "Discord",
      href: "/discord",
      right: true
    },
    {
      label: "Streamers",
      href: "/streamers",
      right: true
    },
    {
      label: "Voter",
      href: "/voter",
      right: true
    }
  ]

  return (
    <nav className={s.nav}>
      <ul>
        <List list={list} side="left" />
        <li className={s.separator} />
        <List list={list} side="right" />
      </ul>
    </nav>
  )
}
