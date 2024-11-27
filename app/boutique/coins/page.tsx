import { env } from "@/env"
import { getCategory } from "@/services/tebex"
import { Hero } from "./(components)/hero"
import { List } from "./(components)/list"
import { REVALIDATE_TIME } from "@/config/constants"

export const revalidate = REVALIDATE_TIME

export default async function Page() {
  const category = await getCategory(Number(env.TEBEX_CATEGORY_COINS), true)
  const packages = category?.packages

  return (
    <>
      <Hero />
      <List packages={packages} />
    </>
  )
}
