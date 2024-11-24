import { Wrapper } from "@/components/kit"
import { getProductCoins, getProductVip } from "@/services/tebex"
import { Suspense } from "react"
import s from "./page.module.scss"

export default async function Page() {
  const vip = await getProductVip()
  const coins = await getProductCoins()

  return (
    <div className={s.boutique}>
      <Wrapper>
        <Suspense fallback={<div className={s.loading}>Loading</div>}>
          <h1>title: {coins?.name}</h1>
          <h1>title: {vip?.name}</h1>
          {coins?.packages?.map((product) => (
            <div key={product.id} className={s.product}>
              <div className={s.productImage}>
                {product.image && (
                  <img src={product.image} alt={product.name} />
                )}
              </div>
              <div className={s.productInfo}>
                <h3>{product.name}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <p className={s.price}>
                  {product.base_price} {product.currency}
                </p>
              </div>
            </div>
          ))}
        </Suspense>
      </Wrapper>
    </div>
  )
}
