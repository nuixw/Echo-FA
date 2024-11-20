"use client"

import { Button } from "@/components/button"
import { IconName } from "@/config/icons"
import { DirectionHorizontal } from "@/types/Direction"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import s from "./nav.module.scss"

interface NavLinkProps {
  label: string
  href: string
  side: DirectionHorizontal
  sub?: boolean
  icon?: IconName
}

const NavLink = ({ label, href, side, sub, icon }: NavLinkProps) => {
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
        <Button
          href={!sub && href}
          reverse={!sub && reverse}
          className={className}
          icon={icon}
        >
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
                    <NavLink
                      href={sub.href}
                      label={sub.label}
                      side={side}
                      icon={sub.icon}
                    />
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
  icon?: IconName
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
        },
        {
          label: "FAQ",
          href: "/faq"
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
      right: true,
      sub: [
        {
          label: "TikTok",
          href: "https://tiktok.com",
          icon: "tiktok"
        },
        {
          label: "Youtube",
          href: "https://youtube.com",
          icon: "youtube"
        },
        {
          label: "Twitter",
          href: "https://x.com",
          icon: "twitter"
        },
        {
          label: "Twitch",
          href: "https://twitch.com",
          icon: "twitch"
        },
        {
          label: "Instagram",
          href: "https://instagram.com",
          icon: "instagram"
        }
      ]
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
