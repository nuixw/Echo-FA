"use client"

import { useMDXComponent } from "next-contentlayer/hooks"

export function useContent(content: string) {
  const MDXComponent = useMDXComponent(content)
  return <MDXComponent />
}
