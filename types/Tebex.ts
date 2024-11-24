export interface TebexPackage {
  id: number
  name: string
  description: string
  image?: string
  type: string
  category: object
  base_price: number
  sales_tax: number
  total_price: number
  currency: string
  discount: number
  disable_quantity: boolean
  disable_gifting: boolean
  expiration_date?: string
  created_at: string
  updated_at: string
}

export interface TebexCategory {
  id: number
  name: string
  slug?: string
  parent?: TebexCategory
  description: string
  packages?: TebexPackage[]
  order: number
  display_type: "list" | "grid"
}
