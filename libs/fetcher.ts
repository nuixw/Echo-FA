import { env } from "@/env"

const baseUrl = env.TEBEX_API_URL

export const fetcher = async <T = any>(
  url: string,
  options: Record<string, any> = {}
): Promise<T | undefined> => {
  try {
    console.log("CALL-", `${baseUrl}${url}`)
    const response = await fetch(`${baseUrl}${url}`, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF8",
        ...options.headers
      },
      method: options.method || "GET"
      // cache: options.cache || "no-store"
    })

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP: ${response.status} - ${response.statusText}`
      )
    }

    return (await response.json()) as T
  } catch (error) {
    throw new Error(
      `Erreur de requête: ${
        error instanceof Error ? error.message : "Erreur inconnue"
      }`
    )
  }
}
