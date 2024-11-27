import { APP_URL } from "@/config/app"
import { env } from "@/env"
import { getAuthUrl, getBasket, getBasketId } from "@/services/tebex"
import { TebexBasket, TebexBasketPackage } from "@/types/Tebex"
import { create } from "zustand"
import { coinsBonus } from "./../config/coins"
import { removeBasketId } from "./../services/tebex"

interface BasketStore {
  complete: boolean
  logged: boolean
  isLoading: boolean
  basketId: string | undefined
  basket: TebexBasket | undefined
  authUrl: string | undefined
  totalQuantity: number
  totalPrice: number
  totalCoins: number
  vipInBasket: boolean
  setLoading: (loading: boolean) => void
  fetchBasketId: () => Promise<void>
  fetchBasket: () => Promise<void>
  createNewBasket: () => Promise<void>
  fetchAuthUrl: () => Promise<void>
  logout: () => Promise<void>
  addPackage: (pkg: TebexBasketPackage) => Promise<void>
  removePackage: (packageId: number) => Promise<void>
  updateTotal: () => void
  updateCoinsTotal: () => void
  updateQuantityPackage: (packageId: number, qty: number) => Promise<void>
}

export const useBasketStore = create<BasketStore>((set, get) => ({
  complete: false,
  logged: false,
  isLoading: true,
  basketId: undefined,
  basket: undefined,
  authUrl: undefined,
  vipInBasket: false,
  totalQuantity: 0,
  totalPrice: 0,
  totalCoins: 0,

  setLoading: (loading) => set({ isLoading: loading }),

  updateCoinsTotal: async () => {
    const { basket } = get()
    if (!basket) return

    const totalCoins = basket.packages.reduce((acc, pkg) => {
      const newAmount = coinsBonus[pkg.id]?.newAmount || 0
      const totalPackageCoins = newAmount * pkg.in_basket.quantity

      return acc + totalPackageCoins
    }, 0)

    set({
      totalCoins
    })
  },

  updateQuantityPackage: async (packageId, qty) => {
    const { basket, updateTotal, setLoading } = get()
    if (!basket) return

    setLoading(true)

    try {
      const updatedPackages = basket.packages.map((pkg) => {
        if (pkg.id === packageId) {
          return {
            ...pkg,
            in_basket: {
              ...pkg.in_basket,
              quantity: qty
            }
          }
        } else {
          return pkg
        }
      })
      set({ basket: { ...basket, packages: updatedPackages } })
      updateTotal()
    } catch (error) {
      console.error("Erreur lors de la mise à jour du package:", error)
    } finally {
      setLoading(false)
    }
  },

  updateTotal: async () => {
    const { basket, updateCoinsTotal } = get()
    if (!basket) return

    const { totalPrice, totalQty } = basket.packages.reduce(
      (acc, pkg) => ({
        totalPrice:
          acc.totalPrice + pkg.in_basket.quantity * pkg.in_basket.price,
        totalQty: acc.totalQty + pkg.in_basket.quantity
      }),
      { totalPrice: 0, totalQty: 0 }
    )

    set({
      totalPrice,
      totalQuantity: totalQty
    })

    updateCoinsTotal()
  },

  fetchBasketId: async () => {
    const { setLoading } = get()

    setLoading(true)
    try {
      const id = await getBasketId()
      if (id) {
        set({ basketId: id })
      } else {
        await get().createNewBasket()
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du panier id:", error)
    } finally {
      setLoading(false)
    }
  },

  fetchBasket: async () => {
    const { basketId, updateTotal, setLoading } = get()
    if (!basketId) return

    setLoading(true)
    try {
      const basketData = await getBasket(basketId)
      set({
        basket: basketData
      })

      const hasVip = basketData?.packages?.some(
        (pkg) => pkg.id === Number(env.NEXT_PUBLIC_PACKAGE_VIP)
      )
      set({ vipInBasket: hasVip })

      updateTotal()

      if (basketData?.username_id) {
        set({ logged: true })
      }

      if (basketData?.complete) {
        await removeBasketId().finally(() =>
          set({
            complete: true,
            logged: false,
            basketId: undefined,
            basket: undefined,
            authUrl: undefined
          })
        )
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du panier:", error)
    } finally {
      setLoading(false)
    }
  },

  createNewBasket: async () => {
    const { updateTotal, setLoading } = get()
    setLoading(true)
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
        set({
          basket: basketData
        })

        updateTotal()
      }
    } catch (error) {
      console.error("Erreur lors de la création du panier:", error)
    } finally {
      setLoading(false)
    }
  },

  fetchAuthUrl: async () => {
    const { basketId, setLoading } = get()
    if (!basketId) return

    setLoading(true)
    try {
      const authUrls = await getAuthUrl(basketId, `${APP_URL}/boutique/coins`)
      if (authUrls[0]) {
        set({ authUrl: authUrls[0].url })
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'url d'authentification:",
        error
      )
    } finally {
      setLoading(false)
    }
  },

  logout: async () => {
    const { setLoading } = get()

    setLoading(true)
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
          set({ logged: false })
        })
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    } finally {
      setLoading(false)
    }
  },

  removePackage: async (packageId) => {
    const { basket, updateTotal, setLoading } = get()
    if (!basket) return

    setLoading(true)

    if (packageId === Number(env.NEXT_PUBLIC_PACKAGE_VIP)) {
      set({ vipInBasket: false })
    }

    try {
      const updatedPackages = basket.packages.filter(
        (pack) => pack.id !== packageId
      )
      set({ basket: { ...basket, packages: updatedPackages } })
      updateTotal()
    } catch (error) {
      console.error("Erreur lors de la suppression du package:", error)
    } finally {
      setLoading(false)
    }
  },
  addPackage: async (pkg) => {
    const { basket, updateTotal, setLoading, vipInBasket, fetchBasket } = get()
    if (!basket) return
    if (vipInBasket && pkg.id === Number(env.NEXT_PUBLIC_PACKAGE_VIP)) return

    setLoading(true)

    if (pkg.id === Number(env.NEXT_PUBLIC_PACKAGE_VIP)) {
      set({ vipInBasket: true })
    }

    try {
      const isBasketEmpty = basket.packages.length === 0
      const existingPackageIndex = basket.packages.findIndex(
        (pack) => pack.id === pkg.id
      )

      let updatedPackages
      if (existingPackageIndex !== -1) {
        updatedPackages = [...basket.packages]
        updatedPackages[existingPackageIndex] = {
          ...updatedPackages[existingPackageIndex],
          in_basket: {
            ...updatedPackages[existingPackageIndex].in_basket,
            quantity:
              updatedPackages[existingPackageIndex].in_basket.quantity +
              pkg.in_basket.quantity
          }
        }
      } else {
        updatedPackages = [...basket.packages, pkg]
      }

      set({
        basket: { ...basket, packages: updatedPackages }
      })
      updateTotal()

      if (isBasketEmpty) {
        // await fetchBasket()
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du package:", error)
    } finally {
      setLoading(false)
    }
  }
}))
