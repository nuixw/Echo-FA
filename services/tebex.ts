"use server"

import { TAGS } from "@/config/constants"
import { env } from "@/env"
import { fetcher } from "@/libs/fetcher"
import {
  AddToBasketFunction,
  GetAuthUrlFunction,
  GetBasketFunction,
  GetCategoriesFunction,
  GetCategoryFunction,
  GetPackageFunction,
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
  TebexPackage,
  TebexWebstore
} from "@/types/Tebex"
import { cookies } from "next/headers"

const publicApiKey = env.TEBEX_PUBLIC_API_KEY

export const getBasketId = async () => {
  return cookies().get("basketId")?.value
}

export const removeBasketId = async () => {
  return cookies().delete("basketId")
}

export const getBasket: GetBasketFunction = async (basketId) => {
  const response = await fetcher<TebexData<TebexBasket>>(
    `/accounts/${publicApiKey}/baskets/${basketId}`,
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
    `/accounts/${publicApiKey}/baskets/${basketId}/auth?returnUrl=${returnUrl}`
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
    `/accounts/${publicApiKey}/categories/${categoryId}?includePackages=${(includePackages
      ? 1
      : 0
    ).toString()}`,
    {
      cache: "force-cache",
      next: {
        revalide: 3600,
        tags: categoryId
      }
    }
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
    `/accounts/${publicApiKey}/categories?includePackages=${(includePackages
      ? 1
      : 0
    ).toString()}`
  )

  if (response) {
    return response.data.filter(checker)
  } else {
    return []
  }
}

export const getPackage: GetPackageFunction = async (packageId) => {
  const response = await fetcher<TebexData<TebexPackage>>(
    `/accounts/${publicApiKey}/packages/${packageId}`
  )

  if (response) {
    return response.data
  } else {
    return undefined
  }
}

export const addToBasket: AddToBasketFunction = async (
  basketId,
  packageId,
  quantity,
  citizenid
) => {
  const response = await fetcher<TebexData<TebexBasket> | TebexMessage>(
    `/baskets/${basketId}/packages`,
    {
      body: {
        package_id: packageId,
        quantity,
        variable_data: {
          citizenid
        }
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
