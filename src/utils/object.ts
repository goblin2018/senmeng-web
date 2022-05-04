export const isEmpty = (obj: Object): boolean => {
  for (var i in obj) {
    return false
  }
  return true
}
