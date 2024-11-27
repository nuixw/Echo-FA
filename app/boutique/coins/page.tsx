import { env } from "@/env"
import { getCategory } from "@/services/tebex"
import { Hero } from "./(components)/hero"
import { List } from "./(components)/list"

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
