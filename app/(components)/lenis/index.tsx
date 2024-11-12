"use client"

import { ReactLenis } from "lenis/react"

interface LenisProps {
  root: boolean
  options: any
}

export function Lenis({ root, options }: LenisProps) {
  return <ReactLenis root={root} options={options} />
}
