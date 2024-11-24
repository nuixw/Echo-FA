"use client"

import { reglement, reglementPath } from "@/config/reglement"
import Link from "next/link"
import { usePathname } from "next/navigation"
import s from "./breadcrumb.module.scss"

export function Breadcrumb() {
  const pathname = usePathname()

  const getBreadcrumb = () => {
    const path = pathname.split("/").filter(Boolean)
    const currentSlug = path[path.length - 1]

    let breadcrumb = []

    breadcrumb.push({ title: "Règlement", slug: reglementPath })

    const mainItem = reglement.find((item) => item.slug === currentSlug)
    if (mainItem) {
      breadcrumb.push({
        title: mainItem.title,
        slug: `${reglementPath}/${mainItem.slug}`
      })
      return breadcrumb
    }

    for (const item of reglement) {
      const subItem = item.submenu?.find((sub) => sub.slug === currentSlug)
      if (subItem) {
        breadcrumb.push(
          { title: item.title, slug: `${reglementPath}/${item.slug}` },
          { title: subItem.title, slug: `${reglementPath}/${subItem.slug}` }
        )
        break
      }
    }

    return breadcrumb
  }

  return (
    <nav aria-label="Fil d'Ariane" className={s.breadcrumb}>
      <ol itemScope itemType="https://schema.org/BreadcrumbList">
        {getBreadcrumb().map((item, index, array) => (
          <li
            key={item.slug}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {index < array.length - 1 ? (
              <>
                <Link href={item.slug} itemProp="item" aria-current={false}>
                  <span itemProp="name">{item.title}</span>
                </Link>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            ) : (
              <>
                <span className={s.current} itemProp="name" aria-current="page">
                  {item.title}
                </span>
                <meta itemProp="position" content={String(index + 1)} />
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
