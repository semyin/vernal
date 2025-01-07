import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleTag } from './article-tag.entity';
import { Article } from '../article/article.entity';
import { Tag } from '../tag/tag.entity';

@Injectable()
export class ArticleTagService {
  constructor(
    @InjectRepository(ArticleTag)
    private readonly articleTagRepository: Repository<ArticleTag>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 创建文章-标签关联
  async create(articleId: number, tagId: number): Promise<ArticleTag> {
    const article = await this.articleRepository.findOne({ where: { id: articleId } });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }

    const tag = await this.tagRepository.findOne({ where: { id: tagId } });
    if (!tag) {
      throw new NotFoundException('标签不存在');
    }

    const articleTag = this.articleTagRepository.create({ articleId, tagId });
    return this.articleTagRepository.save(articleTag);
  }

  // 查询所有文章-标签关联
  async findAll(): Promise<ArticleTag[]> {
    return this.articleTagRepository.find({ relations: ['article', 'tag'] });
  }

  // 查询单个文章-标签关联
  async findOne(articleId: number, tagId: number): Promise<ArticleTag> {
    const articleTag = await this.articleTagRepository.findOne({
      where: { articleId, tagId },
      relations: ['article', 'tag'],
    });
    if (!articleTag) {
      throw new NotFoundException('文章-标签关联不存在');
    }
    return articleTag;
  }

  // 删除文章-标签关联
  async remove(articleId: number, tagId: number): Promise<void> {
    const articleTag = await this.findOne(articleId, tagId);
    await this.articleTagRepository.remove(articleTag);
  }
}