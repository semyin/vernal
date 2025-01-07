import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleTagService } from './article-tag.service';
import { ArticleTagController } from './article-tag.controller';
import { ArticleTag } from './article-tag.entity';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleTag, Article, Tag])], // 注册实体
  controllers: [ArticleTagController],
  providers: [ArticleTagService],
})
export class ArticleTagModule {}