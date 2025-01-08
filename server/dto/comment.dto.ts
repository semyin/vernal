export class CreateCommentDto {
  targetId!: number; // 目标ID
  targetType!: 'article' | 'brief'; // 目标类型
  userId!: number; // 用户ID
  content!: string; // 评论内容
  parentCommentId?: number; // 父评论ID（可选）
}

export class UpdateCommentDto {
  content?: string; // 评论内容（可选）
}