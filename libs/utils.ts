export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const qs = (selector: string, scope = document) =>
  scope.querySelector(selector)

export const qsa = (selector: string, scope = document) =>
  scope.querySelectorAll(selector)

export const ref = (id: string) => qs(`[data-ref=${id}]`)

export const stripTags = (str: string) => str.replace(/<[^>]*>/g, "")
