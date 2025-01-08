import { Expose, Transform, Type } from 'class-transformer';
import { format } from 'date-fns'

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
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  updatedAt!: Date;
}