interface SocialInfo {
  name: string
  icon: string
}

const social: Record<string, SocialInfo> = {
  twitter: {
    name: "Twitter",
    icon: "hugeicons:new-twitter"
  },
  telegram: {
    name: "Telegram",
    icon: "hugeicons:telegram"
  },
  instagram: {
    name: "Instagram",
    icon: "hugeicons:instagram"
  },
  youtube: {
    name: "YouTube",
    icon: "hugeicons:youtube"
  },
  reddit: {
    name: "Reddit",
    icon: "hugeicons:reddit"
  },
  discord: {
    name: "Discord",
    icon: "iconoir:discord"
  },
  tiktok: {
    name: "TikTok",
    icon: "hugeicons:tiktok"
  },
  github: {
    name: "GitHub",
    icon: "hugeicons:github"
  },
  medium: {
    name: "Medium",
    icon: "ph:medium-logo"
  }
}

export interface Social extends SocialInfo {
  url: string
}

export const socials: Social[] = [
  {
    url: "https://twitter.com",
    ...social.twitter
  },
  {
    url: "https://t.me/",
    ...social.telegram
  },
  {
    url: "https://discord.gg/",
    ...social.discord
  },
  {
    url: "https://medium.com",
    ...social.medium
  }
]
