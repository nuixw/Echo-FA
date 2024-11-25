import { Button } from "@/components/button"
import { NAV_LINKS } from "@/config/nav"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import s from "./nav.module.scss"

export const Nav = () => {
  const pathname = usePathname()
  const list = [
    {
      ...NAV_LINKS.vip
    },
    {
      ...NAV_LINKS.coins
    }
  ]

  return (
    <nav className={s.nav}>
      <ul>
        {list.map(({ label, href, icon }) => (
          <li key={href}>
            <Button
              href={href}
              className={clsx(s.item, pathname === href && s.active)}
              reverse
              icon={icon}
            >
              {label}
            </Button>
          </li>
        ))}
      </ul>
      <div className={s.bg}>
        <div className={clsx(s.section, s.right)}>
          <div className={s.back} />
        </div>
      </div>
    </nav>
  )
}
