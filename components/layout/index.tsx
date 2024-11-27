"use client"

import { Icon } from "@/components/icon"
import { Wrapper } from "@/components/kit"
import { IconName } from "@/config/icons"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import s from "./layout.module.scss"

interface LayoutDefaultProps {
  icon?: IconName
  bg?: string
  title: string
  children: React.ReactNode
}

export const LayoutDefault = ({
  icon,
  bg,
  title,
  children
}: LayoutDefaultProps) => {
  const bgRef = useRef<HTMLDivElement>(null)
  const bgDivRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.to(bgDivRef.current, {
      y: "50%",
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
  })

  return (
    <div className={s.page}>
      <Wrapper className={s.content}>
        {icon && <Icon icon={icon} className={s.icon} />}
        <h1 dangerouslySetInnerHTML={{ __html: title }} />
        {children}
      </Wrapper>
      <div
        ref={bgRef}
        className={s.bg}
        style={{ "--bg-img": bg } as React.CSSProperties}
      >
        <div ref={bgDivRef} />
      </div>
    </div>
  )
}
