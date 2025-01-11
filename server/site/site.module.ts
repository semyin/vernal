import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './site.entity';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Site])], // 注册 Site 实体
  providers: [SiteService], // 注册 SiteService
  controllers: [SiteController], // 注册 SiteController
})
export class SiteModule {}
