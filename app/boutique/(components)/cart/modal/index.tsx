import { Modal } from "@/components/modal"
import { useBasketStore } from "@/stores/basket"
import { Item } from "./item"
import s from "./modal.module.scss"

interface CartModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export const CartModal = ({ isOpen, setIsOpen }: CartModalProps) => {
  const { basket } = useBasketStore()
  const packages = basket?.packages

  return (
    <Modal onClose={() => setIsOpen(false)} title="Panier" className={s.modal}>
      <table className={s.table}>
        <thead>
          <tr>
            <th colSpan={2}>Articles</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th className={s.right}>Total</th>
          </tr>
        </thead>
        {basket && basket.packages.length > 0 && basket.total_price > 0 ? (
          <tbody>
            {packages?.map((pkg) => (
              <Item key={pkg.id} pkg={pkg} />
            ))}
          </tbody>
        ) : (
          <tr>
            <td colSpan={5} className={s.empty}>
              Vous n'avez aucun article dans votre panier pour le moment.
            </td>
          </tr>
        )}
      </table>
      {basket?.links.checkout &&
        basket.packages.length > 0 &&
        basket.total_price > 0 && (
          <a href={basket?.links.checkout} className={s.proceed}>
            Accéder au paiement
          </a>
        )}
    </Modal>
  )
}
