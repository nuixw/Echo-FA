"use client"

import { IconName } from "@/config/icons"
import { DirectionHorizontal } from "@/types/Direction"
import clsx from "clsx"
import { ReactNode, useRef } from "react"
import { Glitch } from "../glitch"
import { Icon } from "../icon"
import { Link } from "../link"
import s from "./button.module.scss"

export interface ButtonProps {
  children?: ReactNode
  icon?: IconName
  iconPosition?: DirectionHorizontal
  href?: string
  className?: string
  disabled?: boolean
  onClick?: () => void
  reverse?: boolean
  secondary?: boolean
  strong?: string
  type?: "submit" | "reset" | "button"
  itemProp?: string
}

export const Button = ({
  children,
  icon,
  iconPosition = "right",
  href,
  className,
  onClick,
  disabled = false,
  reverse = false,
  secondary = false,
  strong,
  type,
  itemProp,
  ...props
}: ButtonProps) => {
  const ref = useRef(null)
  const Content = (
    <>
      <div className={s.left} />
      {icon && iconPosition == "left" && <Icon icon={icon} />}
      {children && <Glitch parent={ref}>{children}</Glitch>}
      {strong && <strong>{strong}</strong>}
      {icon && iconPosition == "right" && <Icon icon={icon} />}
      <div className={s.right} />
    </>
  )

  const classNames = clsx(
    s.btn,
    reverse && s.reverse,
    secondary && s.secondary,
    className
  )

  const attrs = {
    "data-reverse": reverse,
    "data-icon": icon,
    className: classNames,
    onClick,
    disabled
  }

  if (href) {
    return (
      <Link
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        {...attrs}
        href={href}
        ref={ref}
        itemProp={itemProp}
      >
        {Content}
      </Link>
    )
  } else {
    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        {...attrs}
        type={type}
        ref={ref}
      >
        {Content}
      </button>
    )
  }
}

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export const ButtonGroup = ({ children, ...props }: ButtonGroupProps) => (
  <div {...props} className={clsx(s.group, props.className)}>
    {children}
  </div>
)
