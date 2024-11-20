export const ICONS = {
  x: "hugeicons:cancel-01",
  tiktok: "teenyicons:tiktok-solid",
  youtube: "hugeicons:youtube",
  twitter: "hugeicons:new-twitter",
  twitch: "hugeicons:twitch",
  instagram: "hugeicons:instagram"
} as const

export type IconName = keyof typeof ICONS
