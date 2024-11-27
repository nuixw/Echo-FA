import { Button } from "@/components/button"
import { IconName } from "@/config/icons"
import { NavLinkProps } from "@/config/nav"
import { DirectionHorizontal } from "@/types/Direction"
import clsx from "clsx"
import { usePathname } from "next/navigation"
import s from "./nav.module.scss"

interface NavLinkItemProps extends NavLinkProps {
  side?: DirectionHorizontal
  sub?: boolean
  icon?: IconName
  disabled?: boolean
}

export const NavLink = ({
  label,
  href,
  side,
  sub,
  icon,
  disabled
}: NavLinkItemProps) => {
  const pathname = usePathname()
  const reverse = side === "right"
  const className = clsx(
    s.item,
    (href === "/" ? pathname === "/" : pathname?.includes(href || "")) &&
      s.active,
    disabled && s.disabled
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
          itemProp="url"
        >
          {label}
        </Button>
      )}
    </>
  )
}
