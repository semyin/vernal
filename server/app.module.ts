import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { parseBoolean } from "./common/utils";
import { VpsModule } from "./vps.module";
import { SnakeNamingStrategy } from "./common/utils/SnakeNamingStrategy";
import { ArticleModule } from './article/article.module';
import { Article } from './article/article.entity';
import { CategoryModule } from './category/category.module';
import { Category } from "./category/category.entity";
import { TagModule } from './tag/tag.module';
import { Tag } from './tag/tag.entity';
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { LikeModule } from "./like/like.module";
import { Like } from "./like/like.entity";
import { BriefModule } from "./brief/brief.module";
import { Brief } from "./brief/brief.entity";
import { CommentModule } from "./comment/comment.module";
import { Comment } from "./comment/comment.entity";
import { Site } from "./site/site.entity";
import { SiteModule } from "./site/site.module";
import { Meta } from "./meta/meta.entity";
import { File } from "./file/file.entity";
import { MetaModule } from "./meta/meta.module";
import { FriendLink } from "./friend-link/friend-link.entity";
import { FriendLinkModule } from "./friend-link/friend-link.module";
import { AuthModule } from "./auth/auth.module";
import { FileModule } from './file/file.module';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { AppService } from "./app.service";
import { AppController } from "./app.controller";

// 获取当前文件的路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件的目录路径
const __dirname = dirname(__filename);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        logging: parseBoolean(configService.get<boolean>('DATABASE_LOGGING', false)),
        synchronize: parseBoolean(configService.get<boolean>('DATABASE_SYNCHRONIZE', false)),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [
          Article,
          Category,
          Tag,
          User,
          Like,
          Brief,
          Comment,
          Site,
          Meta,
          FriendLink,
          File,
        ],
      }),
    }),
    ArticleModule, // 注册 ArticleModule
    CategoryModule, // 注册 CategoryModule
    TagModule, // 注册 TagModule
    UserModule, // 注册 UserModule
    LikeModule, // 注册 LikeModule
    BriefModule, // 注册 BriefModule
    CommentModule, // 注册 CommentModule
    SiteModule, // 注册 SiteModule
    MetaModule, // 注册 MetaModule
    FriendLinkModule, // 注册 FriendLinkModule
    AuthModule, // 注册 AuthModule
    FileModule, // 注册 FileModule
    VpsModule.forRoot(),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
