import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import type { Relation } from 'typeorm'
import { Like } from '../like/like.entity';
import { Brief } from 'server/brief/brief.entity';
import { Exclude } from 'class-transformer';
import { Comment } from 'server/comment/comment.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, comment: '用户名' })
  username!: string;

  @Column({ unique: true, comment: '邮箱' })
  email!: string;

  @Column({ name: 'password_hash', comment: '密码哈希' })
  passwordHash!: string;

  @Column({ name: 'avatar_url', nullable: true, comment: '头像URL' })
  avatarUrl?: string;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt!: Date;

  @Column({ name: 'push_type', nullable: true, comment: '推送类型' })
  pushType?: string;

  @Column({ name: 'push_url', nullable: true, comment: '推送URL' })
  pushUrl?: string;

  @Column({ nullable: true, comment: '电话号码' })
  phone!: string;

  // 用户与点赞的关系
  @OneToMany(() => Like, (like) => like.user)
  likes?: Relation<Like>[];

  // 用户与简讯的关系
  @OneToMany(() => Brief, (brief) => brief.author)
  briefs?: Relation<Brief>[];

   // 用户与评论的关系
   @OneToMany(() => Comment, (comment) => comment.user)
   comments?: Relation<Comment>[];
}
