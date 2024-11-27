"use client"

import { ReglementItemProps, reglement } from "@/config/reglement"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

interface PageProps {
  params: { slug: string }
}

export default function Page({ params }: PageProps) {
  const slug = params.slug

  const findItemBySlug = (
    items: ReglementItemProps[],
    targetSlug: string
  ): ReglementItemProps | undefined => {
    for (const item of items) {
      if (item.slug === targetSlug) {
        return item
      }
      if (item.submenu) {
        const found = findItemBySlug(item.submenu, targetSlug)
        if (found) {
          return found
        }
      }
    }
    return undefined
  }

  const lastSlug = slug[slug.length - 1]
  const currentItem = findItemBySlug(reglement, lastSlug)

  if (!currentItem) {
    redirect("/serveur/reglement")
  }

  const MdxContent = dynamic(
    () =>
      import(`@/content/${currentItem.slug}.mdx`).catch(() =>
        redirect("/serveur/reglement")
      ),
    { ssr: true }
  )

  return (
    <>
      <h1 id={currentItem.slug}>{currentItem.title}</h1>
      <MdxContent />
    </>
  )
}
