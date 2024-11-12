"use client"

import { useLenis } from "@/libs/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useLayoutEffect } from "react"

export const ScrollTriggerConfig = () => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.clearScrollMemory("manual")
  }, [])

  const lenis = useLenis(ScrollTrigger.update)
  useEffect(() => ScrollTrigger.refresh(), [lenis])

  return null
}
