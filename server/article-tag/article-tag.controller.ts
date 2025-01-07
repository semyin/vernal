import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';
import { ArticleTag } from './article-tag.entity';

@Controller('article-tags')
export class ArticleTagController {
  constructor(private readonly articleTagService: ArticleTagService) { }

  // 创建文章-标签关联
  @Post()
  async create(
    @Body('articleId') articleId: number,
    @Body('tagId') tagId: number,
  ): Promise<ArticleTag> {
    return this.articleTagService.create(articleId, tagId);
  }

  // 查询所有文章-标签关联
  @Get()
  async findAll(): Promise<ArticleTag[]> {
    return this.articleTagService.findAll();
  }

  // 查询单个文章-标签关联
  @Get(':articleId/:tagId')
  async findOne(
    @Param('articleId') articleId: number,
    @Param('tagId') tagId: number,
  ): Promise<ArticleTag> {
    return this.articleTagService.findOne(articleId, tagId);
  }


  // 删除文章-标签关联
  @Delete(':articleId/:tagId')
  async remove(
    @Param('articleId') articleId: number,
    @Param('tagId') tagId: number,
  ): Promise<void> {
    return this.articleTagService.remove(articleId, tagId);
  }
}