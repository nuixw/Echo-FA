export interface ReglementItemProps {
  title: string
  slug: string
  submenu?: ReglementItemProps[]
}

export const reglement: ReglementItemProps[] = [
  {
    title: "Les bases du RP",
    slug: "bases-rp"
  },
  {
    title: "Règlement légal",
    slug: "reglement-legal",
    submenu: [
      {
        title: "Gouvernement & Services publics",
        slug: "gouvernement-services-publics"
      },
      {
        title: "Entreprises",
        slug: "entreprises"
      }
    ]
  },
  {
    title: "Règlement illégal",
    slug: "reglement-illegal",
    submenu: [
      {
        title: "Convoi illégal",
        slug: "convoi-illegal"
      }
    ]
  },
  {
    title: "Règlement Cayo",
    slug: "reglement-cayo"
  },
  {
    title: "Création de dossiers",
    slug: "creation-dossiers"
  },
  {
    title: "Avertissements et sanctions",
    slug: "avertissements-sanctions"
  }
]

export const reglementPath = "/serveur/reglement"
