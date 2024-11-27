"use client"

import { LayoutDefault } from "@/components/layout"
import { UPDATE_FAQ } from "@/config/constants"
import Content from "@/content/faq.mdx"

export default function Page() {
  return (
    <LayoutDefault
      title="FAQ & Guide d'<strong>utilisation</strong>"
      icon="faq"
      bg="url(/img/faq-bg.webp)"
    >
      <time>Dernière mise à jour le {UPDATE_FAQ}</time>
      <Content />
    </LayoutDefault>
  )
}
