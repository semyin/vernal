import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto, UserDto } from '#root/server/user/dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // 查询所有用户
  async findAll(
    username?: string,
    email?: string,
    phone?: string
  ): Promise<UserDto[]> {

    const queryBuilder = this.userRepository.createQueryBuilder("user")

    if (username) {
      queryBuilder.andWhere("user.username LIKE :username", {
        username: `%${username}%`
      })
    }

    if (email) {
      queryBuilder.andWhere("user.email = :email", {
        email
      })
    }

    if (phone) {
      queryBuilder.andWhere("user.phone = :phone", {
        phone
      })
    }

    queryBuilder.orderBy("user.createdAt", "DESC");

    const result = await queryBuilder.getMany()

    return plainToInstance(UserDto, result);
  }

  // 根据ID查找用户
  async findById(id: number): Promise<UserDto> {
    const result = await this.userRepository.findOne({ where: { id } });
    return plainToInstance(UserDto, result);
  }

  // 根据用户名查找用户
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  // 创建用户
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...rest } = createUserDto;

    // 对密码进行哈希处理
    const saltRounds = 10; // 哈希强度
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 创建用户
    const user = this.userRepository.create({
      ...rest,
      passwordHash, // 存储哈希后的密码
    });

    return this.userRepository.save(user);
  }

  // 验证密码
  async validatePassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  // 更新用户
  async update(id: number, user: Partial<User>): Promise<User | null> {
    await this.userRepository.update(id, user);
    return this.findById(id);
  }

  // 删除用户
  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
