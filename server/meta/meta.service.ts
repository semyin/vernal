import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meta } from './meta.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MetaService {
  constructor(
    @InjectRepository(Meta)
    private readonly metaRepository: Repository<Meta>,
  ) {}

  // 创建 meta
  async create(metaData: Partial<Meta>): Promise<Meta> {
    const meta = this.metaRepository.create(metaData);
    const result = await this.metaRepository.save(meta);
    return plainToInstance(Meta, result);
  }

  // 查询所有 meta
  async findAll(): Promise<Meta[]> {
    const result = await this.metaRepository.find();
    return plainToInstance(Meta, result);
  }

  // 根据 resource_type 和 resource_id 查询 meta
  async findByResource(resourceType: string, resourceId: number): Promise<Meta[]> {
    const result = await this.metaRepository.find({
      where: { resourceType: resourceType, resourceId: resourceId },
    });
    return plainToInstance(Meta, result);
  }

  // 根据 ID 查询 meta
  async findOne(id: number): Promise<Meta> {
    const meta = await this.metaRepository.findOne({ where: { id } });
    if (!meta) {
      throw new NotFoundException('Meta not found');
    }
    return plainToInstance(Meta, meta);
  }

  // 更新 meta
  async update(id: number, updateData: Partial<Meta>): Promise<Meta> {
    const meta = await this.findOne(id);
    Object.assign(meta, updateData);
    const result = await this.metaRepository.save(meta);
    return plainToInstance(Meta, result);
  }

  // 删除 meta
  async remove(id: number): Promise<void> {
    const meta = await this.findOne(id);
    await this.metaRepository.remove(meta);
  }
}
