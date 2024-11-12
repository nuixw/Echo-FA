export const capitalize = (str: string) =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`

export const qs = (selector: string, scope = document) =>
  scope.querySelector(selector)

export const qsa = (selector: string, scope = document) =>
  scope.querySelectorAll(selector)

export const ref = (id: string) => qs(`[data-ref=${id}]`)

export const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
