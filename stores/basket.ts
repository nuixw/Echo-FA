import { env } from "@/env"
import { getAuthUrl, getBasket, getBasketId } from "@/services/tebex"
import { TebexBasket } from "@/types/Tebex"
import { create } from "zustand"

interface BasketStore {
  isLoading: boolean
  basketId: string | undefined
  basket: TebexBasket | undefined
  authUrl: string | undefined
  setLoading: (loading: boolean) => void
  fetchBasketId: () => Promise<void>
  fetchBasket: () => Promise<void>
  createNewBasket: () => Promise<void>
  fetchAuthUrl: () => Promise<void>
  logout: () => Promise<void>
}

export const useBasketStore = create<BasketStore>((set, get) => ({
  isLoading: true,
  basketId: undefined,
  basket: undefined,
  authUrl: undefined,

  setLoading: (loading) => set({ isLoading: loading }),

  fetchBasketId: async () => {
    set({ isLoading: true })
    try {
      const id = await getBasketId()
      if (id) {
        set({ basketId: id })
      } else {
        await get().createNewBasket()
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du basketId:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchBasket: async () => {
    const { basketId } = get()
    if (!basketId) return

    set({ isLoading: true })
    try {
      const basketData = await getBasket(basketId)
      set({ basket: basketData })
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  createNewBasket: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch("/api/createNewBasket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF8"
        },
        cache: "no-store"
      })
      const data = await response.json()

      if (data && "basketId" in data) {
        set({ basketId: data.basketId })
        const basketData = await getBasket(data.basketId)
        set({ basket: basketData })
      }
    } catch (error) {
      console.error("Erreur lors de la création du panier:", error)
    } finally {
      set({ isLoading: false })
    }
  },

  fetchAuthUrl: async () => {
    const { basketId } = get()
    if (!basketId) return

    const returnUrl =
      env.NEXT_PUBLIC_NODE_ENV == "development"
        ? "http://localhost:3000"
        : env.NEXT_PUBLIC_URL ?? "about:blank"

    set({ isLoading: true })
    try {
      const authUrls = await getAuthUrl(basketId, `${returnUrl}/boutique`)
      if (authUrls[0]) {
        set({ authUrl: authUrls[0].url })
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'url d'authentification:",
        error
      )
    } finally {
      set({ isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      set({
        basketId: undefined,
        basket: undefined,
        authUrl: undefined
      })
      await get()
        .fetchBasketId()
        .then(async () => {
          await get().fetchBasket()
          await get().fetchAuthUrl()
        })
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
