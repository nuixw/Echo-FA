"use client"

import { useLenis } from "@/libs/lenis"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { forwardRef, MouseEvent } from "react"

interface LinkProps extends Omit<NextLinkProps, "href"> {
  href: string
  title?: string
  className?: string
  children: React.ReactNode
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => void
  itemProp?: string
}

export const Link = forwardRef<HTMLAnchorElement | HTMLDivElement, LinkProps>(
  ({ href, title, className, onClick, children, itemProp, ...props }, ref) => {
    const lenis = useLenis()
    const pathname = usePathname()
    const isExternal = href.startsWith("http")
    const isAnchor = href.startsWith("#") || href.startsWith(`${pathname}#`)

    const attr = isExternal
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {}

    const handleClick = (e: MouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      if (isAnchor && lenis) {
        e.preventDefault()
        lenis.scrollTo(href)
      }
      onClick?.(e)
    }

    return (
      <NextLink
        ref={ref as React.Ref<HTMLAnchorElement>}
        onClick={handleClick}
        href={href}
        title={title}
        className={className}
        itemProp={itemProp}
        {...props}
        {...attr}
      >
        {children}
      </NextLink>
    )
  }
)

Link.displayName = "Link"
