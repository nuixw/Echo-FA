"use client"

import { qsa } from "@/libs/utils"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

interface TableContentProps {
  id: string
  title: string
  level: number
}

export const TableContent = () => {
  const [headings, setHeadings] = useState<TableContentProps[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const elements = qsa("[data-page] h2, [data-page] h3")
    const items: TableContentProps[] = Array.from(elements).map((element) => ({
      id: element.id,
      title: (element.textContent || "").replace(
        /[\uD83C-\uDBFF\uDC00-\uDFFF]/g,
        ""
      ),
      level: parseInt(element.tagName.charAt(1))
    }))
    setHeadings(items)
  }, [pathname])

  return (
    <nav className="toc">
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: `${(heading.level - 1) * 1}rem` }}
          >
            <a href={`#${heading.id}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
