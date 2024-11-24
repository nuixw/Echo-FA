import { Item, Rule, RuleSubtitle, Subitem } from "@/components/mdx/mdx"
import type { MDXComponents } from "mdx/types"
import { extractEmoji } from "./libs/utils"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => {
      const { emoji, content } = extractEmoji(children)
      const id = content.toLowerCase().replace(/[^a-z0-9À-ÿ]+/g, "-")
      return (
        <h2 id={`-${id}`}>
          {emoji}
          {content}
        </h2>
      )
    },
    Rule,
    RuleSubtitle,
    Item,
    Subitem,
    ...components
  }
}
