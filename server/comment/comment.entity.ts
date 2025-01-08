import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'target_id', comment: '目标ID（文章ID或简讯ID）' })
  targetId!: number;

  @Column({ type: 'enum', enum: ['article', 'brief'], comment: '目标类型（文章或简讯）' })
  targetType!: 'article' | 'brief';

  @Column({ name: 'user_id', comment: '用户ID' })
  userId!: number;

  @Column({ type: 'text', comment: '评论内容' })
  content!: string;

  @Column({ name: 'parent_comment_id', nullable: true, comment: '父评论ID' })
  parentCommentId!: number;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt!: Date;

  // 关联用户表
  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  // 子评论
  @OneToMany(() => Comment, (comment) => comment.parent)
  children?: Comment[];

  // 父评论
  @ManyToOne(() => Comment, (comment) => comment.children)
  @JoinColumn({ name: 'parent_comment_id' })
  parent?: Comment;
}