import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Patch,
  Query,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { Article } from "./article.entity";
import { ArticleDto, ArticleListDto } from "./dto/article.dto";
import * as P from "nestjs-paginate";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("manage")
  findAll(
    @P.Paginate() query: P.PaginateQuery,
    @Query("title") title: string,
    @Query("withTags") withTags: boolean,
    @Query("withMetas") withMetas: boolean
  ): Promise<ArticleDto[]> {
    return this.articleService.findAll(query, title, withTags, withMetas);
  }

  @Get()
  findList(): Promise<ArticleListDto[]> {
    return this.articleService.findList()
  }

  @Get("about")
  getAboutPage(): Promise<ArticleDto> {
    return this.articleService.getAboutPage();
  }

  @Patch("about")
  updateAboutPage(@Body() article: Partial<Article>): Promise<ArticleDto> {
    return this.articleService.updateAboutPage(article);
  }

  @Get("privacy")
  findPrivacyPage(): Promise<ArticleDto> {
    return this.articleService.findPrivacyPage();
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<ArticleDto> {
    return this.articleService.findOneWithTagsAndMetas(id);
  }

  @Post()
  create(@Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.create(article);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() article: Partial<Article>
  ): Promise<Article> {
    return this.articleService.update(+id, article);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.articleService.remove(+id);
  }

  @Patch(":id/view")
  incrementViewCount(@Param("id") id: string): Promise<void> {
    return this.articleService.incrementViewCount(+id);
  }

  @Patch(":id/like")
  incrementLikeCount(@Param("id") id: string): Promise<void> {
    return this.articleService.incrementLikeCount(+id);
  }

  @Patch(":id/comment")
  incrementCommentCount(@Param("id") id: string): Promise<void> {
    return this.articleService.incrementCommentCount(+id);
  }
}
