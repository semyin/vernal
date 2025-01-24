import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('friend_link')
export class FriendLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ comment: '友链名称' })
  name!: string;

  @Column({ comment: '友链URL' })
  url!: string;

  @Column({ nullable: true, comment: '友链描述' })
  description?: string;

  @Column({ name: 'avatar_url', nullable: true, comment: '友链头像URL' })
  avatarUrl?: string;

  @Column({ default: 'default', comment: '友链类型' })
  type!: string;

  @Column({ default: 0, comment: '排序权重' })
  sortWeight!: number;

  @Column({ default: true, comment: '是否显示' })
  isVisible!: boolean;

  @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
  updatedAt!: Date;
}