"use client"

import { Icon } from "@/components/icon"
import { Wrapper } from "@/components/kit"
import { Link } from "@/components/link"
import { Logo } from "@/components/logo"
import { Palmier } from "@/components/palmier"
import { APP_NAME } from "@/config/app"
import { NAV_LINKS } from "@/config/nav"
import { SOCIALS } from "@/config/socials"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import s from "./footer.module.scss"

interface FooterLinkProps {
  href?: string
  label: string
  disabled?: boolean
}

const FooterLink = ({ href, label, disabled }: FooterLinkProps) =>
  href ? (
    <Link href={href} className={clsx(disabled && s.disabled)}>
      {label}
    </Link>
  ) : (
    <span>{label}</span>
  )

export const Footer = () => {
  const pathname = usePathname()
  const t = useTranslations("Footer")
  const list = [
    {
      title: APP_NAME,
      color: "primary",
      list: [
        NAV_LINKS.home,
        NAV_LINKS.rejoindre,
        NAV_LINKS.streamers,
        NAV_LINKS.voter
      ]
    },
    {
      title: "Serveur",
      color: "secondary",
      list: [NAV_LINKS.reglement, NAV_LINKS.penal, NAV_LINKS.faq]
    },
    {
      title: "Boutique",
      color: "tertiary",
      list: [NAV_LINKS.coins, NAV_LINKS.vip]
    },
    {
      title: "Informations",
      color: "quaternary",
      list: [
        NAV_LINKS.contact,
        NAV_LINKS.legal,
        NAV_LINKS.cgv,
        NAV_LINKS.sitemap
      ]
    }
  ]

  useGSAP(
    () => {
      gsap.from(`.${s.bg} > div`, {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: `.${s.bg}`,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      })
    },
    { dependencies: [pathname], revertOnUpdate: true }
  )

  return (
    <>
      {pathname === "/" && <Palmier className={s.palmier} />}
      <footer className={s.footer}>
        <Wrapper>
          <ul className={s.menu}>
            {list.map(({ title, color, list }, i) => (
              <li
                key={i}
                style={{ "--color": `var(--${color})` } as React.CSSProperties}
              >
                <h3>{title}</h3>
                <ul>
                  {list.map((item) => (
                    <li key={item.href}>
                      <FooterLink {...item} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Wrapper>
        <Wrapper className={s.bottom}>
          <div className={s.left}>
            <Logo className={s.logo} />
            <p>
              <span>2024-2025. {t("copyright")}</span>
              <small>{t("approuve", { name: APP_NAME })}</small>
            </p>
          </div>
          <div className={s.right}>
            {SOCIALS.map(({ href, icon, label }) => (
              <Link key={href} href={href as string} title={label}>
                <Icon icon={icon} />
              </Link>
            ))}
          </div>
        </Wrapper>
        <div className={s.bg}>
          <div />
        </div>
      </footer>
    </>
  )
}
