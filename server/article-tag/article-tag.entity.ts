import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import type { Relation } from 'typeorm'
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';

@Entity('article_tag')
export class ArticleTag {

  @PrimaryColumn({ name: 'article_id' })
  articleId!: number;

  @PrimaryColumn({ name: 'tag_id' })
  tagId!: number;

  @ManyToOne(() => Article, (article) => article.articleTags)
  @JoinColumn({ name: 'article_id' })
  article!: Relation<Article>;

  @ManyToOne(() => Tag, (tag) => tag.articleTags)
  @JoinColumn({ name: 'tag_id' })
  tag!: Relation<Tag>;
}
