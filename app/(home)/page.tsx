import { getAuthSession } from "@/libs/session"
import { Hero } from "./(components)/Hero"

export default async function Page() {
  const session = await getAuthSession()

  return <Hero session={session} />
}
