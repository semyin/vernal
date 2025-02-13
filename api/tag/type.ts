export interface Tag {
  id: number
  name: string
}

export interface TagDetail {
  id: number
  name: string
  articles: Article[]
  createdAt: string
  updatedAt: string
  articleCount: number
}

export interface Article {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

export interface TagsTableProps {
  filters: Filters;
}

export interface Filters {
  name?: string
}