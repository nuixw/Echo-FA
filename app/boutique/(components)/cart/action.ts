"use server"

import { GLOBAL_ERROR, SHOP, TAGS } from "@/config/constants"
import {
  addToBasket,
  getBasket,
  getBasketId,
  removeFromBasket,
  updateQuantityInBasket
} from "@/services/tebex"
import { TebexBasket } from "@/types/Tebex"
import { revalidateTag } from "next/cache"
import { z } from "zod"

const addItemSchema = z.object({
  packageId: z.number().positive(GLOBAL_ERROR),
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

type AddItemProps = z.infer<typeof addItemSchema>

export const addItem = async (input: AddItemProps) => {
  const result = addItemSchema.safeParse(input)

  if (!result.success) {
    return result.error.errors[0].message
  }

  const { packageId, qty, citizenid } = result.data

  if (!packageId) {
    return "Produit introuvable."
  }

  const basketId = await getBasketId()
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
    return GLOBAL_ERROR
  }
}

const deleteItemSchema = z.object({
  packageId: z.number().positive(GLOBAL_ERROR)
})

type DeleteItemProps = z.infer<typeof deleteItemSchema>

export const deleteItem = async (input: DeleteItemProps) => {
  const result = deleteItemSchema.safeParse(input)

  if (!result.success) {
    return result.error.errors[0].message
  }

  const { packageId } = result.data
  const basketId = await getBasketId()

  if (!basketId || !packageId) {
    return "Panier ou article manquant."
  }

  try {
    await removeFromBasket(basketId, packageId)
    revalidateTag(TAGS.cart)
    return true
  } catch (e) {
    return GLOBAL_ERROR
  }
}

const updateQuantitySchema = z.object({
  packageId: z.number().positive(GLOBAL_ERROR),
  qty: z
    .number()
    .min(SHOP.minToCart, `La quantité doit être d'au moins ${SHOP.minToCart}.`)
    .max(
      SHOP.maxToCart,
      `La quantité doit être d'au maximum ${SHOP.maxToCart}.`
    )
})

type UpdateQuantityProps = z.infer<typeof updateQuantitySchema>

export const updateQuantity = async (input: UpdateQuantityProps) => {
  const result = updateQuantitySchema.safeParse(input)

  if (!result.success) {
    return result.error.errors[0].message
  }

  const { packageId, qty } = result.data

  if (!packageId) {
    return "Produit introuvable."
  }

  const basketId = await getBasketId()

  if (!basketId || !packageId) {
    return "Panier ou article manquant."
  }

  try {
    await updateQuantityInBasket(basketId, packageId, qty)
    revalidateTag(TAGS.cart)
    return true
  } catch (e) {
    return GLOBAL_ERROR
  }
}
