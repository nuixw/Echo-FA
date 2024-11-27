import { create } from "zustand"
import { persist } from "zustand/middleware"

type AppStore = {
  citizenidSaved: string | undefined
  setCitizenidSaved: (citizenidSaved: string) => void
}

export const useAppStore = create<AppStore>(
  // @ts-ignore
  persist(
    (set, get) => ({
      citizenidSaved: undefined,
      setCitizenidSaved: (citizenidSaved) => set({ citizenidSaved })
    }),
    {
      name: "app"
    }
  )
)
