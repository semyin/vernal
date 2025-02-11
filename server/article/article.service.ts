import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import { Article } from "./article.entity";
import { Tag } from "../tag/tag.entity";
import { ArticleDto, ArticleListDto } from "./dto/article.dto";
import { Pagination, PaginationOptions } from "../../types/pagination.interface";
import { createPagination } from "../common/utils/pagination";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {
    this.initAboutPage();
  }

  async findList(): Promise<ArticleListDto[]> {
    const result = await this.articleRepository
      .createQueryBuilder("article")
      .select([
        "article.id", // 选择 id 字段
        "article.title", // 选择 title 字段
        "article.createdAt", // 选择 createdAt 字段
        "article.updatedAt", // 选择 updatedAt 字段
      ])
      .where("article.type = :type", { type: "article" })
      .orderBy("article.createdAt", "DESC")
      .getMany();
    return plainToInstance(ArticleListDto, result);
  }
  async findAll(
    options: PaginationOptions,
    title?: string,
    isPublished?: boolean,
    isTop?: boolean,
    tagIds?: number[],
    withTags?: boolean,
    withMetas?: boolean,
  ): Promise<Pagination<ArticleDto>> {
    const queryBuilder = this.articleRepository
      .createQueryBuilder('article')
      .where('article.type = :type', { type: 'article' });

    if (title) {
      queryBuilder.andWhere('article.title LIKE :title', { title: `%${title}%` });
    }

    if (isPublished !== undefined) {
      queryBuilder.andWhere('article.isPublished = :isPublished', { isPublished });
    }

    if (isTop !== undefined) {
      queryBuilder.andWhere('article.isTop = :isTop', { isTop });
    }

    if (tagIds && tagIds.length > 0) {
      queryBuilder
        .innerJoin('article.tags', 'tag') // 通过多对多关系连接 tag 表
        .andWhere('tag.id IN (:...tagIds)', { tagIds }); // 过滤 tagIds
    }

    const select = [
      'article.id',
      'article.title',
      'article.type',
      'article.summary',
      'article.authorId',
      'article.categoryId',
      'article.coverImage',
      'article.isPublished',
      'article.isTop',
      'article.viewCount',
      'article.likeCount',
      'article.commentCount',
      'article.createdAt',
      'article.updatedAt',
    ];

    queryBuilder.select(select);

    if (withTags) {
      queryBuilder.leftJoinAndSelect('article.tags', 'tags');
    }

    if (withMetas) {
      queryBuilder.leftJoinAndSelect('article.metas', 'metas');
    }

    queryBuilder.orderBy('article.createdAt', 'DESC');
    queryBuilder.take(options.limit);
    queryBuilder.skip((options.page - 1) * options.limit);

    const [items, total] = await queryBuilder.getManyAndCount();

    const _items = plainToInstance(ArticleDto, items, {
      excludeExtraneousValues: true,
    });

    return createPagination(_items, total, options);
  }

  // 查询单篇文章-带标签-带meta
  async findOne(id: number): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ["tags", "metas"],
    });
    if (!article) {
      throw new NotFoundException("文章不存在");
    }

    return plainToInstance(ArticleDto, article, {
      excludeExtraneousValues: true,
    });
  }

  // 创建文章
  async create(article: Partial<Article>, userId: number, tagIds?: number[]): Promise<Article> {
    if (article.type === "about") {
      throw new BadRequestException("关于页面不能直接创建，请使用更新接口");
    }
    const newArticle = this.articleRepository.create({
      ...article,
      authorId: userId
    });

    // 如果传入了 tagIds，关联对应的 Tag
    if (tagIds && tagIds.length > 0) {
      // 查询对应的 Tag 实体
      const tags = await this.tagRepository.findByIds(tagIds);
      if (!tags || tags.length === 0) {
        throw new NotFoundException("未找到对应的标签");
      }

      // 将 Tag 实体赋值给 Article 的 tags 字段
      newArticle.tags = tags;
    }

    return this.articleRepository.save(newArticle);
  }

  // 更新文章
  async update(id: number, article: Partial<Article>, tagIds?: number[]): Promise<Article> {
    const existingArticle = await this.articleRepository.findOneBy({ id });
    if (!existingArticle) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }

    Object.assign(existingArticle, article); // 合并更新

    // 如果传入了 tagIds，更新关联的 Tag
    if (tagIds) {
      const tags = await this.tagRepository.findByIds(tagIds);
      if (!tags || tags.length === 0) {
        throw new NotFoundException("未找到对应的标签");
      }

      existingArticle.tags = tags;
    }

    return this.articleRepository.save(existingArticle);
  }

  // 删除文章
  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async getAboutPage(): Promise<ArticleDto> {
    const aboutPage = await this.articleRepository.findOne({
      where: { type: "about" },
      relations: ["metas"],
    });
    if (!aboutPage) {
      throw new NotFoundException("关于页面不存在");
    }
    return plainToInstance(ArticleDto, aboutPage, {
      excludeExtraneousValues: true,
    });
  }

  async updateAboutPage(article: Partial<Article>): Promise<ArticleDto> {
    // 查找现有的关于页面
    const aboutPage = await this.articleRepository.findOne({
      where: { type: "about" },
    });

    // 如果不存在，则创建
    if (!aboutPage) {
      const newAboutPage = this.articleRepository.create({
        ...article,
        type: "about", // 强制设置为 about
      });
      await this.articleRepository.save(newAboutPage);
      return plainToInstance(ArticleDto, newAboutPage, {
        excludeExtraneousValues: true,
      });
    }

    // 如果存在，则更新
    Object.assign(aboutPage, article);
    await this.articleRepository.save(aboutPage);
    return plainToInstance(ArticleDto, aboutPage, {
      excludeExtraneousValues: true,
    });
  }

  async findPrivacyPage(): Promise<ArticleDto> {
    const privacyPage = await this.articleRepository.findOne({
      where: { type: "privacy" },
      relations: ["metas"],
    });
    if (!privacyPage) {
      throw new NotFoundException("隐私政策页面不存在");
    }
    return plainToInstance(ArticleDto, privacyPage, {
      excludeExtraneousValues: true,
    });
  }

  async initAboutPage() {
    const aboutPage = await this.articleRepository.findOne({
      where: { type: "about" },
    });
    if (!aboutPage) {
      const defaultAboutPage = this.articleRepository.create({
        title: "关于我们",
        content: "这是默认的关于页面内容",
        type: "about",
        authorId: 1, // 默认作者 ID
      });
      await this.articleRepository.save(defaultAboutPage);
    }
  }

  // 增加浏览量
  async incrementViewCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, "viewCount", 1);
  }

  // 增加点赞数
  async incrementLikeCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, "likeCount", 1);
  }

  // 增加评论数
  async incrementCommentCount(id: number): Promise<void> {
    await this.articleRepository.increment({ id }, "commentCount", 1);
  }
}
