import { Icon } from "@/components/icon"
import { GLOBAL_ERROR } from "@/config/constants"
import { useBasketStore } from "@/stores/basket"
import { TebexBasketPackage, TebexPackage } from "@/types/Tebex"
import { HtmlHTMLAttributes } from "react"
import { toast } from "sonner"
import { deleteItem } from "./action"

const handleDeleteToCart = async (packageId: number, onSuccess: () => void) => {
  try {
    const response = await deleteItem({
      packageId
    })
    if (response === true) {
      onSuccess()
    } else {
      toast.error(response || GLOBAL_ERROR)
    }
  } catch (error) {
    toast.error(GLOBAL_ERROR)
  }
}

interface DeleteToCartProps extends HtmlHTMLAttributes<HTMLButtonElement> {
  packageId: TebexPackage["id"] | TebexBasketPackage["id"]
  children?: React.ReactNode
}

export const DeleteToCart = ({
  packageId,
  children,
  ...props
}: DeleteToCartProps) => {
  const { logged, isLoading, setLoading, removePackage } = useBasketStore()

  if (!logged) return

  const handleSuccess = async () => {
    removePackage(packageId)
    toast.success(`Produit retiré du panier.`)
  }

  return (
    <button
      {...props}
      data-delete
      onClick={async () => {
        setLoading(true)
        if (isLoading) return
        await handleDeleteToCart(packageId, handleSuccess).finally(() =>
          setLoading(false)
        )
      }}
    >
      {children ? children : <Icon icon="trash" />}
    </button>
  )
}
