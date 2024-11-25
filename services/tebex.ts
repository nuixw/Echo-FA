"use server"

import { TAGS } from "@/config/constants"
import { fetcher } from "@/libs/fetcher"
import {
  AddToBasketFunction,
  GetAuthUrlFunction,
  GetBasketFunction,
  GetCategoriesFunction,
  GetCategoryFunction,
  GetWebstoreDataFunction,
  RemoveFromBasketFunction,
  UpdateQuantityFunction
} from "@/types/Request"
import {
  TebexAuthUrl,
  TebexBasket,
  TebexCategory,
  TebexData,
  TebexMessage,
  TebexWebstore
} from "@/types/Tebex"
import { cookies } from "next/headers"

export const getBasketId = async () => {
  return cookies().get("basketId")?.value
}

export const getBasket: GetBasketFunction = async (basketId) => {
  const response = await fetcher<TebexData<TebexBasket>>(
    `/baskets/${basketId}`,
    {
      next: {
        tags: [TAGS.cart]
      }
    }
  )

  if (response) {
    return response.data
  } else {
    return undefined
  }
}

export const getAuthUrl: GetAuthUrlFunction = async (basketId, returnUrl) => {
  const response = await fetcher<TebexAuthUrl[]>(
    `/baskets/${basketId}/auth?returnUrl=${returnUrl}`,
    {
      next: {
        tags: [TAGS.cart]
      }
    }
  )

  if (response) {
    return response
  } else {
    return []
  }
}

export const getWebstoreData: GetWebstoreDataFunction = async () => {
  const response = await fetcher<TebexData<TebexWebstore>>(`/`, {
    next: {
      tags: [TAGS.webstoreData]
    }
  })

  if (response) {
    return response.data
  } else {
    return undefined
  }
}

export const getCategory: GetCategoryFunction = async (
  categoryId,
  includePackages = false
) => {
  const response = await fetcher<TebexData<TebexCategory>>(
    `/categories/${categoryId}?includePackages=${(includePackages
      ? 1
      : 0
    ).toString()}`
  )

  if (response) {
    return response.data
  } else {
    return undefined
  }
}

export const getCategories: GetCategoriesFunction = async (
  includePackages = false,
  checker = () => true
) => {
  const response = await fetcher<TebexData<TebexCategory[]>>(
    `/categories?includePackages=${(includePackages ? 1 : 0).toString()}`
  )

  if (response) {
    return response.data.filter(checker)
  } else {
    return []
  }
}

export const addToBasket: AddToBasketFunction = async (
  basketId,
  packageId,
  quantity = 1
) => {
  const response = await fetcher<TebexData<TebexBasket> | TebexMessage>(
    `/baskets/${basketId}/packages`,
    {
      body: {
        package_id: packageId,
        quantity
      },
      method: "POST"
    }
  )

  if (response) {
    return response
  } else {
    return undefined
  }
}

export const removeFromBasket: RemoveFromBasketFunction = async (
  basketId,
  packageId
) => {
  const response = await fetcher<TebexData<TebexBasket> | TebexMessage>(
    `/baskets/${basketId}/packages/remove`,
    {
      body: {
        package_id: packageId
      },
      method: "POST"
    }
  )

  if (response) {
    return response
  } else {
    return undefined
  }
}

export const updateQuantityInBasket: UpdateQuantityFunction = async (
  basketId,
  packageId,
  newQuantity
) => {
  const response = await fetcher<TebexData<TebexBasket> | TebexMessage>(
    `/baskets/${basketId}/packages/${packageId}`,
    {
      body: {
        quantity: newQuantity
      },
      method: "PUT"
    }
  )

  if (response) {
    return response
  } else {
    return undefined
  }
}
