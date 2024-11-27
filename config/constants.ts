import { env } from "@/env"

export const IS_SERVER = typeof window === "undefined"

export const DEBOUNCE_TIME = 500

export const REVALIDATE_TIME =
  env.NEXT_PUBLIC_NODE_ENV === "development" ? 0 : 60 * 60 * 24

export const GSAP_DURATION = 1
export const GSAP_STAGGER = 0.15
export const GSAP_EASE = "none"
export const GSAP_ST_START = "top 90%"

export const LENIS = {
  lerp: 0.2,
  duration: 1
}

export const OBSERVER = {
  threshold: 0,
  root: null,
  rootMargin: "0px"
}

export const TAGS = {
  cart: "cart",
  webstoreData: "webstoreData"
}

export const SHOP = {
  maxCart: 50,
  minToCart: 1,
  maxToCart: 50,
  minCitizen: 3,
  maxCitizen: 20
}

export const GLOBAL_ERROR = `Une erreur est survenue, contactez-nous sur Discord rubrique "bug-report".`

export const UPDATE_CODE_PENAL = "27 Novembre 2024"
export const UPDATE_FAQ = "27 Novembre 2024"
