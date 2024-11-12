"use client"

import { RefObject, useState } from "react"
import { useEventListener } from "usehooks-ts"

export interface MousePosition {
  x: number
  y: number
}

export type UseMouseProps<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>
}

const useMouse = ({ ref }: UseMouseProps): MousePosition => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEventListener(
    "mousemove",
    (event: MouseEvent) => {
      if (ref.current) {
        const { left, top } = ref.current.getBoundingClientRect()
        setMousePosition({ x: event.clientX - left, y: event.clientY - top })
      }
    },
    ref
  )

  return mousePosition
}

export default useMouse
