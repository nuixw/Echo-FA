"use client"

import { Button } from "@/components/button"
import { Japan, Sub, Wrapper } from "@/components/kit"
import { Line } from "@/components/line"
import { Palmier } from "@/components/palmier"
import { Sprite } from "@/components/sprite"
import { APP_NAME, APP_URL_DISCOVER } from "@/config/app"
import { NAV_LINKS } from "@/config/nav"
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
      `.${s.illu} img`,
      {
        y: "15%",
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
            </div>
          </div>
          <div className={s.btn}>
            <Button href={APP_URL_DISCOVER} reverse>
              {t("discover")}
            </Button>
            <Button href={NAV_LINKS.rejoindre.href} reverse secondary>
              {t("join")}
            </Button>
          </div>
          <div className={s.illu}>
            <Image
              src="/img/home-hero-car.webp"
              alt={APP_NAME}
              width={1725}
              height={1100}
              sizes="(max-width: 600px) 600px, (max-width: 1200px) 1200px, 1725px"
              quality={100}
              draggable={false}
              priority
            />
          </div>
        </Wrapper>
        <div className={s.bg}>
          <div />
        </div>
        <Line
          direction="left"
          color="primary"
          zIndex={100}
          top={47}
          width={30}
        />
        <Line
          direction="left"
          color="primary"
          zIndex={5}
          top={20}
          width={20}
          left={21}
        />
        <Line
          direction="left"
          color="secondary"
          zIndex={5}
          top={20}
          width={20}
          left={25}
        />
      </div>
      <Palmier className={s.palmier} />
    </>
  )
}
