import { IconName } from "./icons"
import { NavLinkProps } from "./nav"

export interface SocialsProps extends NavLinkProps {
  icon: IconName
}

export const SOCIALS: SocialsProps[] = [
  {
    label: "Discord",
    href: "https://discord.com",
    icon: "discord"
  },
  {
    label: "TikTok",
    href: "https://tiktok.com",
    icon: "tiktok"
  },
  {
    label: "Youtube",
    href: "https://youtube.com",
    icon: "youtube"
  },
  {
    label: "Twitter",
    href: "https://x.com/EchoFA_FR",
    icon: "twitter"
  },
  {
    label: "Twitch",
    href: "https://twitch.com",
    icon: "twitch"
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: "instagram"
  }
]
