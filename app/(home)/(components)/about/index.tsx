"use client"

import { Button } from "@/components/button"
import { Japan, Sub, Wrapper } from "@/components/kit"
import { Line } from "@/components/line"
import { Palmier } from "@/components/palmier"
import { APP_NAME } from "@/config/app"
import { NAV_LINKS } from "@/config/nav"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef } from "react"
import s from "./about.module.scss"

export const About = () => {
  const t = useTranslations("Home.About")
  const aboutRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      `.${s.bg} > div`,
      {
        y: "-15%"
      },
      {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: `.${s.bg}`,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
    gsap.fromTo(
      `.${s.car} > img`,
      {
        x: "25%",
        rotate: 10
      },
      {
        x: "0%",
        rotate: 0,
        ease: "none",
        scrollTrigger: {
          trigger: `.${s.car}`,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    )
  })

  return (
    <div className={s.about} ref={aboutRef}>
      <Wrapper className={s.wrapper}>
        <div className={s.heading}>
          <Sub className={s.sub}>{t("sub")}</Sub>
          <h2 className={s.title}>
            <span className={s.l1}>{t("title.line1")}</span>
            <span className={s.l2}>
              {t("title.line2")}
              <Japan className={s.japan}>について</Japan>
            </span>
            <span className={s.l3}>{t("title.line3")}</span>
          </h2>
        </div>
        <div className={s.content}>
          <p className={s.p1}>{t("p1")}</p>
          <p className={s.p2}>{t("p2")}</p>
        </div>
        <Button href={NAV_LINKS.rejoindre.href} reverse secondary>
          {t("join")}
        </Button>
      </Wrapper>
      <div className={s.car}>
        <Image
          src="/img/home-about-car.webp"
          alt={APP_NAME}
          width={1371}
          height={1097}
          quality={100}
          draggable={false}
          sizes="(max-width: 500px) 350px, (max-width: 768px)  450px, (max-width: 900px) 550px, 667px"
        />
        <Line
          direction="right"
          color="primary"
          zIndex={1500}
          top={53}
          width={30}
        />
        <Line
          direction="right"
          color="secondary"
          zIndex={1500}
          top={50}
          width={45}
        />
        <Line
          direction="right"
          color="primary"
          zIndex={-1}
          top={25}
          width={50}
          right={20}
        />
      </div>
      <div className={s.bg}>
        <div />
      </div>
      <Palmier className={s.palmier} direction="left" />
    </div>
  )
}
