import auth from "@/config/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const getAuthSession = () => {
  return getServerSession(auth)
}

export const getRequiredAuthSession = async () => {
  const session = await getAuthSession()

  if (!session?.user) {
    redirect("/")
  }

  return session
}
