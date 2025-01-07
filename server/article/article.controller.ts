import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll(): Promise<Article[]> {
    return this.articleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Article> {
    return this.articleService.findOne(+id);
  }

  @Post()
  create(@Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.create(article);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() article: Partial<Article>): Promise<Article> {
    return this.articleService.update(+id, article);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.articleService.remove(+id);
  }

  @Patch(':id/view')
  incrementViewCount(@Param('id') id: string): Promise<void> {
    return this.articleService.incrementViewCount(+id);
  }

  @Patch(':id/like')
  incrementLikeCount(@Param('id') id: string): Promise<void> {
    return this.articleService.incrementLikeCount(+id);
  }

  @Patch(':id/comment')
  incrementCommentCount(@Param('id') id: string): Promise<void> {
    return this.articleService.incrementCommentCount(+id);
  }
}