import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto } from 'server/dto/user.dto';
import { plainToClass } from 'class-transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 查询所有用户
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // 获取用户详情
  @Get(':id')
  async findById(@Param('id') id: number): Promise<User | null> {
    return this.userService.findById(id);
  }

  // 创建用户
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = this.userService.create(createUserDto)
    return plainToClass(User, user);
  }

  // 更新用户
  @Put(':id')
  async update(@Param('id') id: number, @Body() user: Partial<User>): Promise<User | null> {
    return this.userService.update(id, user);
  }

  // 删除用户
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }
}
