import { env } from "@/env"

export const APP_NAME = "Echo FA"

export const APP_COLOR_PRIMARY = "rgb(1, 8, 26)"
export const APP_COLOR_SECONDARY = "rgb(255, 255, 255)"
export const APP_THEME_COLOR = APP_COLOR_PRIMARY

export const APP_URL =
  env.NEXT_PUBLIC_NODE_ENV == "development"
    ? "http://localhost:3000"
    : env.NEXT_PUBLIC_URL

export const APP_URL_VOTE = "https://serveur-prive.net/grand-theft-auto"
export const APP_URL_DISCOVER = "/serveur/reglement/bases-rp"
