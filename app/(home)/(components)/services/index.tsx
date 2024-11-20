"use client"

import { Japan, Sub, Wrapper } from "@/components/kit"
import { Line } from "@/components/line"
import { Sprite } from "@/components/sprite"
import { APP_NAME } from "@/config/app"
import { stripTags } from "@/libs/utils"
import { Colors } from "@/types/Colors"
import { useGSAP } from "@gsap/react"
import clsx from "clsx"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { useRef } from "react"
import s from "./services.module.scss"

interface Card {
  color: Colors
  sub: string
  title: string
  desc: string
  japan: string
}

const Card = ({ color, sub, title, desc, japan }: Card) => {
  return (
    <div
      className={s.card}
      style={{ "--color-rgb": `var(--${color}-rgb)` } as React.CSSProperties}
    >
      <Image
        src={`/img/home-services-card-${color}.webp`}
        alt={stripTags(title)}
        width={500}
        height={484}
        quality={100}
        draggable={false}
        sizes="(max-width: 500px) 350px, (max-width: 768px) 450px"
        className={s.cardImg}
      />
      <Sub className={s.cardSub}>{sub}</Sub>
      <h3 className={s.cardTitle} dangerouslySetInnerHTML={{ __html: title }} />
      <p className={s.cardDesc} dangerouslySetInnerHTML={{ __html: desc }} />
      <Japan className={s.cardJapan}>{japan}</Japan>
      <Sprite id="blur" className={s.cardBlur} viewBox="0 0 467 467" />
      <div className={s.cardBack}>
        <div className={clsx(s.cardCorner, s.br)} />
        <div className={clsx(s.cardCorner, s.tl)} />
      </div>
    </div>
  )
}

export const Services = () => {
  const t = useTranslations("Home.Services")
  const servicesRef = useRef<HTMLDivElement>(null)
  const list: Card[] = [
    {
      color: "primary",
      sub: t("list.card1.sub"),
      title: t.raw("list.card1.title"),
      desc: t.raw("list.card1.desc"),
      japan: "カスタム"
    },
    {
      color: "tertiary",
      sub: t("list.card3.sub"),
      title: t.raw("list.card3.title"),
      desc: t.raw("list.card3.desc"),
      japan: "専門家"
    },
    {
      color: "secondary",
      sub: t("list.card2.sub"),
      title: t.raw("list.card2.title"),
      desc: t.raw("list.card2.desc"),
      japan: "アイデア"
    },
    {
      color: "quaternary",
      sub: t("list.card4.sub"),
      title: t.raw("list.card4.title"),
      desc: t.raw("list.card4.desc"),
      japan: "グラス"
    }
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${s.list}`,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    })

    tl.fromTo(
      `.${s.right}`,
      {
        y: "5%"
      },
      {
        y: "-5%",
        ease: "none"
      },
      "a"
    ).fromTo(
      `.${s.left}`,
      {
        y: "-5%"
      },
      {
        y: "5%",
        ease: "none"
      },
      "a"
    )

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
  })

  return (
    <div className={s.services} ref={servicesRef}>
      <Image
        src="/img/home-services-characters.webp"
        alt={APP_NAME}
        width={980}
        height={1308}
        quality={100}
        draggable={false}
        sizes="(max-width: 500px) 350px, (max-width: 768px)  450px, (max-width: 900px) 550px, 667px"
        className={s.characters}
      />
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
        <div className={s.list}>
          <div className={s.left}>
            {list.slice(0, 2).map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
          <div className={s.right}>
            {list.slice(2).map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </div>
      </Wrapper>
      <div className={s.bg}>
        <div />
      </div>
      <Line
        direction="right"
        color="primary"
        zIndex={1500}
        top={35}
        width={25}
      />
      <Line
        direction="right"
        color="primary"
        zIndex={5}
        top={15}
        width={20}
        right={21}
      />
      <Line
        direction="right"
        color="secondary"
        zIndex={5}
        top={13}
        width={20}
        right={23}
      />
    </div>
  )
}
