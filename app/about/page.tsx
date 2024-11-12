import { getRequiredAuthSession } from "@/libs/session"
import Link from "next/link"

export default async function About() {
  const session = await getRequiredAuthSession()

  return (
    <>
      <p>About page</p>
      <Link href="/">back</Link>
    </>
  )
}
