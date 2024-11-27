import { env } from "@/env"
import { TebexBasketPackage } from "@/types/Tebex"
import clsx from "clsx"
import { DeleteToCart } from "../delete-to-cart"
import { EditQuantity } from "../edit-quantity"
import s from "./modal.module.scss"

interface ItemProps {
  pkg: TebexBasketPackage
}

export const Item = ({ pkg }: { pkg: TebexBasketPackage }) => {
  const price = pkg.in_basket.price
  const qty = pkg.in_basket.quantity
  const total = price * qty

  return (
    <tr>
      <td className={s.center}>
        {pkg.image && (
          <img
            src={pkg.image}
            alt={pkg.name}
            width={50}
            height={50}
            className={s.img}
          />
        )}
      </td>
      <td className={s.name}>{pkg.name}</td>
      <td>
        <div className={s.price}>
          {price.toFixed(2)}€
          {pkg.id === Number(env.NEXT_PUBLIC_PACKAGE_VIP) && (
            <small>/mois</small>
          )}
        </div>
      </td>
      <td className={s.center}>
        {pkg.id !== Number(env.NEXT_PUBLIC_PACKAGE_VIP) ? (
          <EditQuantity packageId={pkg.id} qtyBase={qty} />
        ) : (
          qty
        )}
      </td>
      <td className={s.right}>
        <div className={clsx(s.price, s.total)}>{total.toFixed(2)}€</div>
      </td>
      <td>
        <DeleteToCart packageId={pkg.id} />
      </td>
    </tr>
  )
}
