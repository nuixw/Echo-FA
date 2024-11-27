import { Icon } from "@/components/icon"
import { Modal } from "@/components/modal"
import { useBasketStore } from "@/stores/basket"
import clsx from "clsx"
import { Item } from "./item"
import s from "./modal.module.scss"

interface CartModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const CartModal = ({ isOpen, setIsOpen }: CartModalProps) => {
  const { isLoading, basket, totalPrice, totalCoins } = useBasketStore()
  const packages = basket?.packages

  return (
    <Modal
      onClose={() => setIsOpen(false)}
      title="Panier"
      className={clsx(s.modal, isLoading && s.loading)}
    >
      <table className={s.table}>
        <thead>
          <tr>
            <th colSpan={2}>Articles</th>
            <th>Prix</th>
            <th className={s.center}>Quantité</th>
            <th className={s.right}>Total</th>
            <th />
          </tr>
        </thead>
        {basket && basket.packages.length > 0 && totalPrice > 0 ? (
          <tbody>
            {packages?.map((pkg) => (
              <Item key={pkg.id} pkg={pkg} />
            ))}
          </tbody>
        ) : (
          <tr>
            <td colSpan={6} className={s.empty}>
              Vous n&apos;avez aucun article dans votre panier pour le moment.
            </td>
          </tr>
        )}
        <tfoot className={s.right}>
          {totalCoins > 0 && (
            <tr>
              <td colSpan={4}>E-Coins total:</td>
              <td colSpan={2} className={s.total}>
                <strong className={s.price}>{totalCoins}</strong>
              </td>
            </tr>
          )}
          {totalPrice > 0 && (
            <tr>
              <td colSpan={4}>Total TTC:</td>
              <td colSpan={2} className={s.total}>
                <strong className={s.price}>{totalPrice.toFixed(2)}€</strong>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
      {totalPrice > 0 && (
        <a href={`https://pay.tebex.io/${basket?.ident}`} className={s.proceed}>
          Accéder au paiement
        </a>
      )}
      <Icon icon="loader" className={s.loader} />
    </Modal>
  )
}
