"use client"

import { Button } from "@/components/button"
import { DirectionHorizontal } from "@/types/Direction"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import s from "./nav.module.scss"

interface NavLinkProps {
  label: string
  href: string
  side: DirectionHorizontal
  sub?: boolean
}

const NavLink = ({ label, href, side, sub }: NavLinkProps) => {
  const pathname = usePathname()
  const reverse = side === "right"
  const className = clsx(
    s.item,
    (href === "/" ? pathname === "/" : pathname.includes(href)) && s.active
  )

  return (
    <>
      {sub ? (
        <Button reverse={reverse} className={className}>
          {label}
        </Button>
      ) : (
        <Button href={!sub && href} reverse={reverse} className={className}>
          {label}
        </Button>
      )}
    </>
  )
}

interface ListProps {
  list: NavItem[]
  side: DirectionHorizontal
}

const List = ({ list, side }: ListProps) => {
  return list.map(
    (item) =>
      item[side] && (
        <li key={item.href}>
          {item.sub ? (
            <>
              <NavLink
                href={item.href}
                label={item.label}
                side={side}
                sub={item.sub && true}
              />
              <ul className={s.sub}>
                {item.sub.map((sub) => (
                  <li key={sub.href}>
                    <NavLink href={sub.href} label={sub.label} side={side} />
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <NavLink href={item.href} label={item.label} side={side} />
          )}
        </li>
      )
  )
}

interface NavItem {
  label: string
  href: string
  left?: boolean
  right?: boolean
  sub?: Omit<NavItem, DirectionHorizontal>[]
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
      left: true,
      sub: [
        {
          label: "Règlement",
          href: "/reglement"
        },
        {
          label: "Entreprises",
          href: "/entreprises"
        },
        {
          label: "Illégales",
          href: "/illegales"
        },
        {
          label: "Code pénal",
          href: "/code-penal"
        }
      ]
    },
    {
      label: "Boutique",
      href: "/boutique",
      left: true
    },
    {
      label: "Streamers",
      href: "/streamers",
      right: true
    },
    {
      label: "Socials",
      href: "/socials",
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
