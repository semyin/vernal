export interface Tag {
  id: number
  name: string
}

export interface TagDetail {
  id: number
  name: string
  articleTags: ArticleTag[]
  createdAt: string
  updatedAt: string
  articleCount: number
}

export interface ArticleTag {
  articleId: number
  article: Article
}

export interface Article {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}
