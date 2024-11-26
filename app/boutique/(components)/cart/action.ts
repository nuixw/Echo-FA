"use server"

import { SHOP, TAGS } from "@/config/constants"
import { addToBasket, getBasket } from "@/services/tebex"
import { TebexBasket } from "@/types/Tebex"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { z } from "zod"

const schema = z.object({
  packageId: z
    .number()
    .positive("L'ID du package doit être un nombre positif."),
  qty: z
    .number()
    .min(SHOP.minToCart, `La quantité doit être d'au moins ${SHOP.minToCart}.`)
    .max(
      SHOP.maxToCart,
      `La quantité doit être d'au maximum ${SHOP.maxToCart}.`
    ),
  citizenid: z
    .string()
    .min(
      SHOP.minCitizen,
      `L'ID citoyen doit être d'au moins ${SHOP.minCitizen} caractères.`
    )
    .max(
      SHOP.maxCitizen,
      `L'ID citoyen doit être d'au maximum ${SHOP.maxCitizen} caractères.`
    )
})

type AddItemProps = z.infer<typeof schema>

export const addItem = async (input: AddItemProps) => {
  const result = schema.safeParse(input)

  if (!result.success) {
    return result.error.errors[0].message
  }

  const { packageId, qty, citizenid } = result.data

  if (!packageId) {
    return "Produit introuvable."
  }

  const basketId = cookies().get("basketId")?.value
  let cart: TebexBasket | undefined

  if (basketId) {
    cart = await getBasket(basketId)
  }

  if (!basketId || !cart) {
    return "Panier manquant ou pas de données."
  }

  try {
    const addResp = await addToBasket(basketId, packageId, qty, citizenid)

    if (addResp && "status" in addResp && addResp.status == 422) {
      return "Vous devez vous connecter avant de faire cela."
    } else {
      revalidateTag(TAGS.cart)
      return true
    }
  } catch (e) {
    return `Une erreur est survenue. Si le problème persiste, contactez-nous sur Discord rubrique "bug-report".`
  }
}
