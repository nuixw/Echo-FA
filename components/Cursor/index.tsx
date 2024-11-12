"use client"

import clsx from "clsx"
import gsap from "gsap"
import { useCallback, useEffect, useRef } from "react"
import { useEventListener } from "usehooks-ts"
import s from "./cursor.module.scss"

export const Cursor = () => {
  const circleRef = useRef(null)
  const circlePointRef = useRef<HTMLDivElement | null>(null)

  const moveCursor = useCallback((e: MouseEvent) => {
    gsap.to(circleRef.current, {
      x: e.clientX,
      y: e.clientY,
      overwrite: true,
      duration: 0.35,
      ease: "power2.out"
    })
  }, [])

  useEventListener("mousemove", moveCursor)

  const handleMouseEnter = useCallback(() => {
    document.body.classList.add("cursor-hover")
  }, [])

  const handleMouseLeave = useCallback(() => {
    document.body.classList.remove("cursor-hover")
  }, [])

  useEffect(() => {
    const buttons = document.querySelectorAll("a, button")
    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleMouseEnter)
      button.addEventListener("mouseleave", handleMouseLeave)
    })

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleMouseEnter)
        button.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [handleMouseEnter, handleMouseLeave])

  return (
    <div className={s.cursor}>
      <div ref={circleRef} className={s.circle}>
        <div
          ref={circlePointRef}
          className={clsx(s.circlePoint, "circle-point")}
        ></div>
      </div>
    </div>
  )
}
