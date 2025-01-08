import { ArticleTag } from 'server/article-tag/article-tag.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Exclude, Expose, Transform } from 'class-transformer';
import { format } from 'date-fns';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  content!: string;

  @OneToMany(() => ArticleTag, (articleTag) => articleTag.article)
  @Exclude() // 排除 articleTags 字段
  articleTags?: ArticleTag[];

  // 计算属性，返回简化后的标签列表
  @Expose() // 暴露 tags 字段
  get tags() {
    return this.articleTags?.map((articleTag) => ({
      id: articleTag.tag.id,
      name: articleTag.tag.name,
    })) || [];
  }

  @Column({ length: 500, nullable: true })
  summary?: string;

  @Column()
  authorId!: number;

  @Column({ nullable: true })
  categoryId?: number;

  @Column({ length: 255, nullable: true })
  coverImage?: string;

  @Column({ default: false })
  isPublished?: boolean;

  @Column({ default: false })
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
}
