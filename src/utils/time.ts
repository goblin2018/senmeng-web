export const toShortDate = (date: string): string => {
  let i = date.indexOf('T')
  return date.substring(0, i)
}
