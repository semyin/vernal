import { Meta } from "../meta/type"
import { Tag } from "../tag/type"

export interface Article {
  id: number
  title: string
  content: string
  tags?: Tag[]
  type: string
  metas?: Meta[]
  summary?: string
  authorId: number
  categoryId?: number
  coverImage?: string
  isPublished: boolean
  isTop: boolean
  viewCount: number
  likeCount: number
  commentCount: number
  createdAt: string
  updatedAt: string
}

export interface FixedArticleQuery {
  withMetas?: boolean;
  withTags?: boolean;
}

export interface ArticleFilters {
  title?: string;
  isPublished?: boolean;
  isTop?: boolean;
  tagIds?: number[];
  categoryIds?: number[],
  dates?: string[]
}
