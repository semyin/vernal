import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendLink } from './friend-link.entity';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';
import { plainToInstance } from 'class-transformer';
import e from 'express';

@Injectable()
export class FriendLinkService {
  constructor(
    @InjectRepository(FriendLink)
    private readonly friendLinkRepository: Repository<FriendLink>,
  ) { }

  // 创建友链
  async create(createFriendLinkDto: CreateFriendLinkDto): Promise<FriendLink> {
    const friendLink = this.friendLinkRepository.create(createFriendLinkDto);
    const result = this.friendLinkRepository.save(friendLink);
    return plainToInstance(FriendLink, result);
  }

  // 查询所有友链
  async findAll(
    name?: string,
    isVisible?: boolean
  ): Promise<FriendLink[]> {

    const queryBuilder = this.friendLinkRepository.createQueryBuilder("friendLink")

    if (name !== undefined) {
      queryBuilder.andWhere("friendLink.name LIKE :name", {
        name: `%${name}%`
      })
    }

    if (isVisible !== undefined) {
      queryBuilder.andWhere("friendLink.isVisible = :isVisible", {
        isVisible,
      });
    }

    const result = await queryBuilder.getMany();
    return plainToInstance(FriendLink, result);
  }

  // 查询单个友链
  async findOne(id: number): Promise<FriendLink | null> {
    const result = this.friendLinkRepository.findOne({ where: { id } });
    return plainToInstance(FriendLink, result);
  }

  // 更新友链
  async update(id: number, updateFriendLinkDto: UpdateFriendLinkDto): Promise<FriendLink | null> {
    await this.friendLinkRepository.update(id, updateFriendLinkDto);
    const result = this.friendLinkRepository.findOne({ where: { id } });
    return plainToInstance(FriendLink, result);
  }

  // 删除友链
  async delete(id: number): Promise<void> {
    await this.friendLinkRepository.delete(id);
  }
}