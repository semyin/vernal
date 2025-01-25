import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToInstance } from "class-transformer";
import * as P from "nestjs-paginate";
import { Article } from "./article.entity";
import { ArticleDto } from "./dto/article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>
  ) {
    this.initAboutPage();
  }

  // 查询所有文章-带标签
  async findAll(
    query: P.PaginateQuery,
    title?: string,
    withTags?: boolean,
    withMetas?: boolean
  ): Promise<ArticleDto[]> {
    const queryBuilder = this.articleRepository
      .createQueryBuilder("article")
      .where("article.type = :type", { type: "article" }) // 只查询普通文章
      .orderBy("article.createdAt", "DESC");
    // 动态加载 tags 数据
    if (withTags) {
      queryBuilder
        .leftJoinAndSelect("article.articleTags", "articleTags")
        .leftJoinAndSelect("articleTags.tag", "tag");
    }

    // 动态加载 metas 数据
    if (withMetas) {
      queryBuilder.leftJoinAndSelect("article.metas", "metas");
    }

    if (title) {
      queryBuilder.andWhere("article.title LIKE :title", {
        title: `%${title}%`, // 模糊匹配
      });
    }

    const paginatedArticles = await P.paginate<Article>(query, queryBuilder, {
      filterableColumns: {
        // 指定可过滤的列
        title: true, // 允许对 title 列进行过滤
        isPublished: true, // 允许对 isPublished 列进行过滤
      },
      sortableColumns: ["createdAt"], // 可排序的列
      defaultSortBy: [["createdAt", "DESC"]], // 默认排序规则
      maxLimit: 100, // 每页最大记录数
    });

    const items = plainToInstance(ArticleDto, paginatedArticles.data, {
      excludeExtraneousValues: true,
    });

    return items;
  }

  async getAboutPage(): Promise<ArticleDto> {
    const aboutPage = await this.articleRepository.findOne({
      where: { type: "about" },
      relations: ["articleTags", "articleTags.tag", "metas"],
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
      relations: ["articleTags", "articleTags.tag", "metas"],
    });
    if (!privacyPage) {
      throw new NotFoundException("隐私政策页面不存在");
    }
    return plainToInstance(ArticleDto, privacyPage, {
      excludeExtraneousValues: true,
    });
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
  async findOneWithTagsAndMetas(id: number): Promise<ArticleDto> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ["articleTags", "articleTags.tag", "metas"],
    });
    if (!article) {
      throw new NotFoundException("文章不存在");
    }
    return plainToInstance(ArticleDto, article, {
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

  // 创建文章
  async create(article: Partial<Article>): Promise<Article> {
    if (article.type === "about") {
      throw new BadRequestException("关于页面不能直接创建，请使用更新接口");
    }
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
