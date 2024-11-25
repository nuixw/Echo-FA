import { IconName } from "./icons"

export interface NavLinkProps {
  label: string
  href: string
  icon?: IconName
}

export const NAV_LINKS: Record<string, NavLinkProps> = {
  home: {
    label: "Accueil",
    href: "/"
  },
  serveur: {
    label: "Serveur",
    href: "/serveur"
  },
  rejoindre: {
    label: "Nous rejoindre",
    href: "/serveur/rejoindre"
  },
  reglement: {
    label: "Règlement",
    href: "/serveur/reglement"
  },
  entreprises: {
    label: "Entreprises",
    href: "/serveur/entreprises"
  },
  illegales: {
    label: "Illégales",
    href: "/serveur/illegales"
  },
  penal: {
    label: "Code pénal",
    href: "/serveur/code-penal"
  },
  faq: {
    label: "FAQ",
    href: "/serveur/faq"
  },
  boutique: {
    label: "Boutique",
    href: "/boutique"
  },
  coins: {
    label: "Coins",
    href: "/boutique/coins",
    icon: "coins"
  },
  vip: {
    label: "VIP",
    href: "/boutique/vip",
    icon: "vip"
  },
  streamers: {
    label: "Streamers",
    href: "/streamers"
  },
  voter: {
    label: "Voter",
    href: "/voter"
  },
  socials: {
    label: "Socials",
    href: "/socials"
  },
  contact: {
    label: "Nous contacter",
    href: "/nous-contacter"
  },
  legal: {
    label: "Mentions légales",
    href: "/mentions-legales"
  },
  cgv: {
    label: "Conditions de ventes",
    href: "/cgv"
  },
  sitemap: {
    label: "Plan du site",
    href: "/plan-du-site"
  }
}
