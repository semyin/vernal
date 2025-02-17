import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { FriendLinkService } from './friend-link.service';
import { CreateFriendLinkDto } from './dto/create-friend-link.dto';
import { UpdateFriendLinkDto } from './dto/update-friend-link.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('friend-links')
export class FriendLinkController {
  constructor(private readonly friendLinkService: FriendLinkService) {}

  @Get()
  async findAll() {
    return this.friendLinkService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createFriendLinkDto: CreateFriendLinkDto) {
    return this.friendLinkService.create(createFriendLinkDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.friendLinkService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: number, @Body() updateFriendLinkDto: UpdateFriendLinkDto) {
    return this.friendLinkService.update(id, updateFriendLinkDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: number) {
    return this.friendLinkService.delete(id);
  }
}