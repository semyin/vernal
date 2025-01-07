import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // 创建分类
  async create(name: string, description?: string): Promise<Category> {
    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }

  // 查询所有分类
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // 查询单个分类
  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException('分类不存在');
    }
    return category;
  }

  // 更新分类
  async update(id: number, name: string, description?: string): Promise<Category> {
    const category = await this.findOne(id);
    category.name = name;
    if(description) {
        category.description = description;
    }
    return this.categoryRepository.save(category);
  }

  // 删除分类
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}