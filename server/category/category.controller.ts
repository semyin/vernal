import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // 创建分类
  @Post()
  async create(@Body('name') name: string, @Body('description') description?: string): Promise<Category> {
    return this.categoryService.create(name, description);
  }

  // 查询所有分类
  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  // 查询单个分类
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoryService.findOne(id);
  }

  // 更新分类
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('description') description?: string,
  ): Promise<Category> {
    return this.categoryService.update(id, name, description);
  }

  // 删除分类
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}