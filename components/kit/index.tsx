"use client"

import clsx from "clsx"
import styles from "./kit.module.scss"

interface ElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const BaseElement = ({ children, className, ...props }: ElementProps) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  )
}

const Wrapper = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(styles.wrapper, className)} />
)

const Sub = ({ className, ...props }: ElementProps) => (
  <BaseElement {...props} className={clsx(styles.sub, className)} />
)

const Japan = ({ className, ...props }: ElementProps) => (
  <BaseElement
    {...props}
    aria-hidden="true"
    translate="no"
    className={clsx(styles.japan, className)}
  />
)

export { Japan, Sub, Wrapper }
