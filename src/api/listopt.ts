export type ListOpt =
  | {
      offset?: number
      limit?: number
    }
  | {
      all: boolean
    }
