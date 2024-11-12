import { getAuthSession } from "@/libs/session"
import Link from "next/link"

export default async function Admin() {
  const session = await getAuthSession()

  return (
    <>
      <p>Admin test</p>
      <Link href="/">back</Link>
    </>
  )
}
