import { REVALIDATE_TIME } from "@/config/constants"
import { env } from "@/env"
import { getPackage } from "@/services/tebex"
import { Card } from "./(components)/card"
import { Hero } from "./(components)/hero"

export const revalidate = REVALIDATE_TIME

export default async function Page() {
  const pkg = await getPackage(Number(env.NEXT_PUBLIC_PACKAGE_VIP))

  return (
    <>
      <Hero />
      <Card pkg={pkg} />
    </>
  )
}
