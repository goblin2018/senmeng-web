export const isPhone = (str: string): boolean => {
  return /^1[3456789]\d{9}$/.test(str)
}
