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
  UseGuards,
  DefaultValuePipe,
  ParseIntPipe,
  Req,
} from "@nestjs/common";
import { ArticleService } from "./article.service";
import { Article } from "./article.entity";
import { ArticleDto, ArticleListDto } from "./dto/article.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Pagination } from "nestjs-typeorm-paginate";

@Controller("articles")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findList(): Promise<ArticleListDto[]> {
    return this.articleService.findList();
  }

  @Get("about")
  getAboutPage(): Promise<ArticleDto> {
    return this.articleService.getAboutPage();
  }

  @Get("/manage")
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query("page", new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query("limit", new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
    @Query("title") title: string,
    @Query("withTags") withTags: boolean = false,
    @Query("withMetas") withMetas: boolean = false,
    @Req() req: Request // 获取请求对象
  ): Promise<Pagination<ArticleDto>> {
    return this.articleService.findAll(
      { page, limit, route: req.url },
      title,
      withTags,
      withMetas
    );
  }

  @Post("/manage")
  @UseGuards(JwtAuthGuard)
  create(@Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.create(article);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getOne(@Param("id") id: number): Promise<ArticleDto> {
    return this.articleService.findOneWithTagsAndMetas(id);
  }

  @Put("/manage/:id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() article: Partial<Article>
  ): Promise<Article> {
    return this.articleService.update(+id, article);
  }

  @Delete("/manage/:id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string): Promise<void> {
    return this.articleService.remove(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: number): Promise<ArticleDto> {
    return this.articleService.findOneWithTagsAndMetas(id);
  }

  @Patch("/manage/about")
  updateAboutPage(@Body() article: Partial<Article>): Promise<ArticleDto> {
    return this.articleService.updateAboutPage(article);
  }

  @Get("privacy")
  findPrivacyPage(): Promise<ArticleDto> {
    return this.articleService.findPrivacyPage();
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
