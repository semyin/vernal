// src/article/dto/article.dto.ts
import { Expose, Type } from 'class-transformer';

export class TagDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}

export class ArticleDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  @Type(() => TagDto) // 指定 tags 字段的类型
  tags!: TagDto[];

  @Expose()
  summary?: string;

  @Expose()
  authorId!: number;

  @Expose()
  categoryId?: number;

  @Expose()
  coverImage?: string;

  @Expose()
  isPublished?: boolean;

  @Expose()
  isTop?: boolean;

  @Expose()
  viewCount?: number;

  @Expose()
  likeCount?: number;

  @Expose()
  commentCount?: number;

  @Expose()
  createdAt!: Date;

  @Expose()
  updatedAt!: Date;
}