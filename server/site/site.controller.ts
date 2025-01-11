import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './site.entity';

@Controller('site')
export class SiteController {
  constructor(private readonly siteService: SiteService) {}

  // 获取站点配置
  @Get()
  async getConfig(): Promise<Site> {
    return this.siteService.getConfig();
  }

  // 初始化站点配置
  @Post('init')
  async initConfig(@Body() siteData: Partial<Site>): Promise<Site> {
    return this.siteService.initConfig(siteData);
  }

  // 更新站点配置
  @Put()
  async updateConfig(@Body() siteData: Partial<Site>): Promise<Site | null> {
    return this.siteService.updateConfig(siteData);
  }
}
