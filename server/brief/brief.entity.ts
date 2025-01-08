import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { User } from '../user/user.entity'; // 假设 User 实体已经存在
  
  @Entity('brief')
  export class Brief {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: 'text', comment: '简讯内容' })
    content!: string;
  
    @Column({ name: 'author_id', comment: '作者ID' })
    authorId!: number;
  
    @Column({ name: 'is_published', default: false, comment: '是否发布' })
    isPublished!: boolean;
  
    @Column({ name: 'view_count', default: 0, comment: '浏览量' })
    viewCount?: number;
  
    @Column({ name: 'like_count', default: 0, comment: '点赞数' })
    likeCount?: number;
  
    @Column({ name: 'comment_count', default: 0, comment: '评论数' })
    commentCount?: number;
  
    @CreateDateColumn({ name: 'created_at', comment: '创建时间' })
    createdAt!: Date;
  
    @UpdateDateColumn({ name: 'updated_at', comment: '更新时间' })
    updatedAt!: Date;
  
    // 关联用户表
    @ManyToOne(() => User, (user) => user.briefs)
    @JoinColumn({ name: 'author_id' })
    author!: User;
  }