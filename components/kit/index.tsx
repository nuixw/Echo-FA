"use client"

import clsx from "clsx"
import { HTMLAttributes, ReactNode } from "react"
import s from "./kit.module.scss"

interface ElementProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const BaseElement = ({ children, className, ...props }: ElementProps) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  )
}

const Section = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(s.section, className)} />
)

const Content = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(s.content, className)} />
)

export { Content, Section }
