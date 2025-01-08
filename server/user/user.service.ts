import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from './user.entity';
import { CreateUserDto } from 'server/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  // 查询所有用户
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 根据ID查找用户
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 根据用户名查找用户
  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // 根据邮箱查找用户
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
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
