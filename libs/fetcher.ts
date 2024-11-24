export const fetcher = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        ...options.headers
      },
      next: {
        revalidate: 1 // Revalide le cache toutes les 60 secondes
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(
        `Erreur HTTP: ${response.status} - ${response.statusText}`
      )
    }

    const { data } = await response.json()
    return data
  } catch (error) {
    throw new Error(
      `Erreur de requête: ${
        error instanceof Error ? error.message : "Erreur inconnue"
      }`
    )
  }
}
