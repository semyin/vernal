import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 255 })
  title!: string;

  @Column('text')
  content!: string;

  @Column({ length: 500, nullable: true })
  summary!: string;

  @Column()
  authorId!: number;

  @Column({ nullable: true })
  categoryId!: number;

  @Column({ length: 255, nullable: true })
  tags!: string;

  @Column({ length: 255, nullable: true })
  coverImage!: string;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ default: false })
  isTop!: boolean;

  @Column({ default: 0 })
  viewCount!: number;

  @Column({ default: 0 })
  likeCount!: number;

  @Column({ default: 0 })
  commentCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}