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
  ...props
}: ButtonProps) => {
  const ref = useRef(null)
  const Content = (
    <>
      <div className={s.left} />
      {icon && iconPosition == "left" && <Icon icon={icon} />}
      {children && <Glitch parent={ref}>{children}</Glitch>}
      {icon && iconPosition == "right" && <Icon icon={icon} />}
      <div className={s.right} />
    </>
  )

  const classNames = clsx(
    s.btn,
    className,
    reverse && s.reverse,
    secondary && s.secondary
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
      >
        {Content}
      </Link>
    )
  } else {
    return (
      <button
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        {...attrs}
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
