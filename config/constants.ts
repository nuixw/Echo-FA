import { env } from "@/env"

export const REVALIDATE_TIME =
  env.NEXT_PUBLIC_NODE_ENV === "development" ? 0 : 60 * 60 * 24

export const GSAP_DURATION = 1
export const GSAP_STAGGER = 0.15
export const GSAP_EASE = "none"
export const GSAP_ST_START = "top 90%"

export const LENIS = {
  lerp: 0.1,
  duration: 1.5,
  wheelMultiplier: 0.9
}
