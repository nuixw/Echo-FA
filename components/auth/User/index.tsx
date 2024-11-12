import auth from "@/config/auth"
import { getServerSession } from "next-auth"

export const User = async () => {
  const session = await getServerSession(auth)

  if (!session) {
    return "No user"
  }

  return (
    <>
      <p>{session.user?.name}</p>
      <p>{/* <img src={session.user?.image} alt="" /> */}</p>
    </>
  )
}
