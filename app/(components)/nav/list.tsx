import { IconName } from "@/config/icons"
import { NavLinkProps } from "@/config/nav"
import { DirectionHorizontal } from "@/types/Direction"
import { NavLink } from "./link"
import s from "./nav.module.scss"

export interface NavItemProps extends NavLinkProps {
  side?: DirectionHorizontal
  left?: boolean
  right?: boolean
  sub?: boolean
  list?: Omit<NavItemProps, DirectionHorizontal>[]
  icon?: IconName
}

interface ListProps {
  list: NavItemProps[]
  side: DirectionHorizontal
}

export const List = ({ list, side }: ListProps) => {
  return list.map(
    (item) =>
      item[side] && (
        <li key={item.href} itemProp="name">
          {item.sub ? (
            <>
              <NavLink
                href={item.href}
                label={item.label}
                side={side}
                sub={item.sub && item.sub}
                disabled={item.disabled}
              />
              <ul className={s.sub}>
                {item.list?.map((sub) => (
                  <li key={sub.href} itemProp="name">
                    <NavLink
                      href={sub.href}
                      label={sub.label}
                      side={side}
                      icon={sub.icon}
                      disabled={sub.disabled}
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
