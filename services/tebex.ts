"use server"

import { TAGS } from "@/config/constants"
import { fetcher } from "@/libs/fetcher"
import {
  TebexAuthUrl,
  TebexBasket,
  TebexCategory,
  TebexData,
  TebexWebstore
} from "@/types/Tebex"
import { cookies } from "next/headers"

export const getBasketId = async () => {
  return cookies().get("basketId")?.value
}

export const getBasket = async (
  basketId: string
): Promise<TebexBasket | undefined> => {
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

export const getAuthUrl = async (
  basketId: string,
  returnUrl: string
): Promise<TebexAuthUrl[]> => {
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

export const getWebstoreData = async (): Promise<TebexWebstore | undefined> => {
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

export const getCategory = async (
  categoryId: number,
  includePackages = false
): Promise<TebexCategory | undefined> => {
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

export const getCategories = async (
  includePackages = false,
  checker: (category: TebexCategory) => boolean = () => true
): Promise<TebexCategory[]> => {
  const response = await fetcher<TebexData<TebexCategory[]>>(
    `/categories?includePackages=${(includePackages ? 1 : 0).toString()}`
  )

  if (response) {
    return response.data.filter(checker)
  } else {
    return []
  }
}

// export async function addToBasket(
//   basketId: string,
//   packageId: number,
//   packageType: PackageType
// ): Promise<Data<Basket> | Message | undefined> {
//   const res = await simpleRequest<Data<Basket> | Message>(
//     `${baseUrl}/baskets/${basketId}/packages`,
//     {
//       type: packageType,
//       package_id: packageId
//     },
//     {},
//     { method: "POST" }
//   )

//   return res
// }

// export async function removeFromBasket(
//   basketId: string,
//   packageId: number
// ): Promise<Data<Basket> | Message | undefined> {
//   const res = await simpleRequest<Data<Basket> | Message>(
//     `${baseUrl}/baskets/${basketId}/packages/remove`,
//     {
//       package_id: packageId
//     },
//     {},
//     { method: "POST" }
//   )

//   return res
// }

// export async function updateQuantityInBasket(
//   basketId: string,
//   packageId: string,
//   newQuantity: number
// ): Promise<Data<Basket> | Message | undefined> {
//   const res = await simpleRequest<Data<Basket> | Message>(
//     `${baseUrl}/baskets/${basketId}/packages/${packageId}`,
//     {
//       quantity: newQuantity
//     },
//     {},
//     { method: "PUT" }
//   )

//   return res
// }

// export async function simpleRequest<T>(
//   url: string,
//   body?: Record<string, unknown>,
//   headers?: Record<string, unknown>,
//   custom?: Record<string, unknown>
// ): Promise<T | undefined> {
//   try {
//     const res = await fetch(url, {
//       body: body ? JSON.stringify(body) : undefined,
//       headers: {
//         "Content-Type": "application/json; charset=UTF8",
//         ...(headers ? headers : {})
//       },
//       method: "GET",
//       cache: "no-store",
//       ...(custom ? custom : {})
//     })

//     return (await res.json()) as T
//   } catch (e) {
//     console.warn(e)
//     return undefined
//   }
// }

// export async function getPackages(
//   query?: string,
//   basketIdentifier?: string,
//   ipAddress?: string,
//   reverse = false
// ): Promise<Package[]> {
//   query = query ? query.toLowerCase() : query

//   const res = await simpleRequest<Data<Package[]>>(
//     `${baseUrl}/accounts/${publicApiKey}/packages${
//       basketIdentifier ? `?basketIdent=${basketIdentifier}` : ""
//     }${
//       ipAddress ? `${basketIdentifier ? "&" : "?"}ipAddress=${ipAddress}` : ""
//     }`
//   )

//   if (res) {
//     const data = res.data
//     const reshaped = reverse ? data.reverse() : data

//     return reshaped.filter(
//       (pkg) => query == undefined || pkg.name.toLowerCase().includes(query)
//     )
//   } else {
//     return []
//   }
// }

// export async function getPackage(
//   id: number,
//   ipAddress?: string
// ): Promise<Package | undefined> {
//   const basketIdentifier = cookies().get("basketId")?.value

//   const res = await simpleRequest<Data<Package>>(
//     `${baseUrl}/accounts/${publicApiKey}/packages/${id}${
//       basketIdentifier ? `?basketIdent=${basketIdentifier}` : ""
//     }${
//       ipAddress ? `${basketIdentifier ? "&" : "?"}ipAddress=${ipAddress}` : ""
//     }`
//   )

//   if (res) {
//     return res.data
//   } else {
//     return undefined
//   }
// }
