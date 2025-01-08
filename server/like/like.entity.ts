import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('like')
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '目标ID（文章ID或简讯ID）' })
  targetId!: number;

  @Column({ type: 'enum', enum: ['article', 'brief'], comment: '目标类型（文章或简讯）' })
  targetType!: 'article' | 'brief';

  @Column({ comment: '用户ID' })
  userId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '创建时间' })
  createdAt!: Date;

  // 关联用户表
  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn({ name: 'user_id' })
  user!: User;
}