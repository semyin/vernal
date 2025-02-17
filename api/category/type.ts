export interface Category {
  id: number
  name: string
  description: string | undefined
  createdAt: string
  updatedAt: string
}

export interface CategoryFilters {
  name?: string
}