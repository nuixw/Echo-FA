"use client"

import { Button } from "@/components/button"
import { Japan, Sub, Wrapper } from "@/components/kit"
import { Palmier } from "@/components/palmier"
import { Sprite } from "@/components/sprite"
import { APP_NAME } from "@/config/app"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef } from "react"
import s from "./hero.module.scss"

export const Hero = () => {
  const t = useTranslations("Home.Hero")
  const heroRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const hero = heroRef.current

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })
    tl.to(
      `.${s.bg} > div`,
      {
        y: "25%",
        ease: "none"
      },
      "a"
    ).to(
      `.${s.content}`,
      {
        y: "25%",
        ease: "none"
      },
      "a"
    )
  })

  return (
    <>
      <div className={s.hero} ref={heroRef}>
        <Wrapper className={s.wrapper}>
          <div className={s.content}>
            <div className={s.heading}>
              <Sub className={s.sub}>{t("sub")}</Sub>
              <h1 className={s.title}>
                <span className={s.first}>
                  {t("title.line1")}
                  <Sprite
                    id="line-1"
                    viewBox="0 0 196 78"
                    className={s.line1}
                  />
                </span>
                <strong>
                  {t("title.line2")}
                  <Japan className={s.japan}>新しい時代に参加しましょう</Japan>
                </strong>
                <span className={s.gta}>
                  {t("title.line3")}
                  <Sprite
                    id="rp"
                    viewBox="0 0 140 83"
                    className={s.rp}
                    title="RP"
                  />
                </span>
              </h1>
              <div className={s.btn}>
                <Button reverse>{t("discover")}</Button>
                <Button reverse secondary>
                  {t("join")}
                </Button>
              </div>
            </div>
          </div>
          <div className={s.girl}>
            <Image
              src="/img/home-hero-girl.webp"
              alt={APP_NAME}
              width={667}
              height={1223}
              quality={100}
              draggable={false}
              sizes="(max-width: 500px) 350px, (max-width: 768px)  450px, (max-width: 900px) 550px, 667px"
              priority
            />
          </div>
        </Wrapper>
        <div className={s.bg}>
          <div />
        </div>
      </div>
      <Palmier className={s.palmier} />
    </>
  )
}
