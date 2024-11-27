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
  txt: string
}

export const Hero = () => {
  const t = useTranslations("Shop.Coins")
  const list: ListProps[] = [
    {
      icon: "gun",
      txt: t("card1")
    },
    {
      icon: "stars",
      txt: t("card2")
    },
    {
      icon: "car",
      txt: t("card3")
    },
    {
      icon: "gift",
      txt: t("card4")
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
    ).to(
      `.${s.coin}`,
      {
        y: "-25%",
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
            <span className={s.l2}>
              <Sprite id="e" viewBox="0 0 181 139" />
              {t("title.line2")}
            </span>
          </h2>
        </div>
        <div className={s.content}>
          <p>{t("txt1")}</p>
          <p>{t("txt2")}</p>
        </div>
        <ul className={s.card}>
          {list.map(({ icon, txt }) => (
            <li key={icon}>
              <Icon icon={icon} />
              <p>{txt}</p>
            </li>
          ))}
        </ul>
        <Image
          src="/img/coins.png"
          width={1200}
          height={600}
          alt="E-Coin"
          priority
          className={s.coin}
          draggable={false}
        />
        <Sprite id="blur" className={s.blurPrimary} viewBox="0 0 467 467" />
        <Sprite id="blur" className={s.blurSecondary} viewBox="0 0 467 467" />
      </Wrapper>
      <div className={s.bg}>
        <div />
      </div>
    </div>
  )
}
