import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { VpsModule } from "./vps.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.entity';
import { CategoryModule } from './category/category.module';
import { Category } from "./category/category.entity";
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';
import { ArticleTagModule } from './article-tag/article-tag.module';
import { ArticleTag } from './article-tag/article-tag.entity';
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { LikeModule } from "./like/like.module";
import { Like } from "./like/like.entity";
import { BriefModule } from "./brief/brief.module";
import { Brief } from "./brief/brief.entity";
import { CommentModule } from "./comment/comment.module";
import { Comment } from "./comment/comment.entity";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { SnakeNamingStrategy } from "./common/utils/SnakeNamingStrategy";

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录路径
const __dirname = dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({ // 加载 .env 文件
      isGlobal: true, // 全局可用
    }),
    VpsModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST, // 从环境变量中读取
      port: parseInt(process.env.DATABASE_PORT as string, 10), // 从环境变量中读取
      username: process.env.DATABASE_USER, // 从环境变量中读取
      password: process.env.DATABASE_PASSWORD, // 从环境变量中读取
      database: process.env.DATABASE_NAME, // 从环境变量中读取
      namingStrategy: new SnakeNamingStrategy(),
      entities: [
        Article,
        Category,
        Tag,
        ArticleTag,
        User,
        Like,
        Brief,
        Comment,
      ],
      synchronize: false, // 关闭自动同步，因为我们手动创建了表
    }),
    ArticleModule, // 注册 ArticleModule
    CategoryModule, // 注册 CategoryModule
    TagModule, // 注册 TagModule
    ArticleTagModule, // 注册 ArticleTagModule
    UserModule, // 注册 UserModule
    LikeModule, // 注册 LikeModule
    BriefModule, // 注册 BriefModule
    CommentModule, // 注册 CommentModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
