"use client"

import { LENIS } from "@/config/constants"
import { useRealViewport } from "@/hooks/useRealViewport"
import { useReveal } from "@/hooks/useReveal"
import { GSAP } from "../gsap"
import { Lenis } from "../lenis"

interface WrapperProps {
  children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
  useReveal()
  useRealViewport()

  return (
    <>
      <GSAP scrollTrigger={true} />
      <Lenis root options={LENIS} />
      <main>{children}</main>
    </>
  )
}
