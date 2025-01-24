import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendLink } from './friend-link.entity';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';

@Injectable()
export class FriendLinkService {
  constructor(
    @InjectRepository(FriendLink)
    private readonly friendLinkRepository: Repository<FriendLink>,
  ) {}

  // 创建友链
  async create(createFriendLinkDto: CreateFriendLinkDto): Promise<FriendLink> {
    const friendLink = this.friendLinkRepository.create(createFriendLinkDto);
    return this.friendLinkRepository.save(friendLink);
  }

  // 查询所有友链
  async findAll(): Promise<FriendLink[]> {
    return this.friendLinkRepository.find();
  }

  // 查询单个友链
  async findOne(id: number): Promise<FriendLink | null> {
    return this.friendLinkRepository.findOne({ where: { id } });
  }

  // 更新友链
  async update(id: number, updateFriendLinkDto: UpdateFriendLinkDto): Promise<FriendLink | null> {
    await this.friendLinkRepository.update(id, updateFriendLinkDto);
    return this.friendLinkRepository.findOne({ where: { id } });
  }

  // 删除友链
  async delete(id: number): Promise<void> {
    await this.friendLinkRepository.delete(id);
  }
}