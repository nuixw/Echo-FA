import { Icon } from "@/components/icon"
import { Loader } from "@/components/loader"
import { GLOBAL_ERROR, SHOP } from "@/config/constants"
import { env } from "@/env"
import { useAppStore } from "@/stores/app"
import { useBasketStore } from "@/stores/basket"
import { TebexBasketPackage, TebexPackage } from "@/types/Tebex"
import clsx from "clsx"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
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
      packageId,
      qty:
        packageId === Number(env.NEXT_PUBLIC_PACKAGE_VIP)
          ? 1
          : Number(formData.get("qty")),
      citizenid: formData.get("citizenid") as string
    })
    if (response === true) {
      await onSuccess()
    } else {
      toast.error(response || GLOBAL_ERROR)
    }
  } catch (error) {
    toast.error(GLOBAL_ERROR)
  }
}

interface AddToCartProps {
  item: TebexPackage
}

export const AddToCart = ({ item }: AddToCartProps) => {
  const t = useTranslations("Shop.Panel")
  const { citizenidSaved, setCitizenidSaved } = useAppStore()
  const [qty, setQty] = useState(1)
  const [citizenid, setCitizenid] = useState("")
  const total = qty * item.base_price
  const { logged, totalQuantity, isLoading, setLoading, addPackage } =
    useBasketStore()

  useEffect(() => {
    setCitizenid(citizenidSaved || "")
  }, [citizenidSaved])

  const errorMax = `Vous ne pouvez pas ajouter plus de ${SHOP.maxCart} articles au panier (Total actuel: ${totalQuantity})`

  const createPackageBasket: TebexBasketPackage = {
    id: item.id,
    name: item.name,
    description: item.description,
    image: item.image,
    in_basket: {
      quantity: qty,
      price: item.base_price,
      gift_username_id: null,
      gift_username: null,
      variable_data: {
        citizenid
      }
    }
  }

  const handleSuccess = async () => {
    addPackage(createPackageBasket)
    setQty(1)
    setCitizenid(citizenidSaved || "")
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

  const handleSave = () => {
    if (citizenid === undefined) {
      toast.error("Veuillez saisir votre ID unique en jeu pour le sauvegarder.")
      return
    }
    setCitizenidSaved(citizenid)
    toast.success("Votre ID unique en jeu a été sauvegardé.")
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
      <Loader className={s.loader} />
      <div className={clsx(s.field, "swiper-no-swiping")}>
        <Icon icon="id" />
        <input
          type="text"
          name="citizenid"
          value={citizenid}
          onChange={(e) => setCitizenid(e.target.value)}
          placeholder="Votre ID unique en jeu (Menu F1)"
          required
        />
        <Icon icon="save" className={s.save} onClick={handleSave} />
      </div>
      {item.id !== Number(env.NEXT_PUBLIC_PACKAGE_VIP) && (
        <div className={s.qty}>
          <div className={clsx(s.field, "swiper-no-swiping")}>
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
            Prix <strong>{item.base_price.toFixed(2)}€</strong>
            <small>TTC</small>
          </div>
        </div>
      )}
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
