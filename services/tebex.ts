import { env } from "@/env"
import { fetcher } from "@/libs/fetcher"
import { TebexCategory } from "@/types/Tebex"

const fetchApi = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  return await fetcher(
    `${env.TEBEX_API_URL}${env.TEBEX_API_KEY}/${url}`,
    options
  )
}

const getProductVip = async (): Promise<TebexCategory> => {
  return await fetchApi<TebexCategory>("categories/2827984?includePackages=1")
}

const getProductCoins = async (): Promise<TebexCategory> => {
  return await fetchApi<TebexCategory>("categories/2828057?includePackages=1")
}

export { getProductCoins, getProductVip }
