"use client"

import { Japan, Sub, Wrapper } from "@/components/kit"
import { Marquee } from "@/components/marquee"
import { Sprite } from "@/components/sprite"
import { APP_NAME } from "@/config/app"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Fragment } from "react"
import s from "./gallery.module.scss"

export const Gallery = () => {
  const t = useTranslations("Home.Gallery")

  const placeholder = (
    <div className={s.img}>
      <img
        src="https://s3-alpha-sig.figma.com/img/6ee1/0156/754ea7bc608041c123172f4348e19cfa?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ejn3h1Bm2oq6fxxvBUzZ6h~Uc~IW1FaxKO3JsfNkCs1gJv44Zduwm0lKe6aj4UelS5OgNO2yfFG-zkiKozSoNh2K1NFMEPtbqmE1nHd6SQDW0fcjtELT4kIE5RJgD-~5RVuXJYtmgVLMXKydjqgreJ85SvOeoCMacRVCW1iBLDu1F5FC9yw28OugR7JA-72bXzss8xPLif9zjS6-PkyzYao3nbsjCi6Rx5uViPRA5aT47cFzpFFRYhZiT-~yR3o0NhwUApjPkGUqeyscKUWu2LseablItjpb3eF50gCPdJYgkIQxZIRO2ky1zMPPjiV4DfWX3ZtFcnpBY5tzNaezWw__"
        alt=""
      />
    </div>
  )

  return (
    <div className={s.gallery}>
      <Wrapper className={s.wrapper}>
        <div className={s.heading}>
          <Sub className={s.sub}>{t("sub")}</Sub>
          <h2 className={s.title}>
            <span className={s.l1}>{t("title.line1")}</span>
            <span className={s.l2}>
              {t("title.line2")}
              <Japan className={s.japan}>ブランディング</Japan>
            </span>
          </h2>
        </div>
        <div className={s.girl}>
          <Image
            src="/img/home-gallery-girl.webp"
            alt={APP_NAME}
            width={1200}
            height={1746}
            quality={100}
            draggable={false}
            sizes="(max-width: 500px) 350px, (max-width: 768px)  450px, (max-width: 900px) 550px, 667px"
            priority
          />
          <Sprite id="blur" className={s.primary} viewBox="0 0 467 467" />
          <Sprite id="blur" className={s.secondary} viewBox="0 0 467 467" />
        </div>
        <div className={s.right}>
          <Marquee direction="up" factor={0.5}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Fragment key={i}>{placeholder}</Fragment>
            ))}
          </Marquee>
          <Marquee direction="down" factor={0.5}>
            {Array.from({ length: 10 }).map((_, i) => (
              <Fragment key={i}>{placeholder}</Fragment>
            ))}
          </Marquee>
        </div>
      </Wrapper>
    </div>
  )
}
