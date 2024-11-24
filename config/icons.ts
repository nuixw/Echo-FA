export const ICONS = {
  x: "hugeicons:cancel-01",
  tiktok: "teenyicons:tiktok-solid",
  youtube: "hugeicons:youtube",
  twitter: "hugeicons:new-twitter",
  twitch: "hugeicons:twitch",
  instagram: "hugeicons:instagram",
  menu: "hugeicons:menu-01",
  arrowDown: "hugeicons:arrow-down-01"
} as const

export type IconName = keyof typeof ICONS
