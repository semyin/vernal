import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { Article } from '../article/article.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  // 创建标签
  async create(name: string): Promise<Tag> {
    const tag = this.tagRepository.create({ name });
    return this.tagRepository.save(tag);
  }

  // 查询所有标签
  async findAll(): Promise<Tag[]> {
    const result = await this.tagRepository.find()
    return plainToInstance(Tag, result)
  }

  // 查询单个标签及其关联的文章
  async findOne(id: number): Promise<Tag> {
    
    const tag = await this.tagRepository
      .createQueryBuilder("tag")
      .leftJoinAndSelect('tag.articleTags', 'articleTags')
      .leftJoinAndSelect('articleTags.article', 'article')
      .select([
        'tag.id', 
        'tag.name', 
        'tag.createdAt', 
        'tag.updatedAt', // 主表字段
        'articleTags.articleId', // 关联表 ArticleTags 的字段
        'articleTags.tag',
        'article.title',  // 关联表 Article 的字段
        'article.id',  // 关联表 Article 的字段
        'article.createdAt',
        'article.updatedAt',
      ])
      .where('tag.id = :id', { id })
      .getOne();
    
    if (!tag) {
      throw new NotFoundException('标签不存在');
    }
    
    return plainToInstance(Tag, tag)
  }
  // 更新标签
  async update(id: number, name: string): Promise<Tag> {
    const tag = await this.findOne(id);
    tag.name = name;
    return this.tagRepository.save(tag);
  }

  // 删除标签
  async remove(id: number): Promise<void> {
    const tag = await this.findOne(id);
    await this.tagRepository.remove(tag);
  }
}