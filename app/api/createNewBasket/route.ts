import { fetcher } from "@/libs/fetcher"
import { cookies } from "next/headers"

export async function POST() {
  const response = await fetcher(`/baskets`, {
    method: "POST",
    body: JSON.stringify({})
  })
  const cart = response?.data

  if (cart) {
    cookies().set("basketId", cart.ident)

    return Response.json({
      ok: true,
      basketId: cart.ident
    })
  } else {
    return Response.json({
      ok: false,
      msg: `Cart invalide (${cart})`
    })
  }
}
