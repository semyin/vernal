import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';

@Controller('friend-links')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Post()
  async create(@Body() createFriendLinkDto: CreateFriendLinkDto) {
    return this.friendLinkService.create(createFriendLinkDto);
  }

  @Get()
  async findAll() {
    return this.friendLinkService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.friendLinkService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateFriendLinkDto: UpdateFriendLinkDto) {
    return this.friendLinkService.update(id, updateFriendLinkDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.friendLinkService.delete(id);
  }
}