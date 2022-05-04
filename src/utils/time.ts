import moment from 'moment'

export const toShortDate = (date: string): string => {
  let i = date.indexOf('T')
  return date.substring(0, i)
}

export const dateToShortStr = (d: Date): string => {
  return moment(d).format('YYYY-MM-DD')
}
