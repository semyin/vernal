import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { Article } from '../article/article.entity';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  // 查询所有标签
  @Get()
  async findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

   // 查询单个标签及其关联的文章
   @Get(':id')
   async findOne(@Param('id') id: number): Promise<Tag> {
     return this.tagService.findOne(id);
   }

  // 创建标签
  @Post('manage')
  async create(@Body('name') name: string): Promise<Tag> {
    return this.tagService.create(name);
  }

  // 更新标签
  @Put('manage/:id')
  async update(@Param('id') id: number, @Body('name') name: string): Promise<Tag> {
    return this.tagService.update(id, name);
  }

  // 删除标签
  @Delete('manage/:id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tagService.remove(id);
  }
}