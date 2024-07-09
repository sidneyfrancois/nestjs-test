import { DefaultFilterOptions } from './filters'

export interface UserFilters extends DefaultFilterOptions {
  name?: string
  age?: number
}
