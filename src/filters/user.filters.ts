import { DefaultFilterOptions } from './filters'

export type UserFilters = {
  name?: string
  age?: number
} & DefaultFilterOptions
