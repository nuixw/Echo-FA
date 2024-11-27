import { IconName } from "./icons"

export interface ReglementItemProps {
  icon: IconName
  title: string
  slug: string
  submenu?: ReglementItemProps[]
}

export const reglement: ReglementItemProps[] = [
  {
    icon: "book",
    title: "Les bases du RP",
    slug: "bases-rp"
  },
  {
    icon: "city",
    title: "Règlement légal",
    slug: "reglement-legal",
    submenu: [
      {
        icon: "police",
        title: "Gouvernement & Services publics",
        slug: "gouvernement-services-publics"
      },
      {
        icon: "building",
        title: "Entreprises",
        slug: "entreprises"
      }
    ]
  },
  {
    icon: "unavailable",
    title: "Règlement illégal",
    slug: "reglement-illegal",
    submenu: [
      {
        icon: "taxi",
        title: "Convoi illégal",
        slug: "convoi-illegal"
      }
    ]
  },
  {
    icon: "island",
    title: "Règlement Cayo",
    slug: "reglement-cayo"
  },
  {
    icon: "folderPlus",
    title: "Création de dossiers",
    slug: "creation-dossiers"
  },
  {
    icon: "prison",
    title: "Avertissements et sanctions",
    slug: "avertissements-sanctions"
  }
]

export const reglementPath = "/serveur/reglement"
