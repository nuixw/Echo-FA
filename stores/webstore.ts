import { getWebstoreData } from "@/services/tebex"
import { TebexWebstore } from "@/types/Tebex"
import { create } from "zustand"

interface WebstoreStore {
  isLoading: boolean
  webstore: TebexWebstore | undefined
  currency: string | undefined
  setLoading: (loading: boolean) => void
  fetchWebstoreData: () => Promise<void>
}

export const useWebstoreStore = create<WebstoreStore>((set, get) => ({
  isLoading: true,
  webstore: undefined,
  currency: undefined,

  setLoading: (loading) => set({ isLoading: loading }),

  fetchWebstoreData: async () => {
    set({ isLoading: true })
    try {
      const data = await getWebstoreData()
      set({ webstore: data })
      set({ currency: data?.currency })
    } catch (error) {
      console.error("Erreur lors de la récupération du webstore:", error)
    } finally {
      set({ isLoading: false })
    }
  }
}))
