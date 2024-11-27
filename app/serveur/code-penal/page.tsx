"use client"

import { LayoutDefault } from "@/components/layout"
import { UPDATE_CODE_PENAL } from "@/config/constants"
import Content from "@/content/code-penal.mdx"

export default function Page() {
  return (
    <LayoutDefault
      title="Code <strong>pénal</strong>"
      icon="justice"
      bg="url(/img/code-penal-bg.webp)"
    >
      <time>Dernière mise à jour le {UPDATE_CODE_PENAL}</time>
      <Content />
    </LayoutDefault>
  )
}
