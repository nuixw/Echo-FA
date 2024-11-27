"use client"

import { Icon } from "@/components/icon"
import { Sub, Wrapper } from "@/components/kit"
import { Sprite } from "@/components/sprite"
import { IconName } from "@/config/icons"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import Image from "next/image"
import s from "./hero.module.scss"

interface ListProps {
  icon: IconName
  title: string
  txt: string
}

export const Hero = () => {
  const t = useTranslations("Shop.VIP")
  const list: ListProps[] = [
    {
      icon: "money",
      title: t("card1.title"),
      txt: t("card1.txt")
    },
    {
      icon: "bill",
      title: t("card2.title"),
      txt: t("card2.txt")
    },
    {
      icon: "car",
      title: t("card3.title"),
      txt: t("card3.txt")
    },
    {
      icon: "deco",
      title: t("card4.title"),
      txt: t("card4.txt")
    },
    {
      icon: "gun",
      title: t("card5.title"),
      txt: t("card5.txt")
    },
    {
      icon: "tractor",
      title: t("card6.title"),
      txt: t("card6.txt")
    },
    {
      icon: "bag",
      title: t("card7.title"),
      txt: t("card7.txt")
    },
    {
      icon: "moto",
      title: t("card9.title"),
      txt: t("card8.txt")
    },
    {
      icon: "discord",
      title: t("card9.title"),
      txt: t("card8.txt")
    }
  ]

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: `.${s.bg}`,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    })

    tl.to(
      `.${s.bg} > div`,
      {
        y: "50%",
        ease: "none"
      },
      "a"
    )
      .to(
        `.${s.crown}`,
        {
          y: "-25%",
          x: "30%",
          rotate: 40,
          ease: "none"
        },
        "a"
      )
      .fromTo(
        `.${s.crownRight}`,
        {
          rotate: -25,
          y: "0%"
        },
        {
          rotate: 25,
          y: "20%",
          ease: "none"
        },
        "a"
      )
  })

  return (
    <div className={s.hero}>
      <Wrapper className={s.wrapper}>
        <div className={s.heading}>
          <Sub className={s.sub}>{t("sub")}</Sub>
          <h2 className={s.title}>
            <span className={s.l1}>{t("title.line1")}</span>
            <span className={s.l2}>{t("title.line2")}</span>
            <span className={s.l3}>{t("title.line3")}</span>
          </h2>
          <p className={s.txt}>{t("txt1")}</p>
        </div>
        <ul className={s.card}>
          {list.map(({ icon, title, txt }) => (
            <li key={icon}>
              <Icon icon={icon} />
              <h3>{title}</h3>
              <p>{txt}</p>
            </li>
          ))}
        </ul>
        <Image
          src="/img/echo-vip.png"
          width={1470}
          height={1291}
          alt="Echo VIP"
          priority
          className={s.crown}
          draggable={false}
        />
        <Image
          src="/img/echo-vip.png"
          width={1470}
          height={1291}
          alt="Echo VIP"
          priority
          className={s.crownRight}
          draggable={false}
        />
        <Sprite id="blur" className={s.blurVip} viewBox="0 0 467 467" />
        <Sprite id="blur" className={s.blurSecondary} viewBox="0 0 467 467" />
      </Wrapper>
      <div className={s.bg}>
        <div />
      </div>
    </div>
  )
}
