import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import * as P from 'nestjs-paginate'
import { Article } from './article.entity';
import { ArticleDto } from '../dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  // 查询所有文章
  findAll(): Promise<Article[]> {
    return this.articleRepository.find();
  }

  // 查询所有文章-带标签
  async findAllWithTags(
    query: P.PaginateQuery,
    title?: string
  ): Promise<ArticleDto[]> {

    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.articleTags', 'articleTags')
      .leftJoinAndSelect('articleTags.tag', 'tag')
      .orderBy('article.createdAt', 'DESC');
      if (title) {
        queryBuilder.andWhere('article.title LIKE :title', {
          title: `%${title}%`, // 模糊匹配
        });
      }

    const paginatedArticles = await P.paginate<Article>(query, queryBuilder, {
      filterableColumns: { // 指定可过滤的列
        title: true, // 允许对 title 列进行过滤
        isPublished: true, // 允许对 isPublished 列进行过滤
      },
      sortableColumns: ['createdAt'], // 可排序的列
      defaultSortBy: [['createdAt', 'DESC']], // 默认排序规则
      maxLimit: 100, // 每页最大记录数
    });

    const items = plainToInstance(ArticleDto, paginatedArticles.data, {
      excludeExtraneousValues: true,
    });

    return items;
  }

  // 查询单篇文章
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOneBy({ id });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  // 查询单篇文章-带标签
  async findOneWithTags(id: number): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['articleTags', 'articleTags.tag'],
    });
    if (!article) {
      throw new NotFoundException('文章不存在');
    }
    return plainToInstance(ArticleDto, article, { excludeExtraneousValues: true });
  }

  // 创建文章
  async create(article: Partial<Article>): Promise<Article> {
    const newArticle = this.articleRepository.create(article);
    return this.articleRepository.save(newArticle);
  }

  // 更新文章
  async update(id: number, article: Partial<Article>): Promise<Article> {
    const existingArticle = await this.articleRepository.findOneBy({ id });
    if (!existingArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    Object.assign(existingArticle, article); // 合并更新
    return this.articleRepository.save(existingArticle);
  }

  // 删除文章
  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }

  // 增加浏览量
  async incrementViewCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, 'viewCount', 1);
  }

  // 增加点赞数
  async incrementLikeCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, 'likeCount', 1);
  }

  // 增加评论数
  async incrementCommentCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, 'commentCount', 1);
  }
}
