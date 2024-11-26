import { Icon } from "@/components/icon"
import { SHOP } from "@/config/constants"
import { useBasketStore } from "@/stores/basket"
import { TebexPackage } from "@/types/Tebex"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { toast } from "sonner"
import { addItem } from "./action"
import s from "./cart.module.scss"

const handleAddToCart = async (
  formData: FormData,
  packageId: number,
  onSuccess: () => void
) => {
  try {
    const response = await addItem({
      packageId: packageId,
      qty: Number(formData.get("qty")),
      citizenid: formData.get("citizenid") as string
    })
    if (response === true) {
      await onSuccess()
    } else {
      toast.error(response || "Une erreur est survenue")
    }
  } catch (error) {
    toast.error("Une erreur est survenue")
  }
}

interface AddToCartProps {
  item: TebexPackage
}

export const AddToCart = ({ item }: AddToCartProps) => {
  const t = useTranslations("Shop.Panel")
  const [qty, setQty] = useState(1)
  const [citizenid, setCitizenid] = useState("")
  const total = qty * item.base_price
  const { logged, totalQuantity, isLoading, setLoading, fetchBasket } =
    useBasketStore()

  const errorMax = `Vous ne pouvez pas ajouter plus de ${SHOP.maxCart} articles au panier (Total actuel: ${totalQuantity})`

  const handleSuccess = async () => {
    await fetchBasket()
    setQty(1)
    setCitizenid("")
    toast.success(`Produit ajouté au panier.`)
  }

  const handleMinus = () => {
    if (qty > 1) {
      setQty(qty - 1)
    } else {
      setQty(1)
    }
  }

  const handlePlus = () => {
    if (qty < SHOP.maxToCart) {
      setQty(qty + 1)
    } else {
      toast.error(errorMax)
    }
  }

  return logged ? (
    <form
      className={clsx(s.add, isLoading && s.loading)}
      action={async (formData: FormData) => {
        setLoading(true)
        if (totalQuantity + qty > SHOP.maxCart) {
          toast.error(errorMax)
          setLoading(false)
          return
        }
        if (isLoading) return
        await handleAddToCart(formData, item.id, handleSuccess).finally(() =>
          setLoading(false)
        )
      }}
    >
      <Icon icon="loader" className={s.loader} />
      <div className={s.field}>
        <Icon icon="id" />
        <input
          type="text"
          name="citizenid"
          value={citizenid}
          onChange={(e) => setCitizenid(e.target.value)}
          placeholder="Votre ID unique en jeu (Menu F1)"
          required
        />
      </div>
      <div className={s.qty}>
        <div className={s.field}>
          <Icon icon="minus" className={s.qtyBtn} onClick={handleMinus} />
          <input
            name="qty"
            type="number"
            placeholder="Quantité"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            min={SHOP.minToCart}
            max={SHOP.maxToCart}
          />
          <Icon
            icon="plus"
            className={clsx(s.qtyBtn, s.plus)}
            onClick={handlePlus}
          />
        </div>
        <div className={s.unit}>
          Prix <strong>{item.base_price.toFixed(2)}€</strong> <small>TTC</small>
        </div>
      </div>
      <button type="submit" className={s.btn}>
        Ajouter au panier <span>{total.toFixed(2)}€</span>
        <Icon icon="basketAdd" />
      </button>
    </form>
  ) : (
    <div className={s.needLogin}>
      <Icon icon="fivem" />
      {t("needLogin")}
    </div>
  )
}
