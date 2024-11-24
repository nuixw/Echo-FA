import clsx from "clsx"
import localFont from "next/font/local"

const primary = localFont({
  variable: "--font-primary",
  display: "swap",
  src: [
    {
      path: "../public/fonts/thunder/thunder-vf-variable.woff2",
      style: "normal"
    }
  ]
})

const secondary = localFont({
  variable: "--font-secondary",
  display: "swap",
  src: [
    {
      path: "../public/fonts/triakis/triakis-regular.woff2",
      weight: "400",
      style: "normal"
    }
  ]
})

const tertiary = localFont({
  variable: "--font-tertiary",
  display: "swap",
  src: [
    {
      path: "../public/fonts/inter/Inter-roman-var.woff2",
      style: "normal"
    }
  ]
})

export const fonts = clsx(
  primary.variable,
  secondary.variable,
  tertiary.variable
)
