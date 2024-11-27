export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const qs = (selector: string, scope = document) =>
  scope.querySelector(selector)

export const qsa = (selector: string, scope = document) =>
  scope.querySelectorAll(selector)

export const ref = (id: string) => qs(`[data-ref=${id}]`)

export const stripTags = (str: string) => str.replace(/<[^>]*>/g, "")

export const extractEmoji = (children: React.ReactNode) => {
  const text = children?.toString() || ""
  const emojiMatch = text.match(/^([\uD800-\uDBFF][\uDC00-\uDFFF]|\S)\s*(.*)/)
  const emoji = emojiMatch?.[1] || ""
  const content = emojiMatch?.[2] || text

  return {
    emoji,
    content
  }
}

export const removeSearchParams = (searchParams: URLSearchParams) => {
  const url = new URL(window.location.href)
  searchParams.forEach((v, key) => {
    url.searchParams.delete(key)
  })
  window.history.replaceState({}, "", url)
}
