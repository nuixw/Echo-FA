import { coinsBonus } from "@/config/coins"
import { TebexBasketPackage } from "@/types/Tebex"
import clsx from "clsx"
import s from "./modal.module.scss"

interface ItemProps {
  pkg: TebexBasketPackage
}

export const Item = ({ pkg }: { pkg: TebexBasketPackage }) => {
  const price = pkg.in_basket.price
  const total = price * pkg.in_basket.quantity
  const { newAmount } = coinsBonus[pkg.id]

  return (
    <tr>
      <td>
        <img
          src={pkg.image}
          alt={pkg.name}
          width={50}
          height={50}
          className={s.img}
        />
      </td>
      <td>{newAmount}</td>
      <td>
        <div className={s.price}>{price.toFixed(2)}€</div>
      </td>
      <td>x{pkg.in_basket.quantity}</td>
      <td className={s.right}>
        <div className={clsx(s.price, s.total)}>{total.toFixed(2)}€</div>
      </td>
    </tr>
  )
}
