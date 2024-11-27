export interface TebexBaseItem {
  id: number
  name: string
}

export interface TebexData<T> {
  data: T
}

export type TebexPackageType = "subscription" | "single"

export type TebexPackage = TebexBaseItem & {
  description: string
  type: TebexPackageType
  disable_gifting: boolean
  disable_quantity: boolean
  expiration_date: string | null
  category: TebexBaseItem
  base_price: number
  sales_tax: number
  total_price: number
  discount: number
  image: string | null
  created_at: string
  updated_at: string
}

export interface TebexInBasket {
  quantity: number
  price: number
  gift_username_id: string | null
  gift_username: string | null
}

export type TebexVariableData = {
  citizenid: string
}

export type TebexBasketPackage = TebexBaseItem & {
  description: string
  image?: string | null
  in_basket: TebexInBasket & {
    variable_data: TebexVariableData
  }
}

export interface TebexBasket {
  ident: string
  complete: boolean
  id: number
  count: string
  ip: string
  username_id: string | null
  username: string | null
  base_price: number
  sales_tax: number
  total_price: number
  packages: TebexBasketPackage[]
  coupons: TebexCode[]
  giftcards: TebexGiftCardCode[]
  creator_code: string
  links: TebexLinks
}

export interface TebexCode {
  code: string
}

export interface TebexGiftCardCode {
  card_number: string
}

export interface TebexLinks {
  checkout: string
  [key: string]: string
}

export type TebexCategory = TebexBaseItem & {
  description: string
  parent: TebexCategory | null
  order: number
  packages: TebexPackage[]
  display_type: "grid" | "list"
}

export type TebexMenu = {
  title: string
  path: string
}

export interface TebexMessage {
  status: number
  type: string
  title: string
  detail: string
  error_code: string
  field_details: unknown[]
  meta: unknown[]
}

export interface TebexAuthUrl {
  name: string
  url: string
}

export interface TebexWebstore {
  id: number
  description: string
  name: string
  webstore_url: string
  currency: string
  lang: string
  logo?: string
  platform_type: string
  created_at?: string
}
export interface TebexRequestInit extends RequestInit {
  body?: BodyInit | null | undefined
}
