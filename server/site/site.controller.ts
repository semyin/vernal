import { Controller, Get, Put, Body } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteWithBaseMeta } from './site.service';
import { Site } from './site.entity';
import { MetaService } from '../meta/meta.service';

@Controller('site')
export class SiteController {
  constructor(
    private readonly siteService: SiteService,
    private readonly metaService: MetaService
  ) {}

  // 获取内存中的站点配置
  @Get()
  getSite(): Site {
    return this.siteService.getSite();
  }
  
  @Get('config')
  async getSiteWithBaseMeta(): Promise<SiteWithBaseMeta> {
    return this.siteService.getSiteWithBaseMeta();
  }

  // 更新站点配置
  @Put()
  async updateConfig(@Body() siteData: Partial<Site>): Promise<Site> {
    return this.siteService.updateConfig(siteData);
  }
}
