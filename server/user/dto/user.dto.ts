import { Exclude, Expose, Transform } from "class-transformer";
import { format } from "date-fns";

export class CreateUserDto {
  username!: string; // 用户名
  email!: string; // 邮箱
  password!: string; // 明文密码（前端传入）
  avatarUrl?: string; // 头像URL（可选）
  pushType?: string; // 推送类型（可选）
  pushUrl?: string; // 推送URL（可选）
  phone?: string; // 电话号码（可选）
}

export class UserDto {
  @Expose()
  id!: number;

  @Expose()
  username!: string;

  @Exclude()
  passwordHash!: string;

  @Expose()
  email!: string;

  @Expose()
  avatarUrl?: string;

  @Expose()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss'))
  createdAt!: Date;

  @Expose()
  @Transform(({ value }) => format(new Date(value), 'yyyy-MM-dd HH:mm:ss'))
  updatedAt!: Date;

  @Expose()
  pushType?: string;

  @Expose()
  pushUrl?: string;

  @Expose()
  phone!: string;
}