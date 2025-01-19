import { Meta } from "./Meta"
import { Tag } from "./Tag"

export interface Article {
  id: number
  title: string
  content: string
  tags?: Tag[]
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
