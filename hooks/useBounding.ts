"use client"

import { useEffect, useState } from "react"

export interface BoundingProps {
  width: number
  height: number
  left: number
  top: number
  right: number
  bottom: number
}

export type UseBoundingProps = {
  ref: React.RefObject<HTMLElement>
  parentRef: React.RefObject<HTMLElement>
}

const useBounding = ({ ref, parentRef }: UseBoundingProps): BoundingProps => {
  const [bounding, setBounding] = useState<BoundingProps>(() => ({
    width: 0,
    height: 0,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  }))

  useEffect(() => {
    const element = ref.current
    const parent = parentRef.current
    if (!element || !parent) return

    const updateElementInfo = () => {
      const elementRect = element.getBoundingClientRect()
      const parentRect = parent.getBoundingClientRect()

      setBounding({
        width: element.offsetWidth,
        height: element.offsetHeight,
        left: elementRect.left - parentRect.left,
        top: elementRect.top - parentRect.top,
        right: parentRect.right - elementRect.right,
        bottom: parentRect.bottom - elementRect.bottom
      })
    }

    const resizeObserver = new ResizeObserver(updateElementInfo)
    resizeObserver.observe(element)
    resizeObserver.observe(parent)

    updateElementInfo()

    return () => resizeObserver.disconnect()
  }, [ref, parentRef])

  return bounding
}

export default useBounding
