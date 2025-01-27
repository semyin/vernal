import { Expose, Transform, Type } from "class-transformer";
import { format } from "date-fns";

export class ArticleTagDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}

export class ArticleMetaDto {
  @Expose()
  id!: number;

  @Expose()
  name!: string;

  @Expose()
  property?: string;

  @Expose()
  content!: string;

  @Expose()
  isDefault!: boolean;

  @Expose()
  resourceType?: string;

  @Expose()
  resourceId?: number;

  @Expose()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  updatedAt!: Date;
}

export class ArticleDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  content!: string;

  @Expose()
  type!: string; // 新增 type 字段

  @Expose()
  @Type(() => ArticleTagDto) // 指定 tags 字段的类型
  tags?: ArticleTagDto[];

  @Expose()
  @Type(() => ArticleMetaDto)
  metas!: ArticleMetaDto[]; // 定义 metas 字段

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
  @Transform(({ value }) => format(new Date(value), "yyyy-MM-dd HH:mm:ss")) // 转换为本地时间字符串
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => format(new Date(value), "yyyy-MM-dd HH:mm:ss")) // 转换为本地时间字符串
  updatedAt!: Date;
}
