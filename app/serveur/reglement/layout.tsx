"use client"

import { Wrapper } from "@/components/kit"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Aside } from "./(components)/aside"
import { Breadcrumb } from "./(components)/breadcrumb"
import s from "./layout.module.scss"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  useGSAP(() => {
    gsap.to(`.${s.bg} > div`, {
      y: "50%",
      ease: "none",
      scrollTrigger: {
        trigger: `.${s.bg}`,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
  })

  return (
    <div className={s.layout}>
      <Wrapper className={s.wrapper}>
        <Aside />
        <div className={s.content}>
          <Breadcrumb />
          {children}
        </div>
      </Wrapper>
      <div className={s.bg}>
        <div />
      </div>
    </div>
  )
}
