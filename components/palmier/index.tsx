"use client"

import { DirectionHorizontal } from "@/types/Direction"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import Image from "next/image"
import { useRef } from "react"
import s from "./palmier.module.scss"

interface PalmierProps {
  className?: string
  direction?: DirectionHorizontal
}

export const Palmier = ({ className, direction = "right" }: PalmierProps) => {
  const palmierRef = useRef(null)
  const containerRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      palmierRef.current,
      { y: "15%" },
      {
        y: "-15%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div className={clsx(s.palmier, className)} ref={containerRef}>
      <div ref={palmierRef}>
        <Image
          src={`/img/palmier-${direction}.webp`}
          alt="Palmier"
          width={1124}
          height={1851}
          draggable={false}
          sizes="(max-width: 500px) 350px, (max-width: 768px)  450px, (max-width: 900px) 550px, 667px"
        />
      </div>
    </div>
  )
}
