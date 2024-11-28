import { AddToCart } from "@/app/boutique/(components)/cart/add-to-cart"
import { Sprite } from "@/components/sprite"
import { coinsBonus } from "@/config/coins"
import { stripTags } from "@/libs/utils"
import { TebexPackage } from "@/types/Tebex"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import s from "./item.module.scss"

export const Item = ({ ...item }: TebexPackage) => {
  const t = useTranslations("Shop.Item")
  const { amount, newAmount, bonus } = coinsBonus[item.id]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${item.name}`,
    description: stripTags(item.description),
    offers: {
      "@type": "Offer",
      price: item.base_price.toFixed(2),
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock"
    },
    image: item.image || undefined
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <div className={s.item}>
        <div className={s.content}>
          <div className={s.heading}>
            <h3 className={clsx(s.title, bonus > 0 && s.bonus)}>
              <span>{amount}</span>
              <strong>
                {newAmount}
                <small>
                  +{bonus}% {t("free")}
                </small>
              </strong>
              <Sprite
                id="blur"
                className={clsx(s.blur, s.blurPrimary)}
                viewBox="0 0 467 467"
              />
            </h3>
          </div>
          <div className={s.illu}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                draggable="false"
              />
            )}
            <Sprite
              id="blur"
              className={clsx(s.blur, s.blurSecondary)}
              viewBox="0 0 467 467"
            />
          </div>
        </div>
        <div
          className={clsx(s.content, s.description)}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
        <div className={s.buy}>
          <AddToCart item={item} />
        </div>
        <div className={s.back} />
        <div className={clsx(s.corner, s.tl)} />
      </div>
    </>
  )
}
