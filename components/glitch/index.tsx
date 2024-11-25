"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"
import { useEventListener } from "usehooks-ts"
import s from "./glitch.module.scss"

interface GlitchProps {
  glitchChars?: string
  duration?: number
  repeat?: number
  parent: React.RefObject<HTMLElement>
  children: React.ReactNode
}

export const Glitch = ({
  glitchChars = "!<>-_\\/[]{}—=+*^?#________",
  children,
  parent,
  duration = 0.1,
  repeat = 3
}: GlitchProps) => {
  const spanRef = useRef<HTMLSpanElement>(null)
  const originalText = children?.toString() || ""

  const { contextSafe } = useGSAP({ scope: parent })

  const onGlitch = contextSafe(() => {
    const text = parent.current
    if (!text) return

    const span = spanRef.current
    if (!span) return

    const tl = gsap.timeline()

    tl.to(text, {
      duration,
      onUpdate: () => {
        const glitched = Array.from(originalText)
          .map((char) => {
            if (Math.random() < 0.3) {
              return glitchChars[Math.floor(Math.random() * glitchChars.length)]
            }
            return char
          })
          .join("")
        span.setAttribute("data-glitch", glitched)
      },
      repeat
    }).to(text, {
      duration,
      onComplete: () => {
        span.setAttribute("data-glitch", originalText)
      }
    })
  })

  useEventListener("mouseenter", onGlitch, parent)

  return (
    <span ref={spanRef} data-glitch={children} className={s.glitch}>
      <span>{children}</span>
    </span>
  )
}
