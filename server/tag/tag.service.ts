import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './tag.entity';

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

  // 查询单个标签
  async findOne(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      throw new NotFoundException('标签不存在');
    }
    return tag;
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