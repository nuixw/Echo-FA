import { Icon } from "@/components/icon"
import { DEBOUNCE_TIME, GLOBAL_ERROR, SHOP } from "@/config/constants"
import { useBasketStore } from "@/stores/basket"
import { TebexBasketPackage, TebexPackage } from "@/types/Tebex"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { updateQuantity } from "./action"
import s from "./cart.module.scss"

const handleEditQuantity = async (
  packageId: number,
  qty: number,
  onSuccess: () => void,
  onError: () => void
) => {
  try {
    const response = await updateQuantity({
      packageId,
      qty
    })

    if (response === true) {
      onSuccess()
    } else {
      toast.error(response || GLOBAL_ERROR)
      onError()
    }
  } catch (error) {
    toast.error(GLOBAL_ERROR)
    onError()
  }
}

interface EditQuantityProps {
  packageId: TebexPackage["id"] | TebexBasketPackage["id"]
  qtyBase: number
}

export const EditQuantity = ({ packageId, qtyBase }: EditQuantityProps) => {
  const [qty, setQty] = useState(qtyBase)
  const [oldQty, setOldQty] = useState(qtyBase)
  const {
    logged,
    isLoading,
    setLoading,
    updateQuantityPackage,
    totalQuantity
  } = useBasketStore()

  const errorMax = `Vous ne pouvez pas ajouter plus de ${SHOP.maxCart} articles au panier (Total actuel: ${totalQuantity})`

  const handleSuccess = async () => {
    updateQuantityPackage(packageId, qty)
    setOldQty(qty)
    toast.success(`Quantité de l'article modifiée.`)
  }

  const handleError = () => {
    setQty(oldQty)
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

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (qty !== qtyBase) {
        if (isLoading) return
        setLoading(true)
        await handleEditQuantity(
          packageId,
          qty,
          handleSuccess,
          handleError
        ).finally(() => setLoading(false))
      }
    }, DEBOUNCE_TIME)

    return () => clearTimeout(timer)
  }, [qty])

  if (!logged) return null

  return (
    <div className={s.qty} data-qty>
      <button>
        <Icon icon="minus" className={s.qtyBtn} onClick={handleMinus} />
      </button>
      <input
        name="qty"
        type="number"
        placeholder="Quantité"
        value={qty}
        onChange={(e) => setQty(Number(e.target.value))}
        min={SHOP.minToCart}
        max={SHOP.maxToCart}
      />
      <button>
        <Icon
          icon="plus"
          className={clsx(s.qtyBtn, s.plus)}
          onClick={handlePlus}
        />
      </button>
    </div>
  )
}
