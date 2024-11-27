import { Icon } from "@/components/icon"
import { Link } from "@/components/link"
import { reglement, ReglementItemProps } from "@/config/reglement"
import s from "./page.module.scss"

const Card = ({ icon, title, slug, submenu }: ReglementItemProps) => (
  <>
    <li>
      <Link href={`/serveur/reglement/${slug}`} className={s.card}>
        <Icon icon={icon} />
        <h2>{title}</h2>
      </Link>
    </li>
    {submenu && submenu.map((item) => <Card key={item.slug} {...item} />)}
  </>
)

export default function Page() {
  return (
    <div className={s.page}>
      <h1>Règlement</h1>
      <ul className={s.list}>
        {reglement.map((item) => (
          <Card key={item.slug} {...item} />
        ))}
      </ul>
    </div>
  )
}
