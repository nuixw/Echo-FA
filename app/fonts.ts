import clsx from "clsx"
import localFont from "next/font/local"

const heading = localFont({
  variable: "--font-heading",
  display: "swap",
  src: [
    {
      path: "../public/fonts/brockmann/brockmann-semibold.woff2",
      weight: "600",
      style: "normal"
    }
  ]
})

const main = localFont({
  variable: "--font-main",
  display: "swap",
  src: [
    {
      path: "../public/fonts/satoshi/Satoshi-Variable.woff2",
      style: "normal"
    }
  ]
})

export const fonts = clsx(heading.variable, main.variable)
