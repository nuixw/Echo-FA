"use client"

import { Icon } from "@/components/icon"
import { Wrapper } from "@/components/kit"
import { TebexPackage } from "@/types/Tebex"
import { useTranslations } from "next-intl"
import { useCallback, useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react"
import { Item } from "../item"
import s from "./list.module.scss"

interface ListProps {
  packages: TebexPackage[] | undefined
}

export const List = ({ packages }: ListProps) => {
  const t = useTranslations("Shop.Coins")
  const sliderRef = useRef<SwiperRef>(null)

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slidePrev()
  }, [])

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return
    sliderRef.current.swiper.slideNext()
  }, [])

  return (
    <div className={s.list}>
      <Wrapper>
        <div className={s.heading}>
          <h2
            className={s.title}
            dangerouslySetInnerHTML={{ __html: t.raw("offre") }}
          />
          <div className={s.nav}>
            <button onClick={handlePrev} aria-label="Précédent">
              <Icon icon="arrowLeft" />
            </button>
            <button onClick={handleNext} aria-label="Suivant">
              <Icon icon="arrowRight" />
            </button>
          </div>
        </div>
        <Swiper
          ref={sliderRef}
          className={s.slider}
          spaceBetween={0}
          noSwiping={true}
          noSwipingClass="swiper-no-swiping"
          breakpoints={{
            600: {
              slidesPerView: 2
            }
          }}
        >
          {packages?.map((item) => {
            return (
              <SwiperSlide key={item.id} className={s.slide}>
                <Item key={item.id} {...item} />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Wrapper>
    </div>
  )
}
