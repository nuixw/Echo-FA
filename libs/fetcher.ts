import { env } from "@/env"

const baseUrl = env.TEBEX_API_URL
const publicApiKey = env.TEBEX_PUBLIC_API_KEY

export const fetcher = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T | undefined> => {
  try {
    const response = await fetch(`${baseUrl}/accounts/${publicApiKey}${url}`, {
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF8",
        ...options.headers
      },
      method: options.method || "GET",
      // cache: "no-store",
      ...options
    })

    console.log({ Called: url })

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
