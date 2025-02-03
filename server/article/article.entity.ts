import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm'
import { Exclude, Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';
import { ArticleTag } from 'server/article-tag/article-tag.entity';
import { Meta } from '../meta/meta.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  content!: string;

  @Column({ length: 50, default: 'article' }) // 新增 type 字段
  type!: string; // 'article' 表示普通文章，'about' 表示关于页面，'privacy' 表示隐私政策

  @OneToMany(() => ArticleTag, (articleTag) => articleTag.article)
  @Exclude() // 排除 articleTags 字段
  articleTags?: Relation<ArticleTag>[];

  // 计算属性，返回简化后的标签列表
  @Expose() // 暴露 tags 字段
  get tags() {
    if (!this.articleTags) return undefined;
    return this.articleTags?.map((articleTag) => ({
      id: articleTag.tag.id,
      name: articleTag.tag.name,
    }));
  }

  @Column({ length: 500, nullable: true })
  summary?: string;

  @Column()
  authorId!: number;

  @Column({ nullable: true })
  categoryId?: number;

  @Column({ length: 255, nullable: true })
  coverImage?: string;

  @Column({ name: "is_published", type: "tinyint", default: 0 })
  @Transform(({ value }) => Boolean(value))
  isPublished?: boolean;

  @Column({ default: false })
  @Transform(({ value }) => Boolean(value))
  isTop?: boolean;

  @Column({ default: 0 })
  viewCount?: number;

  @Column({ default: 0 })
  likeCount?: number;

  @Column({ default: 0 })
  commentCount?: number;

  @CreateDateColumn()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  createdAt!: Date;

  @UpdateDateColumn()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss')) // 转换为本地时间字符串
  updatedAt!: Date;

  @OneToMany(() => Meta, (meta) => meta.resource)
  metas?: Relation<Meta[]>;
}
