import { Marquee } from "@/components/marquee"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import s from "./words.module.scss"

interface LineProps {
  direction: "left" | "right"
}

const Line = ({ direction }: LineProps) => {
  const t = useTranslations("Home.Words")

  return (
    <Marquee direction={direction} className={clsx(s.line, s[direction])}>
      <span>{t("line")}&nbsp;</span>
    </Marquee>
  )
}

export const Words = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.words}>
        <Line direction="left" />
        <Line direction="right" />
      </div>
    </div>
  )
}
