import { Wrapper } from "@/components/kit"
import { Aside } from "./(components)/aside"
import s from "./page.module.scss"

export default async function Page() {
  // const coins = await getCategory(Number(env.TEBEX_CATEGORY_COINS), true)

  return (
    <div className={s.boutique}>
      <Aside />
      <Wrapper>
        {/* <h1>title: {coins?.name}</h1> */}
        {/* {coins?.packages?.map((product) => (
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
          ))} */}
      </Wrapper>
    </div>
  )
}
