import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article])], // 注册 Article 实体
  controllers: [ArticleController], // 注册控制器
  providers: [ArticleService], // 注册服务
})
export class ArticleModule {}
