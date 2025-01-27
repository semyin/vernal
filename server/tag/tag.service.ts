import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';
import { Article } from '../article/article.entity';

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
    return this.tagRepository.find();
  }

  // 查询单个标签及其关联的文章
  async findOne(id: number): Promise<Tag & { articles: Article[] }> {
    const tag = await this.tagRepository.findOne({
      where: { id },
      relations: ['articleTags', 'articleTags.article'], // 加载关联的 ArticleTag 和 Article
    });

    if (!tag) {
      throw new NotFoundException('标签不存在');
    }

    // 提取与标签关联的文章
    const articles = tag.articleTags.map((articleTag) => articleTag.article);

    // 排除 articleTags 字段
    const { articleTags, ...rest } = tag;

    return {
      ...tag,
      articles, // 将文章列表添加到返回对象中
    };
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