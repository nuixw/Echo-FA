import {
  TebexAuthUrl,
  TebexBasket,
  TebexCategory,
  TebexMessage,
  TebexPackage,
  TebexWebstore
} from "./Tebex"

export interface TebexData<T> {
  data: T
}

export interface AddToBasketRequest {
  package_id: number
  quantity: number
}

export interface RemoveFromBasketRequest {
  package_id: number
}

export interface UpdateQuantityRequest {
  quantity: number
}

export type GetBasketFunction = (
  basketId: string
) => Promise<TebexBasket | undefined>

export type GetAuthUrlFunction = (
  basketId: string,
  returnUrl: string
) => Promise<TebexAuthUrl[]>

export type AddToBasketFunction = (
  basketId: string,
  packageId: number,
  quantity: number,
  citizenid: string
) => Promise<TebexData<TebexBasket> | TebexMessage | undefined>

export type RemoveFromBasketFunction = (
  basketId: string,
  packageId: number
) => Promise<TebexData<TebexBasket> | TebexMessage | undefined>

export type UpdateQuantityFunction = (
  basketId: string,
  packageId: number,
  newQuantity: number
) => Promise<TebexData<TebexBasket> | TebexMessage | undefined>

export type GetCategoryFunction = (
  categoryId: number,
  includePackages?: boolean
) => Promise<TebexCategory | undefined>

export type GetCategoriesFunction = (
  includePackages?: boolean,
  checker?: (category: TebexCategory) => boolean
) => Promise<TebexCategory[]>

export type GetWebstoreDataFunction = () => Promise<TebexWebstore | undefined>

export type GetPackageFunction = (
  packageId?: number
) => Promise<TebexPackage | undefined>
