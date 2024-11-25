export const ICONS = {
  x: "hugeicons:cancel-01",
  tiktok: "teenyicons:tiktok-solid",
  youtube: "hugeicons:youtube",
  twitter: "hugeicons:new-twitter",
  twitch: "hugeicons:twitch",
  instagram: "hugeicons:instagram",
  menu: "hugeicons:menu-01",
  arrowDown: "hugeicons:arrow-down-01",
  fivem: "simple-icons:fivem",
  vip: "hugeicons:crown",
  coins: "hugeicons:coins-01",
  basket: "hugeicons:shopping-basket-03",
  logout: "hugeicons:logout-03",
  loader: "svg-spinners:6-dots-rotate"
} as const

export type IconName = keyof typeof ICONS
