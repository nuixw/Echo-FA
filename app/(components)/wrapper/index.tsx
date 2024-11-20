"use client"

import { LENIS } from "@/config/constants"
import { useRealViewport } from "@/hooks/useRealViewport"
import { useReveal } from "@/hooks/useReveal"
import { useLenis } from "@/libs/lenis"
import { GSAP } from "../gsap"
import { Header } from "../header"
import { Lenis } from "../lenis"
import s from "./wrapper.module.scss"

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  useReveal()
  useRealViewport()

  const lenis = useLenis()

  lenis?.scrollTo(5000, { duration: 0.1 })

  return (
    <>
      <GSAP scrollTrigger={true} />
      <Lenis root options={LENIS} />
      <Header />
      <main className={s.main}>{children}</main>
    </>
  )
}
