"use client"

import { useState } from "react"
import { useEventListener } from "usehooks-ts"

interface ScrollPosition {
  x: number
  y: number
}

const useScroll = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0
  })

  useEventListener("scroll", () => {
    setScrollPosition({
      x: window.scrollX,
      y: window.scrollY
    })
  })

  return scrollPosition
}

export default useScroll
