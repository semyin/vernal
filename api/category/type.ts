export interface Category {
  id: number
  name: string
  description: string | undefined | null
  createdAt: string
  updatedAt: string
}

export interface Filters {
  name?: string
}